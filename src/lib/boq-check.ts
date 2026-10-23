// The BOQ checker behind /boq/check: rows pasted from Excel in, each line
// matched to an item in the library (src/lib/boq.ts) and flagged where it
// leaves something open. Pure functions, no AI, no network: it runs in the
// visitor's browser and the rows never leave it. Self-check:
//   npx jiti scripts/boq.check.ts
import { boqItems, normalizeUnit, SPEC, BASIS_TEST, UNIT_LABEL, type BoqItem, type Unit } from "./boq";

// Excel copies cells as tab-separated text. A cell holding a tab, newline or
// quote comes wrapped in double quotes, with inner quotes doubled.
export function parseTsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = "";
  let quoted = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (quoted) {
      if (c === '"' && text[i + 1] === '"') { cell += '"'; i++; }
      else if (c === '"') quoted = false;
      else cell += c;
    } else if (c === '"' && cell === "") quoted = true;
    else if (c === "\t") { row.push(cell); cell = ""; }
    else if (c === "\n" || c === "\r") {
      if (c === "\r" && text[i + 1] === "\n") i++;
      row.push(cell); rows.push(row); row = []; cell = "";
    } else cell += c;
  }
  if (cell !== "" || row.length) { row.push(cell); rows.push(row); }
  return rows.filter((r) => r.some((c) => c.trim() !== ""));
}

export function parseNum(s: string | undefined): number | undefined {
  if (s === undefined) return undefined;
  const t = s.replace(/[₹,\s]|rs\.?/gi, "");
  if (t === "" || !/^-?\d*\.?\d+$/.test(t)) return undefined;
  return Number(t);
}

type Cols = { no?: number; desc: number; unit?: number; qty?: number; rate?: number; basis?: number };

const HEAD = {
  desc: /descri|particular|specification|item of work|scope|work/i,
  unit: /^\s*(unit|units|uom)\b/i,
  qty: /qty|quantity/i,
  rate: /rate/i,
  no: /^\s*(s\.?\s*no|sr\.?|item\s*no|no\.?|#)\s*$/i,
  basis: /basis|measured|measurement/i,
};

// A header row names its columns; without one, guess from the cells.
function findHeader(rows: string[][]): { at: number; cols: Cols } | undefined {
  for (let r = 0; r < Math.min(rows.length, 10); r++) {
    const find = (re: RegExp) => {
      const i = rows[r].findIndex((c) => re.test(c));
      return i < 0 ? undefined : i;
    };
    const desc = find(HEAD.desc);
    const unit = find(HEAD.unit);
    if (desc !== undefined && (unit !== undefined || find(HEAD.qty) !== undefined)) {
      return { at: r, cols: { desc, unit, qty: find(HEAD.qty), rate: find(HEAD.rate), no: find(HEAD.no), basis: find(HEAD.basis) } };
    }
  }
  return undefined;
}

function guessCols(row: string[]): Cols {
  let desc = 0;
  row.forEach((c, i) => { if (/[a-z]/i.test(c) && c.length > row[desc].length) desc = i; });
  const unit = row.findIndex((c, i) => i !== desc && normalizeUnit(c.trim()) !== undefined);
  const nums = row.map((c, i) => (i > Math.max(desc, unit) && parseNum(c) !== undefined ? i : -1)).filter((i) => i >= 0);
  return { desc, unit: unit < 0 ? undefined : unit, qty: nums[0], rate: nums[1] };
}

export function matchItem(text: string): BoqItem | undefined {
  const t = ` ${text.toLowerCase()} `;
  let best: BoqItem | undefined;
  let bestPos = Infinity;
  let bestLen = 0;
  // A line names its subject first ("Access panel in the false ceiling", "Loft
  // above wardrobe"), so the earliest keyword wins; at the same position the
  // longer one is more specific ("door frame" beats "door").
  // A keyword must start a word ("led" not inside "concealed"); it may end
  // mid-word, so "dismantl" finds "dismantling".
  const at = (k: string) => {
    for (let i = t.indexOf(k); i >= 0; i = t.indexOf(k, i + 1)) if (!/[a-z0-9]/.test(t[i - 1])) return i;
    return -1;
  };
  for (const item of boqItems) {
    for (const k of item.match) {
      const pos = at(k);
      if (pos < 0) continue;
      if (pos < bestPos || (pos === bestPos && k.length > bestLen)) { best = item; bestPos = pos; bestLen = k.length; }
    }
  }
  return best;
}

export type FlagKind = "unmatched" | "vague" | "no-unit" | "unit" | "spec" | "basis" | "qty";
export type Flag = { kind: FlagKind; text: string };

export type Line = {
  row: number; // 1-based row in the pasted sheet
  no?: string;
  description: string;
  unitRaw?: string;
  unit?: Unit;
  qty?: number;
  rate?: number;
  item?: BoqItem;
  flags: Flag[];
};

export type Checked = { lines: Line[]; headings: { row: number; text: string }[] };

// `basis` is a separate "Measurement basis" column, when the sheet has one.
export function checkLine(description: string, unitRaw?: string, qtyRaw?: string, basis = ""): { item?: BoqItem; unit?: Unit; flags: Flag[] } {
  const flags: Flag[] = [];
  const item = matchItem(description);
  const unit = unitRaw ? normalizeUnit(unitRaw.trim()) : undefined;

  if (!item) flags.push({ kind: "unmatched", text: "Not in the item library, so only the basics were checked." });
  if (description.trim().split(/\s+/).length < 5) {
    flags.push({ kind: "vague", text: "Too short to price the same way twice. Name the material, size and finish." });
  }
  if (!unitRaw?.trim()) flags.push({ kind: "no-unit", text: "No unit." });
  else if (!unit) flags.push({ kind: "unit", text: `"${unitRaw.trim()}" isn't a unit this checker knows.` });
  else if (item && unit !== item.unit && !item.units?.includes(unit)) {
    flags.push({ kind: "unit", text: `${item.name} is usually priced in ${UNIT_LABEL[item.unit]}, not ${UNIT_LABEL[unit]}.` });
  }
  if (item) {
    for (const key of item.spec) {
      if (!SPEC[key].test.test(description)) flags.push({ kind: "spec", text: `Missing: ${SPEC[key].label.toLowerCase()} (${SPEC[key].hint}).` });
    }
    if (item.basis && !BASIS_TEST.test(description) && !basis.trim()) {
      flags.push({ kind: "basis", text: "Doesn't say how it's measured. There's no standard for this item, so the line has to." });
    }
  }
  if (unitRaw?.trim() && qtyRaw !== undefined && parseNum(qtyRaw) === undefined) flags.push({ kind: "qty", text: "No quantity." });
  return { item, unit, flags };
}

export function checkSheet(text: string): Checked {
  const rows = parseTsv(text);
  const header = findHeader(rows);
  const start = header ? header.at + 1 : 0;
  const lines: Line[] = [];
  const headings: Checked["headings"] = [];
  for (let r = start; r < rows.length; r++) {
    const row = rows[r];
    const cols = header?.cols ?? guessCols(row);
    const description = (row[cols.desc] ?? "").trim();
    const unitRaw = cols.unit !== undefined ? row[cols.unit]?.trim() : undefined;
    const qtyRaw = cols.qty !== undefined ? row[cols.qty] : undefined;
    if (!description) continue;
    // A row with words but no unit or quantity is a section heading ("KITCHEN").
    if (!unitRaw && parseNum(qtyRaw) === undefined && description.split(/\s+/).length <= 4) {
      headings.push({ row: r + 1, text: description });
      continue;
    }
    const basis = cols.basis !== undefined ? (row[cols.basis] ?? "") : "";
    const { item, unit, flags } = checkLine(description, unitRaw, qtyRaw, basis);
    lines.push({
      row: r + 1,
      no: cols.no !== undefined ? row[cols.no]?.trim() : undefined,
      description,
      unitRaw,
      unit,
      qty: parseNum(qtyRaw),
      rate: cols.rate !== undefined ? parseNum(row[cols.rate]) : undefined,
      item,
      flags,
    });
  }
  return { lines, headings };
}

// Quotation arithmetic. Paise are rounded per tax line, as on a GST invoice.
const round2 = (n: number) => Math.round(n * 100) / 100;

export function quoteTotals(amounts: number[], gstRate: number, interState: boolean) {
  const subtotal = round2(amounts.reduce((s, a) => s + a, 0));
  const taxes = interState
    ? [{ label: `IGST @ ${gstRate}%`, amount: round2((subtotal * gstRate) / 100) }]
    : [
        { label: `CGST @ ${gstRate / 2}%`, amount: round2((subtotal * gstRate) / 200) },
        { label: `SGST @ ${gstRate / 2}%`, amount: round2((subtotal * gstRate) / 200) },
      ];
  const total = round2(subtotal + taxes.reduce((s, t) => s + t.amount, 0));
  return { subtotal, taxes, total };
}

// Indian numbering (lakh, crore), from shanti-ops lib/service-expense.mjs.
const ONES = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
const TENS = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
const below100 = (n: number) => (n < 20 ? ONES[n] : `${TENS[Math.floor(n / 10)]}${n % 10 ? ` ${ONES[n % 10]}` : ""}`);
const below1000 = (n: number) =>
  n < 100 ? below100(n) : `${ONES[Math.floor(n / 100)]} Hundred${n % 100 ? ` ${below100(n % 100)}` : ""}`;

export function amountInWords(amount: number): string {
  if (!amount) return "";
  const rupees = Math.floor(amount);
  const paise = Math.round((amount - rupees) * 100);
  const parts: string[] = [];
  const crore = Math.floor(rupees / 10000000);
  const lakh = Math.floor((rupees % 10000000) / 100000);
  const thousand = Math.floor((rupees % 100000) / 1000);
  const rest = rupees % 1000;
  if (crore) parts.push(`${crore < 1000 ? below1000(crore) : String(crore)} Crore`);
  if (lakh) parts.push(`${below100(lakh)} Lakh`);
  if (thousand) parts.push(`${below100(thousand)} Thousand`);
  if (rest) parts.push(below1000(rest));
  return `Rupees ${parts.join(" ") || "Zero"}${paise ? ` and ${below100(paise)} Paise` : ""} Only`;
}
