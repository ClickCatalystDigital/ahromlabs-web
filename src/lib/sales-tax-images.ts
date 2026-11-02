import { existsSync } from "node:fs";
import { join } from "node:path";

// Page art for the sales tax hub: public/sales-tax/<name>.webp (1086 x 362) and its share-card crop
// src/assets/og-art/sales-tax/<name>.jpg, made with scripts/asme-images.py from docs/sales-tax-image-prompts.md.
// A page shows its image once the file exists. Server-only. Re-check the alt text against each delivered image.
const ALT: Record<string, string> = {
  "sales-tax-hub": "A shipping carton on a loading dock beside a clipboard with an invoice and a rubber stamp: goods sold across state lines.",
  "sales-tax-nexus": "A map of the lower 48 states drawn as plain outlines, with a few states shaded and a parcel route crossing them: where a seller has nexus.",
  "economic-nexus-thresholds": "A brass balance scale with a stack of invoices on one pan and a single weight on the other: sales into a state weighed against its threshold.",
  "streamlined-sales-tax": "A row of identical blank forms in a wire tray, squared up: one standard registration and certificate across many states.",
  "resale-certificates": "A signed certificate in a manila folder held open in a filing drawer of customer files: an exemption certificate kept on file.",
  "manufacturing-sales-tax-exemption": "Bar stock feeding into a lathe chuck, with turned parts below: material that becomes part of a product made for sale.",
  "use-tax": "An opened shipping box with packing paper and a packing slip that shows no tax line: a purchase on which the supplier charged no tax.",
  "sales-tax-in-erp": "An order form on a clipboard with ship-to address, item lines and a tax line, beside a small stack of filed certificates: sales tax recorded in an order system.",
};

export type StArt = { src: string; alt: string; width: number; height: number };

/** The page art for a guide slug or "sales-tax-hub", once its file exists. */
export function stArt(name: string): StArt | null {
  const src = `/sales-tax/${name}.webp`;
  if (!existsSync(join(process.cwd(), "public", src))) return null;
  return { src, alt: ALT[name] ?? "", width: 1086, height: 362 };
}

/** The share-card crop as a data URI for renderOgImage (it can't read WebP). */
export async function stOgArt(name: string): Promise<string | undefined> {
  const { readFile } = await import("node:fs/promises");
  const jpg = await readFile(join(process.cwd(), "src/assets/og-art/sales-tax", `${name}.jpg`)).catch(() => null);
  return jpg ? `data:image/jpeg;base64,${jpg.toString("base64")}` : undefined;
}
