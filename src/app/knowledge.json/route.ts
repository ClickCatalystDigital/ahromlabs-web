import { NextResponse } from "next/server";
import { getContent } from "@/lib/content";

// Bare route.ts defaults to dynamic rendering since Next.js 15 — force-static
// keeps this prerendered at build time, consistent with the rest of the site.
export const dynamic = "force-static";

export function GET() {
  const content = [...getContent("term"), ...getContent("note"), ...getContent("pattern")];
  // Served through the Worker function, not the ASSETS binding (same as
  // sitemap.xml/robots.txt) — a public/_headers rule would be a no-op here,
  // so Cache-Control is set directly on the response instead. Moderate, not
  // immutable: this URL doesn't change across deploys the way hashed
  // _next/static assets do.
  return NextResponse.json(content, {
    headers: { "Cache-Control": "public, max-age=3600" },
  });
}
