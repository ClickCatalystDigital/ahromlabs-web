// Writes the BOQ item library as a JS module for savistar-ops (lib/boq-library.js), the
// starting point for Savistar's own library (QUOTATIONS-PLAN.md there). ahrom-labs stays the source:
//   npx jiti scripts/boq-export-savistar.ts ../savistar-ops/lib/boq-library.js
import { writeFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { boqItems, trades } from "../src/lib/boq";

const items = boqItems.map((i) => ({
  library_id: i.id,
  trade: trades.find((t) => t.slug === i.trade)!.name,
  name: i.name,
  unit: i.unit,
  units: (i.units ?? []).join(","),
  basis_required: i.basis ? 1 : 0,
  measure: i.measure,
  spec_keys: i.spec.join(","),
  omits: i.omits.join("; "),
  description: i.description,
  match: i.match.join(","),
}));
const version = createHash("sha256").update(JSON.stringify(items)).digest("hex").slice(0, 10);
const out = process.argv[2];
if (!out) throw new Error("usage: npx jiti scripts/boq-export-savistar.ts <path to savistar-ops/lib/boq-library.js>");
writeFileSync(
  out,
  `// GENERATED from ahrom-labs src/lib/boq.ts (npx jiti scripts/boq-export-savistar.ts <this file>). Do not edit here:\n` +
    `// this is the central library Savistar's own copy (table boq_items) starts from and syncs with (lib/boq-sync.js).\n` +
    `export const BOQ_LIBRARY_VERSION = ${JSON.stringify(version)};\n` +
    `export const BOQ_LIBRARY = ${JSON.stringify(items, null, 2)};\n`,
);
console.log(`boq library ${version}: ${items.length} items -> ${out}`);
