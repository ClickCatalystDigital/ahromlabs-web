import { getContent, type ContentEntry } from "./content";

// The US sales tax hub (/sales-tax): guides for US manufacturers, distributors, contractors and design firms in
// content/sales-tax/*.md, grouped below. North America only in menus (src/lib/markets.ts NA_ONLY); the URLs work
// everywhere. Facts are quoted from the Streamlined Sales Tax Governing Board and state revenue departments, checked
// word for word by scripts/check-sales-tax-quotes.mjs.

export const ST_PUBLISHED = "2026-11-03";
export const ST_CHECKED = "2026-11-03";

export const ST_GROUPS: { slug: string; name: string; intro: string; order: string[] }[] = [
  {
    slug: "nexus",
    name: "When you must collect",
    intro: "Physical presence, economic nexus after Wayfair, and each state's threshold.",
    order: ["sales-tax-nexus", "economic-nexus-thresholds", "streamlined-sales-tax"],
  },
  {
    slug: "exemptions",
    name: "Exemptions and certificates",
    intro: "Resale and exemption certificates, the manufacturing exemption, and the use tax you owe when a supplier didn't charge.",
    order: ["resale-certificates", "manufacturing-sales-tax-exemption", "use-tax", "contractors-sales-tax", "interior-designers-sales-tax"],
  },
  {
    slug: "systems",
    name: "Sales tax in your system",
    intro: "What an ERP or order system has to record so the return, the certificate file and the nexus check come out of it.",
    order: ["sales-tax-in-erp"],
  },
];

/** Every guide, in hub order (group, then the group's own order). */
export function stGuides(): ContentEntry[] {
  const rank = (g: ContentEntry) => {
    const gi = ST_GROUPS.findIndex((x) => x.slug === g.group);
    const oi = ST_GROUPS[gi]?.order.indexOf(g.slug) ?? -1;
    return gi * 100 + (oi === -1 ? 99 : oi);
  };
  return [...getContent("sales-tax")].sort((a, b) => rank(a) - rank(b));
}
export const stGuide = (slug: string) => getContent("sales-tax").find((g) => g.slug === slug);

export * from "./sales-tax-calc";
