import { getContent, type ContentEntry } from "./content";

// What Ahrom Labs builds, in the words a buyer (or a model answering a buyer)
// actually uses. One array feeds /services, the homepage summary, llms.txt and
// the ProfessionalService offer catalog, so the four can't describe different
// businesses. Client claims restate something already published in content/ —
// the `proof` slugs are the receipts, and resolveProof() fails the build if
// one stops existing. Capabilities with no client deployment yet (RAG,
// knowledge graphs) say so rather than borrowing a client's name.

export type Service = {
  // Stable anchor on /services and fragment in schema @ids. Don't rename.
  slug: string;
  name: string;
  // Which rung of the ladder below this service sits on.
  layer: Layer["slug"];
  // Answer-first, 40-60 words: the chunk a retrieval system lifts.
  answer: string;
  // The buyer this is for, stated plainly.
  forWhom: string;
  evidence: { metric: string; value: string }[];
  proof: { kind: "note" | "pattern"; slug: string }[];
  // Receipts that aren't notes or patterns: a public repo, a live endpoint.
  links?: { href: string; label: string }[];
};

// The positioning in one list: every system starts at the bottom rung and a
// client climbs as far as the business needs, on the same data model.
export type Layer = { slug: "records" | "operations" | "analytics" | "ai"; name: string; summary: string };

export const layers: Layer[] = [
  {
    slug: "records",
    name: "Accounting and compliance core",
    summary: "One accounting and compliance layer shared across the systems we build: GST, TDS and tax rates from a single human-verified registry, GST returns, e-way bills, and TallyPrime connected four ways — or made optional.",
  },
  {
    slug: "operations",
    name: "Operations and workflow",
    summary: "The work itself: projects, production, purchasing, freight, workers and approvals, modeled as workflows with owners and state.",
  },
  {
    slug: "analytics",
    name: "Analytics and operational intelligence",
    summary: "Reporting through to advanced analytics on the same model: anomaly detection, confidence scoring and the numbers owners actually decide with.",
  },
  {
    slug: "ai",
    name: "AI: extraction, RAG and knowledge graphs",
    summary: "AI that reads documents, answers questions over your records and past decisions, and always leaves a person accountable for what gets posted.",
  },
];

export const services: Service[] = [
  {
    slug: "custom-erp-crm",
    name: "Custom ERP, CRM and operations systems",
    layer: "operations",
    answer:
      "We build the operational system a business runs on — clients, vendors, workers, orders, projects, purchasing, inventory, production, freight and finance — on one data model instead of a stack of disconnected tools. We model the business first; that model becomes the specification. Built so far for boiler manufacturing, PCB and electronics trading, and interior design.",
    forWhom:
      "Any business that has outgrown spreadsheets and off-the-shelf software — where a few people are the only ones who know how everything connects.",
    evidence: [
      { metric: "Systems built", value: "4, for 4 client businesses" },
      { metric: "Industries", value: "Boiler and pressure-vessel manufacturing, PCB and electronics trading, interior design, furniture" },
      { metric: "Outstanding balances", value: "Computed from source transactions at read time, not stored as a running total" },
    ],
    proof: [
      { kind: "note", slug: "tally-vs-erpnext-vs-custom-erp" },
      { kind: "note", slug: "plate-remnants-back-into-stock" },
      { kind: "note", slug: "two-companies-one-book" },
      { kind: "pattern", slug: "derive-balances-dont-store-them" },
      { kind: "pattern", slug: "replay-queued-payload-through-existing-handler" },
      { kind: "pattern", slug: "self-healing-sequence-counters" },
    ],
  },
  {
    slug: "compliance-accounting",
    name: "GST, TDS and statutory compliance, built in",
    layer: "records",
    answer:
      "We build accounting and statutory compliance into the operations system itself: ledger, GSTR-1, GSTR-3B, ITC reconciliation, TDS, reverse charge, fixed assets, bank reconciliation, audit log and books lock — and industry filings such as a boiler's IBR forms, generated from the BOM. Tally becomes optional. Rates come from a human-verified registry.",
    forWhom:
      "Manufacturers and traders who enter every purchase and sale twice — once in operations, once in Tally — and reconcile the two every month.",
    evidence: [
      { metric: "Reports and documents from one computation each", value: "23" },
      { metric: "GST returns", value: "GSTR-1 (B2B and HSN) and GSTR-3B" },
      { metric: "Bank reconciliation", value: "Auto-matched only when mutually unique; the rest go to a person" },
      { metric: "Industry filings", value: "IBR Forms II(1), III, III A and IV A, from the BOM and test certificates" },
      { metric: "Statutory rates", value: "GST by HSN, vendor TDS, income-tax and professional-tax slabs, PF/ESI — one verified registry, pulled daily" },
      { metric: "E-way bills", value: "Direct NIC client built to the official v1.03 spec; live once the NIC account is set up" },
    ],
    proof: [
      { kind: "note", slug: "statutory-rates-across-systems" },
      { kind: "note", slug: "accounting-inside-the-manufacturing-erp" },
      { kind: "note", slug: "ibr-statutory-folder-from-bom" },
      { kind: "pattern", slug: "human-verified-statutory-rates" },
      { kind: "pattern", slug: "auto-match-only-when-mutually-unique" },
      { kind: "pattern", slug: "compute-once-render-many" },
    ],
  },
  {
    slug: "tally-integration",
    name: "TallyPrime integration for cloud apps",
    layer: "records",
    answer:
      "We connect business systems to TallyPrime four ways, because Tally's gateway only listens on its own PC: a local agent that posts approved vouchers within 30 seconds, the same agent hardened for unreliable office internet, an MCP server giving apps and AI agents one set of Tally tools, and CSV or JSON export and import. Missing ledgers and rejections are held for a person.",
    forWhom:
      "Indian businesses whose accounts live in TallyPrime but whose sales, purchase or operations work has moved to a web app — and who are tired of re-keying the same invoice twice.",
    evidence: [
      { metric: "Ways to connect", value: "4 — local agent, hardened agent, MCP server, CSV/JSON files" },
      { metric: "Push cadence", value: "30 seconds" },
      { metric: "Voucher and outstanding sync", value: "15 minutes" },
      { metric: "Ledger, stock-item and voucher-type masters", value: "24 hours" },
      { metric: "Open-source reference library", value: "tally-voucher-xml, 32 tests" },
    ],
    proof: [
      { kind: "note", slug: "connecting-tallyprime-four-ways" },
      { kind: "note", slug: "tally-voucher-posting" },
      { kind: "note", slug: "outgrown-tally-signs" },
      { kind: "pattern", slug: "local-agent-cloud-db" },
      { kind: "pattern", slug: "failures-flagged-not-lost" },
      { kind: "pattern", slug: "reconcile-against-source-of-truth" },
    ],
    links: [{ href: "https://github.com/ahromlabs/tally-voucher-xml", label: "tally-voucher-xml on GitHub" }],
  },
  {
    slug: "multi-company-finance",
    name: "Multi-company finance and role-scoped access",
    layer: "operations",
    answer:
      "We build finance systems for sister concerns and group companies: one shared client list and ledger, with each invoice carrying the right company's letterhead and GSTIN. Who can see what is enforced where the data is fetched, not hidden in the screen — staff see only their own cash entries, and bank data is refused to them outright.",
    forWhom:
      "Families and partners running two or more related businesses out of one office, who need one view of the money without every employee seeing all of it.",
    evidence: [
      { metric: "Staff view of the cash ledger", value: "Own entries only, enforced in the API query" },
      { metric: "Staff access to bank data", value: "None — every bank route rejects staff" },
      { metric: "Companies per invoice", value: "Chosen per invoice: letterhead, logo, GSTIN" },
    ],
    proof: [
      { kind: "note", slug: "two-companies-one-book" },
      { kind: "pattern", slug: "role-scoped-finance-views" },
      { kind: "pattern", slug: "separate-machine-from-human-identity" },
    ],
  },
  {
    slug: "operational-intelligence",
    name: "Analytics and operational intelligence",
    layer: "analytics",
    answer:
      "Once the business runs on one model, analytics stops being a spreadsheet export. We build reporting through to advanced analytics on the operational data itself: charges flagged automatically against reference rates, match suggestions ranked by a Laplace-smoothed confidence score, and reports computed from the transactions themselves, so every figure can be traced back.",
    forWhom:
      "Owners who already have the data but decide on gut feel, because every report means someone stitching exports together by hand.",
    evidence: [
      { metric: "Overcharge detection", value: "Every vendor and freight charge compared against a reference rate; deviations flagged" },
      { metric: "Confidence scoring", value: "(approvals+1) / (approvals+rejections+2) ≥ 0.75, minimum 3 approvals" },
      { metric: "Workflow blockers", value: "What each milestone is waiting on, computed fresh on every read" },
      { metric: "Material yield", value: "Every cut conserved: 157.00 kg → 127.17 used + 15.70 remnant + 14.13 scrap" },
      { metric: "Built for", value: "Boiler manufacturing (Shanti Boilers), interior design and furniture (Savistar & Saag)" },
    ],
    proof: [
      { kind: "note", slug: "plate-remnants-back-into-stock" },
      { kind: "note", slug: "same-confidence-different-autonomy" },
      { kind: "pattern", slug: "compute-blockers-on-read" },
      { kind: "pattern", slug: "reference-rate-anomaly-detection" },
      { kind: "pattern", slug: "derive-balances-dont-store-them" },
    ],
  },
  {
    slug: "document-extraction",
    name: "AI document extraction with human review",
    layer: "ai",
    answer:
      "We build AI extraction for purchase invoices, freight invoices, bills of entry, purchase orders and bank statements. An LLM reads the PDF directly, with a prompt per document type. 88–95% of documents need zero correction, and every one still waits for a person to approve it before anything is posted to the books.",
    forWhom:
      "Trading, import-export and manufacturing businesses whose accounts team spends its day typing GST invoices, customs paperwork and bank statements into Tally.",
    evidence: [
      { metric: "Purchase order, zero-correction rate", value: "95%" },
      { metric: "Purchase invoice, zero-correction rate", value: "94%" },
      { metric: "Freight invoice, zero-correction rate", value: "91%" },
      { metric: "Bank statement, zero-correction rate", value: "89%" },
      { metric: "Bill of entry, zero-correction rate", value: "88%" },
      { metric: "Documents posted without human approval", value: "None" },
    ],
    proof: [
      { kind: "note", slug: "ai-extraction-human-in-the-loop" },
      { kind: "note", slug: "same-confidence-different-autonomy" },
      { kind: "note", slug: "ibr-statutory-folder-from-bom" },
      { kind: "pattern", slug: "human-confirmed-extraction" },
      { kind: "pattern", slug: "one-confirmation-teaches-the-system" },
    ],
  },
  {
    slug: "rag-knowledge-graphs",
    name: "RAG and knowledge graphs over your business",
    layer: "ai",
    answer:
      "Every system we build starts as a model of entities, relationships and decisions — which is already the schema of a knowledge graph. We build retrieval (RAG) and knowledge-graph layers on top, so people and AI agents can ask questions of your records, documents and past decisions and get answers that cite where they came from.",
    forWhom:
      "Businesses whose know-how lives in documents, inboxes and a few senior people's heads, and who want an assistant that answers from their own data rather than the internet.",
    evidence: [
      { metric: "Running on this site", value: "Search and chat over every published page (Ctrl/Cmd+K), and the same index as an MCP server for AI agents" },
      { metric: "Running today", value: "Ahrom Labs' own decision corpus, which the AI coding agents in 4 client codebases are instructed to check before any new design" },
      { metric: "Inferred relationships", value: "Marked unconfirmed and kept read-only until a person confirms them" },
      { metric: "Answers", value: "Cite the record or document they came from" },
    ],
    proof: [
      { kind: "pattern", slug: "unconfirmed-inferences-stay-read-only" },
      { kind: "pattern", slug: "human-confirmed-extraction" },
    ],
    links: [
      { href: "/.well-known/mcp/server-card.json", label: "This site's MCP server card" },
      { href: "/knowledge.json", label: "Our own corpus, as machine-readable JSON" },
      { href: "/systems", label: "The modeling vocabulary: entities, relationships, decisions" },
    ],
  },
];

// Resolve a proof reference to its published entry. Throws rather than
// rendering a dead link: this runs during prerender, so a renamed or deleted
// note fails the build instead of shipping.
export function resolveProof(ref: Service["proof"][number]): ContentEntry {
  const entry = getContent(ref.kind).find((e) => e.slug === ref.slug);
  if (!entry) {
    throw new Error(`services.ts references unknown ${ref.kind} "${ref.slug}"`);
  }
  return entry;
}

export const proofHref = (ref: Service["proof"][number]) =>
  `/${ref.kind === "note" ? "notes" : "patterns"}/${ref.slug}`;
