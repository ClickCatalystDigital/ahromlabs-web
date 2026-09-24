import contentData from "./content-data.generated.json";

export type ContentKind = "term" | "note" | "pattern" | "industry";

export type ContentEntry = {
  kind: ContentKind;
  slug: string;
  title: string;
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
  image?: { src: string; alt: string };
  evidence?: { metric: string; value: string }[];
  order?: number;
  published: string;
  updated: string;
  body: string;
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
