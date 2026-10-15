# Outreach plan: CRM UI, email, WhatsApp (15 Oct 2026)

Goal: turn the 208 prospects in the CRM (≈194 with a verified email, 150 of them boiler makers) into replies and
demo calls, with every touch logged in one place. Order is chosen so nothing is built twice and the slow
outside step (Meta business verification) starts today.

## What we reuse

| From | What | How it changes here |
|---|---|---|
| `research_leads` (ClickCatalyst engine) | Warmup ramp 5 → 10 → 20 → 35/day; IST send window Mon–Fri; random 30–90 s gaps; deliverability gate (stop on bounces/unsubs); hard-bounce marking; `Unsubscribed` excludes everywhere; reply tracking through the Gmail API; red-alert email to the owner when something breaks; arm budget rule (≈40 sends per arm per month, so few arms). | Runs on Cloudflare (Worker cron + D1), not a Mac with launchd, so nothing stops when the laptop sleeps. Gmail **API** over HTTPS instead of SMTP (Workers can't rely on SMTP). With ~200 prospects, 2 copy versions per segment, not 6–8. Replies are the success measure; open pixels are skipped (Apple Mail fakes opens, and a pixel hurts deliverability). |
| `shanti-ops` (SB Ops) | Meta WhatsApp Cloud API direct (no reseller fee): `lib/whatsapp.mjs` (webhook parsing, 24-hour rule, signature check, template info), `lib/whatsapp.js` (Graph calls, send), `whatsapp_accounts` / `wa_conversations` / `wa_messages` tables, the setup screen (`WhatsAppSetup.jsx`, Settings → **Sales** → WhatsApp) and the inbox (`WhatsAppInbox.jsx`). | Ported to TypeScript on D1; one number (Ahrom's), not one per company. Inbox lives inside the CRM next to email. |
| `ahrom-labs` CRM (today) | D1 `ahrom-crm`: `leads`, `prospects`; `prospects.py crm-sql` loader that never overwrites status/notes. | Server-rendered page is replaced by the shadcn app; tables stay. |

## Phase 0 — start today (Pujan, ~1 hour)

1. **Sender: `pujan@ahromlabs.com`** (decided 15 Oct; the main Workspace mailbox, which already has sending
   history, so no separate domain to warm). Because a block would hit client mail and form leads too, the
   limits are tighter than in `research_leads`: start at 5/day, ramp to a hard cap of 30/day, pause
   automatically on any spam complaint or a bounce rate over 3%, and only verified emails are sent to.
2. **Check DNS before the first send:** SPF includes Google, DKIM signing on in Workspace, DMARC record present
   (`p=none` with reports is enough to start). Pujan approves the Gmail API consent (send + read) once.
3. **Meta WhatsApp Business:** verify the business in Meta Business Manager and get a number that is not on the
   WhatsApp app (verification can take days). Same steps as `shanti-ops` `docs/client-setup.html` §6.

## Phase 1 — CRM app in shadcn (built and deployed 15 Oct 2026: `~/Developer/ahrom-crm`; waits on Cloudflare Access)

- New Next.js app `ahrom-crm` (own repo, OpenNext on Workers) at **crm.ahromlabs.com**, bound to the same D1.
  Separate from the marketing site so the site's CSS, build and deploys stay untouched, and so the CRM can have
  a cron trigger. shadcn components as in `shanti-ops` (`components/ui`, `radix-ui`, Tailwind v4).
- Sign-in: **Cloudflare Access** (one-time code to pujan@ahromlabs.com) in front of the whole subdomain; replaces
  the password/cookie code. Free for one user.
- Screens: **Prospects** (table with filters by segment/priority/status, saved views, bulk select, side sheet per
  company with contacts, timeline, next step, notes), **Leads** (inbound forms, as today), **Today** (follow-ups
  due, replies waiting, sends scheduled), **Settings** (mailbox, WhatsApp, suppression list, send limits).
- Data: add `contacts` (several people per company; today only one fits) and `activities` (every email, reply,
  call, WhatsApp, status change, as one timeline). Loader moves from SQL file to `POST /api/import` (token)
  so `prospects.py` pushes directly.
- `/api/crm` on ahromlabs.com is retired once the new app shows the same data.

## Phase 2 — Email outreach (≈3–4 days; sends start right after, at 5/day)

- **Sequences:** step 1 (personal opening line + one problem, from the industry page wording: IBR file from the
  BOM, true cost per boiler, plate remnants), step 2 after 3 working days (short bump), step 3 after 7 (link to
  the demo + the 3-minute video). A reply, bounce, unsubscribe or manual status change stops the sequence.
- **Copy:** templates per segment with `{first_name}`, `{company}`, `{city}`, `{personal_line}`; 2 versions
  (A/B) per segment; the CRM shows replies per version. Every email is plain text from a real person.
- **Sender:** Worker cron every 15 min in the IST window (Mon–Fri 10:00–17:00) drains a `send_queue` through the
  Gmail API (OAuth refresh token for the sending mailbox, stored as a Worker secret). Daily cap from the ramp
  ramp; stops itself on a bounce rate > 3% or any spam complaint and emails an alert.
- **Unsubscribe:** one-click link + `List-Unsubscribe` header (Gmail requires it for bulk senders), into the
  suppression table; the suppression list from `data_collector` is copied in too.
- **Replies:** the cron reads the sending mailbox's threads (Gmail API, read scope), marks the prospect
  `replied`, stops the sequence and shows the reply on the timeline and in **Today**.
- **Test mode** first: every send goes to Pujan's own inbox until switched to live in Settings.

## Phase 3 — WhatsApp (≈2 days build; live when Meta verification is through)

- Port `shanti-ops` WhatsApp: setup screen in CRM Settings, webhook on crm.ahromlabs.com (Access bypass for that
  one path, signature-checked), inbox per prospect on the timeline, 24-hour reply window, approved templates.
- **Who gets WhatsApp:** people who wrote to us first (click-to-chat link on the website, in email signatures and
  in the step-3 email) and prospects who replied or agreed to it. Meta's rules require opt-in for messages we
  start; cold template blasts get the number's quality rating dropped and then blocked, which would lose the
  channel. Until a prospect opts in, the CRM keeps the `wa.me` click-to-chat link (built today).
- Spend shown from Meta's usage API, as in SB Ops.

## Phase 4 — Measure and widen (ongoing)

- Weekly: sends, replies, meetings by segment and version; keep the winning version, write the next challenger.
- More contacts when Apollo credits reset (8 Nov): electronics and interiors P1 first.

## Decisions

Decided 15 Oct 2026: sender `pujan@ahromlabs.com`; CRM as its own app at crm.ahromlabs.com; sign-in through
Cloudflare Access.
