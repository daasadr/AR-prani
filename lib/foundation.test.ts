import { describe, expect, it } from "vitest";
import { FAQ, OFFERS } from "./content/product";
import { BASE_HEADERS, buildHeaderRules, PRIVATE_HEADERS } from "./security-headers";
import { buildJsonLd, buildLlmsTxt, robotsRules, serializeJsonLd } from "./seo";
import { isPrivatePath, PRIVATE_PREFIXES, PUBLIC_ROUTES } from "./zones";

const BASE = "https://example.test";
const headerKeys = (headers: { key: string }[]) => headers.map((h) => h.key);

describe("zóny", () => {
  it.each(["/p/abc", "/p", "/hotovo/x", "/admin", "/api/cards"])("%s je soukromá", (path) => {
    expect(isPrivatePath(path)).toBe(true);
  });
  it.each(["/", "/pribeh", "/cenik", "/apidoc", "/hotovost"])("%s není soukromá", (path) => {
    expect(isPrivatePath(path)).toBe(false);
  });
  it("žádná veřejná stránka neleží v soukromé zóně", () => {
    expect(PUBLIC_ROUTES.filter((route) => isPrivatePath(route.path))).toEqual([]);
  });
});

describe("bezpečnostní hlavičky", () => {
  it("základ obsahuje všechny požadované hlavičky", () => {
    expect(headerKeys(BASE_HEADERS)).toEqual(
      expect.arrayContaining(["Strict-Transport-Security", "Content-Security-Policy-Report-Only", "X-Content-Type-Options", "X-Frame-Options", "Permissions-Policy"]),
    );
  });
  it("mikrofon a AR jsou povolené jen vlastnímu původu", () => {
    const policy = BASE_HEADERS.find((h) => h.key === "Permissions-Policy")!.value;
    expect(policy).toContain("microphone=(self)");
    expect(policy).toContain("xr-spatial-tracking=(self)");
  });
  it("každá soukromá zóna má noindex a no-referrer a platí až po základu", () => {
    const rules = buildHeaderRules();
    expect(rules[0].source).toBe("/:path*");
    for (const prefix of PRIVATE_PREFIXES) {
      const rule = rules.find((r) => r.source === `${prefix}/:path*`);
      expect(rule?.headers).toBe(PRIVATE_HEADERS);
    }
    expect(PRIVATE_HEADERS.find((h) => h.key === "X-Robots-Tag")?.value).toContain("noindex");
    expect(PRIVATE_HEADERS.find((h) => h.key === "Referrer-Policy")?.value).toBe("no-referrer");
  });
});

describe("roboti", () => {
  it("na ostré doméně povolí veřejný web a nevypisuje soukromé cesty", () => {
    expect(robotsRules(true)).toEqual({ userAgent: "*", allow: "/" });
  });
  it("mimo ostrou doménu zakáže všechno", () => {
    expect(robotsRules(false)).toEqual({ userAgent: "*", disallow: "/" });
  });
});

describe("strukturovaná data a llms.txt", () => {
  const ld = JSON.stringify(buildJsonLd(BASE));
  const llms = buildLlmsTxt(BASE);

  it("neobsahují vymyšlená hodnocení", () => {
    expect(ld).not.toMatch(/aggregateRating|"review"/);
  });
  it("ceny a dotazy pocházejí ze stejného zdroje", () => {
    for (const offer of OFFERS) {
      expect(ld).toContain(`"price":"${offer.priceCzk}.00"`);
      expect(llms).toContain(`${offer.name}: ${offer.priceCzk} Kč`);
    }
    for (const { q } of FAQ) {
      expect(ld).toContain(q);
      expect(llms).toContain(q);
    }
  });
  it("llms.txt neobsahuje soukromé cesty", () => {
    for (const prefix of PRIVATE_PREFIXES) expect(llms).not.toContain(`${BASE}${prefix}/`);
  });
  it("každá odpověď FAQ sama uvádí produkt nebo konkrétní fakt", () => {
    for (const { a } of FAQ) expect(a).toContain("Přání s talismanem");
  });
  it("JSON-LD nejde použít k úniku z tagu script", () => {
    expect(serializeJsonLd({ x: "</script><script>alert(1)</script>" })).not.toContain("<");
  });
});
