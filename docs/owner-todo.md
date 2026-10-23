# Owner to-do (Pujan)

Manual items only Pujan can do. Claude: at the start of a chat, mention any open item that relates to the work at hand, and tick items off here when Pujan confirms them.

## Open

- [ ] **Sign in to the CRM:** deployed 15 Oct 2026 with the Prospects view (208 prospects loaded). Open https://ahromlabs.com/api/crm and sign in with username `pujan` and the `CRM_PASSWORD`; let the browser save it. It stays signed in for 30 days. Prospects is the second tab.
- [ ] **Savistar live check after the Next 15 upgrade** (merged 13 Oct 2026, PR #1): once Render shows the deploy finished, open the live app and check sign-in, a client page and an invoice PDF.
- [ ] **Savistar: confirm `SESSION_SECRET` is set on Render.** `lib/auth.js` falls back to a fixed string when it's missing, which would let anyone forge a login. Once confirmed, the fallback can be removed.
- [ ] **Savistar: change any default passwords.** A brand-new database creates hari, sachi, admin and dristi with `<username>123`; if any live account still uses that, change it in Settings.
- [ ] **GA internal traffic:** send Claude the office IP (`curl -s https://api.ipify.org`) so the internal-traffic filter can be set up.
- [ ] **Shanti live DB test data:** decide whether to delete the "ZZ DEMO VINDHYA DAIRY PVT LTD" enquiry and customer (2 Oct) and the "ZZ-PLAN-TEST" project (30 Sep).
- [ ] **Disk space:** 12 GB free on 23 Oct 2026 (2.1 GB on 20 Oct); a build needs a few GB and local demo testing about 5 GB. Keep an eye on it before the next demo rebuild.

- [ ] **Check the demos for real names by hand** (Pujan said he will): sign in as each sample login on all three demos and look for client, partner or staff names.
- [ ] **Rotate the Turso token in `ls_crm/seed_demo.py`** (found 17 Oct 2026): lines 31-32 have a database URL and auth token typed into the code. Create a new token, revoke the old one, and read it from an env var instead.

- [ ] **WhatsApp for the CRM: live on +91 94265 19798 since 19 Oct 2026**, ₹100 payment added, 3 templates submitted, click-to-chat link in email signatures, daily cap 20. Only waiting on Meta: the display name "Ahrom Labs" and the template approvals. Check WhatsApp → Templates in a day; raise the daily cap in Settings → WhatsApp when there is budget. Playbook for clients: `docs/whatsapp-cloud-api-setup.md`.




- [ ] **Support: add your clients and their emails** (live since 22 Oct 2026: https://ahromlabs.com/support, CRM Support tab). On crm.ahromlabs.com → Support → Clients, add each client (name, code, system, AMC dates), then each person's name and email under Contacts. Only those emails can send requests. Done so far (22 Oct): Shanti Boilers (sales@, devansh@shantiboilers.com); live test passed and receipts arrived. Later: `support@ahromlabs.com` alias in Workspace, if you want email intake. Plan: `docs/support-desk-plan.md`.
- [ ] **Interior BOQ hub (https://ahromlabs.com/boq, live since 23 Oct 2026):** checker, 41-item library, template and 3 guides. Waiting on you: (1) a sample Savistar BOQ (client names and rates can stay; Claude strips them) to set the template columns and write the measurement guide in Savistar's name; (2) a CA to review the GST guide before Claude writes it; (3) whether the item library may be reused under a licence such as CC BY (left out of the schema until you decide); (4) an image for "What is a BOQ", if you want one. Plan: `~/.claude/plans/what-are-things-i-abstract-owl.md`.
- [ ] **Search Console, request indexing (Claude does it in the browser pane, signed in as motiwalapujan@gmail.com; about 10 a day).** Checked 22 Oct 2026 with URL inspection: 66 of 94 sitemap pages indexed, including every /services page and all notes on the old lists, so those lists are done. Requested 22 Oct: /ibr/forms/form-iv-part-b, form-i-part-b, form-xxii, form-xii, form-i-part-c, form-iv-part-c, form-v-part-a, form-v-part-b, /notes/two-companies-one-book, /notes/ai-extraction-human-in-the-loop. Next (23 Oct): /ibr/forms/form-x, /ibr/forms/form-xi, /patterns/derive-balances-dont-store-them, fail-closed-preserve-visibility, failures-flagged-not-lost, graceful-degradation-by-env-var, human-confirmed-extraction, local-agent-cloud-db, reconcile-against-source-of-truth, replay-queued-payload-through-existing-handler. Then (24 Oct): /patterns/role-scoped-finance-views, seeded-credentials-forced-rotation, self-healing-sequence-counters, separate-machine-from-human-identity, unconfirmed-inferences-stay-read-only. Earlier: 17 Oct (/services, /work, /industries, /ibr, /ibr/forms, industry pages, /ibr/registration-documents, /ibr/2026-changes, form-iv-part-a), 20 Oct (service families, custom-ai-assistant, customer-portal, sales-crm, supplier-portal).
- [ ] **Google Business Profile** (about 15 minutes, then Google's verification): business.google.com → Ahrom Labs, category "Software company", service-area business (hide the street address; areas: Ahmedabad, Gujarat, India), website https://ahromlabs.com, phone, hours. Strengthens the brand result for "ahrom" and local searches like "custom ERP Ahmedabad". Tell Claude once it's live so the schema `sameAs` can include it.
- [ ] **Search Console, leave these alone:** don't press "Validate fix" on "Page with redirect" (the http/www versions redirecting, correct) or "Crawled – currently not indexed" (a share image and /knowledge.json, correct). They stay listed on every site.
- [ ] **Check the chatbot's new rule reads right to you (set 17 Oct 2026):** it now says "the site doesn't cover it" and links the contact page instead of answering from general knowledge. Also read the new ownership sentence on /engagement: "If you stop paying the AMC, the licence to keep using the system ends with it." It restates the existing licence term; change the wording if you'd put it differently.
- [ ] **IBR pages, monthly (first: mid-November 2026):** look for new Central Boilers Board notifications on egazette.gov.in (search "Indian Boiler"). If IBR 2026 was amended, tell Claude: it updates `src/lib/ibr-forms.ts` or the guides, re-runs the quote check (`npm run content:build`) and bumps the dates.

## Done

- [x] **Demo data rebuild, 18 Oct 2026:** new seeds and nightly date shift are on branches (savistar-ops `demo-data`, shanti-ops and ls-inventory `demo-data-walkthrough`). **SB Ops live** (18 Oct): golden rebuilt, reset Worker deployed, client-name leaks closed in the demo build only; merged to `main` (c4f5109) and deployed by CI to Render and the demo (all jobs passed). Render still serves the original customer logins and installer link; the demo serves neither. Later (18 Oct): seed extended to fill the empty screens (Job Cards, work orders, payroll, e-way/freight), golden rebuilt again (old backups deleted at Pujan's request), reset run, merged to `main` (79884f1, CI passed); reset Worker's trigger key is in `~/.config/ahrom-labs/sb-demo-reset-trigger-key`. **Inventory Ops live** (18 Oct): golden rebuilt, reset Worker deployed, merged to main at 41688b0 (client site redeployed with real names unchanged). **Designer Ops live** (18 Oct): golden rebuilt from the new seed (old one backed up to `~/.config/ahrom-labs/demo-backups/`), reset Worker deployed and run; `demo-data` merged to main (12e66a5); demo and Render both serve it (18 Oct). Designer Ops UI pass (PR #2) live on both; demo palettes and sample photos written to the golden and live demo DBs.

- [x] **Bing Webmaster Tools + IndexNow (17 Oct 2026):** site imported from Search Console by Pujan; sitemap submitted to Bing; IndexNow pings Bing on every deploy (first ping: 63 URLs, accepted).

- [x] **GA key events (17 Oct 2026):** `contact_form_sent`, `boiler_demo_form_sent`, `electronics_demo_form_sent` and `interiors_demo_form_sent` marked as key events through the insights connector (counted once per event, from now on, not retroactively).

- [x] **Google insights connector set up (17 Oct 2026):** project "Google Search Console Claude" (motiwalapujan@gmail.com) with Search Console, Analytics Data, Analytics Admin and PageSpeed Insights APIs; service account `ahrom-insights@mystical-tensor-502313-p0.iam.gserviceaccount.com` (no Cloud roles) is a Full user in Search Console and an **Administrator** on the GA4 "Ahrom Labs" property (Pujan's choice); key in `~/.config/ahrom-labs/service-account.json`, PageSpeed API key in `~/.config/ahrom-labs/pagespeed-key`. `npm run google -- setup_status` confirms both properties. New Claude Code sessions in this folder: approve the **google-insights** connector when asked.

- [x] Site chatbot re-sync: no longer manual (17 Oct 2026). Every page's sitemap date is the exact time of its last change, `npm run deploy` starts a sync, and AI Search also syncs every 6 hours. Ownership, AMC, go-live and Tally questions fixed by wording (17 Oct 2026).
- [x] Calendar access: Calendar API enabled, new client secret, Gmail + Calendar consent (16 Oct 2026); client file moved to Trash. The CRM reads bookings hourly and emails you on each.
- [x] Email sending turned on (16 Oct 2026, 5/day ramp): steel and IBR campaigns, 40 boiler companies queued. The other 102 eligible boiler companies can be added once replies come in.
- [x] Jev key (`OPENROUTER_KEY`) set; live check classified a call request as meeting (16 Oct 2026).
- [x] Booking page: the Workspace plan allows one, "30 min with Pujan" (Google Meet, weekdays) on pujan@ahromlabs.com; its link https://calendar.app.google/CuiiSRtJbheEV2U4A is saved in the CRM (16 Oct 2026). A stray "Ahrom Labs intro call" booking page was created on motiwalapujan@gmail.com by mistake; delete it there if you like.

- [x] Cloudflare Access (team ahromlabs, One-time PIN, Pujan only) and Gmail connected for outreach; test email sent (16 Oct 2026).

- [x] Form email on Cloudflare Email Sending: test emails arrived, deployed, live test sent (`lead_email_sent` in the logs), Resend secrets deleted (13 Oct 2026).
- [x] Demo AI keys added (SB Ops, LS Inventory) and tested live; LS pipeline secrets added (13 Oct 2026).
- [x] Savistar merged to Next 15 + React 19 (PR #1, 13 Oct 2026); live on Render (commit b83ae09); pipeline secrets and CLIENT_URL set.
- [x] GA4 property, Measurement ID, `GA_API_SECRET`, custom dimensions, Search Console link (13 Oct 2026). See `docs/analytics-strategy.md`.
