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
  // The same service in the owner's words, for people. Shown above `name` on
  // the homepage and /services; agents and schema keep reading `name`.
  plainName: string;
  // Two or three words for the picker on family and service pages.
  shortName: string;
  // Which family it's listed under on /services and the homepage. null only
  // for custom-erp-crm, which is the whole system and introduces the rest.
  family: Family["slug"] | null;
  // Which rung of the ladder below this service sits on.
  layer: Layer["slug"];
  // Answer-first, 40-60 words: the chunk a retrieval system lifts.
  answer: string;
  // The buyer this is for, stated plainly.
  forWhom: string;
  // How it works, in 3-4 plain steps, then the questions a buyer actually asks.
  // Every step and answer restates something in the evidence or a cited note.
  steps: string[];
  questions: { q: string; a: string }[];
  // Public demos where this service can be seen working, and which sample login
  // shows it. Only where the demo really shows it: demos block uploads and
  // can't reach a Tally PC, so those services have none.
  demos?: { client: string; as: string }[];
  evidence: { metric: string; value: string }[];
  proof: { kind: "note" | "pattern"; slug: string }[];
  // Receipts that aren't notes or patterns: a public repo, a live endpoint.
  links?: { href: string; label: string }[];
};

// Families group services by the part of the business they serve, which is
// how an owner looks for them. Each has its own page at /services/<slug>;
// slugs must not collide with service slugs (checked below).
export type Family = {
  slug: "selling-and-customers" | "buying-and-stores" | "making-and-delivering" | "money-and-people" | "seeing-and-asking";
  // Search and agent wording: the page <title> and the schema name.
  name: string;
  // Two or three words for the footer.
  shortName: string;
  // The heading people read: an outcome any business in the family would
  // claim, starting with a verb, never one client's or one industry's words.
  // The specific promise belongs to the service under it.
  plainName: string;
  // Answer-first, 40-60 words: the family page lead and its llms.txt line.
  summary: string;
  image: string;
};

export const families: Family[] = [
  {
    slug: "selling-and-customers",
    shortName: "Sales and customers",
    name: "Sales CRM, quotations and customer portal",
    plainName: "Win orders and keep customers in the loop",
    summary:
      "Systems for the selling side: every enquiry and quotation in one CRM with its full history, followed up on time, and a portal where customers follow their own order through every department, approve drawings, download documents and request quotes without phoning anyone.",
    image: "/what-we-build/selling-and-customers.webp",
  },
  {
    slug: "buying-and-stores",
    shortName: "Buying and stock",
    name: "Procurement, supplier portal and inventory",
    plainName: "Buy at the right price and know what's in stock",
    summary:
      "Systems for buying and holding stock: suppliers who quote on a private link and see their PO when it's issued, stock tracked unit by unit with QR labels across more than one store, and stock reserved against each customer order before it ships.",
    image: "/what-we-build/buying-and-stores.webp",
  },
  {
    slug: "making-and-delivering",
    shortName: "Making",
    name: "BOM management and material traceability",
    plainName: "Know what goes into everything you make",
    summary:
      "Systems for whatever you make: bills of materials built from your own Excel sheets, and materials traced from the day they arrive to the finished product, with usable offcuts going back into stock for the next job instead of being bought again.",
    image: "/what-we-build/making-and-delivering.webp",
  },
  {
    slug: "money-and-people",
    shortName: "Accounts and payroll",
    name: "Accounting, GST, TallyPrime and payroll",
    plainName: "Keep the books, GST and wages right the first time",
    summary:
      "The accounting and compliance layer under every system we build: GST and TDS from the work already entered, TallyPrime connected so nothing is typed twice, receivables and payables always current, group companies on one set of books, and daily-wage attendance turned into payroll.",
    image: "/what-we-build/money-and-people.webp",
  },
  {
    slug: "seeing-and-asking",
    shortName: "AI and analytics",
    name: "AI assistants and analytics for operations",
    plainName: "Ask your own records, and get the real numbers",
    summary:
      "An assistant built into your own system that answers from your records, in English or Hinglish, without ever inventing a number; and on the same records, reports that flag overcharges against agreed rates and AI that reads purchase documents for a person to check.",
    image: "/what-we-build/seeing-and-asking.webp",
  },
];

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
    plainName: "One system for the whole business, from enquiry to dispatch",
    shortName: "Custom ERP",
    family: null,
    layer: "operations",
    answer:
      "We build the operational system a business runs on — clients, vendors, workers, orders, projects, purchasing, inventory, production, freight and finance — on one data model instead of a stack of disconnected tools. We model the business first; that model becomes the specification. Built so far for boiler manufacturing, PCB and electronics trading, and interior design.",
    forWhom:
      "Any business that has outgrown spreadsheets and off-the-shelf software — where a few people are the only ones who know how everything connects.",
    steps: [
      "We map how the business actually runs: its people, records, workflows and decisions, before any screen is designed.",
      "That map becomes the specification you agree before building, so the structure isn't renegotiated halfway through.",
      "We build in phases on one data model: first the records that must be right, then the work your people do every day.",
      "It runs alongside your current tools. Tally can stay as the books, and the system is looked after under an annual maintenance contract.",
    ],
    questions: [
      { q: "Should we use TallyPrime, ERPNext or a custom system?", a: "Stay on TallyPrime if you need accounting with simple stock. Choose ERPNext or Odoo when your processes match what they ship. Build custom when the workflow is the business, such as IBR paperwork or tracking every plate and offcut." },
      { q: "Do we have to replace Tally?", a: "Rarely. In the systems we've built, Tally can stay as the books, and approved invoices post into it within 30 seconds." },
      { q: "Who builds and supports it?", a: "The person who maps your business writes the code and answers your messages: Pujan Motiwala, in Ahmedabad. Support runs under an annual maintenance contract." },
    ],
    demos: [
      { client: "boiler-manufacturer", as: "Sign in as Owner / Manager to see every department" },
      { client: "ls-technologies", as: "Sign in as Owner" },
      { client: "savistar-saag", as: "Sign in as Owner" },
    ],
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
    plainName: "GST returns and TDS, prepared from the work you already enter",
    shortName: "GST and TDS",
    family: "money-and-people",
    layer: "records",
    answer:
      "We build accounting and statutory compliance into the operations system itself: ledger, GSTR-1, GSTR-3B, ITC reconciliation, TDS, reverse charge, fixed assets, bank reconciliation, audit log and books lock — and industry filings such as a boiler's IBR forms, built from a bank of material test certificates. Tally becomes optional. Rates come from a human-verified registry.",
    forWhom:
      "Manufacturers and traders who enter every purchase and sale twice — once in operations, once in Tally — and reconcile the two every month.",
    steps: [
      "Sales, purchases and stock are entered once, in the operations system.",
      "The ledger posts from those same records, with GST and TDS rates from one human-verified registry, pulled daily.",
      "GSTR-1, GSTR-3B, ITC reconciliation, the TDS register and 23 reports and documents are generated from the same data.",
      "A filed period can be locked, and every change is kept in the audit log.",
    ],
    questions: [
      { q: "Where do the GST and TDS rates come from?", a: "One registry. A person checks each change against the actual CBIC or CBDT notification, it goes live only once approved, and systems pull approved rates daily. A wrong rate is retracted, never quietly edited." },
      { q: "Can it prepare a boiler's IBR forms?", a: "Yes. The statutory folder (cover letter and Forms II(1), III, III A and IV A) is produced from a bank of material test certificates. A person adds the parts, and a folder takes minutes instead of being typed by hand." },
      { q: "Do we still need Tally?", a: "No, Tally becomes optional. The operations system can be the book of record, with Tally kept as a sync target if your accountant prefers to work there." },
    ],
    demos: [
      { client: "boiler-manufacturer", as: "Sign in as Accounts: ledger, GST returns, receivables and payables" },
    ],
    evidence: [
      { metric: "Reports and documents from one computation each", value: "23" },
      { metric: "GST returns", value: "GSTR-1 (B2B and HSN) and GSTR-3B" },
      { metric: "Bank reconciliation", value: "Auto-matched only when mutually unique; the rest go to a person" },
      { metric: "Industry filings", value: "IBR Forms II(1), III, III A and IV A, from a bank of material test certificates" },
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
    plainName: "Your software and Tally in sync, with no double entry",
    shortName: "Tally sync",
    family: "money-and-people",
    layer: "records",
    answer:
      "We connect business systems to TallyPrime four ways, because Tally's gateway only listens on its own PC: a local agent that posts approved vouchers within 30 seconds, the same agent hardened for unreliable office internet, an MCP server giving apps and AI agents one set of Tally tools, and CSV or JSON export and import. Missing ledgers and rejections are held for a person.",
    forWhom:
      "Indian businesses whose accounts live in TallyPrime but whose sales, purchase or operations work has moved to a web app — and who are tired of re-keying the same invoice twice.",
    steps: [
      "A small agent runs on the PC where TallyPrime is open, because Tally's gateway only listens on that machine.",
      "When your web app approves an invoice, the agent posts it into Tally as a voucher within 30 seconds.",
      "Voucher status and outstandings sync back every 15 minutes, and ledgers and stock items every 24 hours.",
      "A missing ledger or a real rejection waits for a person; a dropped connection simply retries.",
    ],
    questions: [
      { q: "Why can't a web app talk to Tally directly?", a: "TallyPrime has no cloud API. Its integration gateway only listens on the PC that runs it, so every connection has to be a bridge on that machine." },
      { q: "What if the office internet drops?", a: "The hardened agent keeps approved entries and retries until Tally is reachable again. A connection failure is never mistaken for a rejection." },
      { q: "Can AI agents work with Tally?", a: "Yes. An MCP server in front of Tally gives applications and AI agents one set of Tally tools." },
    ],
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
    links: [{ href: "https://github.com/Ahrom-Labs/tally-voucher-xml", label: "tally-voucher-xml on GitHub" }],
  },
  {
    slug: "multi-company-finance",
    name: "Multi-company finance and role-scoped access",
    plainName: "Sister concerns, one set of books, and staff see only their part",
    shortName: "Group companies",
    family: "money-and-people",
    layer: "operations",
    answer:
      "We build finance systems for sister concerns and group companies: one shared client list and ledger, with each invoice carrying the right company's letterhead and GSTIN. Who can see what is enforced where the data is fetched, not hidden in the screen — staff see only their own cash entries, and bank data is refused to them outright.",
    forWhom:
      "Families and partners running two or more related businesses out of one office, who need one view of the money without every employee seeing all of it.",
    steps: [
      "Both companies share one client list and one ledger.",
      "Each invoice is issued under the company chosen for it, with that company's letterhead, logo and GSTIN.",
      "Staff see only their own cash entries; owners and managers see everything.",
      "Bank data is refused to staff by the system itself, not just hidden on the screen.",
    ],
    questions: [
      { q: "Why one book instead of two systems?", a: "When the same owners run both companies from one office with the same clients, one book gives one view of the money, and each invoice still carries the right company's details." },
      { q: "Can staff see the bank balance?", a: "No. Every bank screen and request rejects staff, so the data can't be reached even by calling the system directly." },
      { q: "Does each company keep its own GST details?", a: "Yes. Each invoice carries the letterhead, logo and GSTIN of the company it was issued under." },
    ],
    demos: [
      { client: "savistar-saag", as: "Print an invoice on either company's sample letterhead; sign in as Office to see staff-only cash" },
    ],
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
    slug: "custom-ai-assistant",
    name: "Custom AI assistant over your business data",
    plainName: "An assistant built on your own records that never invents a number",
    shortName: "AI assistant",
    family: "seeing-and-asking",
    layer: "ai",
    answer:
      "We build assistants into the systems we deliver that answer questions from the business's own records. A small model only picks the question type, look-up and period; code runs a fixed query with the same maths as the screens, so figures always match. Running at Savistar & Saag and LS Technologies, each with its own look-ups and voice.",
    forWhom:
      "Owners and staff who want to ask \"how did this month compare with last?\" or \"what do I have tomorrow?\" and get the real answer, in English or Hinglish, without opening five screens.",
    steps: [
      "Someone asks a question in plain English or Hinglish.",
      "A small decision model picks only the kind of question, the look-up, the company and the period.",
      "Code runs a fixed query with the same maths as the app's screens and shows the answer as a table.",
      "An optional sentence in the assistant's voice is shown only if every number in it is in the table.",
    ],
    questions: [
      { q: "Can the assistant get a number wrong?", a: "The model never writes the numbers. Code runs fixed look-ups with the same maths as the screens, and any written line with a number that isn't in the data is dropped." },
      { q: "What can staff ask?", a: "Only about their own tasks and their own cash entries. Payroll and bank statements are refused to them, as they are on the screens." },
      { q: "Can the assistant change our data?", a: "No. The assistant only reads data: look-ups never write. A reminder or note is drafted, and nothing is saved until the person presses Save." },
    ],
    demos: [
      { client: "savistar-saag", as: "Two free questions to Atelier AI, from any sample login" },
      { client: "ls-technologies", as: "Two free questions to Ohm, from any sample login" },
      { client: "boiler-manufacturer", as: "Two free questions to Ember, live data from a sample company" },
    ],
    evidence: [
      { metric: "Routing test (Savistar & Saag)", value: "55 of 55 test questions and 57 unseen real phrasings, including Hinglish" },
      { metric: "Who writes the numbers", value: "Code — fixed look-ups, never the model" },
      { metric: "Written answers with a number not in the data", value: "Dropped" },
      { metric: "Running at", value: "Atelier AI at Savistar & Saag, Ohm at LS Technologies; Ember, with how-to answers, at a boiler manufacturer" },
    ],
    proof: [{ kind: "note", slug: "assistant-that-answers-from-your-ledger" }],
  },
  {
    slug: "operational-intelligence",
    name: "Analytics and operational intelligence",
    plainName: "Your numbers, without anyone building an Excel sheet first",
    shortName: "Analytics",
    family: "seeing-and-asking",
    layer: "analytics",
    answer:
      "Once the business runs on one model, analytics stops being a spreadsheet export. We build reporting through to advanced analytics on the operational data itself: charges flagged automatically against reference rates, match suggestions ranked by a Laplace-smoothed confidence score, and reports computed from the transactions themselves, so every figure can be traced back.",
    forWhom:
      "Owners who already have the data but decide on gut feel, because every report means someone stitching exports together by hand.",
    steps: [
      "Reports read the same transactions the business runs on, so every figure traces back to its records.",
      "Every vendor and freight charge is compared with its agreed reference rate, and anything above it is flagged.",
      "What each milestone is waiting on is worked out fresh every time someone looks.",
      "Match suggestions are ranked by a confidence score built from past approvals.",
    ],
    questions: [
      { q: "How are overcharges caught?", a: "Each vendor and freight charge is compared with the reference rate for that vendor or route, and anything above it is flagged for a person to check." },
      { q: "Can we trust the figures?", a: "Reports are computed from the transactions themselves, not from a total kept on the side, so every figure can be traced to the records behind it." },
      { q: "What does an owner see?", a: "One page: projects on track, at risk or delayed, dispatches due this month, the order book, money outstanding and the sales funnel." },
    ],
    demos: [
      { client: "boiler-manufacturer", as: "Sign in as Owner / Manager for the executive page" },
      { client: "savistar-saag", as: "Vendors: one freight trip is overcharged on purpose" },
    ],
    evidence: [
      { metric: "Overcharge detection", value: "Every vendor and freight charge compared against a reference rate; deviations flagged" },
      { metric: "Confidence scoring", value: "(approvals+1) / (approvals+rejections+2) ≥ 0.75, minimum 3 approvals" },
      { metric: "Workflow blockers", value: "What each milestone is waiting on, computed fresh on every read" },
      { metric: "Material yield", value: "Every cut conserved: 157.00 kg → 127.17 used + 15.70 remnant + 14.13 scrap" },
      { metric: "Built for", value: "Boiler manufacturing, interior design and furniture (Savistar & Saag)" },
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
    plainName: "Purchase bills read by AI, checked by your accountant before posting",
    shortName: "AI document reading",
    family: "seeing-and-asking",
    layer: "ai",
    answer:
      "We build AI extraction for purchase invoices, freight invoices, bills of entry, purchase orders and bank statements. An LLM reads the PDF directly, with a prompt per document type. 88–95% of documents need zero correction, and every one still waits for a person to approve it before anything is posted to the books.",
    forWhom:
      "Trading, import-export and manufacturing businesses whose accounts team spends its day typing GST invoices, customs paperwork and bank statements into Tally.",
    steps: [
      "A PDF arrives, uploaded in the browser or forwarded from a phone.",
      "An AI model reads the PDF directly, with instructions for each type of document.",
      "A person checks the extracted fields on screen and approves them.",
      "Approved documents post into Tally as vouchers. Nothing is posted without approval.",
    ],
    questions: [
      { q: "How accurate is it?", a: "88–95% of documents need no correction, depending on the type: purchase orders highest at 95%, bills of entry lowest at 88%." },
      { q: "Which documents can it read?", a: "Purchase invoices, freight invoices, bills of entry, purchase orders and bank statements." },
      { q: "Does anything get posted on its own?", a: "No. Every document waits for a person to approve it before it reaches the books." },
    ],
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
    plainName: "Search your documents and past decisions, with the source shown",
    shortName: "Document search",
    family: "seeing-and-asking",
    layer: "ai",
    answer:
      "Every system we build starts as a model of entities, relationships and decisions — which is already the schema of a knowledge graph. We build retrieval (RAG) and knowledge-graph layers on top, so people and AI agents can ask questions of your records, documents and past decisions and get answers that cite where they came from.",
    forWhom:
      "Businesses whose know-how lives in documents, inboxes and a few senior people's heads, and who want an assistant that answers from their own data rather than the internet.",
    steps: [
      "Every system we build starts as a model of things, relationships and decisions, which is already the shape of a knowledge graph.",
      "Documents and records are indexed for search, and each passage keeps a link to its source.",
      "Answers quote the record or document they came from.",
      "Relationships the system works out for itself stay marked unconfirmed, and read-only, until a person confirms them.",
    ],
    questions: [
      { q: "Is this running anywhere?", a: "It runs on this site today: search and chat over every published page (Ctrl or Cmd + K), and the same index as an MCP server that AI agents use. In a client system it is built on the same records the business already runs on, so drawings, certificates and past quotations become searchable with their source." },
      { q: "How is it different from the AI assistant?", a: "The assistant answers questions about live records with fixed look-ups, such as this month's revenue. Search finds and quotes documents and past decisions, such as a drawing, a certificate or an old quotation, and shows where each came from." },
      { q: "Can AI agents use it?", a: "Yes. The same index is available as an MCP server, so an AI agent can search it and cite the page it found." },
    ],
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
  {
    slug: "sales-crm",
    name: "Sales CRM, enquiries and quotations",
    plainName: "Every enquiry followed up, every quotation findable",
    shortName: "Sales CRM",
    family: "selling-and-customers",
    layer: "operations",
    answer:
      "We build sales CRMs that hold every enquiry, follow-up and quotation against the customer, with the history moved in from old CRMs and Excel without guessing. Quotations go out as PDFs in your format; follow-ups are planned by the week; orders, payments and win/loss reports read the same records.",
    forWhom:
      "Sales teams whose history lives in an old CRM, an Excel tracker and people's phones, so nobody can see what a customer was quoted last year before they call.",
    steps: [
      "History from your old CRM and Excel moves in, checked row by row; anything doubtful waits for a person.",
      "Every enquiry has one stage, with its history, from first contact to order.",
      "Follow-ups are planned by the week, and quotations go out as PDFs in your own format.",
      "Orders, payments, win/loss and funnel reports all read the same records.",
    ],
    questions: [
      { q: "Can our old CRM and Excel history come with us?", a: "Yes. At a boiler manufacturer, all 20,167 old diary rows were recovered, the 2,221 quotations that matched exactly one customer were imported, and 303 doubtful ones were held for review instead of guessed." },
      { q: "Can it take leads from IndiaMART, JustDial and WhatsApp?", a: "Yes. Connections to IndiaMART, TradeIndia, JustDial, WhatsApp and website forms are built: each enquiry lands in Sales, assigned in turn, once you add your own key, and WhatsApp conversations sit in an inbox inside the CRM. Another lead source can be connected the same way." },
      { q: "Do quotations follow our format?", a: "Yes: your letterhead, your terms and conditions, GST lines and the amount in words, with every revision kept." },
    ],
    demos: [
      { client: "boiler-manufacturer", as: "Sign in as Sales: enquiries, quotations, sale orders and payments" },
    ],
    evidence: [
      { metric: "Old CRM diary rows recovered", value: "20,167 of 20,167, including 154 a broken export had shifted" },
      { metric: "Quotations imported", value: "2,221 matched to exactly one customer; 303 held for review, not guessed" },
      { metric: "Orders and payments from Excel", value: "1,006 orders and 1,905 payments, five financial years" },
      { metric: "Built for", value: "A boiler and pressure-vessel manufacturer; LS Technologies (electronics trading)" },
    ],
    proof: [
      { kind: "note", slug: "sales-history-moved-without-guessing" },
      { kind: "pattern", slug: "failures-flagged-not-lost" },
    ],
    links: [{ href: "/boq/check", label: "Free interior BOQ checker: paste a BOQ, get a GST quotation" }],
  },
  {
    slug: "customer-portal",
    name: "Customer portal and online quote requests",
    plainName: "Customers follow their order and ask for quotes, without calling you",
    shortName: "Customer portal",
    family: "selling-and-customers",
    layer: "operations",
    answer:
      "We give each customer a login to track their order status online, as plain-language stages worked out from the records each department already keeps. Customers approve drawings, upload their own, download QC certificates, packing lists and invoices, and request quotes from the product range. Running at a boiler manufacturer and at LS Technologies.",
    forWhom:
      "Manufacturers and traders whose sales team spends its day answering \"where is my order?\" on the phone, with the answer already sitting in the factory's own records.",
    steps: [
      "Sales switches on a login for each customer, who sets their own password from a one-time link.",
      "The customer sees each order as plain-language stages, worked out from what each department records.",
      "Drawings, certificates, packing lists and invoices appear as they're released; drawings can be approved or uploaded.",
      "Signed-in customers can browse the product range and request a quote, which reaches Sales as an enquiry.",
    ],
    questions: [
      { q: "Does someone have to update the portal?", a: "No. Each stage reads the department's own records, such as finished job card stages or dispatched packing lists, so nobody types a status for the customer." },
      { q: "What can't the customer see?", a: "Other customers' orders, notes between departments, internal costs and stock figures." },
      { q: "Does it work for traders as well as manufacturers?", a: "Yes. At LS Technologies, customers see each line of their purchase order as reserved, in procurement or dispatched, with a progress bar." },
    ],
    demos: [
      { client: "ls-technologies", as: "Sign in as Customer portal: order progress, no stock figures" },
    ],
    evidence: [
      { metric: "Stages a boiler customer sees", value: "9, from Order Received to Commissioning" },
      { metric: "Where each stage's status comes from", value: "The department's own records — never typed for the customer" },
      { metric: "What a customer can do", value: "Approve drawings, upload their own, download documents, request a quote" },
      { metric: "Built for", value: "A boiler and pressure-vessel manufacturer; LS Technologies (electronics trading)" },
    ],
    proof: [
      { kind: "note", slug: "customer-portal-one-order-every-department" },
      { kind: "pattern", slug: "compute-blockers-on-read" },
    ],
  },
  {
    slug: "supplier-portal",
    name: "Supplier RFQ portal and purchase orders",
    plainName: "Suppliers quote on a link and see their PO when you accept",
    shortName: "Supplier link",
    family: "buying-and-stores",
    layer: "operations",
    answer:
      "We send each supplier a private link per request for quotation, by WhatsApp or email. They enter rates with no account to create; quotes are compared side by side and the chosen one becomes the PO. The same link then shows the PO and records each dispatch with its LR number, so Stores knows what's on the way.",
    forWhom:
      "Manufacturers and traders who collect quotes as WhatsApp photos and PDFs, compare them in a spreadsheet, and call suppliers to ask whether the material has left.",
    steps: [
      "Procurement picks the lines and suppliers, and each supplier gets a private link by WhatsApp or email.",
      "The supplier enters rates and delivery dates on the link, with no account to create.",
      "Quotes are compared side by side, and choosing one drafts the purchase order.",
      "The same link then shows the PO and records each dispatch, so Stores sees what's on the way.",
    ],
    questions: [
      { q: "Do suppliers have to sign up?", a: "No. Each supplier gets a private link per request; they open it on their phone and quote." },
      { q: "Can suppliers see each other's rates?", a: "No. A supplier sees only their own link: their lines, their quote and, once it's issued, their PO." },
      { q: "Does this replace calling suppliers?", a: "No. Conversations stay on WhatsApp, email and phone. The link just makes rates and dispatch details arrive as data, against the right line." },
    ],
    demos: [
      { client: "boiler-manufacturer", as: "Sign in as Procurement: RFQs, supplier quotes and purchase orders" },
    ],
    evidence: [
      { metric: "What a supplier needs", value: "The link — no login, no account, no app" },
      { metric: "Quote to PO", value: "Choosing a quote drafts the purchase order" },
      { metric: "Supplier dispatch record", value: "Lines and quantities, transporter, vehicle, LR number, up to 3 photos or PDFs" },
      { metric: "Built for", value: "A boiler and pressure-vessel manufacturer" },
    ],
    proof: [{ kind: "note", slug: "suppliers-quote-on-a-link" }],
  },
  {
    slug: "inventory-and-reservations",
    name: "QR inventory, multi-store stock and order reservations",
    plainName: "Stock you can scan, set aside for each customer order",
    shortName: "QR inventory",
    family: "buying-and-stores",
    layer: "operations",
    answer:
      "We build inventory systems that track each physical unit — a reel, a box, a plate — with its own QR label, moved by scanning from a phone across more than one store. Staff entries wait for a manager's approval, stock is reserved against each customer order line, and the shortfall becomes a procurement order.",
    forWhom:
      "Traders and distributors who know roughly what's in stock, but not which reel, box or shelf, or which of it is already promised to a customer.",
    steps: [
      "Each reel or box gets its own number and QR label the moment it's received.",
      "Stock moves by scanning with a phone or scanner: in, out, and between stores.",
      "Staff entries wait for a manager's approval; managers' own entries go through at once.",
      "Stock is reserved against customer order lines, and the shortfall becomes a procurement order.",
    ],
    questions: [
      { q: "Why track each reel instead of a quantity?", a: "Customers order quantities, but the store ships reels of different sizes. Knowing each reel tells you which ones can fill an order." },
      { q: "Can we hold stock in more than one place?", a: "Yes. LS Technologies runs two stores, one at a partner's site, and every move between them is logged reel by reel." },
      { q: "Can stock promised to one customer go to another?", a: "Not without a manager's override. A reserved reel shows as reserved the moment it's scanned." },
    ],
    demos: [
      { client: "ls-technologies", as: "Sign in as Store staff to scan reels; as Owner to see reservations" },
    ],
    evidence: [
      { metric: "Live reels moved to a two-store model", value: "5,256, none lost" },
      { metric: "How stock moves", value: "Scan into a cart with a phone camera or scanner" },
      { metric: "Reservations", value: "Whole reels per customer PO line, oldest first; shipping one elsewhere needs a manager's override" },
      { metric: "Built for", value: "LS Technologies (electronics trading)" },
    ],
    proof: [
      { kind: "note", slug: "reels-boxes-and-two-stores" },
      { kind: "pattern", slug: "derive-balances-dont-store-them" },
    ],
  },
  {
    slug: "material-traceability",
    name: "Material traceability, cutting and remnant management",
    plainName: "Every plate, cut and offcut accounted for",
    shortName: "Offcuts and traceability",
    family: "making-and-delivering",
    layer: "operations",
    answer:
      "We track cut material piece by piece: each plate or section carries its dimensions, every cut records what was used and what usable remnant was kept, weights are derived from geometry, remnants go back into stock and are matched to the next job, and each used piece is costed by weight.",
    forWhom:
      "Fabricators and manufacturers who re-buy plate they already have as offcuts, because nobody can find a remnant of the right size when the next job needs it.",
    steps: [
      "Each plate or section is stored as a piece with its own dimensions.",
      "At each cut, the operator records what was used and the usable remnant; weights are worked out from the geometry.",
      "Remnants go back into stock and are matched to waiting bill-of-materials lines before anything is bought.",
      "Each used piece is costed by its share of the source piece's weight.",
    ],
    questions: [
      { q: "Do operators weigh every piece?", a: "No. Weight comes from dimensions and density, so used, remnant and scrap always add back up to the source." },
      { q: "Can offcuts be used again instead of buying new plate?", a: "Yes. Each offcut is matched against BOM lines still waiting for material, least waste first. Only the shortfall goes to Procurement to buy." },
      { q: "Can a part be traced back to its plate?", a: "Yes. Every cut piece is linked to the piece it was cut from." },
    ],
    demos: [
      { client: "boiler-manufacturer", as: "Sign in as Production for cutting, or Stores for remnants" },
    ],
    evidence: [
      { metric: "Live cut test", value: "157.00 kg → 127.17 used + 15.70 remnant + 14.13 scrap" },
      { metric: "Weights typed by the operator", value: "None — derived from dimensions and density" },
      { metric: "Built for", value: "A boiler and pressure-vessel manufacturer" },
    ],
    proof: [
      { kind: "note", slug: "plate-remnants-back-into-stock" },
      { kind: "pattern", slug: "derive-balances-dont-store-them" },
    ],
  },
  {
    slug: "bom-from-excel",
    name: "BOM import and multi-level bill of materials",
    plainName: "A BOM built from your own Excel sheets that learns your categories",
    shortName: "BOM from Excel",
    family: "making-and-delivering",
    layer: "operations",
    answer:
      "We turn the bill-of-materials sheets a manufacturer already keeps in Excel into a structured, multi-level BOM: lines are categorised against the item catalogue, typos are suggested only for narrowly trusted shapes, and one confirmed correction is remembered for every later import. Releases are frozen as snapshots.",
    forWhom:
      "Manufacturers whose BOMs live in Excel files that every department copies and edits, so nobody is sure which version Procurement is buying from.",
    steps: [
      "Upload the BOM sheet you already keep in Excel.",
      "Lines are matched to your item catalogue and grouped into systems and sub-assemblies.",
      "Typos are suggested only in trusted shapes, and one confirmed correction is remembered.",
      "A released BOM is frozen as a snapshot that Procurement and Stores work from.",
    ],
    questions: [
      { q: "Do we have to retype our BOMs?", a: "No. The system reads the sheets you already have; six real client BOM files have gone through it." },
      { q: "What happens to a typo like PALTE?", a: "A correction is suggested only for a one-character slip or two swapped letters, and remembered after one confirmation. A looser rule was rejected because it matched PALTE to VALVE as readily as to PLATE." },
      { q: "Which version is Procurement buying from?", a: "The released one. Each release is frozen as a snapshot, so later edits don't change what was sent out to buy." },
    ],
    demos: [
      { client: "boiler-manufacturer", as: "Sign in as Engineering: BOM tree, item master and release" },
    ],
    evidence: [
      { metric: "Real client BOM files imported through the UI", value: "6" },
      { metric: "Confirmations needed to learn a correction", value: "1" },
      { metric: "Built for", value: "A boiler and pressure-vessel manufacturer" },
    ],
    proof: [{ kind: "pattern", slug: "one-confirmation-teaches-the-system" }],
  },
  {
    slug: "receivables-from-tally",
    name: "Receivables, payables and financial position from TallyPrime",
    plainName: "Who owes you and who you owe, always current, straight from Tally",
    shortName: "Receivables",
    family: "money-and-people",
    layer: "records",
    answer:
      "We copy the accounting position out of TallyPrime every few minutes and show it in the business system: receivables with ageing, payables, sales and purchase registers, cash and bank, and stock. Nobody has to open Tally to see it, and overdue bills can become payment-reminder tasks.",
    forWhom:
      "Owners and sales teams who need to know who owes what before they call a customer, but can only find out by asking the accountant to open Tally.",
    steps: [
      "The agent beside TallyPrime copies the accounting position out every few minutes.",
      "Receivables with ageing, payables, sales and purchase registers, cash, bank and stock appear in your business system.",
      "Overdue bills can become payment-reminder tasks for the team.",
      "If the Tally PC is off, the screens show the last sync and catch up when it's back.",
    ],
    questions: [
      { q: "Does anyone need to open Tally?", a: "No. Sales sees who owes what in the business system, and Tally stays the books." },
      { q: "How up to date is it?", a: "Vouchers and outstandings sync every 15 minutes and masters daily, as long as the Tally PC is on and logged in." },
      { q: "Does it change our books?", a: "No. This view only reads from Tally. Posting into Tally is a separate step that a person approves." },
    ],
    evidence: [
      { metric: "Voucher and outstanding sync", value: "15 minutes" },
      { metric: "Views", value: "Receivables with ageing, payables, sales and purchase registers, cash and bank, stock" },
      { metric: "Built for", value: "LS Technologies (electronics trading)" },
    ],
    proof: [
      { kind: "note", slug: "connecting-tallyprime-four-ways" },
      { kind: "pattern", slug: "local-agent-cloud-db" },
      { kind: "pattern", slug: "reconcile-against-source-of-truth" },
    ],
  },
  {
    slug: "daily-wage-payroll",
    name: "Attendance, work logs and daily-wage payroll",
    plainName: "Daily-wage attendance and payroll without a register",
    shortName: "Daily-wage payroll",
    family: "money-and-people",
    layer: "operations",
    answer:
      "We build attendance and payroll for workshops and studios that pay by the day: one-tap attendance, a work log of who worked on which order, advances recorded as they're given, and payroll computed from days worked times the rate, minus advances, so the register and the payout can't disagree.",
    forWhom:
      "Workshops, contractors and design studios that keep attendance in a notebook and work out wages and advances by hand at the end of the month.",
    steps: [
      "Mark attendance with one tap: present, half day or absent.",
      "Log who worked on which order, and on which part.",
      "Record advances as they're given.",
      "Payroll is worked out as days worked times the rate, minus advances.",
    ],
    questions: [
      { q: "Do we still need the attendance register?", a: "No. Attendance, work logs and advances are recorded as they happen, and payroll is worked out from them." },
      { q: "Can it calculate daily wages for contract labour and karigars?", a: "Yes. Karigars, helpers and contract labour paid by the day each get a daily rate, and their wages are calculated from attendance: days present, a half day counting as half, times the rate, minus advances. It doesn't calculate PF or ESI." },
      { q: "Mazdoor ki hajri aur pagar ka hisaab ho sakta hai?", a: "Yes. Hajri (attendance) is marked with one tap each day, and pagar (wages) is worked out from it: days present times the daily rate, minus any advance already given." },
      { q: "How are advances recovered?", a: "They're subtracted in payroll automatically, so nobody has to remember them at month end." },
      { q: "Does it handle salaried staff too?", a: "Yes. Each person is set up on either a salary or a daily wage." },
    ],
    demos: [
      { client: "savistar-saag", as: "People: attendance, work logs, advances and last month's payroll" },
    ],
    evidence: [
      { metric: "Payroll", value: "Computed: days × rate − advances, never typed" },
      { metric: "Work log", value: "Per order: who worked on which part, when" },
      { metric: "Built for", value: "Savistar & Saag (interior design and furniture)" },
    ],
    proof: [{ kind: "pattern", slug: "derive-balances-dont-store-them" }],
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

export const serviceUrl = (s: Pick<Service, "slug">) => `/services/${s.slug}`;
export const familyUrl = (f: Pick<Family, "slug">) => `/services/${f.slug}`;
export const servicesIn = (f: Pick<Family, "slug">) => services.filter((s) => s.family === f.slug);

// Families and services share /services/[slug], so a slug may be used once,
// and a family with no services would be an empty page. Fails the build.
{
  const seen = new Set<string>();
  for (const { slug } of [...families, ...services]) {
    if (seen.has(slug)) throw new Error(`services.ts: slug "${slug}" is used twice`);
    seen.add(slug);
  }
  for (const f of families) {
    if (servicesIn(f).length === 0) throw new Error(`services.ts: family "${f.slug}" has no services`);
  }
}
