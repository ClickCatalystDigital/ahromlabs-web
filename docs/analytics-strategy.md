# Analytics strategy

Living document. Update it when the funnel, events or tools change, and note what we learned under **Findings**.

## Goals

1. See how people move from ahromlabs.com to the live demo and on to a trial.
2. See how AI agents read the site, which Google Analytics alone cannot.
3. Leave the agent-facing site untouched: no change to the HTML, `llms.txt` or `knowledge.json` that agents read.

## Tools

| Tool | Use | Status |
|---|---|---|
| Google Analytics 4, property "Ahrom Labs", `G-BC080TXMMZ` | People on ahromlabs.com and boiler-erp.ahromlabs.com | ahromlabs.com and the demo |
| GA4 Measurement Protocol (server-side) | AI agent visits and `llms.txt` / `knowledge.json` fetches, logged from `proxy.ts` | Live (`GA_API_SECRET` set) |
| PostHog | Session replay and in-product paths inside the demo | Not yet. Add if GA4 can't explain where demo users drop off |

One GA4 property covers both sites. They share the registrable domain `ahromlabs.com`, so one visitor is one user across them with no cross-domain setup.

The tag loads only on ahromlabs.com and the demo. It never loads on a client's own deployment.

## Funnel

Each demo has its own event names, so GA reports them apart without filters. Prefix: `boiler` (SB Ops, boiler-erp), `electronics` (Inventory Ops, electronics-erp), `interiors` (Designer Ops, interiors-erp).

| Step | Where | GA4 event |
|---|---|---|
| 1. Product or industry page viewed | ahromlabs.com | `page_view` (automatic) |
| 2. Link into a demo clicked | ahromlabs.com, any link to a `*.ahromlabs.com` demo | `<prefix>_demo_click` { from } |
| 3. Demo form sent | `<demo>/demo` | `<prefix>_demo_form_sent` (mark as key event) |
| 4. Login chosen inside the demo | demo | `<prefix>_demo_login` { role } |
| 5. Pages used in the demo | demo | `page_view` (automatic) |
| 6. AI question answered (2 free per visitor) | SB Ops and Inventory Ops demos | `<prefix>_demo_ai_question` |
| 7. AI limit reached, overlay shown | SB Ops and Inventory Ops demos | `<prefix>_demo_ai_limit` (strong interest) |
| 8. "Start your own trial" clicked | demo, then ahromlabs.com/start | `trial_start` (not built yet) |

Also tracked on ahromlabs.com: contact form sent (`contact_form_sent`, mark as key event), WebMCP tool used (`webmcp_tool` { tool }).

Every demo form and the contact form are also emailed to `LEADS_TO` (pujan@ahromlabs.com, `wrangler.jsonc`): the demos call `ahromlabs.com/api/demo-lead` with the shared `DEMO_LEAD_KEY`.

## AI agents

Agents such as GPTBot, ClaudeBot and PerplexityBot don't run JavaScript, so the GA tag never sees them. `proxy.ts` recognises them by user agent (and markdown-preferring clients as `markdown-agent`) and sends an `agent_visit` { agent, path } event through the Measurement Protocol, including fetches of `llms.txt` and `knowledge.json`. Each agent name is one GA "user", so the property counts agents, not requests. Register `agent` and `path` as event-scoped custom dimensions to report on them.

## Loading and consent

- `src/components/Analytics.tsx` shows a small consent bar. `gtag.js` isn't fetched at all until the visitor accepts (India's DPDP Act), and it loads after the page is interactive, so page speed is unaffected.
- The answer is stored in a `ga_consent` cookie on `.ahromlabs.com`, so the demo reads the same answer and doesn't ask again.
- The server-side agent events set no cookies and need no consent.
- Events go through `track()` in `src/lib/analytics.ts`, which does nothing until consent is given.

## Where the new-client setup sits

1. Product page → "Try the demo" → short form → shared Acme sandbox. No setup here.
2. Inside the demo, a quiet "Start your own trial" button.
3. `ahromlabs.com/start`: company, industry, GSTIN, admin email. Hosting is shown as plans (Starter, Pro, Your own cloud), not technical options. A trial always starts on the cheapest default.
4. Behind it: create the database, server and storage through each provider's API, add the server to the deploy pipeline, and email the login.

## Setup checklist

- [x] GA4 property "Ahrom Labs" created, web stream for `https://ahromlabs.com`
- [x] Measurement ID in `src/lib/analytics.ts` (public value)
- [x] Tag, consent bar and funnel events on the demo (shanti-ops `components/DemoAnalytics.jsx`, demo mode only); `trial_start` waits for the trial button
- [x] Measurement Protocol API secret stored as a Cloudflare secret (`GA_API_SECRET`), never committed
- [ ] Key events: star `generate_lead` (and later `trial_start`) under Admin → Events once each has arrived; GA no longer lets you mark an event before it has been seen
- [x] Custom dimensions registered: `agent`, `path`, `demo`, `from`, `form`, `tool`, `role`
- [ ] Internal traffic filter for our own IPs
- [x] Google Search Console linked (domain property ahromlabs.com → stream "Ahrom Labs Web")

## Findings

_None yet._
