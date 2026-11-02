import { getContent, type ContentEntry } from "./content";

// The manufacturing hub (/manufacturing): guides for US job shops and small manufacturers in
// content/manufacturing/*.md, grouped below. North America only in menus (src/lib/markets.ts NA_ONLY); the
// URLs work everywhere. Page choice and keywords: docs/us-knowledge-web/architecture.md.
//
// QuickBooks facts are quoted from Intuit's own help and product pages and checked word for word by
// scripts/check-manufacturing-quotes.mjs. Our QuickBooks connector is not built yet; pages say so.

export const MFG_PUBLISHED = "2026-11-02";
export const MFG_CHECKED = "2026-11-02";

export type MfgGroup = NonNullable<ContentEntry["group"]>;
export const MFG_GROUPS: { slug: MfgGroup; name: string; intro: string; order: string[] }[] = [
  {
    slug: "choosing",
    name: "Choosing a system",
    intro: "What a job shop or small plant needs first, and how to test a vendor with your own work.",
    order: ["job-shop-erp", "custom-vs-off-the-shelf-erp", "small-business-erp-options"],
  },
  {
    slug: "quickbooks",
    name: "QuickBooks and the shop",
    intro: "What each QuickBooks edition does for manufacturing, where it stops, and how a shop system sits beside it.",
    order: ["quickbooks-for-manufacturing", "quickbooks-online-vs-desktop", "quickbooks-online-inventory", "quickbooks-job-costing", "quickbooks-vs-erp", "quickbooks-desktop-end-of-support", "quickbooks-integration"],
  },
  {
    slug: "planning",
    name: "Scheduling and the shop floor",
    intro: "Machines, shifts, due dates and the work in between.",
    order: ["production-scheduling-software", "production-schedule-template", "wip-tracking"],
  },
  {
    slug: "inventory",
    name: "Inventory for distributors",
    intro: "Counting, tracing and valuing stock when you buy and resell, or make and ship from a warehouse.",
    order: ["distributor-inventory-control"],
  },
];

/** Every guide, in hub order (group, then the group's own order). */
export function mfgGuides(): ContentEntry[] {
  const rank = (g: ContentEntry) => {
    const gi = MFG_GROUPS.findIndex((x) => x.slug === g.group);
    const oi = MFG_GROUPS[gi]?.order.indexOf(g.slug) ?? -1;
    return gi * 100 + (oi === -1 ? 99 : oi);
  };
  return [...getContent("manufacturing")].sort((a, b) => rank(a) - rank(b));
}
export const mfgGuide = (slug: string) => getContent("manufacturing").find((g) => g.slug === slug);

export * from "./manufacturing-calc";
