import { existsSync } from "node:fs";
import { join } from "node:path";

// Page art for the interiors hub: public/interiors/<name>.webp (1086 x 362) and its share-card crop
// src/assets/og-art/interiors/<name>.jpg, made with scripts/asme-images.py from docs/interiors-image-prompts.md.
// A page shows its image once the file exists. Server-only. Re-check the alt text against each delivered image.
const ALT: Record<string, string> = {
  "interiors-hub": "A navy upholstered armchair with a fabric swatch card and a blank price tag on its seat: furniture a design firm specifies and sells.",
  "how-to-charge-for-interior-design": "A brass desk calculator beside three fanned fabric swatches with a price tag on the top one: pricing design time and product.",
  "invoices-deposits-and-retainers": "A clipboard holding a blank invoice with a fountain pen across it and a small stack of coins: billing a client and taking a deposit.",
  "purchase-orders-and-procurement": "A wrapped furniture carton on a hand truck with a packing slip taped to it: an order on its way from the vendor.",
  "project-budget-tracking": "An open binder with a grid sheet, a few rows ticked in pencil and a fabric swatch on the page: items checked against the client's budget.",
  "quickbooks-for-interior-designers": "A closed laptop with a ledger on its lid, joined by a paper clip chain to a fabric swatch: the design side linked to the books.",
  "interior-design-contract": "A signed letter of agreement on a clipboard with a pen and a fabric swatch clipped to its corner: the terms of a design engagement.",
  "trade-accounts-and-designer-discounts": "A brass ring of trade account cards beside a fabric sample book and a price tag with a line through its figure: buying at the trade price.",
  "1099s-for-installers-and-workrooms": "A cordless drill and a folded drapery panel beside a blank tax form on a clipboard: paying installers and workrooms.",
  "freight-damage-claims": "A furniture carton with a crushed corner on a pallet, a claim form on a clipboard leaning against it: a damaged delivery.",
  "custom-furniture-job-costing": "A half-finished walnut table leg in a bench vise with a pencil-marked work ticket beside it: one order's labor and materials.",
  "canada-gst-hst-for-interior-designers": "A wooden side table with a blank receipt and a few coins on it, beside a parcel with a delivery label: tax set by where the goods are delivered.",
};

export type IntArt = { src: string; alt: string; width: number; height: number };

/** The page art for a guide slug or "interiors-hub", once its file exists. */
export function intArt(name: string): IntArt | null {
  const src = `/interiors/${name}.webp`;
  if (!existsSync(join(process.cwd(), "public", src))) return null;
  return { src, alt: ALT[name] ?? "", width: 1086, height: 362 };
}

/** The share-card crop as a data URI for renderOgImage (it can't read WebP). */
export async function intOgArt(name: string): Promise<string | undefined> {
  const { readFile } = await import("node:fs/promises");
  const jpg = await readFile(join(process.cwd(), "src/assets/og-art/interiors", `${name}.jpg`)).catch(() => null);
  return jpg ? `data:image/jpeg;base64,${jpg.toString("base64")}` : undefined;
}
