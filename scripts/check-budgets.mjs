// Kontrola rozpočtů nad hotovým buildem. Běží v `npm run check`, nepotřebuje server ani prohlížeč.
// Hranice jdou dočasně přepsat proměnnou prostředí, trvalé zvýšení patří do docs/ROZHODNUTI.md.
import { readFileSync } from "node:fs";
import { gzipSync } from "node:zlib";

const KB = 1024;
const BUDGETS_KB = {
  js: Number(process.env.BUDGET_JS_KB ?? 140), // Zadání dovoluje 200, držíme rezervu.
  css: Number(process.env.BUDGET_CSS_KB ?? 15),
  html: Number(process.env.BUDGET_HTML_KB ?? 15),
  preloadedFonts: Number(process.env.BUDGET_FONTS_KB ?? 100),
};

// Prerenderované veřejné stránky, které se kontrolují.
const PAGES = ["index"];

const fromNext = (url) => `.next${decodeURI(url).replace(/^\/_next/, "").split("?")[0]}`;
const gzipped = (path) => gzipSync(readFileSync(path)).length;
const attrUrls = (html, tagPattern, attr) =>
  [...html.matchAll(tagPattern)].map((match) => ({ tag: match[0], url: match[0].match(new RegExp(`${attr}="([^"]+)"`))?.[1] })).filter((item) => item.url);

let failed = false;
for (const page of PAGES) {
  const html = readFileSync(`.next/server/app/${page}.html`, "utf8");

  // Skripty s noModule moderní prohlížeč nestahuje, takže se do rozpočtu nepočítají.
  const scripts = attrUrls(html, /<script[^>]*\ssrc="[^"]+"[^>]*>/g, "src").filter(({ tag }) => !/nomodule/i.test(tag));
  const styles = attrUrls(html, /<link[^>]*rel="stylesheet"[^>]*>/g, "href");
  const fonts = attrUrls(html, /<link[^>]*as="font"[^>]*>/g, "href");

  const measured = {
    js: scripts.reduce((sum, { url }) => sum + gzipped(fromNext(url)), 0),
    css: styles.reduce((sum, { url }) => sum + gzipped(fromNext(url)), 0),
    html: gzipSync(html).length,
    // Fonty woff2 už jsou komprimované.
    preloadedFonts: fonts.reduce((sum, { url }) => sum + readFileSync(fromNext(url)).length, 0),
  };

  for (const [name, bytes] of Object.entries(measured)) {
    const kb = bytes / KB;
    const ok = kb <= BUDGETS_KB[name];
    failed ||= !ok;
    console.log(`${ok ? "OK    " : "PŘES  "} ${page} ${name}: ${kb.toFixed(1)} kB (limit ${BUDGETS_KB[name]} kB)`);
  }
  if (scripts.length === 0) {
    failed = true;
    console.log(`CHYBA  ${page}: nenašel jsem žádné skripty, měření je nespolehlivé`);
  }
}

process.exit(failed ? 1 : 0);
