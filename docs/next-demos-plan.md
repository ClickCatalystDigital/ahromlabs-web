# Next: demo polish, rename, LS Inventory and Savistar demos

Decided 13 Oct 2026.

## Status (13 Oct 2026)

- **Done:** SB Ops logo strip (live), Shanti Ops → SB Ops text rename, SB cron Workers moved to `wrangler.jsonc`.
- **Done:** LS Inventory demo live at electronics-erp.ahromlabs.com (`ls-inventory` SYSTEM.md §6d), with its nightly reset Worker; linked from the electronics industry page, /work and llms.txt.
- **Done:** Savistar Ops demo live at interiors-erp.ahromlabs.com, from savistar-ops `main` (Next 15 + React 19, Workers via OpenNext, nightly reset). Details: savistar-ops `DEMO.md` on that branch. Merged into `main` on 13 Oct 2026 (PR #1), so the live Render app runs Next 15 too.
- **Done:** all three demos linked from their industry pages, /work and llms.txt.
- **Later:** golden demo data is dated when seeded, so "today" views empty out over weeks; re-seed each demo every month or two, or teach the reset Workers to shift dates.


**Decisions (Pujan)**
- SB Ops demo page: a looping logo strip for "Connects with". It pauses on hover and respects reduced motion. The features stay a static grid.
- Logos for WhatsApp, Gmail, Zoho, Cloudflare and Claude come from simple-icons (CC0).
- IndiaMART, TradeIndia and JustDial use their official logos from their own sites. Pujan accepts the trademark risk.
- Rename "shanti-ops" → "SB Ops" in text only: UI, emails, PDFs, docs, comments and package name. The folder, GitHub repo, Worker and DB names stay.
- Build the LS Inventory demo first, then Savistar Ops.
- LS demo uses made-up names (Acme Components, Partner Store) via `BRAND`; Gelco never appears publicly.
- Domains: electronics-erp.ahromlabs.com and interiors-erp.ahromlabs.com.
- Savistar demo: port to Cloudflare Workers.

**Survey: LS Inventory** (`ls-inventory`)
- Express API (`app.js`, `worker.mjs`) plus a Next 16 static export in `frontend/`.
- Cloudflare Workers, domain lstechnologies.in, R2 bucket `impax-ls`, no CI.
- Its Turso DB is shared with ls_crm, which owns the `crm_*` tables. The demo needs its own Turso DB with the `crm_*` DDL. Seed ideas are in `ls_crm/seed_demo.py` and `ls_crm/demo_ddl.md`.
- Auth: `utils/auth.js`, plus `frontend/lib/role-allowlist.ts` kept in sync by hand.
- Demo roles: admin, manager, user, gelco_manager, gelco_worker, client.
- Switch off: R2 uploads, OpenRouter assistant, Tally queue.

**Survey: Savistar Ops** (`savistar-ops`)
- Next 14 on Render (not Cloudflare). Turso, with a local-file fallback. Schema in `lib/db.js`.
- Auth: `lib/auth.js`. The `SESSION_SECRET` fallback `'fallback-secret'` must be fixed before going public.
- Roles: owner, admin, manager, user. Demo roles would differ by persona.
- Switch off: R2 uploads, OpenRouter extraction.
- The working tree isn't clean: a staged README→SYSTEM.md rename, plus untracked `.claude/` and `CLAUDE.md`.

**SB Ops pieces to copy**
- `lib/demo-roles.js`, `lib/demo-leads.js`
- `app/demo/page.js`, `server/api/demo/{lead,enter}/route.js`
- `components/DemoEntry.jsx`, `components/DemoAnalytics.jsx`
- `DEMO_MODE` guards in `app/layout.js` and `lib/mail.js`
- the nightly reset Worker, seed and scrub scripts (`scripts/demo/*`)
- `.github/workflows/deploy.yml`

**Next chat starts with**
- Re-run the SB Ops demo inventory: its survey didn't finish in this chat.
- Then plan the LS Inventory demo in detail.
