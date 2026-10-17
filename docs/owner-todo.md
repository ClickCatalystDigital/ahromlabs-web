# Owner to-do (Pujan)

Manual items only Pujan can do. Claude: at the start of a chat, mention any open item that relates to the work at hand, and tick items off here when Pujan confirms them.

## Open

- [ ] **Sign in to the CRM:** deployed 15 Oct 2026 with the Prospects view (208 prospects loaded). Open https://ahromlabs.com/api/crm and sign in with username `pujan` and the `CRM_PASSWORD`; let the browser save it. It stays signed in for 30 days. Prospects is the second tab.
- [ ] **Savistar live check after the Next 15 upgrade** (merged 13 Oct 2026, PR #1): once Render shows the deploy finished, open the live app and check sign-in, a client page and an invoice PDF.
- [ ] **Savistar: confirm `SESSION_SECRET` is set on Render.** `lib/auth.js` falls back to a fixed string when it's missing, which would let anyone forge a login. Once confirmed, the fallback can be removed.
- [ ] **Savistar: change any default passwords.** A brand-new database creates hari, sachi, admin and dristi with `<username>123`; if any live account still uses that, change it in Settings.
- [ ] **GA key events:** once each has been seen, star `boiler_demo_form_sent`, `electronics_demo_form_sent`, `interiors_demo_form_sent` and `contact_form_sent` under GA Admin → Events (GA only allows this after the event has arrived). `generate_lead` is no longer sent.
- [ ] **GA internal traffic:** send Claude the office IP (`curl -s https://api.ipify.org`) so the internal-traffic filter can be set up.
- [ ] **Shanti live DB test data:** decide whether to delete the "ZZ DEMO VINDHYA DAIRY PVT LTD" enquiry and customer (2 Oct) and the "ZZ-PLAN-TEST" project (30 Sep).
- [ ] **Disk space:** 4.4 GB free on 17 Oct 2026 (enough to deploy); local demo testing needs about 5 GB.

- [ ] **Check the demos for real names by hand** (Pujan said he will): sign in as each sample login on all three demos and look for client, partner or staff names.

- [ ] **WhatsApp for the CRM, paused 16 Oct 2026 (waiting for dad):** dad's +91 83209 77493 was refused (it has WhatsApp on his phone); plan for 17 Oct: a spare BSNL number instead, one that has never been on WhatsApp (or delete WhatsApp from it first). Start tomorrow's chat by adding Meta's WhatsApp Business Tools MCP connector to check the number, webhook and a test send.
  Done so far: Meta app **Ahrom CRM** (ID 4722285194721517) under the **Click Catalyst** portfolio (the new Ahrom Labs portfolio, ID 2517731355391482, is restricted by Meta; move the number there once Ahrom Labs is registered); WhatsApp use case added and its terms accepted; WhatsApp profile entered (display name Ahrom Labs, Professional Services, ahromlabs.com); webhook https://crm.ahromlabs.com/api/whatsapp verified (Worker secret WA_VERIFY_TOKEN set); Access bypass for that path.
  Still to do after the number: SMS code from dad's phone; permanent system-user token and app secret into Worker secrets (you paste them in your terminal); WA_PHONE_NUMBER_ID and WA_WABA_ID; publish the app (privacy policy is live at https://ahromlabs.com/privacy) so real messages reach the webhook; payment method in WhatsApp Manager; CRM Settings → WhatsApp → Connect number (choose a 6-digit PIN and keep it); submit the 3 templates; set the click-to-chat link.




- [ ] **Give Claude Search Console access (about 10 minutes, once):**
  1. Google Cloud console, the project already used for Gmail/Calendar → APIs & Services → Library → enable **Google Search Console API**.
  2. IAM & Admin → Service accounts → Create (name it `search-console`; no project roles needed) → its Keys tab → Add key → JSON. A file downloads.
  3. Move it to `~/.config/ahrom-labs/search-console.json` (in Terminal: `mkdir -p ~/.config/ahrom-labs && mv ~/Downloads/<the-file>.json ~/.config/ahrom-labs/search-console.json && chmod 600 ~/.config/ahrom-labs/search-console.json`). Don't paste its contents into chat.
  4. Search Console → ahromlabs.com → Settings → Users and permissions → Add user: the service account's email (ends in `iam.gserviceaccount.com`), permission **Full**.
  5. Tell Claude; it runs `npm run gsc -- sites` to confirm.
- [ ] **Search Console, IBR pages (Pujan said he will, 17 Oct 2026):** URL Inspection → Request indexing for https://ahromlabs.com/ibr and https://ahromlabs.com/ibr/forms. Also re-request the boiler industry page and the notes that changed, so Google's copy drops the client name.
- [ ] **Check the chatbot's new rule reads right to you (set 17 Oct 2026):** it now says "the site doesn't cover it" and links the contact page instead of answering from general knowledge. Also read the new ownership sentence on /engagement: "If you stop paying the AMC, the licence to keep using the system ends with it." It restates the existing licence term; change the wording if you'd put it differently.
- [ ] **IBR pages, monthly (first: mid-November 2026):** look for new Central Boilers Board notifications on egazette.gov.in (search "Indian Boiler"). If IBR 2026 was amended, tell Claude: it updates `src/lib/ibr-forms.ts` or the guides, re-runs the quote check (`npm run content:build`) and bumps the dates.

## Done

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
