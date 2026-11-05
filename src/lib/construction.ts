import { getContent, type ContentEntry } from "./content";

// The construction hub (/construction): guides for contractors in both markets, in content/construction/*.md.
// The "us" group is for North America and the "india" group for India: each guide is listed only in its market
// (src/lib/markets.ts IN_ONLY / NA_ONLY take CON_IN / CON_US), and scripts/topics.check.ts checks each page leans
// its group's way. Statutes and official manuals are quoted word for word, checked by
// scripts/check-construction-quotes.mjs; AIA documents are paid and are explained, never reproduced.

export const CON_PUBLISHED = "2026-11-03";
export const CON_CHECKED = "2026-11-05";

export const CON_GROUPS: { slug: string; name: string; intro: string; market: "NA" | "IN"; order: string[] }[] = [
  {
    slug: "us",
    name: "Contractors in the US",
    intro: "Getting paid on a US job: pay applications, retainage, lien waivers, change orders and the WIP schedule, and what each state allows.",
    market: "NA",
    order: ["pay-applications", "retainage", "lien-waivers", "mechanics-lien-deadlines", "prompt-payment-acts", "change-orders", "wip-schedule", "certified-payroll"],
  },
  {
    slug: "india",
    name: "Contractors in India",
    intro: "Running bills against the measurement book, with security deposit, advances and the final bill, TDS on payments to contractors and GST on works contracts.",
    market: "IN",
    order: ["ra-bills", "measurement-book", "price-escalation-clause", "bank-guarantee-defect-liability", "tds-on-contractor-payments", "gst-on-works-contracts", "labour-cess", "contract-labour-compliance"],
  },
];
export const CON_US = CON_GROUPS[0].order.map((s) => `/construction/${s}`);
export const CON_IN = CON_GROUPS[1].order.map((s) => `/construction/${s}`);

/** Every guide, in hub order (group, then the group's own order). */
export function conGuides(): ContentEntry[] {
  const rank = (g: ContentEntry) => {
    const gi = CON_GROUPS.findIndex((x) => x.slug === g.group);
    const oi = CON_GROUPS[gi]?.order.indexOf(g.slug) ?? -1;
    return gi * 100 + (oi === -1 ? 99 : oi);
  };
  return [...getContent("construction")].sort((a, b) => rank(a) - rank(b));
}
export const conGuide = (slug: string) => getContent("construction").find((g) => g.slug === slug);
