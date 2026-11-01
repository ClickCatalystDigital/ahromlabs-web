# North America: demos, the boiler system on ASME, and US search

Status: plan, 1 Nov 2026. Nothing here is built. Follows `docs/markets-plan.md` (the site side, live since 1 Nov).

## 0. Where we start

- **US traffic is close to zero.** GA4, last 90 days: India 144 sessions, United States 3, Canada 1. The US work is
  building an audience from nothing, not tuning one.
- **US visitors see one demo**, the electronics inventory system (ls-inventory). Boiler (shanti-ops), interiors
  (savistar-ops) and construction (structonova-ops) are hidden for North America, because each is built around
  Indian law: GST, TDS, e-way bills, Tally, ₹ and lakh, and IBR for the boiler system.
- **The inventory demo isn't US-ready either:** it formats numbers as `en-IN` (1,00,000) on its stock, reports and
  finance screens. That's live today for US visitors.
- **The boiler system already switches regulations:** its quality folder picks IBR 2026, IBR 1950 v1 or 1950 v0 per
  document (`lib/qc-ibr.mjs`). ASME becomes a fourth option in the same place, not a rewrite.

## 1. The rule: nothing changes for India unless asked

Every change below sits behind one per-deployment setting, **`MARKET`** (`IN` or `NA`), read once in each repo.
Unset means `IN`, so today's behaviour is the default.

- **Shanti Boilers' live system never gets `MARKET=NA`.** Its data, forms and PDFs stay exactly as they are.
- **US demos are separate deployments** with their own golden database and subdomain (e.g. `boiler-erp-us.ahromlabs.com`).
  The India demos and their golden databases are not touched (golden DBs are never re-seeded without asking).
- **Before each merge:** the repo's existing self-checks pass, and an India regression check shows no change: the
  key screens and PDFs (quotation, invoice, QC/IBR folder, packing list) rendered with `MARKET` unset, compared
  with the same screens on `main`.
- One repo at a time, each on its own branch and PR, merged only after the check.

## 2. What changes in each system for North America

| Area | India today | North America |
|---|---|---|
| Money and numbers | ₹, lakh/crore, `en-IN` | $, `en-US` (100,000) |
| Tax | GST (CGST/SGST/IGST), HSN, TDS, e-way bill | Sales tax as one optional rate per invoice; GST, HSN, TDS, e-way hidden |
| Accounting link | TallyPrime | QuickBooks link shown as "planned" until it is built; the books screens work on their own |
| Words | quotation, enquiry, dispatch, test certificate | estimate, inquiry, shipping, mill test report (same list as the site's `DICT`) |
| Dates | 1 Nov 2026 | Nov 1, 2026 |
| Units | metric | metric stored, imperial shown where the US trade uses it (pipe NPS, inches, psi, °F) |

### Boiler system (shanti-ops): the biggest piece

1. **ASME as a regulation option** in `lib/qc-ibr.mjs`: `asme` beside `2026`, `1950v1`, `1950`. For a US job the quality
   folder prints the ASME data report package instead of IBR forms: the Manufacturer's Data Report (U-1A for a
   Section VIII vessel, P-2/P-3 for a Section I boiler; ASME publishes these free as fillable PDFs), the weld map with
   welder stamps, WPS/PQR references, welder continuity, MTRs by heat number, NDE and PWHT records, hydrotest record.
   The folder's current structure (every part linked to its certificate) already holds most of this.
2. **Welder continuity** from records the system already keeps (job cards, who welded what): the QW-322 lapse date,
   the same rule as the site's checker.
3. **Item master from `~/Developer/items`**: import the US boiler catalogue (308 items: pipe, flanges, fittings,
   gaskets, studs, valves, instruments) into the US demo only. Before import: fix the rounded pipe outside
   diameters, remove the `[SYNTHETIC DEMO ALIAS]` text, and drop vendor prices and client codes. The import is a
   one-way script into the demo's `items` table; nothing flows back into `~/Developer/items`.
4. **US demo company**: a US Acme with US customers, states, $ prices, ASME jobs (one U-stamp vessel, one Section I
   boiler) and an Authorized Inspector hold point.

### Interiors (savistar-ops) and construction (structonova-ops)

- Interiors: money, tax and words from the table; BOQ becomes "estimate"; otherwise the same.
- Construction: India-specific depth (CPWD terms, TDS, GST on works contracts, e-way). A US version needs US contract
  billing (pay applications with schedule of values, retainage, lien waivers): real new work. **Do it last, and only
  if US interest shows up.**

### Inventory (ls-inventory): first, because US visitors already see it

Number and date formatting from `MARKET`, ₹ and lakh removed, the AI assistant's sample questions in US words. Small.

## 3. Order and effort

| Step | What | Effort | Needs from you |
|---|---|---|---|
| 1 | Inventory demo: US formatting (live issue today) | ~1 day | Nothing |
| 2 | `MARKET` setting + money/tax/words in the boiler system, India regression check | 2–3 days | Nothing |
| 3 | ASME folder option, welder continuity, US Acme seed, `boiler-erp-us` demo | 1–2 weeks | A US subdomain go-ahead |
| 4 | Item master clean-up and import into the US boiler demo | 2–3 days | OK to use the catalogue |
| 5 | Interiors US demo | 3–5 days | Nothing |
| 6 | Construction US demo | 2+ weeks | Wait for demand |
| 7 | Site: show each US demo on the NA home once it exists (`demo.markets` in `src/lib/work.ts`) | hours | Nothing |

## 4. US search: content and measurement

- **Measure US separately first.** Add a `country` filter to the google-insights connector (Search Console supports
  it) so every report can show US-only queries and pages. Today's reports mix in India.
- **Content written for US buyers**, in US words and prices, each tied to a demo:
  1. Boiler and pressure-vessel fabricators: "ERP for ASME shops" (data report package, welder continuity, MTR
     traceability), linking the ASME hub and the US boiler demo.
  2. Electronics distributors: inventory and reel tracking, lot traceability, a page against generic
     inventory tools.
  3. QuickBooks: "when QuickBooks isn't enough for a manufacturer", and how custom operations software sits beside it.
  4. Custom ERP cost and timeline for US small manufacturers, with the fixed USD prices.
  5. Interior and millwork contractors: estimates, change orders, job costing (after the interiors US demo).
- **Off-site, where US shops are:** LinkedIn, welding and fabrication forums, r/engineering, r/manufacturing; share the
  ASME calculators. US backlinks matter more than any on-page work while US traffic is this low.
- **Check in 4–6 weeks:** US impressions and queries per page.

## 5. ASME Code books (for the reviewer step, not needed for the demos)

2025 Edition, indicative prices (vary by seller and member/list):

| Section | Price |
|---|---|
| VIII Division 1 | ~$1,040–1,664 |
| IX | ~$690–1,256 |
| I | ~$675 (ASME list) |
| II Part D (metric) | ~$1,020–1,632 |

VIII-1 and IX together cover most of the hub and the boiler system's US features: about $1,750–2,900. All four:
about $3,400–5,600.

## 6. Decisions for you

1. Start with step 1 (inventory demo formatting)?
2. US demo subdomains: `boiler-erp-us`, `interiors-erp-us` on ahromlabs.com?
3. OK to load the cleaned US catalogue into the US boiler demo?
