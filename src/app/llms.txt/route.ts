import { getContent, termHasPage, type ContentEntry } from "@/lib/content";
import { ibrFormPages, formName } from "@/lib/ibr-forms";
import { boqItems, trades, tradeItems, UNIT_LABEL } from "@/lib/boq";
import { requirements, departments } from "@/lib/erp";
import { questions as aiQuestions, vendorTests } from "@/lib/ai-assistant";
import { asmeGuides, ASME_EDITION } from "@/lib/asme";
import { mfgGuides } from "@/lib/manufacturing";
import { stGuides } from "@/lib/sales-tax";
import { conGuides } from "@/lib/construction";
import { DICT } from "@/lib/markets";
import { services, families, servicesIn, serviceUrl, familyUrl } from "@/lib/services";
import { engagements } from "@/lib/work";
import { engagementAnswers } from "@/lib/engagement";
import { MCP_URL } from "@/lib/ai-search";

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

For North America (US and Canada), Ahrom Labs builds the same kind of system
for job shops, fabricators and small manufacturers and distributors, beside
QuickBooks rather than replacing it: quoting, jobs and routings, scheduling,
stock and reservations, shop-floor time and job costing. US work starts with
a fixed-price prototype of one workflow (USD ${DICT.NA.pricing!.prototype.toLocaleString("en-US")}, ${DICT.NA.pricing!.prototypeWeeks} weeks); the US demos run on
sample data. Guides: https://ahromlabs.com/manufacturing

## North America (US and Canada)

The site has a version for each market. Pages that differ have their own US
URL, joined to the India page by hreflang; every other page serves both.
Visitors in the US and Canada are shown the US version automatically.

- [Home, US](https://ahromlabs.com/us): Custom operations software for US manufacturers and distributors, with fixed USD prices and the US demos.
- [Services, US](https://ahromlabs.com/us/services): The same services in US terms (estimates, sales tax, QuickBooks alongside).
- [Manufacturing inventory management software, US](https://ahromlabs.com/us/services/inventory-and-reservations): Stock, reservations and orders for US manufacturers and distributors.
- Prices (USD, fixed, agreed before work starts): prototype of one workflow $${DICT.NA.pricing!.prototype.toLocaleString("en-US")} in ${DICT.NA.pricing!.prototypeWeeks} weeks; full build $${DICT.NA.pricing!.buildFrom.toLocaleString("en-US")}–$${DICT.NA.pricing!.buildTo.toLocaleString("en-US")} in ${DICT.NA.pricing!.buildWeeks} weeks; care and changes $${DICT.NA.pricing!.care.toLocaleString("en-US")} a month; ${DICT.NA.pricing!.foundingOff}% off for the first ${DICT.NA.pricing!.foundingCount} US clients. ${DICT.NA.pricing!.pay}
- [US boiler and pressure vessel demo](https://boiler-erp-us.ahromlabs.com/demo): A US fabricator on sample data: ASME data report package, welder continuity, mill test reports by heat number, USD and sales tax.
- [US electronics distribution demo](https://electronics-erp-us.ahromlabs.com/demo): Reel-level inventory and orders for a US component distributor, in USD.
- [US interior design and furniture demo](https://interiors-erp-us.ahromlabs.com/demo): A US design studio and furniture workshop: estimates, sales tax invoices, projects and the workshop.
- [US construction demo](https://construction-erp-us.ahromlabs.com/demo): A US general contractor: pay applications with retainage and change orders, job costing, imperial units.
- Guides written for US buyers: ASME Boiler and Pressure Vessel Code (https://ahromlabs.com/asme) and production software for job shops (https://ahromlabs.com/manufacturing), US sales tax for manufacturers and distributors (https://ahromlabs.com/sales-tax), and construction billing: pay applications, retainage, lien waivers, change orders and the WIP schedule (https://ahromlabs.com/construction). The AI assistant guides (https://ahromlabs.com/ai-assistant) serve both markets, including US privacy rules.

## Pages

- [Home](https://ahromlabs.com/): Positioning, the problem with disconnected business systems, our approach, and how to start a conversation.
- [Services](https://ahromlabs.com/services): What we build, who each service is for, the measured results, and how an engagement runs.
- [Industries](https://ahromlabs.com/industries): One page per industry we have built a real system for, with the problems, what was built, and the engineering notes behind it.
- [Work](https://ahromlabs.com/work): The client businesses we have built systems for, named with permission, and what each system does.
- [Working with us](https://ahromlabs.com/engagement): Custom ERP cost in India (market ranges, cited), our pricing model, timelines, Tally, software licensing and data use, hosting, AMC, scope changes, and continuity.
- [Approach](https://ahromlabs.com/approach): The four principles behind how we model a business before automating it.
- [Systems](https://ahromlabs.com/systems): A glossary of the vocabulary we use to model a business: entities, relationships, workflows, permissions, decisions, evidence, and related terms.
- [About](https://ahromlabs.com/about): Who this practice is for and how an engagement runs.
- [Pujan Motiwala](https://ahromlabs.com/about/pujan-motiwala): The founder: background in data science and process mapping, and where a client's system can go next with AI.
- [Boiler ERP live demo](https://boiler-erp.ahromlabs.com/demo): A working copy of the boiler and pressure-vessel ERP with a sample company. Leave a name and email, pick a department head, and use the real screens; data resets nightly.
- [Electronics inventory live demo](https://electronics-erp.ahromlabs.com/demo): A working copy of the reel-level inventory and CRM built for an electronics-component trader, with a sample company. Leave a name and email, pick a login, and use the real screens; data resets nightly.
- [Interior design and furniture workshop live demo](https://interiors-erp.ahromlabs.com/demo): A working copy of the system built for an interior design studio and its furniture workshop, with two sample companies. Leave a name and email, pick a login, and use the real screens; data resets nightly.
- [Construction company live demo](https://construction-erp.ahromlabs.com/demo): A working copy of a contractor's system with a sample company: daily site reports, running bills, labour and stores. Leave a name and email, pick a login, and use the real screens; data resets nightly.
- [Notes](https://ahromlabs.com/notes): Engineering notes from real client work.
- [Patterns](https://ahromlabs.com/patterns): Reusable decisions extracted from real engagements.

## Machine-readable corpus

- [MCP server](${MCP_URL}): Read-only search over this site's published content, as an MCP (streamable HTTP) server. Card: https://ahromlabs.com/.well-known/mcp/server-card.json
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

  const erp =
    `- [ERP requirements for Indian manufacturers and traders](https://ahromlabs.com/erp): What to ask for before buying or building an ERP, with a test for every requirement and Indian statutory rules quoted from the official text.\n` +
    `- [ERP requirements checklist](https://ahromlabs.com/erp/requirements): ${requirements.length} testable requirements in ${departments.length} departments, each with why, the vendor demo test, a live benchmark and the law where one applies. As data (CC BY 4.0): https://ahromlabs.com/erp/requirements.json\n` +
    `- [ERP requirements builder](https://ahromlabs.com/erp/check): Five answers (industry, turnover, Tally, company, departments) give the requirements that apply. Runs in the browser.\n` +
    `- [ERP requirements template in Excel](https://ahromlabs.com/erp/template): RFP and vendor scorecard in one sheet.\n` +
    getContent("erp").map(line("erp")).join("\n");

  const ai =
    `- [AI assistants over your business data](https://ahromlabs.com/ai-assistant): How an assistant on an ERP or books should answer so its numbers match the reports: the model picks a fixed look-up, code does the maths.\n` +
    `- [Check an AI answer for made-up numbers](https://ahromlabs.com/ai-assistant/number-check): Paste the answer and the source data; every number not in the data is marked (₹, lakh and crore understood, no rounding). Runs in the browser.\n` +
    `- [Questions to ask an AI assistant](https://ahromlabs.com/ai-assistant/questions): ${aiQuestions.length} questions by industry and role, with what should answer each and what to check it against. As data (CC BY 4.0): https://ahromlabs.com/ai-assistant/questions.json and https://ahromlabs.com/ai-assistant/questions.csv\n` +
    `- [How to test an AI assistant before you buy it](https://ahromlabs.com/ai-assistant/vendor-test): ${vendorTests.length} tests for a vendor demo, with pass and fail. Test sheet: https://ahromlabs.com/ai-assistant/vendor-test.csv\n` +
    getContent("ai-assistant").map(line("ai-assistant")).join("\n");

  const asme =
    `- [ASME Boiler and Pressure Vessel Code, in plain English](https://ahromlabs.com/asme): Sections, stamps, Section IX welding qualifications and Section VIII design rules, written to the ${ASME_EDITION.name}, for shops in the US, Canada and India. Paragraphs cited, not reproduced; not reviewed by an Authorized Inspector.\n` +
    `- [Boiler and pressure vessel materials list](https://ahromlabs.com/asme/items): The common ASME plate, pipe, tube, forging, fitting, casting and bolting specifications with use, dimension standard, P-number and whether IBR 2026's material table names them, plus an ASME B36.10M pipe size chart. CSV (CC BY 4.0): https://ahromlabs.com/asme/items.csv\n` +
    `- [ASME questions, answered](https://ahromlabs.com/asme/questions): One question per guide, each answered in a few lines. As data (CC BY 4.0): https://ahromlabs.com/asme/questions.json and https://ahromlabs.com/asme/questions.csv\n` +
    `- [Welder continuity log for Excel](https://ahromlabs.com/asme/welder-continuity-log.xlsx): One row per welder and process; the lapse date under QW-322 (six months after the last weld) and days left are worked out. CC BY 4.0.\n` +
    `- Browser agents (WebMCP) on ahromlabs.com can call the calculators as tools: asme-hydrostatic-test-pressure, asme-shell-thickness and asme-welder-continuity.\n` +
    asmeGuides().map(line("asme")).join("\n");

  const mfg =
    `- [Production management software for job shops and small manufacturers](https://ahromlabs.com/manufacturing): Choosing a job shop ERP, what each QuickBooks edition does for manufacturing (checked against Intuit's pages), job costing and finite-capacity scheduling, for US job shops and small manufacturers.\n` +
    `- [Job cost workbook for Excel](https://ahromlabs.com/manufacturing/job-cost-worked-example.xlsx): Estimated vs actual cost for one job (material, setup, run time, outside processing, scrap, rework), margin and the hours-used-per-hour-quoted factor, with a worked example. CC BY 4.0.\n` +
    `- [Job shop schedule template for Excel](https://ahromlabs.com/manufacturing/job-shop-schedule-template.xlsx): Routings by machine with planned days, flags for operations after the due date or before the previous one, and hours booked per machine per day against shift hours. CC BY 4.0.\n` +
    `- [ERP requirements checklist for US manufacturers](https://ahromlabs.com/manufacturing/erp-requirements-checklist-us.csv): 28 testable requirements (quoting, purchasing, inventory, production, shipping, QuickBooks, sales tax, access, data ownership), each with what the vendor must show in a demo. CSV for Excel, CC BY 4.0.\n` +
    mfgGuides().map(line("manufacturing")).join("\n");

  const salesTax =
    `- [US sales tax for manufacturers, distributors and contractors](https://ahromlabs.com/sales-tax): When a business must collect sales tax in another state (physical and economic nexus after South Dakota v. Wayfair), every state's threshold with a checker, resale and exemption certificates, the manufacturing exemption and use tax, quoted from the Streamlined Sales Tax Governing Board and state revenue departments.\n` +
    stGuides().map(line("sales-tax")).join("\n");

  const construction =
    `- [Construction billing and job cost: guides for contractors](https://ahromlabs.com/construction): US pay applications, retainage, lien waivers, change orders and the WIP schedule; India's running account bills, measurement book, TDS on payments to contractors and GST on works contracts, quoted from the laws and official manuals.\n` +
    conGuides().map(line("construction")).join("\n");

  const body =
    HEADER +
    `\n## Industries\n\n${industries}\n` +
    `\n## Services\n\n${offered}\n` +
    `\n## Clients\n\n${clients}\n` +
    `\n## Working with Ahrom Labs\n\n${working}\n` +
    `\n## For AI agents\n\n- [MCP server and files for AI agents](https://ahromlabs.com/agents): The site's read-only MCP search server with a config to copy, every page as Markdown in one file (https://ahromlabs.com/llms-full.txt), and the knowledge graph.\n` +
    `\n## IBR 2026 (Indian Boiler Regulations)\n\n${ibr}\n` +
    `\n## Interior BOQ (bill of quantities)\n\n${boq}\n` +
    `\n## ERP requirements (India)\n\n${erp}\n` +
    `\n## AI assistants over business data\n\n${ai}\n` +
    `\n## ASME Boiler and Pressure Vessel Code\n\n${asme}\n` +
    `\n## Manufacturing software (US job shops and small manufacturers)\n\n${mfg}\n` +
    `\n## US sales tax\n\n${salesTax}\n` +
    `\n## Construction billing (US and India)\n\n${construction}\n` +
    section("Engineering notes", "note", "notes") +
    section("Patterns", "pattern", "patterns") +
    `\n## Vocabulary\n\n${vocabulary}\n` +
    FOOTER;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
