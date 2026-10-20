# Support desk plan (client support for AMC clients)

Plan only, written 20 Oct 2026. Nothing here is built. Building is a separate decision.

## Why, and the rule it has to follow

Client support today is informal WhatsApp to Pujan. A ticketing system helps only if it is real and used:
clients raise requests where they already work (inside their own system), Pujan answers from where he already
works (the Ahrom CRM), and nothing about it is published until real data backs it. A support page with no
history behind it, or invented response times, would do more harm than none.

What is already promised in public (`src/lib/engagement.ts`, answer `support`): the AMC is 15–21% of project
value a year, covers the licence, server, fixes, keeping the system running and small changes; a new module is
quoted as its own phase; "Support requests come in by email today, answered within 48 hours at most. A ticketing
system for urgent work is on its way." The plan keeps the 48-hour promise as the ceiling and adds faster targets
only for urgent work.

## Recommendation

**Build the desk inside the Ahrom CRM (`~/Developer/ahrom-crm`) as one new "Support" tab, and give each client
system a small "Request support" form that posts to it.** No third-party helpdesk.

Why this over a SaaS helpdesk (Freshdesk, Zoho Desk, etc.):
- The CRM already has every piece the desk needs: the Gmail reader/sender (`src/lib/outreach/engine.ts`, every
  10 minutes), the WhatsApp Cloud API number with a webhook outside Access (`/api/whatsapp`), alert emails to
  Pujan, the Today page, and the MCP connector so Claude can triage and draft replies.
- A form inside SB Ops / Inventory Ops / Designer Ops is what shows maturity to a prospect walking the demo; a
  link out to a helpdesk portal shows less and adds a second login for the client.
- One person, one screen: support sits next to leads and prospects, so a client asking for a change is also
  visible as sales work.
- Cost is zero beyond build time; data stays in D1 `ahrom-crm`, so later metrics are a query, not an export.

What it deliberately does not do (yet): no client logins on the CRM (clients see their requests inside their own
system), no attachments in phase 1, no satisfaction surveys, no knowledge base, no multi-agent assignment.

## How a request flows

```
Client system (SB Ops / Inventory Ops / Designer Ops)        Email (support@ahromlabs.com)     WhatsApp (+91 94265 19798)
  "Request support" form → own server route                    Gmail, read every 10 min          Meta webhook /api/whatsapp
        │  POST + per-client key (server to server)                     │                                 │
        ▼                                                                ▼                                 ▼
  crm.ahromlabs.com/api/support  ──────────────►  support_requests + support_messages (D1 ahrom-crm)  ◄──────┘
                                                        │
                       Pujan: Support tab, Today, alert email, Claude via /mcp
                                                        │ replies
                       ◄── email in the same thread / WhatsApp (24-hour rule) / shown in the client's "My requests"
```

## 1. Entry point inside each client system

- **Where:** a "Request support" item in the existing help/settings menu of each system, visible to signed-in
  staff only (not customer-portal logins, not LS's `client` or partner-store roles):
  - SB Ops (shanti-ops): the Help workspace (§2b) gets a "Support" tab; also the user menu.
  - Inventory Ops (ls-inventory): the cog menu, next to Settings.
  - Designer Ops (savistar-ops): the ⚙ nav menu, next to Change password.
- **Form:** what's wrong or what you need (required), type (problem / question / change request), how urgent
  (see §3, with one plain sentence under each choice so "urgent" isn't the default), and three things filled in
  automatically: who (username and display name), where (the page they were on), and which build
  (`/api/version` commit, all three systems already expose it).
- **Send:** the browser posts to the system's own server route (`server/api/support` in SB Ops,
  `app/api/support` in Designer Ops, a route in ls-inventory's server); that route adds the client's secret key and
  forwards to `https://crm.ahromlabs.com/api/support`. The key never reaches the browser. If the CRM can't be
  reached the form says so and shows the support email and WhatsApp number, so nothing is lost silently.
- **After sending:** "Request SUP-1042 received. Pujan will reply by <time>." The reply-by time comes back from
  the CRM (§3), so the promise the client sees is the one the CRM measures.

### In the public demos (demo-safe)

The same form ships in all three demos (same code, `DEMO_MODE=1`), because seeing it is half the point.
- The demo route posts with a **demo key** and the visitor's demo-lead email (the demos already hold it in the
  `demo_lead` cookie / leads DB). The CRM files it under a demo client (`demo-boiler`, `demo-electronics`,
  `demo-interiors`), marked `is_demo`, never counted in any metric.
- Pujan sees it on Today as a lead signal ("demo visitor raised a support request") and can answer it for real;
  a prospect who gets a genuine reply from a demo has just tested the AMC.
- Limits: 3 requests per visitor per day, owner-pass browsers allowed without limit (for showing it live).
- "My requests" in the demo lists that visitor's own requests plus three seeded sample requests (resolved, with
  replies) written into each demo's seed, with made-up names only. The scrub checks in each repo cover them.

## 2. Intake from email and WhatsApp

Not every client will use the form; phone-in-hand WhatsApp will stay the habit for a while.

- **Email.** Create `support@ahromlabs.com` as an alias of pujan@ahromlabs.com (Workspace, no new mailbox). The
  CRM's existing Gmail read loop gains one rule, checked **before** the prospect-reply logic: a message to
  support@, or from an email on a client contact, becomes a support message. `[SUP-1042]` in the subject or the
  Gmail thread id attaches it to that request; otherwise it opens a new one (type and priority unset, for Pujan to
  triage). Every reply from the CRM goes out in the same thread with `[SUP-1042]` in the subject. Client contacts
  are excluded from outreach sequences and from Jev's prospect-reply rules.
- **WhatsApp.** The webhook already links a conversation to a person by phone. Add `client_contacts` to that
  lookup: a message from a client contact with **no open request** opens one; while a request from that client is
  open and active in the last 3 days, messages append to it. Pujan can "Move to a new request" from the sheet if a
  message is really a separate issue. Replies go out as free text within 24 hours of their last message; outside
  that, through one utility template `support_update` ("Update on your request {{1}}: {{2}}"), which needs Meta's
  approval.
- **Pujan's personal WhatsApp / phone calls.** Can't be read. The Support tab gets **Log a request** (client,
  channel "phone" or "WhatsApp (personal)", text pasted in) so those still count. The aim over time is to move
  clients to the in-app form and the CRM number; see open questions.

## 3. Numbering, statuses, priority and targets

**Number:** `SUP-1001`, one counter across all clients (clients only ever see their own, and a global counter
reveals nothing because it isn't per client). Demo requests use the same counter with a `D` prefix (`SUP-D1001`)
so they never sit between real numbers.

**Type:** problem · question · change request. A change request is answered with a yes-it's-covered or a quote
(small changes are inside the AMC; a new module is its own phase, per `engagement.ts`).

**Statuses** (stamps are set by the status change itself, never typed, as SB Ops' `service_calls` route does):

| Status | Meaning | Clock |
|---|---|---|
| new | received, not yet answered | running |
| in progress | answered, being worked on | running |
| waiting on client | needs something from them | paused |
| resolved | fix shipped or question answered | stopped |
| closed | resolved and no reply for 7 days, or client confirmed | — |

A client reply to a resolved request reopens it (back to in progress). `first_response_at` is set by the first
outbound message, whatever the status.

**Priority and targets** (business hours, see open question 1; "respond" = a real human reply, not the
automatic acknowledgement):

| Priority | When to choose it | First response | Resolve or workaround |
|---|---|---|---|
| Urgent | the system is down, or a core job (invoicing, dispatch, inward) can't be done and there's no way around it | 2 business hours | 1 business day |
| High | something is broken but there's a way around it | 1 business day | 3 business days |
| Normal | a question, a small change, something cosmetic | 2 business days (= the published 48 hours) | 10 business days, or a date agreed in the reply |
| Change request (type) | — | 2 business days | quote or "covered" answer in 5 business days; the build date is agreed separately |

Pujan can change the priority; the targets are recalculated from creation time, and the change is logged. Targets
only apply while the client's AMC is active (`clients.amc_end`); a request from a client whose AMC has lapsed is
still received and flagged "outside AMC" for Pujan to decide.

These targets live in one place (`src/lib/support.ts` in the CRM) and are copied into the client-facing reply-by
text, so the form, the emails and the metrics can't drift apart.

## 4. What the client sees

Inside their own system, **Support → My requests** (fetched live from the CRM through the same server route):
- Their company's requests (everyone at that client sees all of them; small teams, and it stops duplicates),
  newest first, with number, subject, who raised it, status, and "reply by" while new.
- Opening one shows the thread: their messages, Pujan's replies, status changes. Internal notes never leave the
  CRM. They can add a reply or mark it solved.
- An "Open" count next to the Support menu item when a request has an unread reply (fetched when the menu opens,
  no polling).
- By email: an acknowledgement with the number and reply-by time, each reply from Pujan, and "resolved". Replying
  to any of these adds to the request.

## 5. What Pujan sees (CRM)

- **Support tab** (new top tab, after Leads), sidebar: Queue · Clients · Closed.
  - **Queue:** open requests sorted by next due time; columns number, client, subject, type, priority, status,
    age, due (amber within 2 business hours, red when breached); filter by client / status / priority. Waiting on
    client shown separately with how long it has waited.
  - **Request sheet:** the thread across channels (app, email, WhatsApp, logged), reply box that sends by the
    channel the client last used (or both email and in-app), internal note, status/priority/type, "Move to a new
    request", "Draft reply with Claude" (via the same MCP tools).
  - **Clients:** one row per client (SB Ops, Inventory Ops, Designer Ops, plus the three demo clients greyed):
    AMC dates and days left, open requests, requests this month, median first response over 90 days, % within
    target. Opening a client shows its full history and contacts (who can raise requests, their phones and
    emails).
- **Today:** a "Support" block above replies: breached or due-today requests first, then new ones; demo requests
  listed with demo leads.
- **Claude (MCP):** `list_support_requests`, `get_support_request`, `reply_support_request` (draft or send),
  `set_support_status`, `log_support_request`, `support_stats`. `business_snapshot` gains a support line.

## 6. Notifications

| Event | Client | Pujan |
|---|---|---|
| New request | acknowledgement email (number, reply-by) | alert email (existing `alerts_to`); **urgent** also a WhatsApp template to Pujan's own phone |
| Pujan replies | email in thread; WhatsApp if the request came by WhatsApp | — |
| Client replies | — | alert email, request back to the top of the queue |
| Target about to breach (1 business hour left) | — | one alert email per request |
| Resolved | email "resolved, reply if it isn't" | — |
| Closed after 7 days | nothing | — |

The cron that already runs every 10 minutes checks due times; no new trigger. Email sending for support is
outside the outreach ramp and window (it is service mail, not marketing) but uses the same Gmail connection.

## 7. Data model (CRM, migration `0015_support.sql`)

```sql
-- One row per client company with an AMC, plus the three demo clients.
clients (
  id INTEGER PRIMARY KEY, code TEXT UNIQUE,         -- 'sb', 'ls', 'sav', 'demo-boiler', …
  name TEXT, system TEXT,                           -- 'SB Ops', 'Inventory Ops', 'Designer Ops'
  app_url TEXT, key_hash TEXT,                      -- SHA-256 of the client system's secret key
  amc_start TEXT, amc_end TEXT, is_demo INTEGER DEFAULT 0,
  cin TEXT REFERENCES prospects (cin),              -- optional link if the client was once a prospect
  created_at TEXT
)
client_contacts (id, client_id, name, email, phone, wa_id, app_username, active, created_at)

support_requests (
  id INTEGER PRIMARY KEY, number TEXT UNIQUE,       -- 'SUP-1042' / 'SUP-D1003'
  client_id, contact_id,                            -- contact may be null (unknown sender, triage)
  requester_name, requester_username,
  channel TEXT,                                     -- app | email | whatsapp | logged
  type TEXT, priority TEXT, status TEXT,
  subject TEXT, page_url TEXT, app_commit TEXT,
  respond_by TEXT, resolve_by TEXT,                 -- computed from created_at, priority and business hours
  first_response_at, resolved_at, closed_at,
  paused_minutes INTEGER DEFAULT 0, paused_since TEXT,  -- time spent waiting on client
  gmail_thread_id TEXT, wa_conversation_id INTEGER REFERENCES wa_conversations (id),
  demo_lead_email TEXT, outside_amc INTEGER DEFAULT 0,
  client_unread INTEGER DEFAULT 0,
  created_at, updated_at
)
support_messages (
  id, request_id, kind TEXT,                        -- message | note | status
  direction TEXT,                                   -- in | out (null for notes/status)
  channel TEXT, author TEXT, body TEXT,
  gmail_message_id TEXT UNIQUE, wa_message_id TEXT UNIQUE,
  created_at
)
-- counter: app_settings key 'support_seq' (and 'support_demo_seq')
```

Status changes are `support_messages` rows of kind `status`, so history needs no separate table. All metrics
(first response, resolution, % within target) are computed from these columns; nothing is stored twice.

The client systems store nothing new: "My requests" is read from the CRM each time.

## 8. Which repos change, and roughly how much

| Repo | Change | Size |
|---|---|---|
| **ahrom-crm** | migration 0015; `src/lib/support.ts` (numbering, targets, business-hours clock, intake, notifications); `/api/support` route (key check, create, list, get, reply; rate limits); Gmail and WhatsApp intake hooks; Support tab (queue, sheet, clients); Today block; 6 MCP tools; `scripts/support-selfcheck.mts` (business-hours maths, threading, pause clock) | the bulk: ~1,500–2,000 lines |
| **shanti-ops** (SB Ops) | `server/api/support/route.js` (forward with key), Support tab in Help, My requests; demo seed adds 3 sample requests; scrub-check unchanged | ~300 lines |
| **ls-inventory** (Inventory Ops) | server route + one page in the Next frontend + cog-menu item; demo seed samples; `BRAND` for any new visible text | ~300 lines |
| **savistar-ops** (Designer Ops) | `app/api/support` route, dialog + My requests page, menu item; demo seed samples | ~250 lines |
| **ahrom-labs** (this site) | only when live: the `support` answer in `engagement.ts` (drop "on its way", state the targets); later, published figures (§9) | a few lines |
| Cloudflare (no repo) | Access application "CRM support API", Bypass for Everyone, path `/api/support` only (same as the WhatsApp webhook); the app checks the per-client key itself | 10 minutes |
| Secrets | `AHROM_SUPPORT_KEY` on each client server (Render) and each demo Worker; hashes in `clients.key_hash` | — |

The forwarding route and form are near-identical in the three systems; copy it, don't build a shared package
(three repos, three stacks).

Security notes: the key identifies the client, so a request can only ever be filed under, or read from, the
client that holds the key; the requester's username is taken from the client system's own session, not from the
form; bodies are size-limited and shown escaped; rate limit per key (e.g. 30 an hour) and per demo visitor.

## 9. What could go on the site later, and when

Nothing until there is real data. Then, only aggregate figures across all clients, never per client (Shanti
Boilers must not be named or identifiable), computed from `support_requests` with `is_demo = 0`:

- **Median first response time** (business hours) over the last 90 days.
- **Share of requests answered within target**, by priority.
- **Requests resolved** in the last 12 months.

Threshold before publishing: at least 3 months live, at least 30 real requests, from at least 2 clients. If the
numbers aren't good, don't publish them; fix the process first. Shown on /engagement under the AMC answer as
"Last 90 days: median first reply 3 business hours (n = 41)", with the date it was computed, refreshed by
`npm run content:build` reading a small JSON the CRM exports (no live call from the site to the CRM).

Until then the site can say only what is true on the day: once phase 2 is live, "Clients raise requests from
inside their system; each gets a number and a reply-by time", with the targets table.

## 10. Build phases

| Phase | What | Effort (with Claude) |
|---|---|---|
| 0. Decisions (Pujan) | answer the open questions below; create support@ alias; agree targets | ~1 hour |
| 1. CRM desk | tables, Support tab, Log a request, email intake and replies, notifications, Today block, MCP tools, self-check | 3–4 days |
| 2. In-app form | form + My requests in the three systems, `/api/support`, keys, Access bypass; tell each client how to use it | 1 day per system (3 days) |
| 3. WhatsApp + demos | WhatsApp intake, `support_update` and urgent templates (Meta approval: allow a few days), demo clients, demo seeds and scrub checks | 2 days + Meta wait |
| 4. Use it | 3 months of real requests; review targets at the end against the data | — |
| 5. Publish | `engagement.ts` figures, once §9's threshold is met | ½ day |

Phase 1 is useful on its own (email + logged requests), so it can go live first and the in-app forms follow.

## Decisions (Pujan, 20 Oct 2026)

These replace the open questions; where they differ from the draft above, they win.

1. **Business hours:** Mon–Sat 10:00–19:00 IST, Indian public holidays off. Urgent issues outside hours reach Pujan's phone by WhatsApp, best effort, not a promise.
2. **Targets (first reply):** urgent the same business day; everything else within 2 business days. (Looser than the draft's 2 h / 1 day on purpose: beat it, never miss it in public.)
3. **WhatsApp:** clients send support to the CRM number, +91 94265 19798, so each message becomes a request automatically. Pujan's personal number stays personal.
4. **Who can raise a request:** every staff login in a client's system, not only owners and managers.
5. **Lapsed AMC:** the request is still answered, marked "AMC lapsed", and the reply includes the renewal terms.
6. **Demo requests:** answered for real by Pujan; they are sales conversations.
7. **Attachments:** in the form from the start: up to 3 images or PDFs per request, stored in R2 (phase 1 for the CRM side, phase 2 for the forms).
8. **Change requests:** marked "change request", quoted in the thread, and converted to a lead/deal in the CRM once priced.

## Not doing, and when to reconsider

- Client logins on the CRM: no; their own system is the portal. Reconsider for a client with no system of ours.
- A helpdesk SaaS: no; reconsider only if someone else joins support and needs assignment, macros and shifts.
- Satisfaction ratings: after phase 4, a single "was this solved?" yes/no on resolution, if useful.
- Knowledge base: the SB Ops Help workspace and the systems' AI assistants already answer how-to questions;
  repeated questions in the desk are the signal to add a Help entry instead.
