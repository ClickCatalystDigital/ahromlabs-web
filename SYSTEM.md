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
- `/knowledge.json` (`route.ts`, `force-static`) — the entire corpus (terms + notes + patterns) as JSON, for other repos'/agents' consumption. See **Knowledge layer**.
- `/approach`, `/systems`, `/about`, and every note/pattern detail page end in the shared `ClosingCta` component.
- `/api/contact` (POST) — see **Contact form** below.
- `error.tsx`, `not-found.tsx` — error/404 boundaries, same `SiteNav`/`SiteFooter` shell as every page.
- SEO/meta: `manifest.ts`, `robots.ts`, `sitemap.ts` (dynamically includes every note/pattern URL), root `opengraph-image.tsx`. Each of `about/`, `approach/`, `systems/`, and every `notes/[slug]`/`patterns/[slug]` also has its own `opengraph-image.tsx`, all built on the shared `renderOgImage()` helper (`src/lib/og-image.tsx`).
- `src/proxy.ts` — Next.js 16's replacement for `middleware.ts` (renamed; a stray `middleware.ts` would silently be ignored in this version). Logs AI-crawler hits (GPTBot, ClaudeBot, PerplexityBot, etc. — full list in the file) as structured JSON via `console.log`, captured by Cloudflare Workers Logs (`wrangler.jsonc`'s `observability.enabled`). Pure pass-through (`NextResponse.next()`), never mutates the response. Runs on the Node.js runtime by default in v16 — do not add `export const runtime`, it throws.

## Knowledge layer (`content/`, `src/lib/content.ts`, `scripts/build-content.mjs`)

A markdown corpus (11 terms, 3 notes, 5 patterns as of this writing) with YAML frontmatter (`kind`, `slug`, `title`, `answer`, `domain`, `systems?`, `patterns?`, `evidence?`, `order?` (terms only), `published`, `updated`), documented in full in `docs/knowledge-layer-plan.md`. `docs/progress.md` tracks what's built against that plan, phase by phase.

- **`scripts/build-content.mjs`** — the only place that touches the filesystem. A standalone Node script (plain `.mjs`, not bundled into the app) that reads `content/**/*.md`, parses frontmatter with `js-yaml`, validates it (required fields, slug-matches-filename, kind-matches-directory, and that every note's `patterns:` resolves to a real pattern — throws and fails the build on any violation), and writes the result to `src/lib/content-data.generated.json`.
- **`src/lib/content-data.generated.json`** — committed (not gitignored) so standalone tooling (`tsc`, editors) resolves it before the build script has ever run; silently overwritten by every real entry point below, so a stale committed copy can't drift for long.
- **`src/lib/content.ts`** — `getContent(kind)`, a plain `import` of that JSON file, filtered by kind. No filesystem access, no top-level side effects. This matters: an earlier version read `content/` directly via `fs.readdirSync`/`readFileSync` at module load, which OpenNext's bundler couldn't statically trace, so `content/` never made it into the Cloudflare Worker bundle — a production `ENOENT: readdir '/bundle/content/patterns'` on `/notes`/`/patterns` despite `npm run dev` and `npm run build` both working. Fixed by moving all fs access into the build script and making `content.ts` a static JSON import instead — the general lesson: dynamic runtime fs reads are invisible to Worker bundle tracing; static imports aren't.
- **`content:build`** (`npm run content:build`) runs the script above; wired as a prerequisite into `dev`, `build`, `preview`, and `deploy` in `package.json` (not an npm `pre*` hook — those don't fire for `opennextjs-cloudflare build`, so it's prepended explicitly in each script).
- Note/pattern detail pages render `body` (markdown) via `react-markdown` (bare, no `remark-gfm` — current content only needs headings/paragraphs/lists/blockquotes) with a `components` map into the site's existing typographic classes.
- `src/lib/schema.ts` — the JSON-LD graph (`Organization`, `Person`/founder, `ProfessionalService`, `WebSite`) rendered in `layout.tsx`. `Organization.sameAs` includes the LinkedIn company page; still missing GitHub/Crunchbase and the founder's `sameAs`/`alumniOf` (marked with `ponytail:` comments at the exact spot to add them).

## Contact form (`/api/contact`)

`src/app/api/contact/route.ts`. Actual behavior, not to be confused with older docs mentioning nodemailer/SMTP — **that's stale; this project sends mail via the Resend HTTP API and has no nodemailer dependency**:

1. Parses JSON body; requires `email` and `message` strings.
2. Honeypot: a hidden `company` field. If filled, silently returns `{ ok: true }` without sending anything (bot never gets a signal to keep trying).
3. Validates email format (regex) and non-empty message.
4. Reads `RESEND_API_KEY`, `RESEND_FROM`, `CONTACT_TO` from env. If any are missing, logs an error server-side and returns a generic 500 to the client.
5. POSTs to `https://api.resend.com/emails` with `Authorization: Bearer ${RESEND_API_KEY}`, `reply_to` set to the visitor's email. On failure, logs and returns a generic 500 — never throws to the client, never leaks provider error detail.

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

## Design system

Layout primitives live in `src/app/globals.css`:

- `.rail` — max-width (72rem) + horizontal padding, shared by every section, nav, and footer, so headings share one left edge across routes.
- `.prose-measure` — 65ch reading width.
- `.section` — vertical rhythm (padding-block).

Colors, accent, and radius are CSS custom properties on `:root` (`--background`, `--foreground`, `--foreground-secondary`, `--line`, `--line-strong`, `--accent`, `--danger`, `--radius`), re-exposed to Tailwind via `@theme inline` in the same file.

## Fonts

- **Pilcrow Rounded** — self-hosted (`src/fonts/pilcrow-rounded/`, `next/font/local`), body/heading typeface. Only weights actually used (400/500/600) are loaded. ITF Free Font License (Fontshare); `LICENSE.txt` sits alongside the font files.
- **Geist Mono** (`next/font/google`) — used only for `SystemDiagram`'s node labels.

## Deployment / infra

- **Cloudflare Workers** via `@opennextjs/cloudflare`.
  - `open-next.config.ts` — no incremental-cache override; correct because the app has no ISR/revalidation (fully static).
  - `wrangler.jsonc` — worker name `ahrom-labs`, entry `.open-next/worker.js`, custom domain `ahromlabs.com`, static assets served via the `ASSETS` binding, `nodejs_compat` + `global_fetch_strictly_public` compat flags, observability enabled. No KV/R2/queue bindings (no incremental cache to back) and no Images binding.
  - `next.config.ts` — `images.unoptimized: true` (avoids a paid Cloudflare Images binding for a handful of small, already-sized static assets; revisit if user-uploaded/variable imagery is added).
  - `public/_headers` — sets `Cache-Control: public,max-age=31536000,immutable` on `/_next/static/*` only. Routes served through the Worker function rather than the `ASSETS` binding (`sitemap.xml`, `robots.txt`, `/knowledge.json` — confirmed by checking where their build output actually lands, `.next/server/app/...` vs `.open-next/assets`) can't be cached via `_headers`; `/knowledge.json` sets `Cache-Control: public, max-age=3600` directly on its `NextResponse` instead, which is what actually reaches the client for a Worker-served route.
- **Scripts** (`package.json`): `content:build` (runs `scripts/build-content.mjs`, see **Knowledge layer**), `dev`/`build`/`preview`/`deploy` all run `content:build` first, `start` (`next start`, unused by the actual Cloudflare deploy path), `lint` (`eslint`), `cf-typegen` (`wrangler types --env-interface CloudflareEnv cloudflare-env.d.ts`).
- All routes prerender statically except `/api/contact`. Dynamic-segment `opengraph-image.tsx` files (`notes/[slug]/opengraph-image.tsx`, `patterns/[slug]/opengraph-image.tsx`) need their own explicit `generateStaticParams` to actually build static in this pipeline — confirmed empirically (the build output showed `ƒ Dynamic` without it, contradicting what the Next.js docs implied about inheriting params from the sibling `page.tsx` automatically).

## Env vars / config

- `.env.example` — template for local `.env.local`: `RESEND_API_KEY`, `RESEND_FROM`, `CONTACT_TO`.
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
- `public/llms.txt` — public-facing file served to AI crawlers visiting the live site (business positioning, page list, an `## Engineering notes` section listing current notes/patterns — hand-maintained, not auto-generated; keep in sync manually as content grows). Unrelated purpose to this file; not a technical reference.
- `docs/knowledge-layer-plan.md` — the full phased plan (7 phases, 0-6) the knowledge layer is built against. `docs/progress.md` tracks status per phase. `docs/citation-baseline-2026-08.md` — drafted prompts for Phase 0.5's citation check, not yet run.
