import contentData from "./content-data.generated.json";

export type ContentKind = "term" | "note" | "pattern" | "industry" | "guide" | "boq" | "erp" | "ai-assistant" | "asme" | "manufacturing" | "sales-tax" | "construction" | "interiors";

export type ContentEntry = {
  kind: ContentKind;
  slug: string;
  title: string;
  // Guides: 3–5 related pages on this site, at least two outside the guide's own section (src/lib/related.ts).
  related?: string[];
  // Short <title> for search results (≤ 60 characters, checked at build) when the headline is longer.
  metaTitle?: string;
  answer: string;
  domain?: string[];
  systems?: string[];
  patterns?: string[];
  // Industry-only edges. notes/patterns are checked by build-content.mjs;
  // clients/services by resolveIndustryEdges() in src/lib/industries.ts.
  notes?: string[];
  clients?: string[];
  services?: string[];
  // Industry-only: who the page is for, in the buyer's own words.
  audience?: string;
  // Industry-only: how work moves through the system, step by step (FlowFigure).
  flow?: { step: string; detail: string }[];
  // Optional <meta> description (≤160 chars, checked at build); falls back to `answer`.
  description?: string;
  // Industry-only: a real photo from the engagement, under public/.
  image?: { src: string; alt: string; width?: number; height?: number; caption?: string };
  // Industry-only: a public, hands-on demo of the system this page describes.
  demo?: { url: string; label: string };
  // Industry-only: the demo's narrated tour on YouTube (id is the 11-character video id, duration ISO 8601).
  video?: { id: string; name: string; description: string; duration: string; uploaded: string };
  evidence?: { metric: string; value: string }[];
  // Guides (content/ibr/, and content/boq/ where `checks` are optional): the official documents it relies on, the verbatim
  // quotes scripts/check-ibr-quotes.mjs checks against them, and when a person
  // last checked the page against the Gazette.
  sources?: { title: string; publisher: string; url: string; date: string }[];
  checks?: { reg: string; quote: string; doc?: string }[]; // IBR: "act" for the Boilers Act; BOQ: a key in scripts/check-boq-quotes.mjs DOCS
  checked?: string;
  // Notes and industries: IBR guides they lead to (build-checked).
  guides?: string[];
  order?: number;
  // ASME guides (content/asme/): hub group, the question as people search it, an embedded tool.
  // Manufacturing guides (content/manufacturing/) use the same fields with their own groups and tools.
  group?: "code" | "certification" | "welding" | "design" | "materials" | "bridge" | "choosing" | "quickbooks" | "planning" | "inventory" | "nexus" | "exemptions" | "systems" | "us" | "india";
  question?: string;
  tool?: "hydrotest" | "shell" | "continuity" | "jobcost" | "schedule" | "nexus";
  published: string;
  updated: string;
  body: string;  // Industry-only: North America's version (content/industries/us/<slug>.md), served at /us/industries/<slug>.
  // Its fields replace the India page's; see industryFor() in src/lib/industries.ts.
  na?: Partial<Omit<ContentEntry, "na">> & { title: string; audience: string; answer: string; body: string; updated: string };
};

// content-data.generated.json is produced by scripts/build-content.mjs (run
// before dev/build/preview/deploy — see package.json) and committed, so
// standalone tooling (tsc, editors) resolves it before that script has ever
// run. It's silently overwritten by every real entry point, so a stale
// committed copy can't drift for long. Importing it as a normal JSON module
// means the bundler resolves and includes it like any other static asset —
// no filesystem access happens here or at runtime.
export function getContent(kind: ContentKind): ContentEntry[] {
  return (contentData as ContentEntry[]).filter((entry) => entry.kind === kind);
}

// Locale and timezone are both pinned. Content dates are date-only strings, which
// Date parses as UTC midnight — without timeZone:"UTC" a build machine west of
// Greenwich bakes the previous day into the prerendered HTML.
const dateFormat = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
  timeZone: "UTC",
});

export function formatDate(iso: string): string {
  return dateFormat.format(new Date(iso));
}

// A term earns its own page only once it has body content beyond the one-line
// `answer` the glossary already shows. Without this gate, 11 near-empty pages
// would ship as thin content. Write a body in content/terms/<slug>.md and the
// page, its sitemap entry, its schema and its llms.txt line all appear together.
export function termHasPage(term: ContentEntry): boolean {
  return term.body.trim().length > 0;
}
