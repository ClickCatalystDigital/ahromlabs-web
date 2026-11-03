import { existsSync } from "node:fs";
import { join } from "node:path";

// Page art for the manufacturing hub: public/manufacturing/<name>.webp (1086 x 362) and its share-card crop
// src/assets/og-art/manufacturing/<name>.jpg, made the same way as the ASME art (scripts/asme-images.py) from
// docs/us-knowledge-web/image-prompts.md. A page shows its image once the file exists. Server-only.
//
// Alt text describes the picture and what it stands for. Re-check it against each delivered image.
const ALT: Record<string, string> = {
  "manufacturing-hub": "A CNC vertical machining center with a part clamped in the vise, beside a small cart of finished parts: production in a machine shop.",
  "job-shop-erp": "A workbench with a bench vise, a tray of machined brackets and flanges, a closed laptop, drawers and parts bins: running a job shop with software.",
  "quickbooks-for-manufacturing": "A closed ledger book with a pen, next to a machined flange, bracket and shaft: accounting software and the parts a manufacturer makes.",
  "quickbooks-online-inventory": "Steel shelving with bar stock and tube on the bottom shelf, labelled bins of parts in the middle and boxes and flanges on top: raw material, work in progress and finished goods.",
  "quickbooks-job-costing": "A brass balance scale with a machined bracket on one pan and steel weights on the other: estimated against actual job cost.",
  "distributor-inventory-control": "A handheld barcode scanner on a warehouse shelf of labelled cartons, one carton pulled forward with a lot label: counting and tracing stock.",
  "small-business-erp-options": "A row of different keys laid on a wooden board, one lifted beside a padlock: choosing between systems.",
  "quickbooks-vs-erp": "A small toolbox overflowing beside a larger open tool chest with labelled drawers: outgrowing a tool.",
  "quickbooks-desktop-end-of-support": "A desktop computer tower with a paper tag tied to it, beside a closed laptop: an older installed system being retired.",
  "quickbooks-online-vs-desktop": "A desktop computer and a laptop side by side on a workbench, with the same closed ledger book in front of each: two ways to run the same books.",
  "erp-requirements-checklist": "A clipboard with a printed checklist, some boxes ticked, beside a pen and a machined part: testing a system against a list of requirements.",
  // Later pages (docs/us-knowledge-web/architecture.md); their images are already in public/manufacturing.
  "quickbooks-integration": "Two document trays joined by a short brass roller conveyor carrying one sheet across: records passing between a shop system and the accounting system.",
  "rfq-to-quote": "An engineering drawing of a flanged part with the machined part on its corner and a brass magnifying glass: reading a customer RFQ into a quote.",
  "custom-vs-off-the-shelf-erp": "A ring of identical blank keys beside a key-cutting machine cutting one key: off-the-shelf software against software cut to fit.",
  "wip-tracking": "A stack of grey parts bins with blank labels, the top one holding turned steel parts, and a handheld barcode scanner beside them: tracking work in progress.",
  "production-schedule-template": "A spreadsheet grid on a clipboard with coloured bars like booked machine time, a steel ruler and a pencil across it: a schedule template.",
  "production-scheduling-software": "A magnetic planning board with coloured blocks of different lengths along empty rows: scheduling jobs on machines.",
};
// Delivered image file name per page, where it differs from the page slug (docs/us-knowledge-web/image-prompts.md).
const FILE: Record<string, string> = {
  "job-shop-erp": "machine-shop-erp",
  "quickbooks-online-inventory": "manufacturing-inventory",
  "quickbooks-job-costing": "job-costing",
  "production-scheduling-software": "job-shop-scheduling",
  "rfq-to-quote": "ai-rfq-quoting",
  "wip-tracking": "shop-floor-tracking",
  "production-schedule-template": "scheduling-template",
  "custom-vs-off-the-shelf-erp": "custom-vs-off-the-shelf",
};

export type MfgArt = { src: string; alt: string; width: number; height: number };

/** The page art for a guide slug or "manufacturing-hub", once its file exists. */
export function mfgArt(name: string): MfgArt | null {
  const src = `/manufacturing/${FILE[name] ?? name}.webp`;
  if (!existsSync(join(process.cwd(), "public", src))) return null;
  return { src, alt: ALT[name] ?? "", width: 1086, height: 362 };
}

/** The share-card crop as a data URI for renderOgImage (it can't read WebP). */
export async function mfgOgArt(name: string): Promise<string | undefined> {
  const { readFile } = await import("node:fs/promises");
  const jpg = await readFile(join(process.cwd(), "src/assets/og-art/manufacturing", `${FILE[name] ?? name}.jpg`)).catch(() => null);
  return jpg ? `data:image/jpeg;base64,${jpg.toString("base64")}` : undefined;
}
