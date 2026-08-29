import contentData from "./content-data.generated.json";

export type ContentKind = "term" | "note" | "pattern";

export type ContentEntry = {
  kind: ContentKind;
  slug: string;
  title: string;
  answer: string;
  domain?: string[];
  systems?: string[];
  patterns?: string[];
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
