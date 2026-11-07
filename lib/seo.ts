import { BRAND, FAQ, OFFERS } from "./content/product";
import { PUBLIC_ROUTES } from "./zones";

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, "");

// Indexace se musí zapnout výslovně jen na ostré doméně, jinak by se do vyhledávačů dostal test.appdilna.cz.
export const isIndexingEnabled = () => process.env.INDEXING_ENABLED === "true";

export function robotsRules(indexing: boolean) {
  // Soukromé cesty se záměrně nevypisují, robot musí dojít k hlavičce noindex (ROZHODNUTI.md, bod 9).
  return indexing ? { userAgent: "*", allow: "/" } : { userAgent: "*", disallow: "/" };
}

export function buildJsonLd(baseUrl: string) {
  const organization = {
    "@type": "Organization",
    "@id": `${baseUrl}/#organization`,
    name: BRAND.name,
    url: baseUrl,
    email: BRAND.email,
  };
  return {
    "@context": "https://schema.org",
    "@graph": [
      organization,
      { "@type": "WebSite", "@id": `${baseUrl}/#website`, name: BRAND.name, url: baseUrl, inLanguage: "cs", publisher: { "@id": organization["@id"] } },
      {
        "@type": "Product",
        name: BRAND.product,
        description: BRAND.promise,
        brand: { "@id": organization["@id"] },
        // Bez aggregateRating a review, dokud nejsou skutečné ohlasy (zadání, kap. 0 bod 5).
        offers: OFFERS.map((offer) => ({
          "@type": "Offer",
          name: offer.name,
          price: offer.priceCzk.toFixed(2),
          priceCurrency: "CZK",
          url: `${baseUrl}/#cenik`,
          availability: "https://schema.org/InStock",
        })),
      },
      {
        "@type": "FAQPage",
        mainEntity: FAQ.map(({ q, a }) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
      },
    ],
  };
}

// Do <script> se nesmí dostat „<“, jinak by šlo z JSON-LD vyskočit do HTML.
export const serializeJsonLd = (data: unknown) => JSON.stringify(data).replace(/</g, "\\u003c");

export function buildLlmsTxt(baseUrl: string) {
  return [
    `# ${BRAND.name}: ${BRAND.product}`,
    "",
    `> ${BRAND.promise}`,
    "",
    "## Ceny",
    ...OFFERS.map((offer) => `- ${offer.name}: ${offer.priceCzk} Kč`),
    "",
    "## Stránky",
    ...PUBLIC_ROUTES.map((route) => `- [${route.title}](${baseUrl}${route.path}): ${route.summary}`),
    "",
    "## Časté dotazy",
    ...FAQ.flatMap(({ q, a }) => [`### ${q}`, a, ""]),
    `Kontakt: ${BRAND.email}`,
    "",
  ].join("\n");
}
