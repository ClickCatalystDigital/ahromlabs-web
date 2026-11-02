// Keeps each hub serving the market it is for (docs/knowledge-base-roadmap.md): the AI assistant pages are for India
// and North America alike, so none may lean on one market's words; the ASME and manufacturing hubs are for North
// America, so none may lean Indian. Signals are counted per 1,000 words of the page's own text (frontmatter answer +
// body); a page "leans" when one market's rate is 3+ and over twice the other's. Runs in `npm run content:build`.
import { getContent, type ContentKind } from "../src/lib/content";

const IN = [/₹/g, /\bGST\b/g, /\bTally/g, /\bIBR\b/g, /\blakh/gi, /\bcrore/gi, /\bTDS\b/g, /e-way/gi, /\bIndia\b/g, /\bIndian\b/g, /Ahmedabad/g, /\bDPDP\b/g, /\bHSN\b/g, /Hinglish/g];
const US = [/\$\d/g, /QuickBooks/g, /sales tax/gi, /\bASME\b/g, /\bUS\b/g, /United States/g, /\bCanad/g, /\bFTC\b/g, /\bCCPA\b/g];
const rate = (res: RegExp[], text: string, words: number) => (res.reduce((n, re) => n + (text.match(re)?.length ?? 0), 0) * 1000) / words;
function lean(text: string): "IN" | "NA" | null {
  const words = text.split(/\s+/).length || 1;
  const i = rate(IN, text, words), u = rate(US, text, words);
  return i >= 3 && i > 2 * u ? "IN" : u >= 3 && u > 2 * i ? "NA" : null;
}

const RULES: { kind: ContentKind; allowed: (l: "IN" | "NA" | null) => boolean; want: string }[] = [
  { kind: "ai-assistant", allowed: (l) => l === null, want: "common to India and North America" },
  { kind: "asme", allowed: (l) => l !== "IN", want: "North American (or common)" },
  { kind: "manufacturing", allowed: (l) => l !== "IN", want: "North American (or common)" },
];
const fail: string[] = [];
for (const r of RULES) for (const e of getContent(r.kind)) {
  const l = lean(`${e.answer}\n${e.body}`);
  if (!r.allowed(l)) fail.push(`${r.kind}/${e.slug} leans ${l}; this hub is ${r.want}`);
}
if (fail.length) { console.error(`topics: ${fail.length} page(s) lean the wrong way:\n${fail.join("\n")}`); process.exit(1); }
console.log("topics: AI pages common, US hubs not India-leaning");
