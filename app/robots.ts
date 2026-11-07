import type { MetadataRoute } from "next";
import { isIndexingEnabled, robotsRules, SITE_URL } from "@/lib/seo";

export const dynamic = "force-dynamic";

export default function robots(): MetadataRoute.Robots {
  const indexing = isIndexingEnabled();
  return { rules: robotsRules(indexing), sitemap: indexing ? `${SITE_URL}/sitemap.xml` : undefined };
}
