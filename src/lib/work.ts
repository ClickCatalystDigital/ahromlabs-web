import type { Service } from "./services";

// Who Ahrom Labs has built for. Named with permission — settled for every
// client below (docs/plans-to-upgrade.md, "Settled — do not re-raise"). A new
// client needs its own permission before it's added here. Feeds /work,
// the homepage and llms.txt.

export type Engagement = {
  // Anchor on /work.
  slug: string;
  client: string;
  // Client asked not to be named: `client` is a description, not a business name.
  anonymous?: boolean;
  industry: string;
  built: string;
  // Service slugs from services.ts — typed so a rename breaks the build.
  services: Service["slug"][];
  highlights: string[];
  proof: Service["proof"];
  quote?: { text: string; attribution: string };
  // A public demo of the system, when one exists.
  // image: an illustration shown above the demo card on the homepage (public/demos, 960x540).
  demo?: { url: string; label: string; name: string; blurb: string; image?: { src: string; alt: string } };
};

export const engagements: Engagement[] = [
  {
    slug: "ls-technologies",
    demo: { url: "https://electronics-erp.ahromlabs.com/demo", label: "Try the live demo", name: "Electronics trading demo", blurb: "Scan reels in and out, approve staff entries, and see the customer portal and partner store.", image: { src: "/demos/demo-electronics-trading.webp", alt: "Electronic component reels in a carton beside a barcode scanner: the electronics trading and inventory demo" } },
    client: "LS Technologies",
    industry: "Electronics-components import/export trading",
    built:
      "An ERP and CRM with TallyPrime accounting automation and AI document extraction, plus a separate inventory management system for PCB components and reels.",
    services: ["tally-integration", "document-extraction", "custom-erp-crm", "inventory-and-reservations", "sales-crm", "customer-portal", "receivables-from-tally", "custom-ai-assistant"],
    highlights: [
      "Approved invoices post into TallyPrime as vouchers within 30 seconds, through a local agent on the Tally PC.",
      "Five document types — purchase and freight invoices, bills of entry, purchase orders, bank statements — extracted by AI at 88–95% zero-correction, every one approved by a person before posting.",
      "Every posted voucher is checked against Tally's own data; one deleted inside Tally is marked unconfirmed again on the next sync.",
    ],
    proof: [
      { kind: "note", slug: "tally-voucher-posting" },
      { kind: "note", slug: "ai-extraction-human-in-the-loop" },
      { kind: "note", slug: "reels-boxes-and-two-stores" },
      { kind: "note", slug: "customer-portal-one-order-every-department" },
      { kind: "note", slug: "assistant-that-answers-from-your-ledger" },
      { kind: "pattern", slug: "replay-queued-payload-through-existing-handler" },
    ],
  },
  {
    slug: "savistar-saag",
    demo: { url: "https://interiors-erp.ahromlabs.com/demo", label: "Try the live demo", name: "Interior design and furniture demo", blurb: "Projects, workshop orders, vendors, payroll, and two free questions to the Atelier AI assistant.", image: { src: "/demos/demo-interior-design-furniture.webp", alt: "Fabric, stone and wood samples with a floor plan and a chair: the interior design and furniture workshop demo" } },
    client: "Savistar & Saag",
    industry: "Interior design and furniture manufacturing — sister companies",
    built:
      "The backend both businesses run on: workers, clients, vendors and freight, projects and site visits for Savistar, workshop orders for Saag, and one combined finance ledger.",
    services: ["custom-erp-crm", "multi-company-finance", "operational-intelligence", "daily-wage-payroll", "custom-ai-assistant"],
    highlights: [
      "Each invoice picks its own company's letterhead, logo and GSTIN from a single shared app.",
      "Staff see only their own cash entries; bank data is refused to staff at the API.",
      "Vendor and freight charges are checked against reference rates and deviations flagged automatically.",
    ],
    proof: [
      { kind: "note", slug: "two-companies-one-book" },
      { kind: "note", slug: "assistant-that-answers-from-your-ledger" },
      { kind: "pattern", slug: "role-scoped-finance-views" },
      { kind: "pattern", slug: "reference-rate-anomaly-detection" },
    ],
    quote: {
      text: "They really took the time to understand our concerns and requirements, and the system was built the way we had envisioned it. It has brought much more structure, visibility, and control to the way we operate.",
      attribution: "Sachi & Haripriya, owners of Savistar and Saag",
    },
  },
  {
    slug: "boiler-manufacturer",
    demo: { url: "https://boiler-erp.ahromlabs.com/demo", label: "Try the live demo", name: "Boiler manufacturing demo", blurb: "Twelve sample logins, one per department, from enquiry to dispatch and the IBR folder.", image: { src: "/demos/demo-boiler-manufacturing.webp", alt: "A shell boiler with its valves, gauge and burner: the boiler and pressure-vessel manufacturing ERP demo" } },
    client: "A boiler and pressure-vessel manufacturer",
    anonymous: true,
    industry: "Boiler and pressure-vessel manufacturing",
    built:
      "A custom ERP, CRM and operational-intelligence system for a boiler and pressure-vessel manufacturer — from bills of materials and material stock to the test certificates that go into statutory quality-control documents.",
    services: ["custom-erp-crm", "compliance-accounting", "operational-intelligence", "document-extraction", "sales-crm", "customer-portal", "supplier-portal", "material-traceability", "bom-from-excel"],
    highlights: [
      "Each boiler's IBR statutory folder — cover letter and IBR 2026 Forms I Part B, IV Part A, IV Part B and V Part B (Forms II(1), III, III A and IV A under IBR 1950) — put together from a bank of material test certificates, with the parts added by a person in a few minutes.",
      "Plate and section offcuts go back into stock with weight derived from geometry: a 157.00 kg plate became 127.17 kg used, 15.70 kg remnant and 14.13 kg scrap, conserved exactly.",
      "The system is also the book of record: GSTR-1, GSTR-3B, TDS, reverse charge, fixed assets and bank reconciliation, with 23 reports — Tally optional.",
      "Test certificates are matched to the lines they belong to by confidence, but never linked without a person confirming, because they end up in statutory paperwork.",
    ],
    proof: [
      { kind: "note", slug: "ibr-statutory-folder-from-bom" },
      { kind: "note", slug: "plate-remnants-back-into-stock" },
      { kind: "note", slug: "accounting-inside-the-manufacturing-erp" },
      { kind: "note", slug: "same-confidence-different-autonomy" },
      { kind: "note", slug: "customer-portal-one-order-every-department" },
      { kind: "note", slug: "suppliers-quote-on-a-link" },
      { kind: "note", slug: "sales-history-moved-without-guessing" },
      { kind: "pattern", slug: "compute-blockers-on-read" },
    ],
  },
];

// For use mid-sentence: "Built for a boiler and pressure-vessel manufacturer".
export const clientInSentence = (e: Engagement) =>
  e.anonymous ? e.client.charAt(0).toLowerCase() + e.client.slice(1) : e.client;
