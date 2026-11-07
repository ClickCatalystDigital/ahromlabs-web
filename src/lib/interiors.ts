import { getContent, type ContentEntry } from "./content";

// The interiors hub (/interiors): guides for US and Canadian interior design firms that sell product as well as
// design time, in content/interiors/*.md, grouped below. North America only in menus (src/lib/markets.ts NA_ONLY);
// the URLs work everywhere. Facts are quoted from ASID, Intuit, the design-software vendors' own pages and the tax
// agencies, checked word for word by scripts/check-interiors-quotes.mjs. Plan: docs/batch-plans/us-interiors.md.

export const INT_PUBLISHED = "2026-11-07";
export const INT_CHECKED = "2026-11-07";

export const INT_GROUPS: { slug: string; name: string; intro: string; order: string[] }[] = [
  {
    slug: "pricing",
    name: "Charging and billing clients",
    intro: "Fee structures and markup on product, the letter of agreement, invoices, deposits and retainers, and Canada's GST/HST.",
    order: ["how-to-charge-for-interior-design", "interior-design-contract", "invoices-deposits-and-retainers", "canada-gst-hst-for-interior-designers"],
  },
  {
    slug: "projects",
    name: "Buying and tracking product",
    intro: "Trade accounts, purchase orders from deposit to delivery, and the project budget against what the client approved.",
    order: ["purchase-orders-and-procurement", "trade-accounts-and-designer-discounts", "project-budget-tracking"],
  },
  {
    slug: "systems",
    name: "Books and software",
    intro: "What QuickBooks Online does for a design firm, and what the design platforms add on top of it.",
    order: ["quickbooks-for-interior-designers"],
  },
];

/** Every guide, in hub order (group, then the group's own order). */
export function intGuides(): ContentEntry[] {
  const rank = (g: ContentEntry) => {
    const gi = INT_GROUPS.findIndex((x) => x.slug === g.group);
    const oi = INT_GROUPS[gi]?.order.indexOf(g.slug) ?? -1;
    return gi * 100 + (oi === -1 ? 99 : oi);
  };
  return [...getContent("interiors")].sort((a, b) => rank(a) - rank(b));
}
export const intGuide = (slug: string) => getContent("interiors").find((g) => g.slug === slug);
