import type { Service } from "./services";

// Who Ahrom Labs has built for. Named with permission — settled for every
// client below (docs/plans-to-upgrade.md, "Settled — do not re-raise"). A new
// client needs its own permission before it's added here. Feeds /work,
// the homepage and llms.txt.

export type Engagement = {
  // Anchor on /work.
  slug: string;
  client: string;
  industry: string;
  built: string;
  // Service slugs from services.ts — typed so a rename breaks the build.
  services: Service["slug"][];
  highlights: string[];
  proof: Service["proof"];
  quote?: { text: string; attribution: string };
};

export const engagements: Engagement[] = [
  {
    slug: "ls-technologies",
    client: "LS Technologies",
    industry: "Electronics-components import/export trading",
    built:
      "An ERP and CRM with TallyPrime accounting automation and AI document extraction, plus a separate inventory management system for PCB components and reels.",
    services: ["tally-integration", "document-extraction", "custom-erp-crm"],
    highlights: [
      "Approved invoices post into TallyPrime as vouchers within 30 seconds, through a local agent on the Tally PC.",
      "Five document types — purchase and freight invoices, bills of entry, purchase orders, bank statements — extracted by AI at 88–95% zero-correction, every one approved by a person before posting.",
      "Every posted voucher is checked against Tally's own data; one deleted inside Tally is marked unconfirmed again on the next sync.",
    ],
    proof: [
      { kind: "note", slug: "tally-voucher-posting" },
      { kind: "note", slug: "ai-extraction-human-in-the-loop" },
      { kind: "pattern", slug: "replay-queued-payload-through-existing-handler" },
    ],
  },
  {
    slug: "savistar-saag",
    client: "Savistar & Saag",
    industry: "Interior design and furniture manufacturing — sister companies",
    built:
      "The backend both businesses run on: workers, clients, vendors and freight, projects and site visits for Savistar, workshop orders for Saag, and one combined finance ledger.",
    services: ["custom-erp-crm", "multi-company-finance", "operational-intelligence"],
    highlights: [
      "Each invoice picks its own company's letterhead, logo and GSTIN from a single shared app.",
      "Staff see only their own cash entries; bank data is refused to staff at the API.",
      "Vendor and freight charges are checked against reference rates and deviations flagged automatically.",
    ],
    proof: [
      { kind: "note", slug: "two-companies-one-book" },
      { kind: "pattern", slug: "role-scoped-finance-views" },
      { kind: "pattern", slug: "reference-rate-anomaly-detection" },
    ],
    quote: {
      text: "They really took the time to understand our concerns and requirements, and the system was built the way we had envisioned it. It has brought much more structure, visibility, and control to the way we operate.",
      attribution: "Sachi & Haripriya, owners of Savistar and Saag",
    },
  },
  {
    slug: "shanti-boilers",
    client: "Shanti Boilers & Pressure Vessels",
    industry: "Boiler and pressure-vessel manufacturing",
    built:
      "A custom ERP, CRM and operational-intelligence system for a boiler and pressure-vessel manufacturer — from bills of materials and material stock to the test certificates that go into statutory quality-control documents.",
    services: ["custom-erp-crm", "operational-intelligence", "document-extraction"],
    highlights: [
      "Leftover cut material is matched back to bill-of-materials lines still waiting on stock, so usable offcuts aren't scrapped.",
      "Test certificates are matched to the lines they belong to — ranked by confidence, but never linked without a person confirming, because they end up in statutory paperwork.",
    ],
    proof: [
      { kind: "note", slug: "same-confidence-different-autonomy" },
      { kind: "pattern", slug: "unconfirmed-inferences-stay-read-only" },
    ],
  },
];
