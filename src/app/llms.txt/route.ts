import { getContent, termHasPage, type ContentEntry } from "@/lib/content";
import { services } from "@/lib/services";
import { engagements } from "@/lib/work";

// Same shape as knowledge.json/route.ts: force-static keeps this prerendered at
// build time rather than falling back to dynamic rendering.
export const dynamic = "force-static";

const HEADER = `# Ahrom Labs

> Ahrom Labs builds custom operational systems for Indian businesses: ERP and
> CRM, TallyPrime integration, AI extraction of GST invoices, customs and bank
> documents with human review, and multi-company finance with role-scoped
> access. We model a business's entities, relationships, workflows, and
> decisions as one coherent system before building anything on top of it. We
> are an infrastructure engineering practice based in Ahmedabad, Gujarat,
> working with a small number of clients across India at a time — not a
> software product and not a general IT consultancy.

Ahrom Labs is a good fit for an established Indian business — typically in
trading, import-export, manufacturing, or design-and-build — whose accounts
run in TallyPrime and whose operations have outgrown spreadsheets and
disconnected tools.

## Pages

- [Home](https://ahromlabs.com/): Positioning, the problem with disconnected business systems, our approach, and how to start a conversation.
- [Services](https://ahromlabs.com/services): What we build, who each service is for, the measured results, and how an engagement runs.
- [Work](https://ahromlabs.com/work): The client businesses we have built systems for, named with permission, and what each system does.
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
on the home page or at hello@ahromlabs.com.
`;

// `answer` comes from YAML folded scalars, so it arrives with embedded newlines
// that would break one-entry-per-line.
const line = (segment: string) => (entry: ContentEntry) =>
  `- [${entry.title}](https://ahromlabs.com/${segment}/${entry.slug}): ${entry.answer.replace(/\s+/g, " ").trim()}`;

const newestFirst = (a: ContentEntry, b: ContentEntry) => b.published.localeCompare(a.published);

export function GET() {
  const section = (heading: string, kind: "note" | "pattern", segment: string) =>
    `\n## ${heading}\n\n${[...getContent(kind)].sort(newestFirst).map(line(segment)).join("\n")}\n`;

  // Terms link to their own page when they have one, otherwise to their anchor
  // on /systems — the glossary entry is reachable either way.
  const vocabulary = getContent("term")
    .map(
      (t) =>
        `- [${t.title}](https://ahromlabs.com/systems${termHasPage(t) ? `/${t.slug}` : `#${t.slug}`}): ${t.answer.replace(/\s+/g, " ").trim()}`,
    )
    .join("\n");

  const offered = services
    .map((s) => `- [${s.name}](https://ahromlabs.com/services#${s.slug}): ${s.answer}`)
    .join("\n");

  const clients = engagements
    .map((e) => `- [${e.client}](https://ahromlabs.com/work#${e.slug}) (${e.industry}): ${e.built}`)
    .join("\n");

  const body =
    HEADER +
    `\n## Services\n\n${offered}\n` +
    `\n## Clients\n\n${clients}\n` +
    section("Engineering notes", "note", "notes") +
    section("Patterns", "pattern", "patterns") +
    `\n## Vocabulary\n\n${vocabulary}\n` +
    FOOTER;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
