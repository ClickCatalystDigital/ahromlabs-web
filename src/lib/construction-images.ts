import { existsSync } from "node:fs";
import { join } from "node:path";

// Page art for the construction hub: public/construction/<name>.webp (1086 x 362) and its share-card crop
// src/assets/og-art/construction/<name>.jpg, made with scripts/asme-images.py from docs/construction-image-prompts.md.
// A page shows its image once the file exists. Server-only. Re-check the alt text against each delivered image.
const ALT: Record<string, string> = {
  "construction-hub": "A hard hat resting on a rolled set of drawings beside a clipboard with a payment schedule: getting paid on a construction job.",
  "pay-applications": "A clipboard holding a schedule of values with columns of blank figures, a pencil and a calculator: a progress payment application.",
  "retainage": "A glass jar part filled with coins on a site office desk beside a clipboard: retainage held back from each payment.",
  "lien-waivers": "A signed release form on a clipboard, a pen across it and a set of keys beside it: a lien waiver exchanged for payment.",
  "change-orders": "A drawing with a revision cloud marked in red pencil, a ruler and an eraser: a change to the work.",
  "wip-schedule": "A spreadsheet printout of jobs with columns of figures and a few rows highlighted, beside reading glasses: a work-in-progress schedule.",
  "ra-bills": "A stack of bound bill sheets with a calculator and a rubber stamp on a site desk: a running account bill.",
  "measurement-book": "An open hardbound register with ruled measurement columns, a steel measuring tape coiled beside it: a measurement book.",
  "tds-on-contractor-payments": "A cheque book, a calculator and a printed payment voucher on a desk: tax deducted from a payment to a contractor.",
  "gst-on-works-contracts": "Bags of cement, steel bars and a builder's level on a slab: goods and services together in a works contract.",
  "mechanics-lien-deadlines": "A desk calendar with several dates circled in navy, a pencil and a brass hourglass: the deadlines for lien notices and claims.",
  "prompt-payment-acts": "A stopwatch leaning on a closed envelope beside a short stack of coins: how fast a contractor must be paid.",
  "certified-payroll": "A clipboard holding a blank weekly time sheet, a white hard hat and a pen: a weekly certified payroll report.",
  "labour-cess": "An open navy cash box full of coins with a white hard hat beside it: the labour welfare cess on construction cost.",
  "contract-labour-compliance": "Four blank ID badges on lanyards hanging from a hook rail, a hard hat on the shelf below: workers hired through a labour contractor.",
  "price-escalation-clause": "A brass balance scale with a steel beam on one pan and coins on the other, a cement bag behind it: material prices weighed against the contract rate.",
  "bank-guarantee-defect-liability": "A rolled document tied with a navy ribbon on a closed hardbound contract, a brass padlock beside it: a bank guarantee securing the contractor's obligations.",
};

export type ConArt = { src: string; alt: string; width: number; height: number };

/** The page art for a guide slug or "construction-hub", once its file exists. */
export function conArt(name: string): ConArt | null {
  const src = `/construction/${name}.webp`;
  if (!existsSync(join(process.cwd(), "public", src))) return null;
  return { src, alt: ALT[name] ?? "", width: 1086, height: 362 };
}

/** The share-card crop as a data URI for renderOgImage (it can't read WebP). */
export async function conOgArt(name: string): Promise<string | undefined> {
  const { readFile } = await import("node:fs/promises");
  const jpg = await readFile(join(process.cwd(), "src/assets/og-art/construction", `${name}.jpg`)).catch(() => null);
  return jpg ? `data:image/jpeg;base64,${jpg.toString("base64")}` : undefined;
}
