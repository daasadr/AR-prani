import { PRIVATE_PREFIXES } from "./zones";

type Header = { key: string; value: string };

// Zatím jen report-only: three.js a model-viewer se ještě ověří na zařízeních, pak se CSP zpřísní (app-dlr.9).
export const CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  "connect-src 'self'",
  "worker-src 'self' blob:",
  "object-src 'none'",
  "base-uri 'self'",
  "frame-ancestors 'none'",
  "form-action 'self' https://checkout.stripe.com",
].join("; ");

export const BASE_HEADERS: Header[] = [
  // Bez includeSubDomains a preload: na doméně jsou i služby mimo tuto aplikaci. Přehodnotit po spuštění.
  { key: "Strict-Transport-Security", value: "max-age=31536000" },
  { key: "Content-Security-Policy-Report-Only", value: CSP },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "microphone=(self), camera=(self), xr-spatial-tracking=(self), geolocation=(), payment=()" },
];

// Slug je klíč k osobním údajům, proto nesmí uniknout v Refereru ani v indexu.
export const PRIVATE_HEADERS: Header[] = [
  { key: "Referrer-Policy", value: "no-referrer" },
  { key: "X-Robots-Tag", value: "noindex, nofollow" },
];

export function buildHeaderRules() {
  return [
    { source: "/:path*", headers: BASE_HEADERS },
    ...PRIVATE_PREFIXES.map((prefix) => ({ source: `${prefix}/:path*`, headers: PRIVATE_HEADERS })),
  ];
}
