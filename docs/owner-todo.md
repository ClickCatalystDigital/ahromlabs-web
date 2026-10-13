# Owner to-do (Pujan)

Manual items only Pujan can do. Claude: at the start of a chat, mention any open item that relates to the work at hand, and tick items off here when Pujan confirms them.

## Open

- [ ] **Deploy ahromlabs.com** (`npm run deploy` in ahrom-labs): the electronics and interiors demo links (industry pages, /work, llms.txt) are committed but not live until then.
- [ ] **Savistar: merge `workers-demo` into `main`?** It upgrades the live Render app to Next 15 + React 19. Tested locally on a fresh database (login, every page, create/edit, invoice PDF). Before merging, the savistar-ops folder's own uncommitted changes (README → SYSTEM.md rename, CLAUDE.md, .claude/) need committing or setting aside. After merging, watch Render's deploy log and open the live app once.
- [ ] **Savistar: confirm `SESSION_SECRET` is set on Render.** `lib/auth.js` falls back to a fixed string when it's missing, which would let anyone forge a login. Once confirmed, the fallback can be removed.
- [ ] **Savistar: change any default passwords.** A brand-new database creates hari, sachi, admin and dristi with `<username>123`; if any live account still uses that, change it in Settings.
- [ ] **GA key event:** once the first lead arrives, star `generate_lead` under GA Admin → Events (GA only allows this after the event has been seen). Later, do the same for `trial_start`.
- [ ] **GA internal traffic:** send Claude the office IP (`curl -s https://api.ipify.org`) so the internal-traffic filter can be set up.
- [ ] **Shanti live DB test data:** decide whether to delete the "ZZ DEMO VINDHYA DAIRY PVT LTD" enquiry and customer (2 Oct) and the "ZZ-PLAN-TEST" project (30 Sep).
- [ ] **Disk space:** about 1.2 GB was free on 13 Oct 2026; local demo testing needs about 5 GB.

- [ ] **AI in the demos: add the key.** Built: two free questions per visitor, then a lock and a "set it up for your business" overlay; data answers on. The button stays hidden until a key exists. Create one OpenRouter key with a hard monthly limit (e.g. $5) and store it in both demo Workers:
  - SB Ops (in shanti-ops): `npx wrangler secret put DEMO_OPENROUTER_KEY`
  - LS Inventory (in ls-inventory): `npx wrangler secret put OPEN_ROUTER_KEY -c wrangler.demo.jsonc`
- [ ] **LS Inventory pipeline secrets** (GitHub repo ClickCatalystDigital/reel-inventory → Settings → Secrets → Actions). Until they exist, a push runs the checks and stops before deploying.
  - `CLOUDFLARE_API_TOKEN`: the same value as in the shanti-ops repo (Ahrom Labs account).
  - `CLIENT_CLOUDFLARE_API_TOKEN`: a token with "Edit Cloudflare Workers" on LS Technologies' Cloudflare account (the one serving lstechnologies.in).
  - `DEMO_DB_TOKEN`: from ls-inventory, run `grep TURSO_GROUP_TOKEN .demo-secrets | cut -d= -f2 | gh secret set DEMO_DB_TOKEN`
- [ ] **Savistar pipeline** (after merging `workers-demo`): secrets `CLOUDFLARE_API_TOKEN` (same as shanti-ops) and `DEMO_DB_TOKEN` (from savistar-ops, `grep TURSO_GROUP_TOKEN .demo-secrets | cut -d= -f2 | gh secret set DEMO_DB_TOKEN`), and the variable `CLIENT_URL` = the live app's Render address.

## Done

- [x] GA4 property, Measurement ID, `GA_API_SECRET`, custom dimensions, Search Console link (13 Oct 2026). See `docs/analytics-strategy.md`.
