import { NextResponse } from "next/server";
import { getContent, termHasPage, type ContentEntry } from "@/lib/content";
import { ibrForms, formName } from "@/lib/ibr-forms";
import { boqItems, trades, IS, SPEC, UNIT_LABEL } from "@/lib/boq";
import { services, families, serviceUrl, familyUrl } from "@/lib/services";
import { engagements } from "@/lib/work";
import { engagementAnswers } from "@/lib/engagement";
import { erpRequirementNodes } from "@/lib/erp-json";
import { aiQuestionNodes } from "@/lib/ai-assistant";

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
  const segment = { note: "notes", pattern: "patterns", industry: "industries", guide: "ibr", boq: "boq", erp: "erp", "ai-assistant": "ai-assistant" }[entry.kind];
  return `${siteUrl}/${segment}/${entry.slug}`;
}

// Edges are `proof` references rendered as "note/<slug>" / "pattern/<slug>",
// matching how a note's own `patterns:` list names its targets by slug. The
// agents in the client repos filter on kind === "pattern", so the service and
// client nodes added here are invisible to them unless they ask for them.
const ref = (p: { kind: string; slug: string }) => `${p.kind}/${p.slug}`;

export function GET() {
  const content = [
    ...getContent("term"),
    ...getContent("note"),
    ...getContent("pattern"),
    ...getContent("industry"),
    ...getContent("guide"),
    ...getContent("boq"),
    ...getContent("erp"),
    ...getContent("ai-assistant"),
  ].map((entry) => ({
    ...entry,
    url: contentUrl(entry),
  }));

  const serviceNodes = services.map((s) => ({
    kind: "service",
    slug: s.slug,
    title: s.name,
    answer: s.answer,
    plainName: s.plainName,
    family: s.family,
    layer: s.layer,
    forWhom: s.forWhom,
    steps: s.steps,
    questions: s.questions,
    evidence: s.evidence,
    proof: s.proof.map(ref),
    // Graph edges in both directions, so an agent can walk service → client → industry.
    clients: engagements.filter((e) => e.services.includes(s.slug)).map((e) => e.slug),
    industries: getContent("industry").filter((i) => i.services?.includes(s.slug)).map((i) => i.slug),
    url: `${siteUrl}${serviceUrl(s)}`,
  }));

  const familyNodes = families.map((f) => ({
    kind: "family",
    slug: f.slug,
    title: f.name,
    plainName: f.plainName,
    answer: f.summary,
    services: services.filter((s) => s.family === f.slug).map((s) => s.slug),
    url: `${siteUrl}${familyUrl(f)}`,
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

  // The buyer questions from /engagement, so an agent answering "what does it
  // cost / who owns the code" can cite the founder's terms directly.
  const questionNodes = engagementAnswers.map((a) => ({
    kind: "question",
    slug: a.id,
    title: a.question,
    answer: a.answer,
    detail: a.detail ?? [],
    sources: a.sources ?? [],
    url: `${siteUrl}/engagement#${a.id}`,
  }));

  // Served through the Worker function, not the ASSETS binding (same as
  // sitemap.xml/robots.txt) — a public/_headers rule would be a no-op here,
  // so Cache-Control is set directly on the response instead. Moderate, not
  // immutable: this URL doesn't change across deploys the way hashed
  // _next/static assets do.
  // Every IBR 2026 form with the IBR 1950 form it replaced — the mapping
  // /ibr/forms renders, from the same data.
  const ibrFormNodes = ibrForms.map((f) => ({
    kind: "ibr-form",
    slug: f.slug,
    title: `${formName(f)}: ${f.title}`,
    answer: f.summary,
    regulation: `IBR 2026, regulation ${f.regulation}`,
    ...(f.old ? { replaces: `IBR 1950 ${f.old.form}: ${f.old.title}` } : {}),
    url: `${siteUrl}/ibr/forms${f.page ? `/${f.slug}` : ""}`,
  }));

  // The interior BOQ item library, one node per item, from src/lib/boq.ts: the
  // same data /boq/items, the checker and the template use.
  const boqItemNodes = boqItems.map((i) => ({
    kind: "boq-item",
    slug: i.id,
    title: i.name,
    trade: trades.find((t) => t.slug === i.trade)!.name,
    answer: `${i.name}: priced in ${UNIT_LABEL[i.unit]}. ${i.measure}`,
    unit: UNIT_LABEL[i.unit],
    alsoQuotedIn: (i.units ?? []).map((u) => UNIT_LABEL[u]),
    measurementBasisRequired: !!i.basis,
    standards: (i.is ?? []).map((r) => `${IS[r].code}: ${IS[r].title}`),
    mustSpecify: i.spec.map((k) => `${SPEC[k].label} (${SPEC[k].hint})`),
    oftenOmitted: i.omits,
    sampleLine: i.description,
    url: `${siteUrl}/boq/items/${i.trade}#${i.id.replace(/\./g, "-")}`,
  }));

  // Who builds it: the founder page, so an agent asked "who is behind Ahrom Labs" cites it.
  const founderNode = {
    kind: "person",
    slug: "pujan-motiwala",
    title: "Pujan Motiwala, founder of Ahrom Labs",
    answer:
      "Founder and Principal of Ahrom Labs, Ahmedabad. Nine years in data science and business process mapping (USAA, Arkose Labs, ABC Fitness, Liberty Mutual, Bajaj Allianz; associate faculty at Columbia University), MS Information Systems from Stevens Institute of Technology. Maps how a business runs, then builds its operations, accounting and AI systems. Also founded ClickCatalyst, a separate Google Ads software company.",
    url: `${siteUrl}/about/pujan-motiwala`,
  };

  return NextResponse.json([founderNode, ...content, ...familyNodes, ...serviceNodes, ...clientNodes, ...questionNodes, ...ibrFormNodes, ...boqItemNodes, ...erpRequirementNodes(), ...aiQuestionNodes()], {
    headers: { "Cache-Control": "public, max-age=3600", "Access-Control-Allow-Origin": "*" },
  });
}
