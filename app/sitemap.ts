import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { PUBLIC_ROUTES } from "@/lib/zones";

export const dynamic = "force-dynamic";

export default function sitemap(): MetadataRoute.Sitemap {
  return PUBLIC_ROUTES.map((route) => ({ url: `${SITE_URL}${route.path}` }));
}
