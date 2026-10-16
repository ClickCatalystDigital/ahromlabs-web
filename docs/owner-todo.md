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

- [ ] **WhatsApp for the CRM, paused 17 Oct 2026 (waiting for dad):** number **+91 83209 77493** (dad's). It still has WhatsApp on his phone, so Meta refused it ("already in use by another WhatsApp account"). Next: dad backs up and deletes that WhatsApp account (WhatsApp → Settings → Account → Delete account), wait ~5 minutes, then tell Claude to retry.
  Done so far: Meta app **Ahrom CRM** (ID 4722285194721517) under the **Click Catalyst** portfolio (the new Ahrom Labs portfolio, ID 2517731355391482, is restricted by Meta; move the number there once Ahrom Labs is registered); WhatsApp use case added and its terms accepted; WhatsApp profile entered (display name Ahrom Labs, Professional Services, ahromlabs.com); webhook https://crm.ahromlabs.com/api/whatsapp verified (Worker secret WA_VERIFY_TOKEN set); Access bypass for that path.
  Still to do after the number: SMS code from dad's phone; permanent system-user token and app secret into Worker secrets (you paste them in your terminal); WA_PHONE_NUMBER_ID and WA_WABA_ID; publish the app (needs a privacy policy URL) so real messages reach the webhook; payment method in WhatsApp Manager; CRM Settings → WhatsApp → Connect number (choose a 6-digit PIN and keep it); submit the 3 templates; set the click-to-chat link.



- [ ] **Re-sync the site chatbot:** Cloudflare dashboard → AI Search → `ahromlabs-search` → Sync (site redeployed 16 Oct 2026 with new licence, hosting and IBR wording). Then tell Claude to check the chatbot's answers.

## Done

- [x] Calendar access: Calendar API enabled, new client secret, Gmail + Calendar consent (16 Oct 2026); client file moved to Trash. The CRM reads bookings hourly and emails you on each.
- [x] Email sending turned on (16 Oct 2026, 5/day ramp): steel and IBR campaigns, 40 boiler companies queued. The other 102 eligible boiler companies can be added once replies come in.
- [x] Jev key (`OPENROUTER_KEY`) set; live check classified a call request as meeting (16 Oct 2026).
- [x] Booking page: the Workspace plan allows one, "30 min with Pujan" (Google Meet, weekdays) on pujan@ahromlabs.com; its link https://calendar.app.google/CuiiSRtJbheEV2U4A is saved in the CRM (16 Oct 2026). A stray "Ahrom Labs intro call" booking page was created on motiwalapujan@gmail.com by mistake; delete it there if you like.

- [x] Cloudflare Access (team ahromlabs, One-time PIN, Pujan only) and Gmail connected for outreach; test email sent (16 Oct 2026).

- [x] Form email on Cloudflare Email Sending: test emails arrived, deployed, live test sent (`lead_email_sent` in the logs), Resend secrets deleted (13 Oct 2026).
- [x] Demo AI keys added (SB Ops, LS Inventory) and tested live; LS pipeline secrets added (13 Oct 2026).
- [x] Savistar merged to Next 15 + React 19 (PR #1, 13 Oct 2026); live on Render (commit b83ae09); pipeline secrets and CLIENT_URL set.
- [x] GA4 property, Measurement ID, `GA_API_SECRET`, custom dimensions, Search Console link (13 Oct 2026). See `docs/analytics-strategy.md`.
