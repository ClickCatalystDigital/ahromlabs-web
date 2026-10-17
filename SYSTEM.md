# AHROM Labs

Marketing site for Ahrom Labs, an infrastructure engineering practice. Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4. Deployed to Cloudflare Workers via OpenNext.

## Routes

All under `src/app/`.

- `/` (`page.tsx`) — home. 8 sections in order: hero, problem, approach comparison, `SystemDiagram`, principles, who-it's-for, how-we-work, `ContactForm`.
- `/approach` — the four principles behind how engagements are modeled.
- `/systems` — glossary of the vocabulary used to model a business (entities, relationships, workflows, evidence, etc.), generated from `content/terms/` — see **Knowledge layer** below.
- `/about` — who the practice is for, how an engagement runs.
- `/notes`, `/notes/[slug]` — engineering case-study notes, generated from `content/notes/`.
- `/patterns`, `/patterns/[slug]` — reusable ADR-shaped decisions, generated from `content/patterns/`.
- `/knowledge.json` (`route.ts`, `force-static`) — the entire corpus (terms + notes + patterns) as JSON, for other repos'/agents' consumption. See **Knowledge layer**. Advertised from `/` via `<link rel="alternate" type="application/json">` (set through `alternates.types` in `layout.tsx`) and from `llms.txt`.
- `/llms.txt` (`route.ts`, `force-static`) — the AI-crawler-facing summary. **Generated**, not hand-written: prose header/footer are template literals in the route, the note and pattern lists come from `getContent()` sorted newest-first. Replaced `public/llms.txt` (2026-09-05), which had been hand-maintained and had already drifted one note behind. Note the trap: the `ASSETS` binding is served ahead of the Worker, so a leftover `public/llms.txt` would silently shadow this route and keep serving the stale copy — the static file had to be deleted, not merely superseded.
- `/approach`, `/systems`, `/about`, and every note/pattern detail page end in the shared `ClosingCta` component.
- `/ibr`, `/ibr/forms`, `/ibr/forms/[form]`, `/ibr/[slug]` — the IBR 2026 section (17 Oct 2026): a hub, the forms list with the IBR 1950 → 2026 table, 13 form pages from `src/lib/ibr-forms.ts`, and 4 guides from `content/ibr/*.md` (`kind: guide`). All share `src/components/IbrPage.tsx`: breadcrumb, title and lead, optional infographic (`<figure>`, width/height set, linked full-size), body beside a sticky contents column (`IbrH2` gives every heading an anchor id), folded Gazette quotes (`IbrQuotes`), demo block, official sources and a not-legal-advice note. JSON-LD per page: `Legislation` + `TechArticle` (+ `image`) + `BreadcrumbList` (`ibrPageGraph` in `schema.ts`).
  - **Every regulation-based fact quotes the Gazette.** `scripts/check-ibr-quotes.mjs` runs inside `content:build` and fails the build on any quote not found word for word in the official text (143/143 on 17 Oct 2026). Claims written in our own words are listed for review in `docs/ibr-claim-sheet.md`.
  - Share images: guides and `/ibr/forms` use their infographic; form pages a generated card (`ibr/forms/[form]/opengraph-image.tsx`). Setting `openGraph` in a page's metadata without `images` drops the site default, so every IBR page sets one.
- `/api/contact` (POST) — see **Contact form** below.
- `/api/crm` — the CRM (every lead, status and notes). See **CRM** below.
- `error.tsx`, `not-found.tsx` — error/404 boundaries, same `SiteNav`/`SiteFooter` shell as every page.
- SEO/meta: `manifest.ts`, `robots.ts`, `sitemap.ts`, root `opengraph-image.tsx`. Each of `about/`, `approach/`, `systems/`, `notes/`, `patterns/`, and every `notes/[slug]`/`patterns/[slug]` also has its own `opengraph-image.tsx`, all built on the shared `renderOgImage()` helper (`src/lib/og-image.tsx`).
  - **`lastmod` is the exact time of the last commit touching a page's sources** (17 Oct 2026): its content file plus the code that renders it, listed in `PAGE_SOURCES`/`RENDERERS` in `scripts/build-content.mjs` and written to `src/lib/page-dates.generated.json`; `changed()` in `sitemap.ts` takes the later of that and `updated`. Before, content pages used only the `updated` day, so a same-day edit, or a change in shared code (a client name in `work.ts`, the IBR frame), never moved `lastmod`, and AI Search kept serving the old text: the chatbot still named a client hours after the site stopped. A new shared renderer must be added to `RENDERERS`.
  - (Earlier, 2026-09-05:) `sitemap.ts` includes every note/pattern URL with a real per-entry `lastModified` from frontmatter. `/systems`, `/notes`, `/patterns` derive theirs from the newest `updated` in the kind they list. `/`, `/approach`, `/about` deliberately carry **no** `lastModified` — they have no date source, and stamping build time (as this did until 2026-09-05) made every deploy claim all six static pages had changed.
- `src/proxy.ts` — Next.js 16's replacement for `middleware.ts` (renamed; a stray `middleware.ts` would silently be ignored in this version). Logs AI-crawler hits (GPTBot, ClaudeBot, PerplexityBot, etc. — full list in the file) as structured JSON via `console.log`, captured by Cloudflare Workers Logs (`wrangler.jsonc`'s `observability.enabled`). Pure pass-through (`NextResponse.next()`), never mutates the response. Runs on the Node.js runtime by default in v16 — do not add `export const runtime`, it throws.

## Knowledge layer (`content/`, `src/lib/content.ts`, `scripts/build-content.mjs`)

**Client naming.** LS Technologies, Savistar and Saag are cleared to be named; do not flag them
as a confidentiality risk. **The boiler client is never named on the site** (since 17 Oct 2026):
it is "a boiler and pressure-vessel manufacturer", engagement `boiler-manufacturer` with
`anonymous: true` in `src/lib/work.ts`. `anonymous` keeps it out of schema.org `mentions` (an
unnamed business is not an Organization a search engine can resolve), and `clientInSentence()`
lower-cases it mid-sentence. Internal `docs/` may keep the name; `content/` and `src/` may not.
New clients need their own permission before being named.

A markdown corpus (11 terms, 4 notes, 14 patterns as of this writing) with YAML frontmatter (`kind`, `slug`, `title`, `answer`, `domain`, `systems?`, `patterns?`, `evidence?`, `order?` (terms only), `published`, `updated`), documented in full in `docs/knowledge-layer-plan.md`. `docs/progress.md` tracks what's built against that plan, phase by phase.

- **`scripts/build-content.mjs`** — the only place that touches the filesystem. A standalone Node script (plain `.mjs`, not bundled into the app) that reads `content/**/*.md`, parses frontmatter with `js-yaml`, validates it (required fields, slug-matches-filename, kind-matches-directory, and that every note's `patterns:` resolves to a real pattern — throws and fails the build on any violation), and writes the result to `src/lib/content-data.generated.json`.
- **`src/lib/content-data.generated.json`** — committed (not gitignored) so standalone tooling (`tsc`, editors) resolves it before the build script has ever run; silently overwritten by every real entry point below, so a stale committed copy can't drift for long.
- **`src/lib/content.ts`** — `getContent(kind)`, a plain `import` of that JSON file, filtered by kind. No filesystem access, no top-level side effects. This matters: an earlier version read `content/` directly via `fs.readdirSync`/`readFileSync` at module load, which OpenNext's bundler couldn't statically trace, so `content/` never made it into the Cloudflare Worker bundle — a production `ENOENT: readdir '/bundle/content/patterns'` on `/notes`/`/patterns` despite `npm run dev` and `npm run build` both working. Fixed by moving all fs access into the build script and making `content.ts` a static JSON import instead — the general lesson: dynamic runtime fs reads are invisible to Worker bundle tracing; static imports aren't.
- **`content:build`** (`npm run content:build`) runs the script above; wired as a prerequisite into `dev`, `build`, `preview`, and `deploy` in `package.json` (not an npm `pre*` hook — those don't fire for `opennextjs-cloudflare build`, so it's prepended explicitly in each script).
- Note/pattern detail pages render `body` (markdown) via `react-markdown` (bare, no `remark-gfm` — current content only needs headings/paragraphs/lists/blockquotes) with a `components` map into the site's existing typographic classes.
- **Glossary term pages** (`src/app/systems/[slug]/`) — gated on `termHasPage(term)` (`content.ts`), which is `body.trim().length > 0`. All 11 terms currently have an empty body, so **zero term pages build today**; the route, its OG image, its sitemap entries, its `DefinedTerm` schema `url`, its `llms.txt` link and the link from `/systems` all appear together the moment a body is written in `content/terms/<slug>.md`. This is deliberate: 11 pages carrying a single sentence each would be thin content.
- `src/lib/schema.ts` — all JSON-LD on the site.
  - `orgGraph` — the site-wide `@graph` (`Organization`, `Person`/founder, `ProfessionalService`, `WebSite`) rendered in `layout.tsx` on every page. `Organization` carries `sameAs` (LinkedIn company + GitHub org), `logo`/`image`, `email`, `address` (Ahmedabad/Gujarat/IN, locality + region only — no street, deliberately), and `areaServed`. `Person` carries `sameAs`, `knowsAbout`, `alumniOf`. Crunchbase is deliberately absent: no profile exists, and it is not to be fabricated.
  - `jsonLd(data)` — the `</`-escaping serializer. **Every** JSON-LD emitter goes through it; do not hand-roll the regex at a new call site.
  - `articleGraph(entry, path)` — `TechArticle` for a note or pattern detail page. `author`/`publisher`/`isPartOf` are `@id` references into `orgGraph`, which resolve because the layout puts that graph on every page. That linkage is why the graph carries stable `@id`s.
  - `termSetGraph(terms)` — `DefinedTermSet` + `DefinedTerm` for `/systems`, whose `@id`s match the anchors the page renders. **Pass it the array the page actually renders** (`groups.flatMap(g => g.terms)`), never a second `getContent("term")` call: `/systems` drops any term whose `domain` doesn't match a known group, so re-querying would let the schema claim terms nobody can see. Verified by corrupting a term's `domain` — page and schema both drop in lockstep.

## Contact form (`/api/contact`)

`src/app/api/contact/route.ts`. Mail goes out through **Cloudflare Email Sending** (the `EMAIL` binding), not Resend, SMTP or an API key (switched 13 Oct 2026).

1. Parses JSON body; requires `email` and `message` strings.
2. Honeypot: a hidden `company` field. If filled, silently returns `{ ok: true }` without sending anything (bot never gets a signal to keep trying).
3. Validates the email (format, at most 254 characters) and the message (not empty, at most 5,000 characters).
4. Rate limit: `FORM_LIMITER` (Workers rate-limit binding, 5 per minute) keyed on the visitor's IP, checked after validation.
5. `captureLead()` in `src/lib/lead-email.ts` first saves the lead to the CRM database (see **CRM**), then sends: `env.EMAIL.send()` from `website@notify.ahromlabs.com` to `LEADS_TO` (pujan@ahromlabs.com), Reply-To the visitor, plain text plus HTML. A failed send logs `lead_email_failed` (form and error code only, addresses masked) and marks the CRM row `email_status = failed`; the visitor is still told "received", because the lead is kept. Only when both the save and the email fail does it return 502, with a message telling the visitor to email pujan@ahromlabs.com: it never reports success when the lead was lost. A success logs `lead_email_sent` with Cloudflare's message id; a failed save logs `lead_save_failed`.

**Email Sending setup.** Only the subdomain `notify.ahromlabs.com` is onboarded (`wrangler email sending enable notify.ahromlabs.com`). Its records: MX, SPF TXT on `cf-bounce.notify`, DKIM on `cf-bounce._domainkey.notify`, and `_dmarc.notify` (`p=reject`). The root domain's Google Workspace records (MX, SPF, `google._domainkey`, `_dmarc` with `p=none`) are untouched, which is why the root domain was not onboarded: onboarding writes its own `_dmarc`. The binding only allows that sender and that one destination. Workers Paid includes 3,000 sends a month, then $0.35 per 1,000.

**Demo leads.** `src/app/api/demo-lead/route.ts` uses the same helper for the three live demos' entry forms (shared `DEMO_LEAD_KEY`; rate-limited per demo and per visitor email).

**Testing locally.** `next dev` has no `EMAIL` binding, so a send fails there (by design, it says so). To send real mail, build (`opennextjs-cloudflare build`) and run `wrangler dev` with a copy of `wrangler.jsonc` that adds `"remote": true` to the `EMAIL` binding and drops `routes`. Point `LEADS_TO` at a forbidden address (`--var LEADS_TO:x@example.com`) to test the failure path and the rate limit without sending anything.

## CRM (`/api/crm`, D1 `ahrom-crm`)

Every form lead (contact form and all three demos) is a row in the D1 table `leads` (binding `CRM`, schema `migrations/0001_leads.sql`), saved before the email goes out, so nothing is lost when an email fails. Columns: source, name, company, email, phone, about, message, page, `email_status` (pending, sent, failed), `status` (new, contacted, qualified, won, lost, spam), notes.

- **View and update:** https://ahromlabs.com/api/crm. Sign-in form: username `CRM_USER` (`pujan`, in `wrangler.jsonc` vars), password = the `CRM_PASSWORD` Worker secret (`npx wrangler secret put CRM_PASSWORD`). Without that secret the page answers 404. Sign-in tries are rate-limited (5 a minute per IP). A signed cookie (`crm_session`: expiry + HMAC keyed by the password; HttpOnly, Secure, SameSite=Strict, path `/api/crm`) keeps the browser signed in for 30 days; changing the password signs every browser out. Each lead has a status and notes, with search and status tabs; the top line shows how many are still `new` and flags any lead whose email did not go out.
- **Safety:** `noindex`, `no-store`, no framing, and form posts only from the page itself (Origin check plus the SameSite cookie).
- **Query directly:** `npx wrangler d1 execute ahrom-crm --remote --command "SELECT * FROM leads ORDER BY id DESC LIMIT 20"`.
- **Schema changes:** add `migrations/000N_*.sql`, then `npx wrangler d1 migrations apply ahrom-crm --remote` before deploying.
- **Testing locally:** `npx wrangler d1 migrations apply ahrom-crm --local`, build, `wrangler dev --local` (emails are simulated and written under `.wrangler/tmp/email`), `CRM_PASSWORD` in `.dev.vars` (username `pujan`).
- **Cost:** D1 is within the Workers Paid allowance (5 GB, 25 billion row reads a month); form leads use a tiny fraction.

Client side: `src/components/ContactForm.tsx` (`"use client"`) — a 3-state (`idle`/`submitting`/`success`/`error`) form with a `useId`-based accessible label/error wiring and the same honeypot field, tab-indexed out (`tabIndex={-1}`) and visually hidden.

## Components (`src/components/`)

- `SiteNav.tsx` — sticky header, nav links, mobile `<details>` menu.
- `SiteFooter.tsx` — footer nav + copyright.
- `ContactForm.tsx` — see above.
- `Reveal.tsx` (`"use client"`) — wraps a section, adds `is-visible` class via `IntersectionObserver` on scroll into view; CSS drives the actual transition (not per-frame React state), and `@media (prefers-reduced-motion: reduce)` in `globals.css` collapses it instantly. `<noscript>` in `layout.tsx` forces `opacity:1` when JS never runs.
- `ClosingCta.tsx` — shared bottom-of-page CTA section used by `/approach`, `/systems`, `/about`.
- `SystemDiagram.tsx` — renders the SVG system diagram from data in `src/lib/diagram-data.ts` (nodes/edges/layers), using Heroicons per node and elbow-routed edges between layers.
- `Wordmark.tsx` (`LogoBadge`) — nav logo mark, `public/logo/a_logo.webp` (transparent, no ring). Earlier files (`a12.png`, `a12.webp`, `public/logo.webp`) still exist in the repo, unreferenced.

## Lib (`src/lib/`)

- `diagram-data.ts` — node/edge/layer-band data consumed by `SystemDiagram`, plus a plain-text equivalent for screen readers.
- `og-image.tsx` — `renderOgImage({ title, description })`, the shared OG image template (via `next/og`'s `ImageResponse`) used by every route's `opengraph-image.tsx`.
- `og-assets.ts` — build-time base64-embedded Pilcrow Rounded font + logo, consumed by `og-image.tsx`. Regenerate only if the font or logo changes; not read via `node:fs` at request time.
- `content.ts`, `content-data.generated.json` — see **Knowledge layer** above.
- `schema.ts` — see **Knowledge layer** above.
- `headings.ts` — `headingId()`/`textOf()`/`markdownHeadings()`: one slug rule for heading anchors and the contents lists that link to them, shared by the industry and IBR pages.
- `ibr-forms.ts` — every IBR 2026 form once: number, regulation, 1950 name, summary, and for the 13 with pages, who signs it, when it is filed, what it records and the Gazette quotes. Pages, sitemap, `knowledge.json` and the quote check all read it.
- `work.ts` — engagements; `anonymous` and `clientInSentence()` (see **Client naming**).

## Design system

Layout primitives live in `src/app/globals.css`:

- `.rail` — max-width (90rem) + horizontal padding (1.5rem on phones, 2.5rem from 48rem), shared by every section, nav, and footer, so headings share one left edge across routes.
- `.prose-measure` — 65ch reading width. **Never on the same element as `.rail`:** `.rail` centres itself (`margin-inline: auto`), so the pair makes a narrow column centred under a left-aligned header. Put `.rail` on the wrapper and `.prose-measure` inside it, or use the industry page's grid (`lg:grid-cols-[minmax(0,65ch)_minmax(0,16rem)]`, text left, contents right). The first IBR pages shipped with this fault.
- `.section` — vertical rhythm (padding-block).

Colors, accent, and radius are CSS custom properties on `:root` (`--background`, `--foreground`, `--foreground-secondary`, `--line`, `--line-strong`, `--accent`, `--danger`, `--radius`), re-exposed to Tailwind via `@theme inline` in the same file.

## Typography

Two faces, one rule: **Instrument Serif displays, Geist Sans does everything else.**

- **`.display`** (`globals.css`) — `--font-serif` + `font-weight: 400` + `letter-spacing: -0.015em`. Applied to every `h1` and every major section `h2` (27 of them). It **replaces** `font-semibold tracking-tight`, which was tuned for a sans: Instrument Serif ships a single weight, so `font-semibold` would make the browser synthesise a bold, and `tracking-tight` is too tight for a serif at display sizes. **Never put a `font-*` weight utility on `.display`.**
- **`--font-sans` (Geist)** — body copy, navigation, buttons, labels, form fields, and card titles. Index-card `h2`s (`text-lg font-medium`) deliberately stay sans: they are cards, not display text.
- **`--font-mono` (Geist Mono)** — diagram labels and technical text.
- Replaced Pilcrow Rounded (2026-09-05). **`src/fonts/pilcrow-rounded/` and `src/lib/og-assets.ts` still contain it** — `og-assets.ts` embeds Pilcrow as base64 for OG card rendering, so social cards still render in the old face until those assets are regenerated. Known gap, tracked in `docs/plans-to-upgrade.md`.

## Fonts

- **Pilcrow Rounded** — self-hosted (`src/fonts/pilcrow-rounded/`, `next/font/local`), body/heading typeface. Only weights actually used (400/500/600) are loaded. ITF Free Font License (Fontshare); `LICENSE.txt` sits alongside the font files.
- **Geist Mono** (`next/font/google`) — used only for `SystemDiagram`'s node labels.

## Deployment / infra

- **Cloudflare Workers** via `@opennextjs/cloudflare`.
  - `open-next.config.ts` — no incremental-cache override; correct because the app has no ISR/revalidation (fully static).
  - `wrangler.jsonc` — worker name `ahrom-labs`, entry `.open-next/worker.js`, custom domain `ahromlabs.com`, static assets served via the `ASSETS` binding, `nodejs_compat` + `global_fetch_strictly_public` compat flags, observability enabled. No KV/R2/queue bindings (no incremental cache to back) and no Images binding.
  - `next.config.ts` — `images.unoptimized: true` (avoids a paid Cloudflare Images binding for a handful of small, already-sized static assets; revisit if user-uploaded/variable imagery is added).
  - `public/_headers` — sets `Cache-Control: public,max-age=31536000,immutable` on `/_next/static/*` only. Routes served through the Worker function rather than the `ASSETS` binding (`sitemap.xml`, `robots.txt`, `/knowledge.json` — confirmed by checking where their build output actually lands, `.next/server/app/...` vs `.open-next/assets`) can't be cached via `_headers`; `/knowledge.json` and `/llms.txt` set `Cache-Control: public, max-age=3600` directly on their response instead, which is what actually reaches the client for a Worker-served route.
- **`npm run deploy`** = content build (+ IBR quote check) → OpenNext build → deploy → AI Search sync → `search:check --wait` (buyer questions, plus every official IBR link). It exits 1 when any check misses even though the site is already live: read the log, don't assume the deploy failed. The content build also fails when a content file was committed after its `updated:` date — bump `updated` on every edited page.
- **Images in content:** frontmatter `image` needs `src`, `alt`, integer `width` and `height`, and `caption` (the build enforces width/height). A lazy `<img>` without width and height has no height until it loads, so the page jumps and a screenshot shows nothing there.
- **Scripts** (`package.json`): `content:build` (runs `scripts/build-content.mjs`, see **Knowledge layer**), `dev`/`build`/`preview`/`deploy` all run `content:build` first, `start` (`next start`, unused by the actual Cloudflare deploy path), `lint` (`eslint`), `cf-typegen` (`wrangler types --env-interface CloudflareEnv cloudflare-env.d.ts`).
- All routes prerender statically except `/api/contact`. Dynamic-segment `opengraph-image.tsx` files (`notes/[slug]/opengraph-image.tsx`, `patterns/[slug]/opengraph-image.tsx`) need their own explicit `generateStaticParams` to actually build static in this pipeline — confirmed empirically (the build output showed `ƒ Dynamic` without it, contradicting what the Next.js docs implied about inheriting params from the sibling `page.tsx` automatically).

## Google insights connector (`scripts/google-insights.mjs`, `.mcp.json`)

A local MCP connector for Search Console, Google Analytics 4 and PageSpeed, so an agent working
in this folder can see what Google sees and act on it. `.mcp.json` registers it; Claude Code
loads it in this folder (approve it once when asked). The same tools run from the terminal:
`npm run google` lists them, `npm run google -- gsc_queries '{"days":7}'` runs one. Each tool
is defined once in `TOOLS`, read by both surfaces. No Google client library: the service-account
JWT is signed with `node:crypto` (`scripts/google-insights.check.mjs` verifies it offline). The
MCP SDK and zod are dev dependencies, never bundled into the site.

- **Tools:** `setup_status` (run first) · Search Console: `gsc_queries`, `gsc_pages`,
  `gsc_page_queries`, `gsc_inspect` (index status, coverage, last crawl, Google's canonical; no
  paths = the whole sitemap), `gsc_sitemaps`, `gsc_submit_sitemap` (write) · Analytics:
  `ga_pages`, `ga_sources`, `ga_ai_referrals` (ChatGPT, Perplexity, Claude, Gemini, Copilot… by
  landing page; a floor, since many AI answers send no referrer), `ga_events` (the form events),
  `ga_report` (any dimensions and metrics); writes `ga_create_key_event`,
  `ga_create_custom_dimension`, `ga_set_data_retention` (with readers `ga_key_events`,
  `ga_custom_dimensions`, `ga_data_retention`) · `pagespeed` (Lighthouse scores, lab timings,
  real-user Core Web Vitals when Google has enough data, and what to fix).
- **Credentials, outside the repo** in `~/.config/ahrom-labs/`: `service-account.json` (a Google
  Cloud service account `ahrom-insights@mystical-tensor-502313-p0.iam.gserviceaccount.com` in
  project "Google Search Console Claude" (motiwalapujan@gmail.com) with the Search Console,
  Analytics Data, Analytics Admin and PageSpeed Insights APIs enabled and **no Cloud roles**;
  added in Search Console as a **Full** user and in GA4 as an **Administrator**, Pujan's choice; Editor would cover every tool) and `pagespeed-key`
  (an API key restricted to the PageSpeed Insights API). Never commit either. Overrides:
  `GOOGLE_KEY_FILE`, `PAGESPEED_KEY_FILE`, `GSC_SITE`, `GA4_PROPERTY`. The Search Console property
  and GA4 property are found automatically.
- **Writes** are flagged `write: true` and announced as non-read-only, so Claude Code asks before
  each. Access comes from the Search Console and GA4 roles, never Cloud IAM roles: those govern the
  Cloud project (billing, resources), add no data, and would make a leaked key dangerous.
- **Not possible by API:** "Request indexing" (Google keeps it in the web UI). The Indexing API
  is only for job postings and livestreams; don't use it for ordinary pages. Moving `lastmod` and
  resubmitting the sitemap is the API-side lever.
- **Quotas:** URL Inspection about 2,000 calls a day per property (the whole sitemap is about 65);
  PageSpeed without a key shares a small daily quota that ran out on 17 Oct 2026.
- **Routine (monthly, or after a big content change):** `setup_status` → `gsc_inspect` (anything
  not indexed, or a Google canonical that differs) → `gsc_pages` and `gsc_queries` (pages with
  impressions but low CTR: rewrite the title and meta description; queries ranking 8–20: add the
  buyer's wording to that page) → `ga_ai_referrals` and `ga_sources` → `pagespeed` on the pages
  with the most impressions. Record findings in `docs/progress.md`.

## Env vars / config

- `.env.example` — notes only: form mail needs no API key (Cloudflare Email Sending binding; recipient `LEADS_TO` in `wrangler.jsonc`).
- Worker secrets: `DEMO_LEAD_KEY`, `GA_API_SECRET`, `CRM_PASSWORD`. The Resend secrets were deleted on 13 Oct 2026.
- `.dev.vars` — same three vars, used by `wrangler`/OpenNext for local `npm run preview`; gitignored, holds real local secrets. Production secrets are set via `wrangler secret put`, not this file.
- `tsconfig.json` — `@/*` path alias maps to `./src/*` (source of every `@/components/...`, `@/lib/...` import).

## Tech stack (`package.json`)

- **Dependencies**: `next@16.3.3`, `react@19.2.8`, `react-dom@19.2.8`, `@heroicons/react@^2.2.0`, `@opennextjs/cloudflare@^1.20.4`, `react-markdown@^10` (bare, no plugins — renders note/pattern bodies).
- **Dev dependencies**: `tailwindcss@^4` + `@tailwindcss/postcss`, `typescript@^5`, `eslint@^9` + `eslint-config-next`, `wrangler@^4.127.0`, `js-yaml@^5` + `@types/js-yaml` (used only by `scripts/build-content.mjs`, never bundled into the app — moved from `dependencies` once `content.ts` stopped importing it directly).

## Doc files in this repo

- **`SYSTEM.md`** (this file) — hand-maintained, comprehensive technical reference. Update it when routes, components, lib files, or infra config change.
- `AGENTS.md` — auto-regenerated by `next dev` on every run (per its own header). Never hand-edit; never put project content there.
- `CLAUDE.md` — one line, `@AGENTS.md` import only.
- `README.md` — human quick-start doc (dev command, routes list, design-system summary). Predates the knowledge layer; may be stale on routes/scripts — this file is the current source of truth.
- `scripts/google-insights.mjs`, `.mcp.json` — see **Google insights connector**.
- `docs/plans-to-upgrade.md` — the 2026-09-05 discoverability/trust pass: which findings from an external audit survived verification, what shipped, what was rejected and why, and what is still open.
- `llms.txt` is no longer a file — it is a generated route (`src/app/llms.txt/route.ts`). See **Routes**.
- `docs/knowledge-layer-plan.md` — the full phased plan (7 phases, 0-6) the knowledge layer is built against. `docs/progress.md` tracks status per phase. `docs/citation-baseline-2026-08.md` — drafted prompts for Phase 0.5's citation check, not yet run.
