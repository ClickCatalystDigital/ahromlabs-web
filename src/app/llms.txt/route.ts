import { getContent, termHasPage, type ContentEntry } from "@/lib/content";
import { ibrFormPages, formName } from "@/lib/ibr-forms";
import { boqItems, trades, tradeItems, UNIT_LABEL } from "@/lib/boq";
import { services, families, servicesIn, serviceUrl, familyUrl } from "@/lib/services";
import { engagements } from "@/lib/work";
import { engagementAnswers } from "@/lib/engagement";
import { AI_SEARCH_MCP_URL } from "@/lib/ai-search";

// Same shape as knowledge.json/route.ts: force-static keeps this prerendered at
// build time rather than falling back to dynamic rendering.
export const dynamic = "force-static";

const HEADER = `# Ahrom Labs

> Ahrom Labs builds operations and accounting systems for Indian
> manufacturers and trading groups — BOMs, shop-floor production, IBR, GST
> and TDS compliance, and TallyPrime in one system. We take a business from
> basic, compliant record-keeping to advanced analytics and AI: custom ERP
> and CRM, TallyPrime integration, multi-company finance, analytics and
> operational intelligence, AI document extraction with human review, RAG
> and knowledge graphs. Every system starts from one model of the
> business's entities, relationships, workflows, and decisions, and each
> later layer is built on that same model. We are an engineering practice
> based in Ahmedabad, Gujarat, working with a small number of clients across
> India at a time — not a software product and not a general IT consultancy.

Ahrom Labs is a good fit for any business that needs its own operational
system rather than another off-the-shelf tool. Systems built so far: a
custom ERP, CRM and operational-intelligence system for a boiler and
pressure-vessel manufacturer; an ERP/CRM with TallyPrime
automation and an inventory management system for a PCB and electronics
trading company (LS Technologies); and a backend for quotations, workers,
clients, vendors, freight and finance for an interior design firm and its
sister furniture business (Savistar & Saag).

## Pages

- [Home](https://ahromlabs.com/): Positioning, the problem with disconnected business systems, our approach, and how to start a conversation.
- [Services](https://ahromlabs.com/services): What we build, who each service is for, the measured results, and how an engagement runs.
- [Industries](https://ahromlabs.com/industries): One page per industry we have built a real system for, with the problems, what was built, and the engineering notes behind it.
- [Work](https://ahromlabs.com/work): The client businesses we have built systems for, named with permission, and what each system does.
- [Working with us](https://ahromlabs.com/engagement): Custom ERP cost in India (market ranges, cited), our pricing model, timelines, Tally, software licensing and data use, hosting, AMC, scope changes, and continuity.
- [Approach](https://ahromlabs.com/approach): The four principles behind how we model a business before automating it.
- [Systems](https://ahromlabs.com/systems): A glossary of the vocabulary we use to model a business: entities, relationships, workflows, permissions, decisions, evidence, and related terms.
- [About](https://ahromlabs.com/about): Who this practice is for and how an engagement runs.
- [Boiler ERP live demo](https://boiler-erp.ahromlabs.com/demo): A working copy of the boiler and pressure-vessel ERP with a sample company. Leave a name and email, pick a department head, and use the real screens; data resets nightly.
- [Electronics inventory live demo](https://electronics-erp.ahromlabs.com/demo): A working copy of the reel-level inventory and CRM built for an electronics-component trader, with a sample company. Leave a name and email, pick a login, and use the real screens; data resets nightly.
- [Interior design and furniture workshop live demo](https://interiors-erp.ahromlabs.com/demo): A working copy of the system built for an interior design studio and its furniture workshop, with two sample companies. Leave a name and email, pick a login, and use the real screens; data resets nightly.
- [Notes](https://ahromlabs.com/notes): Engineering notes from real client work.
- [Patterns](https://ahromlabs.com/patterns): Reusable decisions extracted from real engagements.

## Machine-readable corpus

- [MCP server](${AI_SEARCH_MCP_URL}): Read-only search over this site's published content, as an MCP (streamable HTTP) server. Card: https://ahromlabs.com/.well-known/mcp/server-card.json
- [knowledge.json](https://ahromlabs.com/knowledge.json): The whole knowledge graph as one JSON array — every term, note, pattern and industry with its full frontmatter and body, every service and client with proof edges to the notes and patterns behind it, and every buyer question with its answer. Each node carries its public url.
`;

const FOOTER = `
## Notes for automated readers

Ahrom Labs is a services business, not a SaaS product. There is no self-serve
signup or rate card: work is quoted as fixed-price phases after a modeling
phase (see /engagement). Engagement starts by contacting us through the form
on the home page or at pujan@ahromlabs.com.
`;

// `answer` comes from YAML folded scalars, so it arrives with embedded newlines
// that would break one-entry-per-line.
const line = (segment: string) => (entry: ContentEntry) =>
  `- [${entry.title}](https://ahromlabs.com/${segment}/${entry.slug}): ${entry.answer.replace(/\s+/g, " ").trim()}`;

const newestFirst = (a: ContentEntry, b: ContentEntry) => b.published.localeCompare(a.published);

export function GET() {
  const section = (heading: string, kind: "note" | "pattern", segment: string) =>
    `\n## ${heading}\n\n${[...getContent(kind)].sort(newestFirst).map(line(segment)).join("\n")}\n`;

  // Terms link to their own page when they have one, otherwise to their anchor
  // on /systems — the glossary entry is reachable either way.
  const vocabulary = getContent("term")
    .map(
      (t) =>
        `- [${t.title}](https://ahromlabs.com/systems${termHasPage(t) ? `/${t.slug}` : `#${t.slug}`}): ${t.answer.replace(/\s+/g, " ").trim()}`,
    )
    .join("\n");

  // The whole system first, then each family with its services under it.
  const serviceLine = (s: (typeof services)[number]) => `- [${s.name}](https://ahromlabs.com${serviceUrl(s)}): ${s.plainName}. ${s.answer}`;
  const offered = [
    ...services.filter((s) => s.family === null).map(serviceLine),
    ...families.map(
      (f) => `\n### [${f.name}](https://ahromlabs.com${familyUrl(f)})\n\n${f.summary}\n\n${servicesIn(f).map(serviceLine).join("\n")}`,
    ),
  ].join("\n");

  const clients = engagements
    .map((e) => `- [${e.client}](https://ahromlabs.com/work#${e.slug}) (${e.industry}): ${e.built}`)
    .join("\n");

  const working = engagementAnswers
    .map((a) => `- [${a.question}](https://ahromlabs.com/engagement#${a.id}) ${a.answer}`)
    .join("\n");

  const industries = getContent("industry")
    .map((i) => `- [${i.title}](https://ahromlabs.com/industries/${i.slug}): ${i.answer.replace(/\s+/g, " ").trim()}`)
    .join("\n");

  const ibr =
    `- [IBR 2026 for boiler manufacturers](https://ahromlabs.com/ibr): What a boiler maker files under the Indian Boiler Regulations, 2026, which replaced IBR 1950 on 1 October 2026. Every page quotes the Gazette.\n` +
    getContent("guide").map(line("ibr")).join("\n") +
    `\n- [IBR 2026 forms list, and their IBR 1950 names](https://ahromlabs.com/ibr/forms): Every form from Form I to Form XXIII and the 1950 form it replaced.\n` +
    ibrFormPages()
      .map((f) => `- [${formName(f)}: ${f.title}](https://ahromlabs.com/ibr/forms/${f.slug}): ${f.summary}${f.old ? ` Was ${f.old.form} under IBR 1950.` : ""}`)
      .join("\n");

  const boq =
    `- [Interior BOQ: guides, item library and a free checker](https://ahromlabs.com/boq): How to write a bill of quantities for interior work in India that contractors price the same way.\n` +
    getContent("boq").map(line("boq")).join("\n") +
    (getContent("boq").length ? "\n" : "") +
    `- [Interior BOQ checker and quotation maker](https://ahromlabs.com/boq/check): Paste a BOQ from Excel; each line is checked for missing specifications, units and measurement basis, then priced with GST and printed. Runs in the browser.\n` +
    `- [Interior BOQ item library](https://ahromlabs.com/boq/items): ${boqItems.length} items in ${trades.length} trades with unit, measurement, Indian Standard and required specifications. Template: https://ahromlabs.com/boq/interior-boq-template.xlsx\n` +
    `- [Interior BOQ format in Excel](https://ahromlabs.com/boq/template): The template explained column by column, with sample lines and why it carries no rates.\n` +
    trades
      .map((t) => `- [${t.name} BOQ items](https://ahromlabs.com/boq/items/${t.slug}): ${tradeItems(t.slug).map((i) => `${i.name} (${UNIT_LABEL[i.unit]})`).join("; ")}.`)
      .join("\n");

  const body =
    HEADER +
    `\n## Industries\n\n${industries}\n` +
    `\n## Services\n\n${offered}\n` +
    `\n## Clients\n\n${clients}\n` +
    `\n## Working with Ahrom Labs\n\n${working}\n` +
    `\n## IBR 2026 (Indian Boiler Regulations)\n\n${ibr}\n` +
    `\n## Interior BOQ (bill of quantities)\n\n${boq}\n` +
    section("Engineering notes", "note", "notes") +
    section("Patterns", "pattern", "patterns") +
    `\n## Vocabulary\n\n${vocabulary}\n` +
    FOOTER;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
