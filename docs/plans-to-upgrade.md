# Plans to upgrade — discoverability, freshness, trust

Written 2026-09-05. Origin: an external AI audit of the live site, verified against this
repo before anything was acted on. Roughly half the audit's findings were wrong — it was
produced by a tool that could not fetch `/robots.txt`, `/sitemap.xml`, or `/llms.txt`, and
that strips `<script>` tags, so it reported existing infrastructure as missing. Only the
findings that survived verification are recorded here.

Status: **items 1–11 shipped and deployed** (commit `381ef33`), plus a second round
(12–14) from a follow-up gap audit. Open items are in the last section.

## Decisions taken

| Decision | Answer |
|---|---|
| Public contact email | `hello@ahromlabs.com` — footer mailto + `Organization.email`. Verified live 2026-09-05: receives via Cloudflare Email Routing, authorized to send via SPF. |
| Location | City + region, no street: Ahmedabad, Gujarat, IN |
| Founder visibility | Named on `/about` and bylined on all 18 note/pattern pages |

---

## Shipped

**1. `jsonLd()` escaper** — `src/lib/schema.ts`. Single `</`-escaping helper; every JSON-LD
emitter goes through it. Net −1 line at the existing layout call site.

**2. OG images for `/notes` and `/patterns`** — the only two content-bearing pages without a
page-specific social card. New `opengraph-image.tsx` in each, reusing `renderOgImage`.

**3. Dates rendered** — every entry already carried build-enforced `published`/`updated`
(`scripts/build-content.mjs:52-53`) and none of it reached the HTML. Now a `<time>` element on
both detail templates and both index cards, via `formatDate` in `src/lib/content.ts`.
Locale **and** timezone are pinned: content dates are date-only strings parsed as UTC
midnight, so without `timeZone: "UTC"` a build machine west of Greenwich bakes the previous
day into static HTML. Verified by building under `TZ=UTC` and `TZ=Pacific/Honolulu` and
diffing the output.

**4. `article:` metadata** — `publishedTime`, `modifiedTime`, `authors` on both slug pages,
which had been declaring `og:type=article` with none of them. Deliberately duplicated rather
than extracted: three lines twice, no correctness content, and the rest of both files is
duplicated anyway.

**5. `TechArticle` JSON-LD** on all 18 detail pages — `articleGraph()` in `schema.ts`.
`author`/`publisher`/`isPartOf` are `@id` references into the site-wide graph, not inline
copies. Verified that all three resolve on the rendered page rather than dangling.

**6. `DefinedTermSet` on `/systems`** — 11 `DefinedTerm` nodes whose `@id`s match the anchors
the page already rendered. Fed `groups.flatMap(g => g.terms)`, the array the page actually
renders, **not** a second `getContent("term")` call — `/systems` drops any term whose `domain`
doesn't match a known group, so re-querying would let the schema claim terms nobody can see.
Verified by corrupting one term's `domain`: page and schema both dropped to 10 in lockstep.

**7. `Organization` completed** — `logo` (2722×2722 PNG, dimensions checked not assumed),
`image`, `email`, `areaServed`, and `address` (locality + region only, no street).

**8. `llms.txt` is now generated** — `src/app/llms.txt/route.ts`, modeled on the existing
`knowledge.json` route. `public/llms.txt` deleted. It was hand-maintained, said so on its own
line 19, and had already drifted: 3 notes listed, 4 in the corpus.

> The static file **had** to be deleted, not just superseded. OpenNext serves the ASSETS
> binding ahead of the Worker, so leaving it in place would have silently shadowed the route
> and kept serving the stale copy — a failure indistinguishable from success.

**9. `/knowledge.json` made discoverable** — was referenced nowhere. Now a `<link
rel="alternate" type="application/json">` on `/` and a section in `llms.txt`. Not added to
`sitemap.ts`; a non-HTML entry there is a validation warning for zero gain.

**10. Glossary links** — the 11 `/systems#` anchors existed with zero inbound links. Eight
prose links added, first-occurrence-only, on `/`, `/approach`, `/about`. No auto-linking pass:
a term-substitution renderer would fire inside headings and already-linked text and need an
escape hatch within a week. `/approach` stores body copy as strings in a `sections` array;
only the one section that needed links became a JSX fragment — the render loop takes a
`ReactNode` unchanged.

**11. Contact email + location in the footer** — the contact form is a client component and
there was no `mailto` anywhere, so a visitor with JS off had no way to reach the business at
all, especially landing on a deep note page from search. `SiteFooter` renders on all 20+
pages and needs no JS.

Not doing progressive enhancement on the form: `/api/contact` returns JSON, so a no-JS submit
dumps `{"ok":true}` into the browser. Correcting that needs content negotiation plus a
redirect plus a thank-you route; the mailto is one line and better for a business where the
reply is a human anyway.

**Also fixed in passing:** `npm run lint` was crashing with a V8 out-of-memory before any of
this work — eslint had no ignore for `.open-next/**` or `.wrangler/**` and was walking ~69MB
of bundled output. Two lines in `eslint.config.mjs`.


## Second round — from a gap audit after the first deploy

**12. Sitemap `lastModified` was dishonest.** All six static routes carried the build
timestamp, so every deploy told crawlers `/`, `/approach`, `/systems`, `/about`, `/notes`, and
`/patterns` had changed. `/systems`, `/notes`, `/patterns` now derive it from the newest
`updated` in the kind they list; `/`, `/approach`, `/about` carry **none** — `lastmod` is
optional, and omitting it is honest where inventing it is not.

**13. `og:locale` was absent** on every page. Now `en_IN` on the root layout.

**14. Pattern→note links were one-directional.** Notes declare `patterns:` in frontmatter and
render "Related patterns"; patterns had no route back. A reader landing on a pattern from
search had no path to the engagement it came out of. Pattern pages now compute the reverse
(`getContent("note").filter(n => n.patterns?.includes(slug))`) and render "Seen in practice" —
5 of 14 patterns qualify, and it correctly renders nothing on the other 9.


## Third round — edge cases + typography

**15. Glossary term pages, gated on content.** `src/app/systems/[slug]/` renders a full term
page (definition, date, byline, markdown body, `DefinedTerm` JSON-LD, OG card). It is gated on
`termHasPage()` — body content beyond the one-line `answer`. **All 11 terms have empty bodies
today, so zero pages build.** Writing a body in `content/terms/<slug>.md` brings the page, its
sitemap entry, its schema `url`, its `llms.txt` line and its link from `/systems` all at once.
Eleven single-sentence pages would have been thin content; the capability without the thin
content is the useful half.

**16. Term dates.** `DefinedTerm` nodes now carry `datePublished`/`dateModified` — machine-
readable, no visual change to the glossary. `llms.txt` gained a `## Vocabulary` section.

**17. `ProfessionalService` and `Person` completed.** `address`, `areaServed`, `email`, `image`
on the service; `url`, `email`, `address` on the person. The shared `postalAddress`/`areaServed`
/`contactEmail` constants are defined once so the three nodes cannot drift apart.

**18. `SystemDiagram` text serialization.** A naive extractor read
`STRUCTUREREASONINGBUSINESSENTITIES...`; it now reads
`STRUCTURE REASONING BUSINESS ENTITIES ...`. The separators are whitespace text nodes placed
as siblings of `<text>`, inside `<g>` — SVG does not render character data outside a `<text>`
element, so they cost nothing visually. Verified by measuring `getBBox()` on all 11 labels
before and after with fonts loaded: **byte-identical**. `aria-hidden`, the `sr-only` equivalent
and the `figcaption` are untouched.

**19. Typography.** Instrument Serif for hero headlines and major section headings (27
elements); Geist Sans for body, navigation, buttons, labels, cards and UI; Geist Mono unchanged
for diagram/technical text. Replaced Pilcrow Rounded. Instrument Serif has one weight, so
`.display` sets `font-weight: 400` explicitly and drops `tracking-tight` — a `font-semibold`
utility on it would trigger synthetic bold.

## Gaps found but deliberately left

- ~~Glossary terms second-class~~ — **addressed, see items 15-16.**
- ~~`ProfessionalService`/`Person` missing fields~~ — **fixed, see item 17.**
- ~~`SystemDiagram` run-on string~~ — **fixed, see item 18.**

---

## Deliberately not doing

Pre-rejected in `docs/knowledge-layer-plan.md:190-196`, and recommended by the audit anyway:
`llms-full.txt`, per-page markdown mirrors, a public MCP server, `FAQPage` schema, a blog,
content-volume plays, client-logo/badge strips, tiered-CTA funnels.

Rejected during this pass, with reasoning:

- **`Review` schema on the testimonial.** A first-party review of yourself, on your own site,
  is self-serving and ineligible for review rich results. Doing it properly means a five-file
  optional-field pipeline built for a single quote. The quote already renders as visible
  attributed text, which is the form that actually correlates with citation.
  **Revisit at testimonial #2** — at two it's a real content type and the frontmatter field
  pays for itself.
- **RSS feeds.** `/knowledge.json` already serves the full corpus as a machine feed, and this
  is "a corpus with a stable schema, not a feed" (`knowledge-layer-plan.md:196`).
- **`BreadcrumbList`.** Two-level site, marginal payoff.
- **Per-crawler `robots.txt` allow rules.** A no-op. The existing `userAgent: "*", allow: "/"`
  already permits every crawler the audit wanted named.

## Audit claims that were false

Recorded so no future session re-does the work:

| Claim | Reality |
|---|---|
| Notes pages ship no description | `notes/[slug]` sets `description`, `og:description`, `twitter:description` — field-identical to patterns |
| No structured data | Organization + Person + ProfessionalService + WebSite `@graph`, site-wide, since before this pass |
| No author attribution | `Person` "Pujan Motiwala" with `jobTitle`, `knowsAbout`, `sameAs`, `alumniOf` on every page |
| No robots.txt / sitemap / llms.txt | All three existed |
| Brand has no LinkedIn / GitHub | Both exist and are in `sameAs` |

## Settled — do not re-raise

> **Client naming permission: RESOLVED, and settled for all clients.** The founder has
> obtained naming permission from every client whose work appears in this corpus — LS
> Technologies, Shanti Boilers, Savistar, and Saag. Named attribution is authorized. This is
> not an open question, and it is not to be re-raised as a risk in any future audit or
> review pass. If a new client's work enters the corpus, get permission for that client and
> add them to this list; the existing four are settled.

## Open

1. **`systems:` frontmatter is dead data, and public by accident.** 14 entries carry it
   (`ls-crm`, `savistar-ops`, `pcb-inventory`); nothing in `src/` reads it, but
   `/knowledge.json` serializes whole entries, so those internal repo identifiers are already
   live. Decide: render it, strip it from the JSON, or leave it — but decide, rather than
   leaving it public by default.
2. **Fix the LinkedIn HQ field**, currently "Ahmedavad, GJ". The site now says Ahmedabad;
   corroboration across `sameAs` targets is the entire point of the link.
3. **`foundingDate`** omitted from `Organization` — never established. Year-only is valid.
4. **Google Business Profile** — never considered in any prior pass. Now viable, since a
   city-level address exists. Would be a third corroborating `sameAs` node.
5. **Engagement scope / pricing / risk-to-buyer page** — the one gap a prior competitive pass
   endorsed (`docs/progress.md:105`) and the only page type a buyer looks for that this site
   has no answer for. Still unbuilt.
6. **OG social cards still render in Pilcrow Rounded.** `src/lib/og-assets.ts` embeds it as
   base64 for `renderOgImage()`, so every social card is in the old typeface while the site is
   now Instrument Serif + Geist. Regenerating those assets is the fix. `src/fonts/pilcrow-rounded/`
   is likewise now unreferenced by the site itself.
7. **Citation baseline** (`docs/citation-baseline-2026-08.md`) — still deliberately deferred.
