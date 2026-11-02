// Keeps each hub serving the market it is for (docs/knowledge-base-roadmap.md): the AI assistant pages are for India
// and North America alike, so none may lean on one market's words; the ASME and manufacturing hubs are for North
// America, so none may lean Indian. Signals are counted per 1,000 words of the page's own text (frontmatter answer +
// body); a page "leans" when one market's rate is 3+ and over twice the other's. Runs in `npm run content:build`.
import { readFileSync } from "node:fs";
import { getContent, type ContentKind } from "../src/lib/content";

const IN = [/₹/g, /\bGST\b/g, /\bTally/g, /\bIBR\b/g, /\blakh/gi, /\bcrore/gi, /\bTDS\b/g, /e-way/gi, /\bIndia\b/g, /\bIndian\b/g, /Ahmedabad/g, /\bDPDP\b/g, /\bHSN\b/g, /Hinglish/g];
const US = [/\$\d/g, /QuickBooks/g, /sales tax/gi, /\bASME\b/g, /\bUS\b/g, /United States/g, /\bCanad/g, /\bFTC\b/g, /\bCCPA\b/g];
const rate = (res: RegExp[], text: string, words: number) => (res.reduce((n, re) => n + (text.match(re)?.length ?? 0), 0) * 1000) / words;
function lean(text: string): "IN" | "NA" | null {
  const words = text.split(/\s+/).length || 1;
  const i = rate(IN, text, words), u = rate(US, text, words);
  return i >= 3 && i > 2 * u ? "IN" : u >= 3 && u > 2 * i ? "NA" : null;
}

// Every content kind and the market(s) its pages may lean toward. A new hub must be added here (the build fails on an
// unlisted kind), so no hub's market is left implicit.
type Lean = "IN" | "NA" | null;
const common = (l: Lean) => l === null, notIN = (l: Lean) => l !== "IN", notNA = (l: Lean) => l !== "NA", any = () => true;
const RULES: Record<ContentKind, { allowed: (l: Lean) => boolean; want: string }> = {
  "ai-assistant": { allowed: common, want: "common to India and North America" },
  asme: { allowed: notIN, want: "North American (or common)" },
  manufacturing: { allowed: notIN, want: "North American (or common)" },
  guide: { allowed: notNA, want: "Indian (IBR)" },
  boq: { allowed: notNA, want: "Indian (BOQ)" },
  erp: { allowed: notNA, want: "Indian (ERP requirements)" },
  industry: { allowed: notNA, want: "Indian (client industries)" },
  // Notes and patterns come from Indian client work, so they may lean Indian, but never US-only.
  note: { allowed: notNA, want: "Indian or common" },
  pattern: { allowed: notNA, want: "Indian or common" },
  // The glossary serves both markets: a term may lean either way.
  term: { allowed: any, want: "either" },
};
const fail: string[] = [];
const kinds = new Set((JSON.parse(readFileSync("src/lib/content-data.generated.json", "utf-8")) as { kind: ContentKind }[]).map((e) => e.kind));
for (const kind of kinds) if (!RULES[kind]) fail.push(`content kind "${kind}" has no market rule in scripts/topics.check.ts`);
for (const [kind, r] of Object.entries(RULES) as [ContentKind, (typeof RULES)[ContentKind]][]) for (const e of getContent(kind)) {
  const l = lean(`${e.answer}\n${e.body}`);
  if (!r.allowed(l)) fail.push(`${kind}/${e.slug} leans ${l}; this hub is ${r.want}`);
}
if (fail.length) { console.error(`topics: ${fail.length} page(s) lean the wrong way:\n${fail.join("\n")}`); process.exit(1); }
console.log(`topics: ${kinds.size} content kinds, every page in its market`);
