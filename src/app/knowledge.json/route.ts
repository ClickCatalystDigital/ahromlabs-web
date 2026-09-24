import { NextResponse } from "next/server";
import { getContent, termHasPage, type ContentEntry } from "@/lib/content";
import { services } from "@/lib/services";
import { engagements } from "@/lib/work";

// Bare route.ts defaults to dynamic rendering since Next.js 15 — force-static
// keeps this prerendered at build time, consistent with the rest of the site.
export const dynamic = "force-static";

const siteUrl = "https://ahromlabs.com";

// Every node carries its public URL, so a consumer can cite it without
// knowing the site's routing. Terms without a page point at their anchor.
function contentUrl(entry: ContentEntry): string {
  if (entry.kind === "term") {
    return `${siteUrl}/systems${termHasPage(entry) ? `/${entry.slug}` : `#${entry.slug}`}`;
  }
  return `${siteUrl}/${entry.kind === "note" ? "notes" : "patterns"}/${entry.slug}`;
}

// Edges are `proof` references rendered as "note/<slug>" / "pattern/<slug>",
// matching how a note's own `patterns:` list names its targets by slug. The
// agents in the client repos filter on kind === "pattern", so the service and
// client nodes added here are invisible to them unless they ask for them.
const ref = (p: { kind: string; slug: string }) => `${p.kind}/${p.slug}`;

export function GET() {
  const content = [...getContent("term"), ...getContent("note"), ...getContent("pattern")].map((entry) => ({
    ...entry,
    url: contentUrl(entry),
  }));

  const serviceNodes = services.map((s) => ({
    kind: "service",
    slug: s.slug,
    title: s.name,
    answer: s.answer,
    layer: s.layer,
    forWhom: s.forWhom,
    evidence: s.evidence,
    proof: s.proof.map(ref),
    url: `${siteUrl}/services#${s.slug}`,
  }));

  const clientNodes = engagements.map((e) => ({
    kind: "client",
    slug: e.slug,
    title: e.client,
    answer: e.built,
    industry: e.industry,
    services: e.services,
    highlights: e.highlights,
    proof: e.proof.map(ref),
    url: `${siteUrl}/work#${e.slug}`,
  }));

  // Served through the Worker function, not the ASSETS binding (same as
  // sitemap.xml/robots.txt) — a public/_headers rule would be a no-op here,
  // so Cache-Control is set directly on the response instead. Moderate, not
  // immutable: this URL doesn't change across deploys the way hashed
  // _next/static assets do.
  return NextResponse.json([...content, ...serviceNodes, ...clientNodes], {
    headers: { "Cache-Control": "public, max-age=3600" },
  });
}
