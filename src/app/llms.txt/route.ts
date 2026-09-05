import { getContent, type ContentEntry } from "@/lib/content";

// Same shape as knowledge.json/route.ts: force-static keeps this prerendered at
// build time rather than falling back to dynamic rendering.
export const dynamic = "force-static";

const HEADER = `# Ahrom Labs

> Ahrom Labs builds custom operational infrastructure for businesses. We model
> a business's entities, relationships, workflows, and decisions as one
> coherent system before building anything on top of it. We are an
> infrastructure engineering practice working with a small number of client
> engagements at a time, not a software product and not a general IT
> consultancy.

## Pages

- [Home](https://ahromlabs.com/): Positioning, the problem with disconnected business systems, our approach, and how to start a conversation.
- [Approach](https://ahromlabs.com/approach): The four principles behind how we model a business before automating it.
- [Systems](https://ahromlabs.com/systems): A glossary of the vocabulary we use to model a business: entities, relationships, workflows, permissions, decisions, evidence, and related terms.
- [About](https://ahromlabs.com/about): Who this practice is for and how an engagement runs.
- [Notes](https://ahromlabs.com/notes): Engineering notes from real client work.
- [Patterns](https://ahromlabs.com/patterns): Reusable decisions extracted from real engagements.

## Machine-readable corpus

- [knowledge.json](https://ahromlabs.com/knowledge.json): Every term, note, and pattern with its full frontmatter and body, as one JSON array.
`;

const FOOTER = `
## Notes for automated readers

Ahrom Labs is a services business, not a SaaS product. There is no self-serve
signup or pricing page; engagement starts by contacting us through the form
on the home page.
`;

// `answer` comes from YAML folded scalars, so it arrives with embedded newlines
// that would break one-entry-per-line.
const line = (segment: string) => (entry: ContentEntry) =>
  `- [${entry.title}](https://ahromlabs.com/${segment}/${entry.slug}): ${entry.answer.replace(/\s+/g, " ").trim()}`;

const newestFirst = (a: ContentEntry, b: ContentEntry) => b.published.localeCompare(a.published);

export function GET() {
  const section = (heading: string, kind: "note" | "pattern", segment: string) =>
    `\n## ${heading}\n\n${[...getContent(kind)].sort(newestFirst).map(line(segment)).join("\n")}\n`;

  const body =
    HEADER +
    section("Engineering notes", "note", "notes") +
    section("Patterns", "pattern", "patterns") +
    FOOTER;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
