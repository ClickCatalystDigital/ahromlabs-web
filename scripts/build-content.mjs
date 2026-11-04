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
const KIND_DIRS = { term: "terms", note: "notes", pattern: "patterns", industry: "industries", guide: "ibr", boq: "boq", erp: "erp", "ai-assistant": "ai-assistant", asme: "asme", manufacturing: "manufacturing", "sales-tax": "sales-tax", construction: "construction" };

// ASME guide groups (src/lib/asme.ts ASME_SECTIONS) and the tools a guide can carry.
const ASME_GROUPS = ["code", "certification", "welding", "design", "materials", "bridge"];
const ASME_TOOLS = ["hydrotest", "shell", "continuity"];
// Manufacturing guide groups (src/lib/manufacturing.ts MFG_GROUPS) and their tools.
const MFG_GROUPS = ["choosing", "quickbooks", "planning", "inventory"];
const MFG_TOOLS = ["jobcost", "schedule"];
// Sales tax guide groups (src/lib/sales-tax.ts ST_GROUPS) and their tools.
const ST_GROUPS = ["nexus", "exemptions", "systems"];
const ST_TOOLS = ["nexus"];
// Construction guide groups (src/lib/construction.ts CON_GROUPS), one per market.
const CON_GROUPS = ["us", "india"];

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

    const [, frontmatterBlock, ...bodyParts] = raw.split(/^---[ \t]*$/m); // a line of its own: a URL may contain ---
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
    // The demo's narrated tour on YouTube: embedded under the hero and described as a VideoObject.
    if (frontmatter.video !== undefined) {
      for (const k of ["id", "name", "description", "duration"]) assertString(frontmatter.video?.[k], `video.${k}`, relPath);
      if (!/^[\w-]{11}$/.test(frontmatter.video.id)) throw new Error(`content/${relPath}: video.id must be an 11-character YouTube id`);
      if (!/^PT(\d+M)?\d+S$/.test(frontmatter.video.duration)) throw new Error(`content/${relPath}: video.duration must look like PT1M35S`);
      if (!/^\d{4}-\d{2}-\d{2}$/.test(String(frontmatter.video.uploaded ?? ""))) throw new Error(`content/${relPath}: video.uploaded must be YYYY-MM-DD`);
    }
    if (frontmatter.image !== undefined) {
      assertString(frontmatter.image?.src, "image.src", relPath);
      assertString(frontmatter.image?.alt, "image.alt", relPath);
      // Width and height reserve the image's space so the page doesn't jump as it loads.
      if (!Number.isInteger(frontmatter.image?.width) || !Number.isInteger(frontmatter.image?.height)) {
        throw new Error(`content/${relPath}: image needs integer width and height`);
      }
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
    // BOQ guides (content/boq/) name their official sources too; `checks` are
    // optional there, since most cite standards by number (BIS texts are paid)
    // rather than quote them. Where a guide does quote, the quote must be exact.
    // ERP guides that rest on practice rather than a rule (readiness, implementation, the industry
    // guides) may have no official source; when they cite one, it is checked the same way.
    if (kind === "boq" || kind === "erp" || kind === "ai-assistant" || kind === "asme" || kind === "manufacturing" || kind === "sales-tax" || kind === "construction") {
      if ((kind === "boq" || kind === "asme" || kind === "sales-tax") && (!Array.isArray(frontmatter.sources) || frontmatter.sources.length === 0)) {
        throw new Error(`content/${relPath}: a BOQ guide needs "sources" (official documents it relies on)`);
      }
      assertArrayIfPresent(frontmatter.sources, "sources", relPath);
      for (const [i, src] of (frontmatter.sources ?? []).entries()) {
        for (const field of ["title", "publisher", "url", "date"]) assertString(src?.[field], `sources[${i}].${field}`, relPath);
        if (!/^https:\/\//.test(src.url)) throw new Error(`content/${relPath}: sources[${i}].url must be https`);
      }
      assertArrayIfPresent(frontmatter.checks, "checks", relPath);
      for (const [i, c] of (frontmatter.checks ?? []).entries()) {
        assertString(c?.reg, `checks[${i}].reg`, relPath);
        assertString(c?.quote, `checks[${i}].quote`, relPath);
      }
      assertString(frontmatter.checked, "checked", relPath);
      const taken = { boq: ["items", "check", "template"], erp: ["requirements", "check", "template"], "ai-assistant": ["questions", "number-check", "vendor-test"], asme: ["questions", "items"], manufacturing: [], "sales-tax": [], construction: [] }[kind];
      if (taken.includes(slug)) throw new Error(`content/${relPath}: "${slug}" is taken by /${kind}/${slug}`);
    }
    // ASME guides: a group for the hub, the question people search (the question library), an optional tool.
    // Which markets list a guide is src/lib/markets.ts (IN_ONLY, NA_ONLY), like every other page.
    if (kind === "asme") {
      if (!ASME_GROUPS.includes(frontmatter.group)) throw new Error(`content/${relPath}: "group" must be one of ${ASME_GROUPS.join(", ")}`);
      assertString(frontmatter.question, "question", relPath);
      if (frontmatter.tool !== undefined && !ASME_TOOLS.includes(frontmatter.tool)) throw new Error(`content/${relPath}: unknown "tool"`);
    }
    if (kind === "manufacturing") {
      if (!MFG_GROUPS.includes(frontmatter.group)) throw new Error(`content/${relPath}: "group" must be one of ${MFG_GROUPS.join(", ")}`);
      assertString(frontmatter.question, "question", relPath);
      if (frontmatter.tool !== undefined && !MFG_TOOLS.includes(frontmatter.tool)) throw new Error(`content/${relPath}: unknown "tool"`);
    }
    if (kind === "sales-tax") {
      if (!ST_GROUPS.includes(frontmatter.group)) throw new Error(`content/${relPath}: "group" must be one of ${ST_GROUPS.join(", ")}`);
      assertString(frontmatter.question, "question", relPath);
      if (frontmatter.tool !== undefined && !ST_TOOLS.includes(frontmatter.tool)) throw new Error(`content/${relPath}: unknown "tool"`);
    }
    if (kind === "construction") {
      if (!CON_GROUPS.includes(frontmatter.group)) throw new Error(`content/${relPath}: "group" must be one of ${CON_GROUPS.join(", ")}`);
      assertString(frontmatter.question, "question", relPath);
    }
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
// North America's version of an industry page: content/industries/us/<slug>.md, attached as `na` and served at
// /us/industries/<slug> (src/lib/markets.ts ADAPTIVE). Its front matter replaces the India page's fields it names;
// a US page has no video unless it names its own (the India tour shows IBR forms and rupees).
for (const industry of industries) {
  const relPath = `industries/us/${industry.slug}.md`;
  const file = path.join(CONTENT_ROOT, relPath);
  if (!fs.existsSync(file)) continue;
  const [, frontmatterBlock, ...bodyParts] = fs.readFileSync(file, "utf-8").split(/^---[ \t]*$/m);
  const na = loadYaml(frontmatterBlock);
  for (const k of ["title", "audience", "answer", "description", "updated"]) assertString(na[k], k, relPath);
  assertString(na.demo?.url, "demo.url", relPath);
  assertString(na.demo?.label, "demo.label", relPath);
  if (na.description.trim().length > 160) throw new Error(`content/${relPath}: description is ${na.description.trim().length} chars; keep it to 160`);
  for (const [i, step] of (na.flow ?? []).entries()) {
    assertString(step?.step, `flow[${i}].step`, relPath);
    assertString(step?.detail, `flow[${i}].detail`, relPath);
  }
  industry.na = { ...na, answer: na.answer.trim(), description: na.description.trim(), body: bodyParts.join("---").trim() };
}
const guides = loadKind("guide");
const boqGuides = loadKind("boq");
const erpGuides = loadKind("erp");
const aiGuides = loadKind("ai-assistant");
const asmeGuides = loadKind("asme");
const mfgGuides = loadKind("manufacturing");
const stGuides = loadKind("sales-tax");
const conGuides = loadKind("construction");

// Cross-reference check: every `patterns`/`notes` edge in a note or industry
// must point at a real entry. Runs here, at script time, so a broken reference
// fails the build loudly instead of shipping a dead link. `clients` and
// `services` point into src/lib/work.ts and services.ts, which this plain-Node
// script can't import — those are checked at prerender by resolveIndustryEdges().
const patternSlugs = new Set(patterns.map((p) => p.slug));
const noteSlugs = new Set(notes.map((n) => n.slug));
const guideSlugs = new Set(guides.map((g) => g.slug));
const usIndustries = industries.filter((i) => i.na).map((i) => ({ ...i.na, kind: "industry", slug: `us/${i.slug}` }));
for (const entry of [...notes, ...industries, ...usIndustries]) {
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
  "": ["src/app/page.tsx", "src/components/HomePage.tsx", "src/lib/work.ts", "src/components/FreeGuides.tsx", "public/demos"],
  services: ["src/app/services", "src/components/ServicesPage.tsx", "src/lib/services.ts"],
  work: ["src/app/work", "src/lib/work.ts"],
  engagement: ["src/app/engagement", "src/lib/engagement.ts"],
  privacy: ["src/app/privacy"],
  approach: ["src/app/approach"],
  about: ["src/app/about/page.tsx", "src/app/about/opengraph-image.tsx"],
  "about/pujan-motiwala": ["src/app/about/pujan-motiwala"],
  agents: ["src/app/agents"],
};
// Content pages too: the page's own file plus the code that renders it, so a
// same-day edit, or a change in shared code (a client's name in work.ts, the IBR
// page frame), still moves lastmod. `updated` alone is a day, and AI Search had
// already read that day once.
const RENDERERS = {
  industries: ["src/app/industries/[slug]", "src/lib/work.ts", "src/lib/industries.ts"],
  notes: ["src/app/notes/[slug]", "src/lib/work.ts", "src/lib/services.ts"],
  patterns: ["src/app/patterns/[slug]"],
  terms: ["src/app/systems/[slug]"],
  ibr: ["src/app/ibr/[slug]", "src/components/IbrPage.tsx", "src/components/GuidePage.tsx"],
  boq: ["src/app/boq/[slug]", "src/components/BoqPage.tsx", "src/components/GuidePage.tsx"],
  erp: ["src/app/erp/[slug]", "src/components/ErpPage.tsx", "src/components/GuidePage.tsx", "src/lib/erp.ts"],
  "ai-assistant": ["src/app/ai-assistant/[slug]", "src/components/AiAssistantPage.tsx", "src/components/GuidePage.tsx", "src/lib/ai-assistant.ts"],
  asme: ["src/app/asme/[slug]", "src/components/AsmePage.tsx", "src/components/AsmeTools.tsx", "src/components/GuidePage.tsx", "src/lib/asme.ts", "src/lib/asme-images.ts", "public/asme"],
  manufacturing: ["src/app/manufacturing/[slug]", "src/components/ManufacturingPage.tsx", "src/components/ManufacturingTools.tsx", "src/components/GuidePage.tsx", "src/lib/manufacturing.ts", "src/lib/manufacturing-images.ts", "public/manufacturing"],
  "sales-tax": ["src/app/sales-tax/[slug]", "src/components/SalesTaxPage.tsx", "src/components/NexusCheck.tsx", "src/components/GuidePage.tsx", "src/lib/sales-tax.ts", "src/lib/sales-tax-calc.ts", "src/lib/sales-tax-images.ts", "public/sales-tax"],
  construction: ["src/app/construction/[slug]", "src/components/ConstructionPage.tsx", "src/components/GuidePage.tsx", "src/lib/construction.ts", "src/lib/construction-images.ts", "public/construction"],
};
const ROUTE_PREFIX = { industries: "industries", notes: "notes", patterns: "patterns", terms: "systems", ibr: "ibr", boq: "boq", erp: "erp", "ai-assistant": "ai-assistant", asme: "asme", manufacturing: "manufacturing", "sales-tax": "sales-tax", construction: "construction" };
for (const [dir, renderers] of Object.entries(RENDERERS)) {
  const files = fs.readdirSync(path.join(CONTENT_ROOT, dir)).filter((f) => f.endsWith(".md"));
  for (const file of files) {
    PAGE_SOURCES[`${ROUTE_PREFIX[dir]}/${file.replace(/\.md$/, "")}`] = [`content/${dir}/${file}`, ...renderers];
  }
  // The index page lists every entry of the kind.
  PAGE_SOURCES[ROUTE_PREFIX[dir]] = [`content/${dir}`, `src/app/${ROUTE_PREFIX[dir]}/page.tsx`, ...renderers.slice(1)];
}
const IBR_FRAME = ["src/components/IbrPage.tsx", "src/components/GuidePage.tsx", "src/lib/ibr-forms.ts"];
PAGE_SOURCES.ibr = ["content/ibr", "src/app/ibr/page.tsx", ...IBR_FRAME];
PAGE_SOURCES["ibr/forms"] = ["src/app/ibr/forms/page.tsx", ...IBR_FRAME];
PAGE_SOURCES["ibr/forms/*"] = ["src/app/ibr/forms/[form]", ...IBR_FRAME];
const BOQ_FRAME = ["src/components/BoqPage.tsx", "src/components/GuidePage.tsx", "src/lib/boq.ts"];
PAGE_SOURCES.boq = ["content/boq", "src/app/boq/page.tsx", ...BOQ_FRAME];
PAGE_SOURCES["boq/items"] = ["src/app/boq/items/page.tsx", ...BOQ_FRAME];
PAGE_SOURCES["boq/items/*"] = ["src/app/boq/items/[trade]", ...BOQ_FRAME];
PAGE_SOURCES["boq/template"] = ["src/app/boq/template", ...BOQ_FRAME];
PAGE_SOURCES["boq/check"] = ["src/app/boq/check", "src/components/BoqCheck.tsx", "src/lib/boq-check.ts", ...BOQ_FRAME];
const ERP_FRAME = ["src/components/ErpPage.tsx", "src/components/GuidePage.tsx", "src/lib/erp.ts"];
PAGE_SOURCES.erp = ["content/erp", "src/app/erp/page.tsx", ...ERP_FRAME];
PAGE_SOURCES["erp/requirements"] = ["src/app/erp/requirements", ...ERP_FRAME];
PAGE_SOURCES["erp/template"] = ["src/app/erp/template", ...ERP_FRAME];
PAGE_SOURCES["erp/check"] = ["src/app/erp/check", "src/components/ErpCheck.tsx", "src/lib/erp-check.ts", ...ERP_FRAME];
const AI_FRAME = ["src/components/AiAssistantPage.tsx", "src/components/GuidePage.tsx", "src/lib/ai-assistant.ts"];
PAGE_SOURCES["ai-assistant"] = ["content/ai-assistant", "src/app/ai-assistant/page.tsx", ...AI_FRAME];
PAGE_SOURCES["ai-assistant/questions"] = ["src/app/ai-assistant/questions", ...AI_FRAME];
PAGE_SOURCES["ai-assistant/vendor-test"] = ["src/app/ai-assistant/vendor-test", ...AI_FRAME];
PAGE_SOURCES["ai-assistant/number-check"] = ["src/app/ai-assistant/number-check", "src/components/NumberCheck.tsx", "src/lib/number-check.ts", ...AI_FRAME];
const ASME_FRAME = ["src/components/AsmePage.tsx", "src/components/GuidePage.tsx", "src/lib/asme.ts", "src/lib/asme-images.ts", "public/asme"];
PAGE_SOURCES.asme = ["content/asme", "src/app/asme/page.tsx", ...ASME_FRAME];
PAGE_SOURCES["asme/questions"] = ["content/asme", "src/app/asme/questions", ...ASME_FRAME];
PAGE_SOURCES["asme/items"] = ["src/app/asme/items", "src/lib/asme-items.ts", ...ASME_FRAME];
PAGE_SOURCES.manufacturing = ["content/manufacturing", "src/app/manufacturing/page.tsx", "src/components/ManufacturingPage.tsx", "src/components/GuidePage.tsx", "src/lib/manufacturing.ts", "src/lib/manufacturing-images.ts", "public/manufacturing"];
PAGE_SOURCES["sales-tax"] = ["content/sales-tax", "src/app/sales-tax/page.tsx", "src/components/SalesTaxPage.tsx", "src/components/NexusCheck.tsx", "src/components/GuidePage.tsx", "src/lib/sales-tax.ts", "src/lib/sales-tax-calc.ts", "src/lib/sales-tax-images.ts", "public/sales-tax"];

const pageDates = {};
for (const [route, paths] of Object.entries(PAGE_SOURCES)) {
  try {
    const date = execFileSync("git", ["log", "-1", "--format=%cI", "--", ...paths], { encoding: "utf-8" }).trim();
    if (date) pageDates[route] = date;
  } catch {}
}
fs.writeFileSync(path.join(process.cwd(), "src/lib/page-dates.generated.json"), JSON.stringify(pageDates, null, 2) + "\n");

const all = [...terms, ...notes, ...patterns, ...industries, ...guides, ...boqGuides, ...erpGuides, ...aiGuides, ...asmeGuides, ...mfgGuides, ...stGuides, ...conGuides];
fs.writeFileSync(OUTPUT_PATH, JSON.stringify(all, null, 2) + "\n");
console.log(
  `content: wrote ${all.length} entries (${terms.length} terms, ${notes.length} notes, ${patterns.length} patterns, ${industries.length} industries, ${guides.length} IBR guides, ${boqGuides.length} BOQ guides, ${erpGuides.length} ERP guides, ${aiGuides.length} AI assistant guides, ${asmeGuides.length} ASME guides, ${mfgGuides.length} manufacturing guides, ${stGuides.length} sales tax guides, ${conGuides.length} construction guides) to ${path.relative(process.cwd(), OUTPUT_PATH)}`
);
