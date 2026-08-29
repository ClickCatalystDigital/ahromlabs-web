#!/usr/bin/env node
// Pre-compiles content/**/*.md into a single JSON file that src/lib/content.ts
// imports as a normal module. A dynamic fs.readdirSync/readFileSync pattern
// can't be statically traced by Next's/OpenNext's bundler, so content/ never
// made it into the Cloudflare Worker bundle (confirmed via a production
// ENOENT reading /bundle/content/patterns). A plain `import` of a JSON file
// is something every bundler resolves and includes automatically, so this
// script is the only place that touches the filesystem — it runs in Node
// before dev/build/preview/deploy, never inside the Worker.
import fs from "node:fs";
import path from "node:path";
import { load as loadYaml } from "js-yaml";

const CONTENT_ROOT = path.join(process.cwd(), "content");
const OUTPUT_PATH = path.join(process.cwd(), "src/lib/content-data.generated.json");
const KIND_DIRS = { term: "terms", note: "notes", pattern: "patterns" };

function assertString(value, field, relPath) {
  if (typeof value !== "string" || value.length === 0) {
    throw new Error(`content/${relPath}: missing or invalid "${field}"`);
  }
  return value;
}

// domain/systems/patterns/evidence are optional, but if present must be
// arrays — catches a frontmatter typo like `domain: structure` (a bare
// string, missing the brackets) that would otherwise pass through silently
// and break array-shaped consumers (e.g. `.filter()`/`.map()` on `domain`).
function assertArrayIfPresent(value, field, relPath) {
  if (value !== undefined && !Array.isArray(value)) {
    throw new Error(`content/${relPath}: "${field}" must be an array if present, got ${typeof value}`);
  }
}

function loadKind(kind) {
  const dir = path.join(CONTENT_ROOT, KIND_DIRS[kind]);
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".md"));

  return files.map((filename) => {
    const slugFromFilename = filename.replace(/\.md$/, "");
    const relPath = `${KIND_DIRS[kind]}/${filename}`;
    const raw = fs.readFileSync(path.join(dir, filename), "utf-8");

    const [, frontmatterBlock, ...bodyParts] = raw.split("---");
    const frontmatter = loadYaml(frontmatterBlock);
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
    assertArrayIfPresent(frontmatter.domain, "domain", relPath);
    assertArrayIfPresent(frontmatter.systems, "systems", relPath);
    assertArrayIfPresent(frontmatter.patterns, "patterns", relPath);
    assertArrayIfPresent(frontmatter.evidence, "evidence", relPath);

    return { ...frontmatter, answer, body };
  });
}

const terms = loadKind("term");
const notes = loadKind("note");
const patterns = loadKind("pattern");

// Cross-reference check: every note's `patterns` list must point at a real
// pattern. Runs here, at script time, so a broken reference fails the build
// loudly instead of shipping a dead link.
const patternSlugs = new Set(patterns.map((p) => p.slug));
for (const note of notes) {
  for (const patternSlug of note.patterns ?? []) {
    if (!patternSlugs.has(patternSlug)) {
      throw new Error(`content/notes/${note.slug}.md references unknown pattern "${patternSlug}"`);
    }
  }
}

const all = [...terms, ...notes, ...patterns];
fs.writeFileSync(OUTPUT_PATH, JSON.stringify(all, null, 2) + "\n");
console.log(
  `content: wrote ${all.length} entries (${terms.length} terms, ${notes.length} notes, ${patterns.length} patterns) to ${path.relative(process.cwd(), OUTPUT_PATH)}`
);
