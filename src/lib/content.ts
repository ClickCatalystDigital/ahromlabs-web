import fs from "node:fs";
import path from "node:path";
import { load as loadYaml } from "js-yaml";

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

const KIND_DIRS: Record<ContentKind, string> = {
  term: "terms",
  note: "notes",
  pattern: "patterns",
};

const CONTENT_ROOT = path.join(process.cwd(), "content");

function assertString(value: unknown, field: string, relPath: string): string {
  if (typeof value !== "string" || value.length === 0) {
    throw new Error(`content/${relPath}: missing or invalid "${field}"`);
  }
  return value;
}

/**
 * Reads and validates every markdown file in content/<kind>s/. Runs at build
 * time only (generateStaticParams / static page rendering) — never at
 * request time in the Workers runtime, same as src/lib/og-assets.ts.
 */
export function getContent(kind: ContentKind): ContentEntry[] {
  const dir = path.join(CONTENT_ROOT, KIND_DIRS[kind]);
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".md"));

  return files.map((filename) => {
    const slugFromFilename = filename.replace(/\.md$/, "");
    const relPath = `${KIND_DIRS[kind]}/${filename}`;
    const raw = fs.readFileSync(path.join(dir, filename), "utf-8");

    const [, frontmatterBlock, ...bodyParts] = raw.split("---");
    const frontmatter = loadYaml(frontmatterBlock) as Record<string, unknown>;
    const body = bodyParts.join("---").trim();

    assertString(frontmatter.kind, "kind", relPath);
    const slug = assertString(frontmatter.slug, "slug", relPath);
    assertString(frontmatter.title, "title", relPath);
    const answer = assertString(frontmatter.answer, "answer", relPath).trim();
    assertString(frontmatter.published, "published", relPath);
    assertString(frontmatter.updated, "updated", relPath);

    if (frontmatter.kind !== kind) {
      throw new Error(
        `content/${relPath}: frontmatter kind "${frontmatter.kind}" does not match its directory ("${kind}")`
      );
    }
    if (slug !== slugFromFilename) {
      throw new Error(
        `content/${relPath}: frontmatter slug "${slug}" does not match filename "${slugFromFilename}"`
      );
    }

    return { ...frontmatter, answer, body } as ContentEntry;
  });
}

// Cross-reference check: every note's `patterns` list must point at a real
// pattern. Runs once, at module load, so it can't be skipped by forgetting
// to call it from a page.
const patternSlugs = new Set(getContent("pattern").map((p) => p.slug));
for (const note of getContent("note")) {
  for (const patternSlug of note.patterns ?? []) {
    if (!patternSlugs.has(patternSlug)) {
      throw new Error(`content/notes/${note.slug}.md references unknown pattern "${patternSlug}"`);
    }
  }
}
