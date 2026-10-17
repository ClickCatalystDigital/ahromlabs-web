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
import { execFileSync } from "node:child_process";
import { load as loadYaml } from "js-yaml";

const CONTENT_ROOT = path.join(process.cwd(), "content");
const OUTPUT_PATH = path.join(process.cwd(), "src/lib/content-data.generated.json");
const KIND_DIRS = { term: "terms", note: "notes", pattern: "patterns", industry: "industries", guide: "ibr" };

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
    assertArrayIfPresent(frontmatter.notes, "notes", relPath);
    assertArrayIfPresent(frontmatter.clients, "clients", relPath);
    assertArrayIfPresent(frontmatter.services, "services", relPath);
    if (kind === "industry") assertString(frontmatter.audience, "audience", relPath);
    assertArrayIfPresent(frontmatter.flow, "flow", relPath);
    for (const [i, step] of (frontmatter.flow ?? []).entries()) {
      assertString(step?.step, `flow[${i}].step`, relPath);
      assertString(step?.detail, `flow[${i}].detail`, relPath);
    }
    // A real photo, when there is one: src under /public plus alt text that
    // describes it. Both required — an image without alt text doesn't ship.
    if (frontmatter.demo !== undefined) {
      assertString(frontmatter.demo?.url, "demo.url", relPath);
      assertString(frontmatter.demo?.label, "demo.label", relPath);
      if (!/^https:\/\//.test(frontmatter.demo.url)) throw new Error(`content/${relPath}: demo.url must be https`);
    }
    if (frontmatter.image !== undefined) {
      assertString(frontmatter.image?.src, "image.src", relPath);
      assertString(frontmatter.image?.alt, "image.alt", relPath);
      if (!fs.existsSync(path.join(process.cwd(), "public", frontmatter.image.src))) {
        throw new Error(`content/${relPath}: image.src "${frontmatter.image.src}" not found under public/`);
      }
    }
    // Optional search-result snippet. `answer` stays the on-page lead and the
    // schema description; this is only the <meta> text, so it has to fit.
    if (frontmatter.description !== undefined) {
      const description = assertString(frontmatter.description, "description", relPath).trim();
      if (description.length > 160) {
        throw new Error(`content/${relPath}: description is ${description.length} chars; keep it to 160`);
      }
      frontmatter.description = description;
    }

    // Guides restate regulations, not our engagements, so every one names its
    // official sources and quotes the text it relies on; scripts/check-ibr-quotes.mjs
    // then checks each quote against the Gazette.
    assertArrayIfPresent(frontmatter.guides, "guides", relPath);
    if (kind === "guide") {
      if (!Array.isArray(frontmatter.sources) || frontmatter.sources.length === 0) {
        throw new Error(`content/${relPath}: a guide needs "sources" (official documents it relies on)`);
      }
      for (const [i, src] of frontmatter.sources.entries()) {
        for (const field of ["title", "publisher", "url", "date"]) assertString(src?.[field], `sources[${i}].${field}`, relPath);
        if (!/^https:\/\//.test(src.url)) throw new Error(`content/${relPath}: sources[${i}].url must be https`);
      }
      if (!Array.isArray(frontmatter.checks) || frontmatter.checks.length === 0) {
        throw new Error(`content/${relPath}: a guide needs "checks" (verbatim quotes from the regulations)`);
      }
      for (const [i, c] of frontmatter.checks.entries()) {
        assertString(c?.reg, `checks[${i}].reg`, relPath);
        assertString(c?.quote, `checks[${i}].quote`, relPath);
      }
      assertString(frontmatter.checked, "checked", relPath);
      if (slug === "forms") throw new Error(`content/${relPath}: "forms" is taken by /ibr/forms`);
    }

    // `updated` drives the sitemap lastmod, and AI Search re-reads only pages
    // whose lastmod moved — a forgotten bump leaves the chatbot on old wording.
    // So a commit after `updated` fails the build. Uncommitted edits pass until
    // committed; no git (e.g. a tarball build) skips the check.
    let committed = "";
    try {
      committed = execFileSync("git", ["log", "-1", "--format=%cs", "--", path.join(dir, filename)], { encoding: "utf-8" }).trim();
    } catch {}
    if (committed > frontmatter.updated) {
      throw new Error(`content/${relPath}: last committed ${committed} but "updated" is ${frontmatter.updated}; bump it`);
    }

    return { ...frontmatter, answer, body };
  });
}

const terms = loadKind("term");
const notes = loadKind("note");
const patterns = loadKind("pattern");
const industries = loadKind("industry");
const guides = loadKind("guide");

// Cross-reference check: every `patterns`/`notes` edge in a note or industry
// must point at a real entry. Runs here, at script time, so a broken reference
// fails the build loudly instead of shipping a dead link. `clients` and
// `services` point into src/lib/work.ts and services.ts, which this plain-Node
// script can't import — those are checked at prerender by resolveIndustryEdges().
const patternSlugs = new Set(patterns.map((p) => p.slug));
const noteSlugs = new Set(notes.map((n) => n.slug));
const guideSlugs = new Set(guides.map((g) => g.slug));
for (const entry of [...notes, ...industries]) {
  const where = `content/${KIND_DIRS[entry.kind]}/${entry.slug}.md`;
  for (const patternSlug of entry.patterns ?? []) {
    if (!patternSlugs.has(patternSlug)) {
      throw new Error(`${where} references unknown pattern "${patternSlug}"`);
    }
  }
  for (const guideSlug of entry.guides ?? []) {
    if (!guideSlugs.has(guideSlug)) {
      throw new Error(`${where} references unknown guide "${guideSlug}"`);
    }
  }
  for (const noteSlug of entry.notes ?? []) {
    if (!noteSlugs.has(noteSlug)) {
      throw new Error(`${where} references unknown note "${noteSlug}"`);
    }
  }
}

// Last-changed dates for the hand-written pages, from the last commit touching
// each page's source. The sitemap needs them: AI Search only re-reads a page
// whose lastmod moved, so without one /engagement kept its old wording.
// Gitignored; a missing git just leaves the date out.
const PAGE_SOURCES = {
  "": ["src/app/page.tsx"],
  services: ["src/app/services", "src/lib/services.ts"],
  work: ["src/app/work", "src/lib/work.ts"],
  engagement: ["src/app/engagement", "src/lib/engagement.ts"],
  privacy: ["src/app/privacy"],
  approach: ["src/app/approach"],
  about: ["src/app/about"],
};
const pageDates = {};
for (const [route, paths] of Object.entries(PAGE_SOURCES)) {
  try {
    const date = execFileSync("git", ["log", "-1", "--format=%cI", "--", ...paths], { encoding: "utf-8" }).trim();
    if (date) pageDates[route] = date;
  } catch {}
}
fs.writeFileSync(path.join(process.cwd(), "src/lib/page-dates.generated.json"), JSON.stringify(pageDates, null, 2) + "\n");

const all = [...terms, ...notes, ...patterns, ...industries, ...guides];
fs.writeFileSync(OUTPUT_PATH, JSON.stringify(all, null, 2) + "\n");
console.log(
  `content: wrote ${all.length} entries (${terms.length} terms, ${notes.length} notes, ${patterns.length} patterns, ${industries.length} industries, ${guides.length} IBR guides) to ${path.relative(process.cwd(), OUTPUT_PATH)}`
);
