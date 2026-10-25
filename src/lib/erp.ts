// The ERP requirements library: one testable requirement per line, for Indian manufacturers and
// traders writing down what a system must do before they buy or build one. It feeds /erp/requirements,
// the checker, the Excel/CSV/JSON downloads, llms.txt, knowledge.json and the chatbot.
//
// What makes a line worth publishing (the rule for adding one):
//   - `test` is something a buyer can make any vendor do in a demo, and check before go-live.
//   - `benchmark` is used only for a figure Ahrom Labs has already published from a live system
//     (scripts/erp.check.ts fails if the figure isn't on the site).
//   - `statutory.quote` is word for word from the official text in ERP_SOURCES; the check fails otherwise.
//     A rule that only exists in a table we can't quote cleanly is `cited` instead and checked by hand.
//   - `service`, `pattern`, `note`, `term` and `demo` point at things that exist; the check fails if not.
//   - Where Ahrom Labs hasn't built something, the line says so in `built` rather than implying it.

export const ERP_PUBLISHED = "2026-10-25";
export const ERP_CHECKED = "2026-10-25"; // statutory texts re-read 25 Oct 2026
export const ERP_VERSION = "1.0";

export type Industry = "manufacturing" | "trading" | "projects";
export type Role = "owner" | "accounts" | "operations" | "sales";
export type Priority = "must" | "should" | "could";

export const INDUSTRY_LABEL: Record<Industry, string> = {
  manufacturing: "Manufacturing",
  trading: "Trading and distribution",
  projects: "Project businesses (interiors, fit-out)",
};
export const ROLE_LABEL: Record<Role, string> = {
  owner: "Owner",
  accounts: "Accounts",
  operations: "Plant and stores",
  sales: "Sales",
};

export type Demo = { client: "boiler-manufacturer" | "ls-technologies" | "savistar-saag"; as: string };
export const DEMO_URL: Record<Demo["client"], string> = {
  "boiler-manufacturer": "https://boiler-erp.ahromlabs.com/demo",
  "ls-technologies": "https://electronics-erp.ahromlabs.com/demo",
  "savistar-saag": "https://interiors-erp.ahromlabs.com/demo",
};

// Official texts, kept outside the repo in ERP_SOURCES (see scripts/erp.check.ts). `url` is where a
// reader finds the same text.
export const ERP_DOCS = {
  "mca-audit-trail-2021": {
    file: "mca-audit-trail-2021.txt",
    title: "Companies (Accounts) Amendment Rules, 2021 (G.S.R. 205(E), 24 March 2021)",
    publisher: "Ministry of Corporate Affairs, Gazette of India",
    url: "https://egazette.gov.in/WriteReadData/2021/226081.pdf",
  },
  "mca-audit-trail-2022": {
    file: "mca-audit-trail-2022.txt",
    title: "Companies (Accounts) Second Amendment Rules, 2022 (G.S.R. 235(E), 31 March 2022)",
    publisher: "Ministry of Corporate Affairs, Gazette of India",
    url: "https://egazette.gov.in/WriteReadData/2022/234733.pdf",
  },
  "cbic-10-2023": {
    file: "cbic-10-2023.txt",
    title: "Notification No. 10/2023–Central Tax (10 May 2023), amending Notification No. 13/2020–Central Tax",
    publisher: "Central Board of Indirect Taxes and Customs (copy hosted by the GST Council)",
    url: "https://gstcouncil.gov.in/sites/default/files/2024-05/10ct_eng.pdf",
  },
  "gstn-30-day": {
    file: "gstn-advisory-30day.txt",
    title: "Advisory: Time limit for reporting e-invoice on the IRP portal, lowering of threshold to AATO 10 crores and above (5 Nov 2024)",
    publisher: "GSTN (Goods and Services Tax Network)",
    url: "https://www.mahagst.gov.in/public/uploads/gstnadvisory/1760531580_293%20Advisory%20Time%20Limit%20for%20Reporting%20e%20Invoice%20on%20the%20IRP%20Portal%20%20Lowering%20of%20Threshold%20to%20AATO%2010%20Crores%20and%20Above.pdf",
  },
  "cgst-rule-138": {
    file: "cgst-12-2018-rule138.txt",
    title: "Notification No. 12/2018–Central Tax (7 March 2018), substituting rule 138 of the CGST Rules, 2017",
    publisher: "Central Board of Indirect Taxes and Customs (copy hosted by the GST Council)",
    url: "https://gstcouncil.gov.in/sites/default/files/2024-05/notification-12-2018-central_tax-english.pdf",
  },
  "msmed-act-2006": {
    file: "msmed-act-2006.txt",
    title: "Micro, Small and Medium Enterprises Development Act, 2006, sections 15 and 16",
    publisher: "Gazette of India (copy hosted by the Ministry of MSME)",
    url: "https://samadhaan.msme.gov.in/WriteReadData/DocumentFile/MSMED2006act.pdf",
  },
  "it-act-2025": {
    file: "it-act-2025.txt",
    title: "Income-tax Act, 2025 (30 of 2025), in force from 1 April 2026",
    publisher: "Ministry of Law and Justice, Gazette of India",
    url: "https://egazette.gov.in/WriteReadData/2025/265620.pdf",
  },
  "dpdp-act-2023": {
    file: "dpdp-act-2023.txt",
    title: "Digital Personal Data Protection Act, 2023, section 8",
    publisher: "Ministry of Law and Justice, Gazette of India",
    url: "https://egazette.gov.in/WriteReadData/2023/248045.pdf",
  },
  "dpdp-rules-2025": {
    file: "dpdp-rules-2025.txt",
    title: "Digital Personal Data Protection Rules, 2025 (G.S.R. 846(E), 13 November 2025)",
    publisher: "Ministry of Electronics and Information Technology, Gazette of India",
    url: "https://www.meity.gov.in/static/uploads/2025/11/53450e6e5dc0bfa85ebd78686cadad39.pdf",
  },
} as const;
export type ErpDoc = keyof typeof ERP_DOCS;

export type Statutory = {
  law: string; // the provision, as a reader would cite it
  doc: ErpDoc;
  quote?: string; // word for word from the doc; omit only when `cited`
  cited?: string; // why it is cited, not quoted (e.g. a table split across columns)
  effective: string;
  appliesWhen: string; // plain words: who it applies to
};

// Conditions the checker uses to switch a line on. Turnover is the aggregate annual turnover in crore.
export type When = { turnoverAtLeast?: number; company?: true; tally?: "keep" | "replace" };

export type Dept = { slug: string; name: string; question: string; answer: string };

export const departments: Dept[] = [
  { slug: "sales", name: "Sales and CRM", question: "What should an ERP do for sales?", answer: "Hold every enquiry, quotation and order in one place with its history, so follow-ups don't depend on someone's memory and every report reads the same records." },
  { slug: "purchase", name: "Purchase", question: "What should an ERP do for purchasing?", answer: "Turn what production and stores need into requests for quotation, compare supplier quotes side by side, and raise the purchase order from the chosen one." },
  { slug: "stores", name: "Stores and inventory", question: "How detailed should ERP stock tracking be?", answer: "Down to the physical unit you actually pick and ship, a reel, a box, a plate, in each store, with stock promised to an order set aside so it can't be sold twice." },
  { slug: "production", name: "Production and BOM", question: "What does a manufacturer need from an ERP on the shop floor?", answer: "A bill of materials the rest of the system works from, cutting and consumption recorded as it happens, and costs that come from what was actually used." },
  { slug: "quality", name: "Quality and traceability", question: "How should an ERP handle test certificates and traceability?", answer: "Every certificate linked to the material and the product it went into, with links that end up in statutory paperwork confirmed by a person." },
  { slug: "dispatch", name: "Dispatch and logistics", question: "What should an ERP do at dispatch?", answer: "Release only what is ready, carry the documents the goods must travel with, and let the customer see where their order is." },
  { slug: "accounts", name: "Accounts and GST", question: "Does an Indian ERP need to do the accounting itself?", answer: "Either it keeps the books, with GST, TDS and an audit trail the law requires, or it posts cleanly into Tally. What it must not do is make your accountant type everything twice." },
  { slug: "payroll", name: "Payroll and people", question: "What should an ERP do for payroll?", answer: "Work pay out from attendance, rates and advances, never type it, and keep each person's data visible only to those who need it." },
  { slug: "portals", name: "Customer and supplier portals", question: "Do customers and suppliers need access to the ERP?", answer: "A limited view: customers follow their own orders and documents, suppliers quote and record dispatch on a link, and neither ever sees your stock or prices." },
  { slug: "reporting", name: "Reporting and AI", question: "What should ERP reports and AI be able to do?", answer: "Answer from the same records the business runs on, show where each number came from, flag what looks wrong, and never invent a figure." },
  { slug: "integrations", name: "Integrations", question: "Which systems should an Indian ERP connect to?", answer: "Whatever you can't replace: TallyPrime, the GST portals, your bank statements and the Excel sheets people already keep." },
  { slug: "nonfunctional", name: "Reliability, access and support", question: "What do ERP buyers forget to ask for?", answer: "What happens when the internet drops, who can see what, how you get your data out, and how fast someone answers when it breaks." },
  { slug: "contract", name: "Contract and ownership", question: "What should an ERP contract settle before the build?", answer: "Who owns the code, what the licence covers and for how long, how changes are priced, and how your data leaves with you." },
];

export type Requirement = {
  id: string; // dept.slug-ish, stable once published
  dept: string;
  question: string; // the buyer's question this line answers
  text: string; // one testable sentence a buyer can paste into an RFP
  why: string;
  test: string; // what to make the vendor show; doubles as the go-live test
  priority: Priority;
  appliesTo: Industry[];
  roles: Role[];
  when?: When;
  service?: string; // services.ts slug
  pattern?: string;
  note?: string;
  term?: string; // content/terms slug
  demo?: Demo;
  benchmark?: string; // a published production figure, word for word from the site
  failure?: string; // what goes wrong without it, from Ahrom Labs' own systems
  built?: "live" | "built-not-live" | "not-built"; // Ahrom Labs' own status, stated honestly
  statutory?: Statutory;
};

const ALL: Industry[] = ["manufacturing", "trading", "projects"];
const MAKE: Industry[] = ["manufacturing"];
const GOODS: Industry[] = ["manufacturing", "trading"];

export const requirements: Requirement[] = [
  // ── Sales and CRM ──────────────────────────────────────────────────────────
  {
    id: "sales.single-history", dept: "sales",
    question: "Can every enquiry's history be seen in one place?",
    text: "Every enquiry has one current stage and a dated history from first contact to order, visible to everyone who works on it.",
    why: "Follow-ups that live in one person's phone leave with that person.",
    test: "Open an enquiry from last quarter and show every call, quotation and stage change on it, with who did each and when.",
    priority: "must", appliesTo: ALL, roles: ["sales", "owner"],
    service: "sales-crm", demo: { client: "boiler-manufacturer", as: "Sales" },
  },
  {
    id: "sales.history-migration", dept: "sales",
    question: "What happens to the sales history in our old CRM and Excel?",
    text: "History from the old CRM and spreadsheets is imported and checked row by row; a row that can't be matched to exactly one customer is held for a person, not guessed.",
    why: "A migration that guesses silently attaches quotations to the wrong customer, and nobody trusts the reports after.",
    test: "Ask how many rows of your old data would be imported, how many held for review, and how a held row is resolved.",
    priority: "should", appliesTo: ALL, roles: ["sales", "owner"],
    service: "sales-crm", note: "sales-history-moved-without-guessing", term: "data-migration",
    benchmark: "20,167 of 20,167, including 154 a broken export had shifted",
    failure: "A broken export shifted 154 diary rows; a row-by-row check caught them instead of importing them against the wrong dates.",
  },
  {
    id: "sales.quotation-format", dept: "sales",
    question: "Can quotations go out in our own format?",
    text: "Quotations are generated as PDFs in the company's own format, with revisions numbered and kept, from the same items and rates the order will use.",
    why: "Retyping a quotation into an order is where rates and quantities drift.",
    test: "Revise a quotation twice and show all three versions, then convert the accepted one into an order without retyping a line.",
    priority: "must", appliesTo: ALL, roles: ["sales"],
    service: "sales-crm", demo: { client: "boiler-manufacturer", as: "Sales" },
  },
  {
    id: "sales.followups", dept: "sales",
    question: "How does the team know which follow-ups are due?",
    text: "Follow-ups are planned with a date and an owner, and overdue ones are listed for each salesperson and their manager.",
    why: "Enquiries are lost to silence more often than to price.",
    test: "Show this week's due and overdue follow-ups for one salesperson, as their manager sees them.",
    priority: "should", appliesTo: ALL, roles: ["sales", "owner"],
    service: "sales-crm",
  },
  {
    id: "sales.funnel-from-records", dept: "sales",
    question: "Do sales reports come from the same records as the work?",
    text: "Win/loss, funnel, order and payment reports are computed from the enquiry, order and payment records themselves, not from a separate spreadsheet.",
    why: "Two sources of the same number always disagree eventually.",
    test: "Pick one figure on the funnel report and drill down to the records that make it up.",
    priority: "should", appliesTo: ALL, roles: ["owner", "sales"],
    service: "sales-crm", pattern: "derive-balances-dont-store-them",
  },
  {
    id: "sales.multi-company", dept: "sales",
    question: "Can one system invoice for two companies?",
    text: "Where the group has more than one company, each quotation and invoice is issued under the company chosen for it, with that company's letterhead, logo and GSTIN, from one shared customer list.",
    why: "Sister companies running separate software end up with two customer lists and two versions of the truth.",
    test: "Raise one invoice for each company to the same customer and show both letterheads and GSTINs.",
    priority: "could", appliesTo: ALL, roles: ["accounts", "owner"],
    service: "multi-company-finance", note: "two-companies-one-book",
    demo: { client: "savistar-saag", as: "Office" },
  },

  // ── Purchase ───────────────────────────────────────────────────────────────
  {
    id: "purchase.need-to-request", dept: "purchase",
    question: "How does a shortage become a purchase?",
    text: "Shortfalls against orders and bills of materials become purchase requests automatically, after stock and usable remnants are counted.",
    why: "Buying what is already on the shelf is the most common, least visible waste.",
    test: "Release an order that needs more than is in stock and show the purchase request it creates, net of what's available.",
    priority: "must", appliesTo: GOODS, roles: ["operations"],
    service: "inventory-and-reservations",
  },
  {
    id: "purchase.rfq-link", dept: "purchase",
    question: "Can suppliers quote without being given a login?",
    text: "Each supplier receives a private link by email or WhatsApp to enter rates and delivery dates, with no account to create.",
    why: "Suppliers won't sign up to every customer's portal; rates then arrive by phone and get lost.",
    test: "Send an RFQ to two suppliers, enter their rates on the links, and compare the quotes side by side.",
    priority: "should", appliesTo: GOODS, roles: ["operations"],
    service: "supplier-portal", note: "suppliers-quote-on-a-link",
    benchmark: "The link — no login, no account, no app",
    demo: { client: "boiler-manufacturer", as: "Procurement" },
  },
  {
    id: "purchase.quote-to-po", dept: "purchase",
    question: "Does choosing a supplier quote create the purchase order?",
    text: "Choosing a supplier's quote drafts the purchase order with the quoted rates and dates, without retyping.",
    why: "Rates retyped from a quote into a PO are where overpayments start.",
    test: "Accept one supplier quote and open the purchase order it drafts.",
    priority: "should", appliesTo: GOODS, roles: ["operations"],
    service: "supplier-portal", benchmark: "Choosing a quote drafts the purchase order",
  },
  {
    id: "purchase.three-way-match", dept: "purchase",
    question: "Is each supplier bill checked against the order and what was received?",
    text: "Every supplier bill is matched against its purchase order and the goods receipt before it is approved for payment; differences in quantity or rate are flagged.",
    why: "Paying for what was ordered rather than what arrived is how short supplies get paid in full.",
    test: "Receive less than was ordered, enter the supplier's bill for the full quantity, and show the mismatch flagged before approval.",
    priority: "must", appliesTo: GOODS, roles: ["accounts", "operations"],
    term: "three-way-match",
  },
  {
    id: "purchase.rate-check", dept: "purchase",
    question: "Are vendor and freight charges checked against agreed rates?",
    text: "Every vendor and freight charge is compared with its agreed reference rate, and anything above it is flagged for a person.",
    why: "Small overcharges on repeat trips add up and are rarely caught by eye.",
    test: "Enter a freight trip above the agreed rate and show where it is flagged and who sees it.",
    priority: "should", appliesTo: ALL, roles: ["accounts", "owner"],
    service: "operational-intelligence", pattern: "reference-rate-anomaly-detection",
    demo: { client: "savistar-saag", as: "Vendors (one freight trip is overcharged on purpose)" },
  },
  {
    id: "purchase.msme-due-dates", dept: "purchase",
    question: "Does the ERP track payments due to MSME suppliers?",
    text: "Suppliers registered as micro or small enterprises are marked, and each of their bills shows its due date under the MSMED Act, with overdue bills listed before the year closes.",
    why: "A payment to a micro or small supplier made after the legal time limit is not deductible as an expense in the year it was incurred.",
    test: "Mark a supplier as a micro enterprise, enter a bill, and show its due date and the list of MSME bills nearing or past it.",
    priority: "must", appliesTo: ALL, roles: ["accounts"],
    term: "msme-payment-rule",
    statutory: {
      law: "MSMED Act, 2006, section 15 (with Income-tax Act, 2025, section 37(2)(g))",
      doc: "msmed-act-2006",
      quote: "Provided that in no case the period agreed upon between the supplier and the buyer in writing shall exceed forty-five days from the day of acceptance or the day of deemed acceptance",
      effective: "Payment limit since 2006; the tax link since the Finance Act, 2023, carried into the Income-tax Act, 2025",
      appliesWhen: "Any buyer of goods or services from a micro or small enterprise",
    },
  },
  {
    id: "purchase.msme-tax-deduction", dept: "purchase",
    question: "Why does the MSME due date matter for tax?",
    text: "Year-end reports list MSME amounts paid after the section 15 time limit separately, so the accountant can treat them correctly in the tax computation.",
    why: "The Income-tax Act, 2025 allows that deduction only on actual payment, with none of the usual grace until the return due date.",
    test: "Show the year-end list of MSME bills paid late, with bill date, acceptance date and payment date.",
    priority: "should", appliesTo: ALL, roles: ["accounts"],
    term: "msme-payment-rule",
    statutory: {
      law: "Income-tax Act, 2025, section 37(2)(g) (formerly section 43B(h) of the 1961 Act)",
      doc: "it-act-2025",
      quote: "amount payable by the assessee to a micro or small enterprise beyond the time limit specified in section 15 of the Micro, Small and Medium Enterprises Development Act, 2006",
      effective: "From 1 April 2026 under the 2025 Act",
      appliesWhen: "A business claiming the expense; confirm with your CA how it applies to you",
    },
  },

  // ── Stores and inventory ───────────────────────────────────────────────────
  {
    id: "stores.unit-level", dept: "stores",
    question: "Should stock be tracked by quantity or by each physical unit?",
    text: "Stock is tracked by each physical unit that is picked and shipped (a reel, a box, a plate), each with its own number and label, not only as a total quantity.",
    why: "Customers order quantities, but stores ship units of different sizes; a total can't tell you which unit fills an order.",
    test: "Receive two reels of the same part with different quantities and show each as its own unit with its own label.",
    priority: "must", appliesTo: GOODS, roles: ["operations"],
    service: "inventory-and-reservations", note: "reels-boxes-and-two-stores",
    demo: { client: "ls-technologies", as: "Store staff" },
  },
  {
    id: "stores.scan-moves", dept: "stores",
    question: "How should stock movements be recorded?",
    text: "Stock moves in, out and between stores by scanning with a phone camera or scanner, not by typing codes.",
    why: "Typed codes are where most stock errors begin.",
    test: "Move three units between stores by scanning them with a phone, then show the move in both stores' records.",
    priority: "should", appliesTo: GOODS, roles: ["operations"],
    service: "inventory-and-reservations",
    benchmark: "Scan into a cart with a phone camera or scanner",
  },
  {
    id: "stores.multi-store", dept: "stores",
    question: "Can we hold stock in more than one place?",
    text: "Stock is held in more than one store or site, including a partner's, and every move between them is logged unit by unit.",
    why: "Stock that leaves your building leaves your records if the system has only one location.",
    test: "Show stock for one item split across two stores, and the log of the last move between them.",
    priority: "should", appliesTo: GOODS, roles: ["operations", "owner"],
    service: "inventory-and-reservations", note: "reels-boxes-and-two-stores",
    benchmark: "5,256, none lost",
  },
  {
    id: "stores.reservations", dept: "stores",
    question: "Can stock promised to one customer be sold to another?",
    text: "Stock is reserved against each customer order line; a reserved unit shows as reserved when scanned, and shipping it elsewhere needs a manager's override.",
    why: "Without reservations the same reel is promised twice and one customer finds out on delivery day.",
    test: "Reserve a unit for one order, then try to ship it on another and show the block and the override.",
    priority: "must", appliesTo: GOODS, roles: ["operations", "sales"],
    service: "inventory-and-reservations", term: "stock-reservation",
    benchmark: "Whole reels per customer PO line, oldest first; shipping one elsewhere needs a manager's override",
    demo: { client: "ls-technologies", as: "Owner" },
  },
  {
    id: "stores.approval", dept: "stores",
    question: "Should staff stock entries be approved?",
    text: "Stock entries made by staff wait for a manager's approval before they change stock; a manager's own entries go through at once.",
    why: "An unchecked entry changes the stock everyone else relies on.",
    test: "Enter a receipt as store staff, show it pending, approve it as a manager, and show the stock change only then.",
    priority: "should", appliesTo: GOODS, roles: ["operations"],
    service: "inventory-and-reservations",
  },
  {
    id: "stores.balances-derived", dept: "stores",
    question: "How is the stock balance kept right?",
    text: "Stock balances are worked out from the movements themselves, not kept as a separate running total that can drift.",
    why: "A stored total that is edited directly stops matching its movements, and nobody can say which is right.",
    test: "Show the movements behind one item's balance and that they add up to it exactly.",
    priority: "must", appliesTo: GOODS, roles: ["operations", "accounts"],
    pattern: "derive-balances-dont-store-them",
  },

  // ── Production and BOM ─────────────────────────────────────────────────────
  {
    id: "production.bom-import", dept: "production",
    question: "Can our existing Excel BOMs be imported?",
    text: "Bills of materials kept in Excel are imported as they are, matched to the item master and grouped into assemblies; a likely typo is suggested, never silently corrected.",
    why: "Re-entering every BOM by hand delays go-live by months and introduces its own errors.",
    test: "Import one of your real BOM sheets and show how each unmatched line is handled.",
    priority: "must", appliesTo: MAKE, roles: ["operations"],
    service: "bom-from-excel", pattern: "one-confirmation-teaches-the-system",
    benchmark: "6", demo: { client: "boiler-manufacturer", as: "Engineering" },
  },
  {
    id: "production.bom-release", dept: "production",
    question: "How do purchase and stores know which BOM to work from?",
    text: "A released bill of materials is frozen as a version that purchase and stores work from; later edits make a new version.",
    why: "When the BOM changes under people's feet, materials are bought against the wrong revision.",
    test: "Release a BOM, edit a line, and show the released version unchanged and the edit as a new version.",
    priority: "must", appliesTo: MAKE, roles: ["operations"],
    service: "bom-from-excel",
  },
  {
    id: "production.cutting-remnants", dept: "production",
    question: "Can offcuts go back into stock?",
    text: "At each cut, what was used and the usable remnant are recorded; remnant weights come from dimensions and density, and remnants return to stock to be matched to waiting BOM lines before anything is bought.",
    why: "Remnants left off the books are bought again.",
    test: "Cut a plate, record the remnant, and show it back in stock with its weight and offered against a waiting BOM line.",
    priority: "should", appliesTo: MAKE, roles: ["operations", "accounts"],
    service: "material-traceability", note: "plate-remnants-back-into-stock",
    benchmark: "157.00 kg → 127.17 used + 15.70 remnant + 14.13 scrap",
    demo: { client: "boiler-manufacturer", as: "Production" },
  },
  {
    id: "production.costing-from-use", dept: "production",
    question: "Are job costs worked out from what was actually used?",
    text: "Each job is costed from the material and labour actually recorded against it, with each used piece costed by its share of the source piece.",
    why: "Costs estimated after the fact hide which jobs lose money.",
    test: "Show one finished job's cost, and the issues and work logs behind each line of it.",
    priority: "should", appliesTo: ["manufacturing", "projects"], roles: ["owner", "accounts"],
    service: "material-traceability",
  },
  {
    id: "production.blockers", dept: "production",
    question: "Can we see what each job is waiting on?",
    text: "For each job or milestone the system shows what it is waiting on (material, drawing, approval, payment), worked out fresh each time it is opened.",
    why: "A status field typed by hand is out of date the day after it's typed.",
    test: "Open a delayed job and show what it is waiting on, then clear the blocker and show the status change by itself.",
    priority: "should", appliesTo: ["manufacturing", "projects"], roles: ["owner", "operations"],
    service: "operational-intelligence", pattern: "compute-blockers-on-read",
  },

  // ── Quality and traceability ───────────────────────────────────────────────
  {
    id: "quality.certificate-bank", dept: "quality",
    question: "How should material test certificates be stored?",
    text: "Material test certificates are kept once, in a bank, and linked to each piece of material and each product they apply to.",
    why: "A certificate filed per order is copied, misfiled and hard to find at inspection.",
    test: "Show one certificate and every product it has been used for.",
    priority: "must", appliesTo: MAKE, roles: ["operations"],
    service: "material-traceability", term: "material-traceability",
  },
  {
    id: "quality.confirmed-links", dept: "quality",
    question: "Can the system link certificates to parts automatically?",
    text: "The system may suggest which certificate belongs to which part, but a link that ends up in statutory paperwork is made only after a person confirms it.",
    why: "A wrong automatic link in a statutory folder is a compliance failure, not a typo.",
    test: "Show a suggested certificate link waiting for confirmation, and that it doesn't appear in any document until confirmed.",
    priority: "must", appliesTo: MAKE, roles: ["operations"],
    note: "same-confidence-different-autonomy", pattern: "human-confirmed-extraction",
  },
  {
    id: "quality.statutory-folder", dept: "quality",
    question: "Can the ERP assemble statutory quality documents?",
    text: "Statutory quality documents (for example a boiler's IBR folder) are assembled from the records already in the system, not compiled by hand.",
    why: "Compiling a folder by hand from files takes days and repeats errors.",
    test: "Generate the statutory folder for one finished product and check each certificate in it against the material used.",
    priority: "should", appliesTo: MAKE, roles: ["operations", "owner"],
    service: "compliance-accounting", note: "ibr-statutory-folder-from-bom",
    benchmark: "IBR 2026 Forms I Part B, IV Part A, IV Part B and V Part B (Forms II(1), III, III A and IV A under IBR 1950), from a bank of material test certificates",
  },

  // ── Dispatch and logistics ─────────────────────────────────────────────────
  {
    id: "dispatch.eway-bill", dept: "dispatch",
    question: "Does the ERP need to generate e-way bills?",
    text: "For goods moving with a consignment value above ₹50,000, the e-way bill is generated from the invoice and dispatch record, without retyping into the portal.",
    why: "Goods moving without a valid e-way bill can be stopped in transit.",
    test: "Dispatch a consignment above ₹50,000 and show the e-way bill details produced from the invoice.",
    priority: "must", appliesTo: GOODS, roles: ["accounts", "operations"],
    term: "e-way-bill", built: "built-not-live",
    statutory: {
      law: "CGST Rules, 2017, rule 138",
      doc: "cgst-rule-138",
      quote: "consignment value exceeding fifty thousand rupees",
      effective: "Rule 138 as substituted on 7 March 2018",
      appliesWhen: "A registered person causing goods to move above the value limit",
    },
  },
  {
    id: "dispatch.documents", dept: "dispatch",
    question: "Which documents should leave with the goods?",
    text: "Packing lists, invoices and certificates for a dispatch are produced from the same order and released to the customer as they are issued.",
    why: "Documents prepared separately from the dispatch don't match what's in the truck.",
    test: "Dispatch part of an order and show the packing list, invoice and certificates for exactly what left.",
    priority: "should", appliesTo: GOODS, roles: ["operations", "sales"],
    service: "customer-portal",
  },
  {
    id: "dispatch.supplier-dispatch", dept: "dispatch",
    question: "Can stores see what suppliers have dispatched?",
    text: "Suppliers record each dispatch on their link (lines, quantities, transporter, vehicle, LR number, photos), so stores see what is on the way.",
    why: "Stores that learn of a delivery when the truck arrives can't plan the unloading or the inspection.",
    test: "Record a supplier dispatch on the link and show it in stores' incoming list.",
    priority: "could", appliesTo: GOODS, roles: ["operations"],
    service: "supplier-portal",
    benchmark: "Lines and quantities, transporter, vehicle, LR number, up to 3 photos or PDFs",
  },

  // ── Accounts and GST ───────────────────────────────────────────────────────
  {
    id: "accounts.audit-trail", dept: "accounts",
    question: "Does my ERP need an audit trail?",
    text: "Every transaction in the books has an audit trail: an edit log of each change with the date it was made, which cannot be switched off.",
    why: "A company keeping its books in software must use software with this feature, and its auditor reports on it.",
    test: "Enter a purchase bill, change its amount, and show the edit log with the old value, the new value, the user and the time; then show there is no setting to disable it.",
    priority: "must", appliesTo: ALL, roles: ["accounts", "owner"], when: { company: true },
    service: "compliance-accounting", term: "audit-trail",
    statutory: {
      law: "Companies (Accounts) Rules, 2014, rule 3(1), proviso",
      doc: "mca-audit-trail-2021",
      quote: "has a feature of recording audit trail of each and every transaction, creating an edit log of each change made in books of account along with the date when such changes were made and ensuring that the audit trail cannot be disabled",
      effective: "Financial years from 1 April 2023 (date substituted by G.S.R. 235(E), 31 March 2022)",
      appliesWhen: "Every company that keeps its books of account in accounting software",
    },
  },
  {
    id: "accounts.audit-trail-date", dept: "accounts",
    question: "From when does the audit-trail rule apply?",
    text: "The audit trail has been on, without gaps, for every financial year from 1 April 2023, including for data migrated from an older system.",
    why: "The requirement runs for the whole year; a gap during a migration is still a gap.",
    test: "Show the audit trail for an entry made before the switch to the new system, and the first entry after it.",
    priority: "should", appliesTo: ALL, roles: ["accounts"], when: { company: true },
    term: "audit-trail",
    statutory: {
      law: "Companies (Accounts) Second Amendment Rules, 2022",
      doc: "mca-audit-trail-2022",
      quote: "the figures, letters and words “1st day of April, 2023” shall be substituted",
      effective: "1 April 2023",
      appliesWhen: "Companies keeping books in accounting software",
    },
  },
  {
    id: "accounts.e-invoice", dept: "accounts",
    question: "Does my ERP need to generate e-invoices?",
    text: "Where aggregate turnover has exceeded ₹5 crore in any year since 2017-18, B2B invoices, credit notes and debit notes get an IRN from the invoice registration portal before they are issued.",
    why: "Above the threshold, a B2B invoice without an IRN isn't a valid tax invoice.",
    test: "Issue a B2B invoice and show the IRN and signed QR code returned from the IRP on the printed invoice.",
    priority: "must", appliesTo: ALL, roles: ["accounts"], when: { turnoverAtLeast: 5 },
    term: "e-invoice", built: "not-built",
    statutory: {
      law: "Notification No. 13/2020–Central Tax, as amended by No. 10/2023–Central Tax (under CGST Rules, rule 48(4))",
      doc: "cbic-10-2023",
      quote: "the words “five crore rupees” shall be substituted",
      effective: "1 August 2023",
      appliesWhen: "Registered persons whose aggregate turnover exceeded ₹5 crore in any financial year from 2017-18",
    },
  },
  {
    id: "accounts.e-invoice-30-days", dept: "accounts",
    question: "Is there a time limit for reporting e-invoices?",
    text: "Where annual aggregate turnover is ₹10 crore or more, every e-invoice, credit note and debit note is reported to the IRP within 30 days of its date, and the system warns before that window closes.",
    why: "After 30 days the portal refuses the document, and the invoice can't be made valid.",
    test: "Show the list of invoices not yet reported to the IRP, with the days left for each.",
    priority: "must", appliesTo: ALL, roles: ["accounts"], when: { turnoverAtLeast: 10 },
    term: "e-invoice", built: "not-built",
    statutory: {
      law: "GSTN advisory, 5 November 2024",
      doc: "gstn-30-day",
      quote: "taxpayers with an AATO of 10 crores and above would not be allowed to report e-Invoices older than 30 days from the date of reporting on IRP portals",
      effective: "1 April 2025",
      appliesWhen: "Taxpayers with annual aggregate turnover (AATO) of ₹10 crore and above",
    },
  },
  {
    id: "accounts.gst-returns", dept: "accounts",
    question: "Can GST returns come straight from the ERP?",
    text: "GSTR-1 and GSTR-3B are prepared from the sales, purchase and stock records already in the system, and input tax credit is reconciled against them.",
    why: "Returns rebuilt in a spreadsheet each month drift from the books.",
    test: "Produce last month's GSTR-1 and GSTR-3B from the system and tie one line of each back to its invoice.",
    priority: "must", appliesTo: ALL, roles: ["accounts"], when: { tally: "replace" },
    service: "compliance-accounting", note: "accounting-inside-the-manufacturing-erp",
    benchmark: "GSTR-1 (B2B and HSN) and GSTR-3B",
  },
  {
    id: "accounts.rates-registry", dept: "accounts",
    question: "Where do GST and TDS rates come from?",
    text: "GST rates by HSN, TDS rates and payroll slabs come from one registry that a person verifies, used by every module, not typed into each transaction.",
    why: "A rate changed by notification has to change once, everywhere, on the right date.",
    test: "Change a rate in the registry with an effective date and show transactions before and after it using the right rate.",
    priority: "should", appliesTo: ALL, roles: ["accounts"],
    service: "compliance-accounting", note: "statutory-rates-across-systems", pattern: "human-verified-statutory-rates",
  },
  {
    id: "accounts.tds-purchases", dept: "accounts",
    question: "Does the ERP handle TDS on purchase of goods?",
    text: "Where the business is a buyer with turnover above ₹10 crore in the previous year, purchases from a seller beyond ₹50 lakh in the year attract TDS, and the system tracks each seller's running total and deducts from the right bill.",
    why: "The threshold is per seller per year; tracking it by hand misses the bill that crosses it.",
    test: "Show one supplier's purchases this year against the ₹50 lakh threshold and the bill on which deduction started.",
    priority: "should", appliesTo: GOODS, roles: ["accounts"], when: { turnoverAtLeast: 10 },
    term: "tds-on-purchases",
    statutory: {
      law: "Income-tax Act, 2025, section 393(1), Table, Sl. No. 8(ii) and its Note",
      doc: "it-act-2025",
      cited: "The provision is a table whose columns are split in the Gazette PDF, so no phrase is quotable word for word; read it in the Act, row 8(ii) of the section 393(1) table and the buyer definition in its Note.",
      effective: "From 1 April 2026 under the 2025 Act (formerly section 194Q of the 1961 Act)",
      appliesWhen: "A buyer whose turnover exceeded ₹10 crore in the preceding tax year; confirm with your CA",
    },
  },
  {
    id: "accounts.period-lock", dept: "accounts",
    question: "Can a filed period be changed afterwards?",
    text: "A period whose returns have been filed is locked; any later correction goes in as a dated adjustment, with the audit trail intact.",
    why: "A filed return that no longer matches the books is a notice waiting to happen.",
    test: "Lock last month, try to edit an invoice in it, and show the block and the correct adjustment route.",
    priority: "must", appliesTo: ALL, roles: ["accounts"], when: { tally: "replace" },
    service: "compliance-accounting",
  },
  {
    id: "accounts.bank-reconciliation", dept: "accounts",
    question: "How should bank reconciliation work?",
    text: "Bank statement lines are matched to entries automatically only when the match is unique both ways; everything else goes to a person.",
    why: "An automatic match that guesses between two equal amounts settles the wrong bill.",
    test: "Import a statement with two receipts of the same amount and show that neither is matched automatically.",
    priority: "should", appliesTo: ALL, roles: ["accounts"],
    service: "compliance-accounting", pattern: "auto-match-only-when-mutually-unique",
  },
  {
    id: "accounts.reverse-charge", dept: "accounts",
    question: "Does the ERP handle reverse charge?",
    text: "Purchases under reverse charge are marked, and the tax payable on them is computed and shown in the returns.",
    why: "Reverse-charge tax is easy to miss because no supplier invoice shows it.",
    test: "Enter a reverse-charge purchase and show the tax liability it creates in the return.",
    priority: "should", appliesTo: ALL, roles: ["accounts"], when: { tally: "replace" },
    service: "compliance-accounting", term: "reverse-charge",
  },
  {
    id: "accounts.fixed-assets", dept: "accounts",
    question: "Should the ERP keep the fixed-asset register?",
    text: "Fixed assets are kept in a register with cost, date put to use and depreciation, posted to the ledger.",
    why: "A register in a separate spreadsheet stops agreeing with the ledger by the first year end.",
    test: "Add an asset, run depreciation for the year, and show the ledger entries it made.",
    priority: "could", appliesTo: ALL, roles: ["accounts"], when: { tally: "replace" },
    service: "compliance-accounting", term: "fixed-asset-register",
  },
  {
    id: "accounts.tally-posting", dept: "accounts",
    question: "Can we keep Tally and still use an ERP?",
    text: "If Tally stays as the books, approved invoices post into TallyPrime as vouchers automatically, and each posted voucher is checked against Tally's own data so one deleted inside Tally is flagged.",
    why: "Two sets of books that aren't checked against each other diverge silently.",
    test: "Approve an invoice, show the voucher in TallyPrime, delete it in Tally, and show it flagged as unconfirmed after the next sync.",
    priority: "must", appliesTo: ALL, roles: ["accounts"], when: { tally: "keep" },
    service: "tally-integration", note: "tally-voucher-posting", pattern: "reconcile-against-source-of-truth",
    benchmark: "30 seconds",
    failure: "A voucher deleted inside Tally looked posted in the app until every voucher was checked against Tally's data.",
  },

  // ── Payroll and people ─────────────────────────────────────────────────────
  {
    id: "payroll.computed", dept: "payroll",
    question: "Should payroll be typed or computed?",
    text: "Pay is computed from attendance, rates and advances recorded during the month, never typed as a final figure.",
    why: "A typed pay figure can't be checked; a computed one can be traced to each day.",
    test: "Show one worker's month: days present, rate, advances, and the pay the system worked out.",
    priority: "must", appliesTo: ALL, roles: ["accounts", "owner"],
    service: "daily-wage-payroll", benchmark: "Computed: days × rate − advances, never typed",
    demo: { client: "savistar-saag", as: "People" },
  },
  {
    id: "payroll.work-logs", dept: "payroll",
    question: "Can labour be logged against jobs?",
    text: "Who worked on which order, and on which part, is logged daily, so labour shows up in job costs.",
    why: "Labour not logged against a job makes every job look more profitable than it is.",
    test: "Log a day's work for two people on one order and show it in that order's cost.",
    priority: "should", appliesTo: ["manufacturing", "projects"], roles: ["operations", "accounts"],
    service: "daily-wage-payroll",
  },
  {
    id: "payroll.statutory-slabs", dept: "payroll",
    question: "Are PF, ESI and professional tax worked out by the ERP?",
    text: "PF, ESI, professional tax and income-tax slabs come from the verified rate registry and are applied by rule, not typed per employee.",
    why: "Slabs change by notification; typed values don't.",
    test: "Show the deductions for one salaried employee and the registry entries they came from.",
    priority: "should", appliesTo: ALL, roles: ["accounts"],
    service: "compliance-accounting",
  },

  // ── Portals ────────────────────────────────────────────────────────────────
  {
    id: "portals.customer-stages", dept: "portals",
    question: "Can customers follow their own orders?",
    text: "Customers sign in to see each of their orders as plain-language stages worked out from what each department records, never typed for the customer.",
    why: "Status typed for the customer goes stale, and the phone keeps ringing.",
    test: "Sign in as a customer, open an order, then move it forward internally and show the customer's view change.",
    priority: "should", appliesTo: GOODS, roles: ["sales"],
    service: "customer-portal", note: "customer-portal-one-order-every-department",
    benchmark: "9, from Order Received to Commissioning",
    demo: { client: "ls-technologies", as: "Customer portal" },
  },
  {
    id: "portals.no-stock-exposure", dept: "portals",
    question: "What should customers never see?",
    text: "The customer portal shows a customer only their own orders and documents; stock levels, other customers and internal prices are never exposed.",
    why: "A portal built on internal screens leaks what competitors would pay to know.",
    test: "Sign in as one customer and try to open another customer's order by changing its number in the address.",
    priority: "must", appliesTo: GOODS, roles: ["owner"],
    service: "customer-portal", pattern: "role-scoped-finance-views",
  },
  {
    id: "portals.drawings", dept: "portals",
    question: "Can customers approve drawings online?",
    text: "Drawings, certificates, packing lists and invoices appear to the customer as they are released, and drawings can be approved or uploaded there.",
    why: "Drawing approvals by email get lost between versions.",
    test: "Release a drawing, approve it as the customer, and show the approval recorded on the order.",
    priority: "could", appliesTo: MAKE, roles: ["sales", "operations"],
    service: "customer-portal",
  },

  // ── Reporting and AI ───────────────────────────────────────────────────────
  {
    id: "reporting.traceable", dept: "reporting",
    question: "Can every report figure be traced to records?",
    text: "Every figure on every report can be opened to show the transactions it was computed from.",
    why: "A number nobody can trace is a number nobody acts on.",
    test: "Pick a figure on the owner's dashboard and open the records behind it.",
    priority: "must", appliesTo: ALL, roles: ["owner"],
    service: "operational-intelligence", pattern: "derive-balances-dont-store-them",
  },
  {
    id: "reporting.assistant-no-invented-numbers", dept: "reporting",
    question: "Can an AI assistant answer questions from our books safely?",
    text: "An AI assistant answers from fixed look-ups in code; it never writes a number itself, and any written answer containing a number not in the data is dropped.",
    why: "An assistant that writes its own figures will, sooner or later, give one that doesn't match the accounts.",
    test: "Ask the assistant this month's sales in plain English and in Hinglish, then compare its answer with the sales report.",
    priority: "should", appliesTo: ALL, roles: ["owner", "accounts"],
    service: "custom-ai-assistant", note: "assistant-that-answers-from-your-ledger",
    benchmark: "55 of 55 test questions and 57 unseen real phrasings, including Hinglish",
    demo: { client: "savistar-saag", as: "any sample login (two free questions)" },
  },
  {
    id: "reporting.extraction-review", dept: "reporting",
    question: "Can AI read our purchase documents?",
    text: "AI reads purchase invoices, bills of entry, purchase orders and bank statements into the system, and a person approves each one before anything posts.",
    why: "Typing documents in is slow; posting AI output unchecked is worse.",
    test: "Upload five of your own documents and show the fields read, the corrections needed, and that nothing posted before approval.",
    priority: "should", appliesTo: GOODS, roles: ["accounts"],
    service: "document-extraction", note: "ai-extraction-human-in-the-loop", pattern: "human-confirmed-extraction",
    benchmark: "88–95%",
  },
  {
    id: "reporting.ai-search", dept: "reporting",
    question: "Can we search old documents and decisions?",
    text: "Drawings, certificates, past quotations and decisions are searchable in plain words, and each answer shows the document it came from.",
    why: "What the business already knows is useless if only one person can find it.",
    test: "Search for a past quotation by what was quoted, not its number, and open the source.",
    priority: "could", appliesTo: ALL, roles: ["owner", "sales"],
    service: "rag-knowledge-graphs", pattern: "unconfirmed-inferences-stay-read-only",
  },

  // ── Integrations ───────────────────────────────────────────────────────────
  {
    id: "integrations.tally", dept: "integrations",
    question: "How can a cloud ERP connect to TallyPrime?",
    text: "The ERP connects to TallyPrime through an agent on the Tally PC (Tally's gateway only listens there), with vouchers pushed and outstandings synced back on a fixed schedule.",
    why: "TallyPrime has no cloud API; a vendor who says otherwise should show how.",
    test: "Show the agent running beside TallyPrime and the last sync times for vouchers and masters.",
    priority: "must", appliesTo: ALL, roles: ["accounts"], when: { tally: "keep" },
    service: "tally-integration", note: "connecting-tallyprime-four-ways", pattern: "local-agent-cloud-db",
    benchmark: "4 — local agent, hardened agent, MCP server, CSV/JSON files", built: "live",
  },
  {
    id: "integrations.tally-receivables", dept: "integrations",
    question: "Can Tally's receivables show in the ERP?",
    text: "Receivables with ageing, payables, registers, cash, bank and stock are copied out of TallyPrime into the business system on a schedule, and show the last sync when Tally is off.",
    why: "Sales chasing payments without Tally access calls accounts for every balance.",
    test: "Show receivables ageing in the ERP and the time of its last sync from Tally.",
    priority: "should", appliesTo: ALL, roles: ["sales", "accounts"], when: { tally: "keep" },
    service: "receivables-from-tally", benchmark: "15 minutes", built: "live",
  },
  {
    id: "integrations.irp", dept: "integrations",
    question: "Does the ERP connect to the e-invoice portal?",
    text: "The ERP sends B2B invoices to the invoice registration portal and stores the IRN and signed QR code returned.",
    why: "Copying invoices into the portal by hand is where the 30-day limit is missed.",
    test: "Generate an IRN from the ERP for a test invoice and show the QR code on the print.",
    priority: "must", appliesTo: ALL, roles: ["accounts"], when: { turnoverAtLeast: 5 },
    term: "e-invoice", built: "not-built",
  },
  {
    id: "integrations.eway", dept: "integrations",
    question: "Does the ERP connect to the e-way bill system?",
    text: "The ERP generates e-way bills through the NIC e-way bill system from dispatch records.",
    why: "Retyping consignments into the portal at the gate delays the truck.",
    test: "Generate an e-way bill for a test dispatch and show its number on the dispatch record.",
    priority: "should", appliesTo: GOODS, roles: ["accounts", "operations"],
    term: "e-way-bill", built: "built-not-live",
    benchmark: "Direct NIC client built to the official v1.03 spec; live once the NIC account is set up",
  },
  {
    id: "integrations.bank-statements", dept: "integrations",
    question: "Can bank statements be imported?",
    text: "Bank statements are imported from the bank's PDF or file, read into lines, and offered for reconciliation.",
    why: "Typing a month of statement lines takes a day and adds errors.",
    test: "Import one month's statement from your bank and show the lines it read.",
    priority: "should", appliesTo: ALL, roles: ["accounts"],
    service: "document-extraction", benchmark: "89%", built: "live",
  },
  {
    id: "integrations.excel-import", dept: "integrations",
    question: "Can data still come in from Excel?",
    text: "Sheets people already keep (BOMs, price lists, opening stock) import through the interface, with each problem row shown rather than silently skipped.",
    why: "If Excel stays the way data enters, the ERP has to accept it cleanly.",
    test: "Import a sheet with one bad row and show how the bad row is reported.",
    priority: "should", appliesTo: ALL, roles: ["operations"],
    service: "bom-from-excel", built: "live",
  },
  {
    id: "integrations.whatsapp", dept: "integrations",
    question: "Can the ERP send WhatsApp messages?",
    text: "Links that suppliers and customers act on (RFQs, quotations, reminders) can be sent on WhatsApp as well as email.",
    why: "Indian customers and suppliers answer WhatsApp before email.",
    test: "Send an RFQ link to a supplier on WhatsApp from the system.",
    priority: "could", appliesTo: ALL, roles: ["sales", "operations"],
    service: "supplier-portal", built: "live",
  },

  // ── Reliability, access and support ────────────────────────────────────────
  {
    id: "nonfunctional.offline", dept: "nonfunctional",
    question: "What happens when the factory internet drops?",
    text: "When the connection drops, work in progress isn't lost: syncs retry by themselves, and a real error (a missing ledger, a rejected voucher) waits for a person.",
    why: "Factory and office connections drop every week; a system that loses data then is unusable.",
    test: "Pull the network cable during a sync and show what happens to the queued entries when it's back.",
    priority: "must", appliesTo: ALL, roles: ["owner", "accounts"],
    service: "tally-integration", pattern: "failures-flagged-not-lost",
  },
  {
    id: "nonfunctional.role-access", dept: "nonfunctional",
    question: "How should access be controlled?",
    text: "What each role can see is enforced by the system itself, not just hidden on screen; staff can be refused bank data entirely.",
    why: "A field hidden on a screen is still one changed address away.",
    test: "Sign in as staff and try to open a bank page directly by its address.",
    priority: "must", appliesTo: ALL, roles: ["owner"],
    service: "multi-company-finance", pattern: "role-scoped-finance-views", term: "role-based-access",
    benchmark: "None — every bank route rejects staff",
  },
  {
    id: "nonfunctional.machine-identity", dept: "nonfunctional",
    question: "How should integrations sign in?",
    text: "Agents and integrations sign in with their own machine identities, separate from people, so their actions are traceable and revocable.",
    why: "An integration using a person's login breaks when that person leaves, and hides who did what.",
    test: "Show the list of machine identities and revoke one.",
    priority: "should", appliesTo: ALL, roles: ["owner"],
    pattern: "separate-machine-from-human-identity",
  },
  {
    id: "nonfunctional.default-passwords", dept: "nonfunctional",
    question: "What about the logins the vendor sets up?",
    text: "Logins created at setup must have their passwords changed on first sign-in.",
    why: "Default passwords are the first thing tried by anyone who shouldn't be in.",
    test: "Sign in with a newly created user and show the forced password change.",
    priority: "must", appliesTo: ALL, roles: ["owner"],
    pattern: "seeded-credentials-forced-rotation",
  },
  {
    id: "nonfunctional.phone", dept: "nonfunctional",
    question: "Does the ERP work on a phone?",
    text: "Stores, site and sales staff can do their daily tasks on a phone: scanning stock, marking attendance, checking an order.",
    why: "People on the floor won't walk to a desktop to record something.",
    test: "Do a stock scan and mark attendance on a phone, in front of you.",
    priority: "should", appliesTo: ALL, roles: ["operations"],
    service: "inventory-and-reservations",
  },
  {
    id: "nonfunctional.data-export", dept: "nonfunctional",
    question: "Can we get all our data out?",
    text: "All business data can be exported at any time in standard formats, during the contract and at its end.",
    why: "Data you can't take with you ties you to the vendor more than any contract.",
    test: "Ask for a full export of the demo data and open it in Excel.",
    priority: "must", appliesTo: ALL, roles: ["owner"],
  },
  {
    id: "nonfunctional.personal-data", dept: "nonfunctional",
    question: "Does the ERP need to protect personal data?",
    text: "Personal data of staff, customers and contacts is protected with reasonable security safeguards, and a breach can be traced and reported.",
    why: "A business holding personal data is a data fiduciary under the DPDP Act, with duties for safeguards and breach intimation.",
    test: "Ask who can see employees' personal details, how access is logged, and how a breach would be detected and reported.",
    priority: "must", appliesTo: ALL, roles: ["owner"],
    statutory: {
      law: "Digital Personal Data Protection Act, 2023, section 8(5)",
      doc: "dpdp-act-2023",
      quote: "reasonable security safeguards to prevent personal data breach",
      effective: "As the Act's provisions are brought into force; the DPDP Rules, 2025 on safeguards and breach intimation apply from May 2027 (rule 1(4))",
      appliesWhen: "Any business processing digital personal data",
    },
  },
  {
    id: "nonfunctional.support", dept: "nonfunctional",
    question: "How fast is support after go-live?",
    text: "Support requests have a stated response time in the contract, and the vendor has written documentation that lets another developer take the system over.",
    why: "A system only one person understands stops when that person is unavailable.",
    test: "Ask for the response time in writing, and to see the system document for one of their live systems.",
    priority: "must", appliesTo: ALL, roles: ["owner"],
  },

  // ── Contract and ownership ─────────────────────────────────────────────────
  {
    id: "contract.ownership", dept: "contract",
    question: "Who owns the code?",
    text: "The contract states who owns the source code and the software, and what the buyer gets: the code itself, or a licence to use the system for a stated term.",
    why: "Both models exist and both can be fair; an unstated one becomes a dispute.",
    test: "Ask for the ownership clause in writing before the build starts.",
    priority: "must", appliesTo: ALL, roles: ["owner"],
  },
  {
    id: "contract.fixed-phases", dept: "contract",
    question: "How should a custom ERP be priced?",
    text: "Work is priced in fixed phases, each quoted before it starts, rather than an open-ended hourly bill.",
    why: "An open hourly bill puts the whole risk of the estimate on the buyer.",
    test: "Ask for the phase plan with a fixed price and a go-live date for each phase.",
    priority: "should", appliesTo: ALL, roles: ["owner"],
  },
  {
    id: "contract.changes", dept: "contract",
    question: "What happens when requirements change mid-project?",
    text: "A change is written down, priced and agreed before it is built, never billed after the fact.",
    why: "Changes priced afterwards are where budgets go.",
    test: "Ask how the last change on one of their projects was priced and approved.",
    priority: "must", appliesTo: ALL, roles: ["owner"],
  },
  {
    id: "contract.amc-scope", dept: "contract",
    question: "What does the annual maintenance contract cover?",
    text: "The AMC states what it covers (licence, hosting, fixes, small changes), what it costs per year, and what is quoted separately.",
    why: "An AMC with no stated scope turns every request into a negotiation.",
    test: "Ask for the AMC scope and price in writing, and an example of something it doesn't cover.",
    priority: "must", appliesTo: ALL, roles: ["owner", "accounts"],
  },
];

export const deptBySlug = (slug: string) => departments.find((d) => d.slug === slug);
export const deptItems = (slug: string) => requirements.filter((r) => r.dept === slug);
export const PRIORITY_LABEL: Record<Priority, string> = { must: "Must", should: "Should", could: "Could" };
export const BUILT_LABEL: Record<NonNullable<Requirement["built"]>, string> = {
  live: "Live in an Ahrom Labs system",
  "built-not-live": "Built by Ahrom Labs, not yet live",
  "not-built": "Not yet built by Ahrom Labs",
};
