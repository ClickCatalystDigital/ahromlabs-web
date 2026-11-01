# One website, many markets: plan

Status: proposal, 28 Oct 2026. Same market codes as the CRM (`ahrom-crm/src/lib/markets.ts`), so a lead's country and
market mean the same thing everywhere.

## 1. The idea: markets are data, not copies of the site

One site, one codebase. A **market** is a group of countries that is sold to the same way. Everything that differs
between markets falls into one of three buckets, and each bucket is a small file, not a fork:

| Bucket | What it is | Example | Where it lives |
|---|---|---|---|
| **A. Words and formats** (changes per market) | The same page, said the way that market says it | BOQ → Estimate; ₹ → $; mm → in; DD/MM → MM/DD; Tally → QuickBooks | A dictionary per market (`src/lib/markets/*.ts`) |
| **B. Shown or hidden** (exists only in some markets) | Pages and sections that only make sense somewhere | IBR guide and GST/e-way bill (India only); ASME/1099 (US only); VAT/DATEV (EU) | A `markets:` flag on each page / section / nav item |
| **C. Language** (later, separate from market) | Translating, not localising | German for DACH | Only when a market proves itself |

Adding a country to an existing market is one line. Adding a market is one dictionary file plus flags on the pages it
should not see. Nothing else is copied.

## 2. Market groups

| Market | Countries | Currency | Hours shown | Notes |
|---|---|---|---|---|
| **India** (IN) | IN | ₹ | IST | Today's site |
| **North America** (NA) | US, CA | $ | ET | First new market |
| **UK & Ireland** (UK) | GB, IE | £ / € | UK time | English, British spelling, GDPR |
| **Europe** (EU) | NL, Nordics, DE, FR, BE, AT, CH… | € | CET | Start English-only (NL and the Nordics are fine with it); translate only when it proves itself |

## 3. Bucket A: the dictionary (what changes)

- **Words**: quotation / BOQ → estimate / bid / proposal (US), quote (UK); job card → work order / traveler; test certificate
  → mill test report (US); interior BOQ → FF&E schedule (US); inventory, purchase order and invoice stay.
- **Spelling**: en-IN and en-GB "optimise", en-US "optimize".
- **Units and formats**: mm / inches, kg / lb, °C / °F, dates, number grouping (12,34,567 vs 1,234,567).
- **Money**: currency and **price anchors per market** (positioning, not exchange rates): India in lakhs; US "from
  $8–15k, fixed price, live in 4–6 weeks, paid 2-week prototype first".
- **Tools we connect to**: Tally, Zoho, GST portal (IN); QuickBooks, NetSuite, Shopify (US); Xero, Sage (UK); DATEV (DE).
- **Proof**: case studies and logos that land in that market (anonymised Indian projects work everywhere as "how we work").
- **Contact**: phone (Indian number / US Google Voice), WhatsApp (India) vs a booking link in local time (US/UK/EU),
  business hours in local time.
- **Legal lines**: GST (IN); sales tax, CAN-SPAM, CCPA (US); VAT, GDPR (UK/EU); DPDP (IN).

## 4. Bucket B: shown or hidden

Each page, nav item and footer link gets `markets: ["IN"]` (only there) or nothing (everywhere). The router, the nav, the
footer and the sitemap read the flag, so a hidden page is not offered in that market (its URL still works; section 5).

- **India only**: IBR 2026 guide, GST/TDS/e-invoice/e-way bill content, Tally integration pages, India-specific
  industry pages.
- **US only (new)**: QuickBooks integration, "custom software vs off-the-shelf ERP" for US SMBs.
- **Everywhere**: services, approach, work, notes, patterns, systems glossary, demos.

## 5. URLs: one root that adapts (decided 28 Oct 2026)

No `/us/` folders: **ahromlabs.com adapts to the visitor's market** (Google calls this "locale-adaptive"). How it stays safe:

- **Market from Cloudflare** (`cf-ipcountry`, free on every request), overridden by `?market=us` in links (US cold emails
  carry it) and by the visitor's own choice (switcher in the footer, remembered in a cookie).
- **No cross-country caching**: HTML is rendered per request (or cached with the market in the cache key), so an Indian
  visitor never gets a cached US page.
- **Google sees the US version** of adaptive pages (it crawls mostly from the US), so the home page's title and
  description stay neutral ("operations software for manufacturers and distributors").
- **Market-only pages keep their own URLs** (`/ibr`, GST and Tally articles): hidden from the menu, footer and sitemap
  outside their market, but still reachable, so Indian search traffic to them keeps working.

## 6. Which market a visitor sees

| Signal | Use it for |
|---|---|
| **Cloudflare's country** (`request.cf.country`, free, at the edge: the same idea as ClickCatalyst's IP lookup) | A dismissible banner on the first visit: "Looks like you're in the US: see the US site". And the lead's country when a form is sent. |
| **The visitor's choice** (market switcher in the footer and header, remembered in a cookie) | Always wins. |
| `Accept-Language` | A weak hint only. |
| **Google Analytics** | Measuring which countries visit and convert, after the fact. Not for routing: it runs in the browser, needs consent in the EU, and is often blocked. |

**Never force a redirect by IP.** Google crawls from the US (a forced redirect would hide the India pages from Google),
VPNs and travellers get the wrong site, and people can't share links. Suggest, remember the choice, done.

## 7. How it connects to the CRM

- Contact and demo forms send `country` (the Cloudflare country, or the market the visitor chose) into `leads.country`;
  the CRM's market switcher and per-market sending already use it.
- The demos get the same treatment: a "locale pack" (bucket A) per vertical per market in each demo codebase, so a US
  visitor sees estimates, inches and $ in the inventory demo.
- US cold email goes from pujan@ahromlabs.com for now (a separate mailbox can be chosen later in the CRM), and its links carry `?market=us`.

## 8. Rollout

| Phase | What | Effort |
|---|---|---|
| **0. Groundwork** | Market model and dictionary in the site; `markets:` flags; Cloudflare country into the forms → CRM | 1–2 days |
| **1. US version of the root** | The site adapts by market: US home, services and the distribution / inventory page in US words, $ and US pricing (section 9); India-only pages and demos hidden in North America; market switcher; per-market caching | ~1 week |
| **2. US demo and email** | Inventory demo in US terms, $ and units; US cold-email domain and mailbox live in the CRM | ~1 week |
| **3. UK / EU** | Only once the US brings leads: UK dictionary (British spelling, £, VAT, GDPR consent banner), then EU in English | ~3–4 days each |
| **4. Languages** | German / French only for a market that has proven itself | per language |

## 9. Decisions (28 Oct 2026)

1. **URLs**: one adaptive root, no `/us/` (section 5).
2. **Email**: US emails go from pujan@ahromlabs.com for now (CRM: Sent-from per market); a separate mailbox can be
   chosen later. US emails carry a postal address (CAN-SPAM).
3. **First US vertical**: distribution / inventory. The website shows only demos ready for the visitor's market: the
   inventory demo (in US terms, $ and units) in North America; boiler (IBR), interiors and construction stay India-only
   until they have a US locale pack.
4. **US pricing** (fixed price, quick yes):
   - **Prototype**: $1,500 flat, 2 weeks, a working prototype of their main workflow on their data; credited to the
     build if they continue.
   - **Build**: inventory and orders system from $7,500 fixed (usually $7.5–15k by scope), 4–6 weeks; 40% at start,
     40% at acceptance testing, 20% at go-live.
   - **Care plan**: $350 / month: hosting, backups, support and small changes.
   - **Founding clients**: the first 3 US clients get 30% off the build for a case study, a reference call and their logo.
   - Paid by card or ACH (Stripe or Wise), invoiced in USD.
5. **After North America**: decide once the US brings leads.

## 10. Built (28 Oct 2026, not deployed)

Phase 0 and 1 for North America, as described in `SYSTEM.md` → Markets. Preview locally:

1. `npm run dev`, then open http://localhost:3000/?market=us (North America) or http://localhost:3000/?market=in (India). The choice is remembered in a cookie, so later pages stay in that market; the footer has the switcher.
2. North America shows the US home (prices, inventory demo only, booking link), `/services` and `/services/inventory-and-reservations` in US words with prices; IBR, BOQ, ERP, Pricing (`/engagement`) and the other demos are gone from the menu, footer and cards.
3. On Cloudflare (after deploy), visitors from the US and Canada get North America automatically from `cf-ipcountry`.

Open points: the booking page's availability should cover Mon–Fri 9–17 US Eastern; "QuickBooks can stay" promises that connection on a build; the demos don't send `country` to `/api/demo-lead` yet; the footer's "Accounts and payroll" family link still leads to a page that lists India's GST and Tally services.
