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
- [ ] **Disk space:** about 1.2 GB was free on 13 Oct 2026; local demo testing needs about 5 GB.

- [ ] **Check the demos for real names by hand** (Pujan said he will): sign in as each sample login on all three demos and look for client, partner or staff names.

- [ ] **Outreach phase 0** (see `docs/outreach-plan.md`): start Meta Business verification and get a WhatsApp number that is not on the WhatsApp app. (SPF, DKIM and DMARC for ahromlabs.com were checked on 15 Oct 2026: all present.)


- [ ] **Start outreach (campaigns):** on crm.ahromlabs.com/email open "Recover value from steel" and "IBR documentation and traceability", press Preview and Send me a test on each step, then Activate both. On Prospects select boiler companies → pick the campaign → Email sequence, then Turn sending on (5/day to start).
- [ ] **Reply reading (Jev):** in `~/Developer/ahrom-crm` run `npx wrangler secret put OPENROUTER_KEY` and paste the OpenRouter key. Then ask Claude to test it with `classify_reply`.
- [ ] **Google Calendar booking page:** Google Calendar → Create → Appointment schedule ("Ahrom Labs intro call", 30 min, Google Meet) → Save → copy the booking page link into crm.ahromlabs.com/email → "Booking link for meeting replies".
- [ ] **Calendar access for the CRM:** in Google Cloud console (project `ahrom-crm`) enable **Google Calendar API**, and download the "Ahrom CRM outreach" client JSON again (Credentials, or add a new secret). Then tell Claude, who reruns `node scripts/gmail-auth.mjs` for one new consent (Gmail + Calendar).

- [ ] **Re-sync the site chatbot:** Cloudflare dashboard → AI Search → `ahromlabs-search` → Sync (site redeployed 16 Oct 2026 with new licence, hosting and IBR wording). Then tell Claude to check the chatbot's answers.

## Done

- [x] Cloudflare Access (team ahromlabs, One-time PIN, Pujan only) and Gmail connected for outreach; test email sent (16 Oct 2026).

- [x] Form email on Cloudflare Email Sending: test emails arrived, deployed, live test sent (`lead_email_sent` in the logs), Resend secrets deleted (13 Oct 2026).
- [x] Demo AI keys added (SB Ops, LS Inventory) and tested live; LS pipeline secrets added (13 Oct 2026).
- [x] Savistar merged to Next 15 + React 19 (PR #1, 13 Oct 2026); live on Render (commit b83ae09); pipeline secrets and CLIENT_URL set.
- [x] GA4 property, Measurement ID, `GA_API_SECRET`, custom dimensions, Search Console link (13 Oct 2026). See `docs/analytics-strategy.md`.
