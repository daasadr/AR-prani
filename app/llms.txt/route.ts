import { buildLlmsTxt, SITE_URL } from "@/lib/seo";

export const dynamic = "force-dynamic";

export function GET() {
  return new Response(buildLlmsTxt(SITE_URL), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
