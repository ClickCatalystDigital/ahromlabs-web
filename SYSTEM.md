# AHROM Labs

Marketing site for Ahrom Labs, an infrastructure engineering practice. Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4. Deployed to Cloudflare Workers via OpenNext.

## Routes

All under `src/app/`.

- `/` (`page.tsx`) — home. 8 sections in order: hero, problem, approach comparison, `SystemDiagram`, principles, who-it's-for, how-we-work, `ContactForm`.
- `/approach` — the four principles behind how engagements are modeled.
- `/systems` — glossary of the vocabulary used to model a business (entities, relationships, workflows, evidence, etc.).
- `/about` — who the practice is for, how an engagement runs.
- `/approach`, `/systems`, `/about` each end in the shared `ClosingCta` component.
- `/api/contact` (POST) — see **Contact form** below.
- `error.tsx`, `not-found.tsx` — error/404 boundaries, same `SiteNav`/`SiteFooter` shell as every page.
- SEO/meta: `manifest.ts`, `robots.ts`, `sitemap.ts`, root `opengraph-image.tsx`. Each of `about/`, `approach/`, `systems/` also has its own `opengraph-image.tsx`, all built on the shared `renderOgImage()` helper (`src/lib/og-image.tsx`) so every route's social card shares the same layout/fonts with route-specific title/description text.

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
- `Wordmark.tsx` (`LogoBadge`) — nav logo mark; the ring is baked into the artwork (`public/logo/a12.png`), not CSS.

## Lib (`src/lib/`)

- `diagram-data.ts` — node/edge/layer-band data consumed by `SystemDiagram`, plus a plain-text equivalent for screen readers.
- `og-image.tsx` — `renderOgImage({ title, description })`, the shared OG image template (via `next/og`'s `ImageResponse`) used by every route's `opengraph-image.tsx`.
- `og-assets.ts` — build-time base64-embedded Pilcrow Rounded font + logo, consumed by `og-image.tsx`. Regenerate only if the font or logo changes; not read via `node:fs` at request time.

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
  - `public/_headers` — sets `Cache-Control: public,max-age=31536000,immutable` on `/_next/static/*`.
- **Scripts** (`package.json`): `dev` (`next dev`), `build` (`next build`), `start` (`next start`), `lint` (`eslint`), `preview`/`deploy` (`opennextjs-cloudflare build` + `preview`/`deploy`), `cf-typegen` (`wrangler types --env-interface CloudflareEnv cloudflare-env.d.ts`).
- All routes prerender statically except `/api/contact`.

## Env vars / config

- `.env.example` — template for local `.env.local`: `RESEND_API_KEY`, `RESEND_FROM`, `CONTACT_TO`.
- `.dev.vars` — same three vars, used by `wrangler`/OpenNext for local `npm run preview`; gitignored, holds real local secrets. Production secrets are set via `wrangler secret put`, not this file.
- `tsconfig.json` — `@/*` path alias maps to `./src/*` (source of every `@/components/...`, `@/lib/...` import).

## Tech stack (`package.json`)

- **Dependencies**: `next@16.3.3`, `react@19.2.8`, `react-dom@19.2.8`, `@heroicons/react@^2.2.0`, `@opennextjs/cloudflare@^1.20.4`.
- **Dev dependencies**: `tailwindcss@^4` + `@tailwindcss/postcss`, `typescript@^5`, `eslint@^9` + `eslint-config-next`, `wrangler@^4.127.0`.

## Doc files in this repo

- **`SYSTEM.md`** (this file) — hand-maintained, comprehensive technical reference. Update it when routes, components, lib files, or infra config change.
- `AGENTS.md` — auto-regenerated by `next dev` on every run (per its own header). Never hand-edit; never put project content there.
- `CLAUDE.md` — one line, `@AGENTS.md` import only.
- `README.md` — human quick-start doc (dev command, routes list, design-system summary).
- `public/llms.txt` — public-facing file served to AI crawlers visiting the live site (business positioning, page list). Unrelated purpose to this file; not a technical reference.
