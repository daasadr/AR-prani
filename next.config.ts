import type { NextConfig } from "next";
import { buildHeaderRules } from "./lib/security-headers";

const nextConfig: NextConfig = {
  output: "standalone",
  poweredByHeader: false,
  headers: async () => buildHeaderRules(),
  // CSS má jen pár kB, vložené do HTML neblokuje první vykreslení (LCP).
  experimental: { inlineCss: true },
};

export default nextConfig;
