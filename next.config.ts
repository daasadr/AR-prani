import type { NextConfig } from "next";
import { buildHeaderRules } from "./lib/security-headers";

const nextConfig: NextConfig = {
  output: "standalone",
  poweredByHeader: false,
  headers: async () => buildHeaderRules(),
};

export default nextConfig;
