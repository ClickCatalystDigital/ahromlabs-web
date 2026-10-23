// Self-check for the BOQ checker (src/lib/boq-check.ts) and item library, no network:
//   npx jiti scripts/boq.check.ts
import assert from "node:assert/strict";
import { boqItems, trades, IS, SPEC, normalizeUnit } from "../src/lib/boq";
import { parseTsv, parseNum, matchItem, checkLine, checkSheet, quoteTotals, amountInWords } from "../src/lib/boq-check";

// Library integrity: unique ids, known trades, IS refs and spec keys resolve,
// and every ready-made description passes its own item's checks.
const ids = new Set<string>();
for (const item of boqItems) {
  assert.ok(!ids.has(item.id), `duplicate id ${item.id}`);
  ids.add(item.id);
  assert.ok(item.id.startsWith(`${item.trade}.`), `${item.id}: id must start with its trade`);
  assert.ok(trades.some((t) => t.slug === item.trade), `${item.id}: unknown trade`);
  for (const ref of item.is ?? []) assert.ok(IS[ref], `${item.id}: unknown IS ref ${ref}`);
  for (const key of item.spec) assert.ok(SPEC[key], `${item.id}: unknown spec ${key}`);
  // [brackets] mark the values a designer fills in; filled, the line must pass.
  const own = checkLine(item.description.replace(/[[\]]/g, ""), item.unit, "1");
  assert.equal(own.item?.id, item.id, `${item.id}: its own description matches ${own.item?.id}`);
  assert.deepEqual(own.flags.map((f) => f.kind), [], `${item.id}: its own description is flagged: ${own.flags.map((f) => f.text).join(" | ")}`);
}
for (const t of trades) assert.ok(boqItems.some((i) => i.trade === t.slug), `trade ${t.slug} has no items`);

// Units as people write them.
assert.equal(normalizeUnit("Sq.Ft."), "sqft");
assert.equal(normalizeUnit("RFT"), "rft");
assert.equal(normalizeUnit("Nos."), "nos");
assert.equal(normalizeUnit("L.S."), "ls");
assert.equal(normalizeUnit("bags"), undefined);

// Numbers with rupee signs and Indian commas.
assert.equal(parseNum("₹ 1,25,000.50"), 125000.5);
assert.equal(parseNum("12"), 12);
assert.equal(parseNum("TBD"), undefined);

// Excel quoting: a cell with a line break inside comes wrapped in quotes.
assert.deepEqual(parseTsv('1\t"Wardrobe\nwith loft"\tsqft\t40\r\n2\tLoft\tsqft\t12'), [
  ["1", "Wardrobe\nwith loft", "sqft", "40"],
  ["2", "Loft", "sqft", "12"],
]);

// Specific beats general.
assert.equal(matchItem("Door frame in sal wood")?.id, "carpentry.door-frame");
assert.equal(matchItem("Flush door 35mm")?.id, "carpentry.flush-door");
assert.equal(matchItem("Kitchen wall cabinet 700 high")?.id, "modular-kitchen.wall");
assert.equal(matchItem("Plumbing points in CPVC")?.id, "plumbing.piping");
assert.equal(matchItem("Grid ceiling 600x600")?.id, "false-ceiling.grid");
assert.equal(matchItem("Site cleaning"), undefined);

// A typical vague line gets the flags a designer would want.
const vague = checkLine("Wardrobe in plywood with laminate", "rft", "40");
assert.equal(vague.item?.id, "wardrobes.hinged");
const kinds = vague.flags.map((f) => f.kind);
assert.ok(kinds.includes("basis"));
assert.ok(vague.flags.some((f) => f.kind === "spec" && /board/.test(f.text)));
assert.ok(vague.flags.some((f) => f.kind === "spec" && /thickness/.test(f.text)));
assert.ok(!vague.flags.some((f) => f.kind === "spec" && /finish/.test(f.text)), "laminate counts as a finish");
assert.ok(!kinds.includes("unit"), "running ft is an accepted wardrobe unit");
assert.ok(checkLine("Wardrobe 18 mm BWP ply, laminate, edge band, Hettich, measured by elevation", "point", "4").flags.some((f) => f.kind === "unit"));

// A sheet with a header row, a section heading and lines.
const sheet = checkSheet(
  [
    "S.No\tDescription of work\tUnit\tQty\tRate\tAmount",
    "\tKITCHEN\t\t\t\t",
    "1\tKitchen base cabinets in 18 mm IS 303 BWP plywood, acrylic shutters, 2 mm PVC edge band, Hettich hinges, measured by running length excluding countertop\trft\t12\t4500\t54000",
    "2\tCountertop\tsft\t20\t\t",
  ].join("\n"),
);
assert.deepEqual(sheet.headings.map((h) => h.text), ["KITCHEN"]);
assert.equal(sheet.lines.length, 2);
assert.equal(sheet.lines[0].item?.id, "modular-kitchen.base");
assert.deepEqual(sheet.lines[0].flags, []);
assert.equal(sheet.lines[0].qty, 12);
assert.equal(sheet.lines[0].rate, 4500);
assert.equal(sheet.lines[1].item?.id, "modular-kitchen.countertop");
assert.ok(sheet.lines[1].flags.some((f) => f.kind === "vague"));

// No header: columns guessed from the cells.
const bare = checkSheet("1\tGypsum false ceiling 12.5 mm on GI framing, measured by plan area excluding coves\tsqft\t450\t95");
assert.equal(bare.lines[0].item?.id, "false-ceiling.gypsum");
assert.equal(bare.lines[0].qty, 450);
assert.equal(bare.lines[0].rate, 95);

// The site's own template, pasted back with a quantity: the basis column counts.
const fromTemplate = checkSheet("S.No\tDescription\tUnit\tMeasurement basis\tQty\tRate\n1\tWardrobe in 18 mm BWP ply, laminate, 2 mm PVC edge band, Hettich hinges\tsq ft\tFront elevation, loft excluded\t40\t1400");
assert.equal(fromTemplate.lines[0].unit, "sqft");
assert.deepEqual(fromTemplate.lines[0].flags, []);

// GST split and totals.
assert.deepEqual(quoteTotals([54000, 1000], 18, false), {
  subtotal: 55000,
  taxes: [{ label: "CGST @ 9%", amount: 4950 }, { label: "SGST @ 9%", amount: 4950 }],
  total: 64900,
});
assert.deepEqual(quoteTotals([1000.5], 18, true), { subtotal: 1000.5, taxes: [{ label: "IGST @ 18%", amount: 180.09 }], total: 1180.59 });

// Amount in words: the shanti-ops cases.
assert.equal(amountInWords(0), "");
assert.equal(amountInWords(125000), "Rupees One Lakh Twenty Five Thousand Only");
assert.equal(amountInWords(5405), "Rupees Five Thousand Four Hundred Five Only");
assert.equal(amountInWords(12345678.5), "Rupees One Crore Twenty Three Lakh Forty Five Thousand Six Hundred Seventy Eight and Fifty Paise Only");

console.log(`boq: ${boqItems.length} items in ${trades.length} trades, checker OK`);
