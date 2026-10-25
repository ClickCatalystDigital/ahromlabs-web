// Finds words that run together when a page is read as plain text, the way
// search crawlers and AI fetchers extract it: block tags become line breaks,
// inline tags (a, span, strong…) vanish. "pujan@ahromlabs.comAhmedabad" or
// "02An AI model" means two inline elements touch with no space between them.
// Usage: node scripts/text-joins.check.mjs [baseUrl]  (default: the built pages in .next)
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const BLOCK = "address|article|aside|blockquote|br|dd|details|div|dl|dt|figcaption|figure|footer|form|h[1-6]|header|hr|li|main|nav|ol|p|pre|section|summary|table|td|th|tr|ul|button|option|label";

export function pageText(html) {
  return html
    .replace(/<(script|style|svg|noscript|template)\b[\s\S]*?<\/\1>/gi, " ")
    .replace(new RegExp(`</?(?:${BLOCK})\\b[^>]*>`, "gi"), "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&").replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"').replace(/&nbsp;/g, " ");
}

// lower→Upper ("comAhmedabad", "SalesBuying") and digit→Capital ("02An").
// ponytail: also flags real camelCase words (TallyPrime, ClickCatalyst); they're allow-listed.
const ALLOW = /TallyPrime|ClickCatalyst|ClickHub|LinkedIn|GitHub|JavaScript|TypeScript|OpenRouter|PySpark|SageMaker|YouTube|WhatsApp|PostgreSQL|SQLite|iPhone|eWay|McKinsey|DeepSeek|OpenAI|LibreOffice|ChatGPT|PowerBI|BizMitra|NextJS|FastAPI|IndiaMART|DMAIC|BPMN|PDFs|BOQs|BOMs|IDs|GSTINs|ERPs|APIs|MCQs|URLs|SKUs|MTCs|CAs|OEMs|SMEs|MSMEs|PCBs|KPIs|POs|GRNs|TDS|IBR|SoftwareSuggest|AhromLabs|IoT|JustDial|TradeIndia|ProftCode|classify[A-Za-z]*Error|mcpServers|\d+(?:st|nd|rd|th|[KMLx%]|kg|mm|ft|cm|sqft|GB|MB|Cr|AM|PM|D|V|W|A|Hz)\b|Rs|Q\d|FY\d|Form[A-Z]|[A-Z]{2,}s\b/;

export function findJoins(text) {
  const hits = [];
  for (const m of text.matchAll(/\S*(?:[a-z][A-Z]|\d[A-Z][a-z])\S*/g)) {
    const w = m[0];
    const stripped = w.replace(new RegExp(ALLOW.source, "g"), "");
    if (/[a-z][A-Z]|\d[A-Z][a-z]/.test(stripped)) hits.push(w);
  }
  return hits;
}

function htmlFiles(dir) {
  return readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    return statSync(p).isDirectory() ? htmlFiles(p) : p.endsWith(".html") ? [p] : [];
  });
}

if (import.meta.url === `file://${process.argv[1]}`) {
  // Self-check of the two rules.
  console.assert(findJoins(pageText("<p><a>x@y.com</a><span>Ahmedabad</span></p>")).length === 1, "inline join missed");
  console.assert(findJoins(pageText("<ul><li>Services</li><li>Industries</li></ul>")).length === 0, "block join flagged");
  console.assert(findJoins(pageText("<p><span>02</span>An AI</p>")).length === 1, "step number join missed");

  const files = htmlFiles(".next/server/app");
  const seen = new Map();
  for (const f of files) {
    for (const w of findJoins(pageText(readFileSync(f, "utf8")))) {
      if (!seen.has(w)) seen.set(w, f.replace(".next/server/app", ""));
    }
  }
  for (const [w, f] of seen) console.log(`JOIN  ${w}   (${f})`);
  console.log(`${files.length} pages, ${seen.size} distinct run-together words`);
  process.exit(seen.size ? 1 : 0);
}
