# Ahrom Labs

Marketing site for Ahrom Labs, an infrastructure engineering practice. Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4.

## Routes

- `/` — home
- `/approach` — the four principles behind how engagements are modeled
- `/systems` — glossary of the vocabulary used to model a business
- `/about` — who the practice is for, how an engagement runs

## Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Contact form

`/api/contact` sends mail via SMTP using `nodemailer`. Requires these environment variables (see `.env.example`):

```
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASS=
CONTACT_TO=
```

Without them set, the route logs an error and returns a generic failure to the client rather than throwing.

## Design system

Layout primitives live in `src/app/globals.css`: `.rail` (max-width + horizontal padding, shared by every section, nav, and footer), `.prose-measure` (65ch reading width), and `.section` (vertical rhythm). Every page uses these three instead of a locally-chosen width/spacing, so headings share one left edge and one rhythm across routes.

Colors, the accent, and the radius are CSS custom properties in `:root` and re-exposed to Tailwind via `@theme inline` in the same file.

## Fonts

- **Pilcrow Rounded** (self-hosted, `src/fonts/pilcrow-rounded/`) — body and heading typeface. Free for commercial use under the ITF Free Font License (Fontshare); `LICENSE.txt` sits alongside the font files.
- **Geist Mono** (`next/font/google`) — used only for the system diagram's node labels.

## Build

```bash
npm run build
```

All routes prerender statically except `/api/contact`.
