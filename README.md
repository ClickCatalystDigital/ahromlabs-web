# Ahrom Labs

Marketing site for Ahrom Labs, an infrastructure engineering practice. Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4.

## Routes

Home, `/services`, `/industries`, `/work`, `/engagement` (pricing), `/notes`, `/patterns`,
`/systems` (glossary), `/approach`, `/about`, and the IBR 2026 section under `/ibr`. Machine
surfaces: `/llms.txt`, `/knowledge.json`, `/sitemap.xml`, Markdown copies of every page for
`Accept: text/markdown`, WebMCP tools, and an AI Search MCP server. `SYSTEM.md` is the full,
current reference; read it before changing anything.

## Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Contact form and CRM

`/api/contact` and `/api/demo-lead` save each lead to the D1 CRM database and email it with Cloudflare Email Sending; no API keys. Leads are viewed at `/api/crm`. Details in `SYSTEM.md` (**Contact form**, **CRM**).

## Design system

Layout primitives live in `src/app/globals.css`: `.rail` (max-width + horizontal padding, shared by every section, nav, and footer), `.prose-measure` (65ch reading width), and `.section` (vertical rhythm). Every page uses these three instead of a locally-chosen width/spacing, so headings share one left edge and one rhythm across routes.

Colors, the accent, and the radius are CSS custom properties in `:root` and re-exposed to Tailwind via `@theme inline` in the same file.

## Fonts

- **Pilcrow Rounded** (self-hosted, `src/fonts/pilcrow-rounded/`) — body and heading typeface. Free for commercial use under the ITF Free Font License (Fontshare); `LICENSE.txt` sits alongside the font files.
- **Geist Mono** (`next/font/google`) — used only for the system diagram's node labels.

## Build and deploy

```bash
npm run deploy
```

Builds the content (and checks every IBR quote against the Gazette), builds and deploys to
Cloudflare Workers, re-syncs the site chatbot, then asks it a set of buyer questions. It exits 1
when a question misses even though the site is live: read the log. Edited a content page? Bump
its `updated:` date or the build stops. All pages prerender statically except the `/api` routes.
