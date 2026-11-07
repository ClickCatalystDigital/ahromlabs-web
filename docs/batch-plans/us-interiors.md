# US interiors cluster: topic ranking and research plan

Written 7 Nov 2026. US interiors scored 4/10: an industry page (`/us/industries/interior-design-and-furniture`) and a
QuickBooks-connected demo, but no guides. This batch adds six guides for the ICP below. Every source was opened on
7 Nov 2026 and its text saved in `~/Developer/FOLDER SAMPLE - FOR APP/Interiors/sources` (keys in
`scripts/check-interiors-quotes.mjs`; the sales tax page's keys go in `scripts/check-sales-tax-quotes.mjs`).

**ICP:** US and Canadian design firms of 3–50 people that sell product as well as design time: they buy furniture,
lighting and fabric on trade accounts and resell it, and run on QuickBooks Online plus spreadsheets or Studio
Designer, Houzz Pro, Programa or DesignFiles. Secondary: custom furniture and millwork shops.

**Demo facts** come only from `savistar-ops` branch `us-demo` as it is on 7 Nov 2026 (SYSTEM.md, `lib/db.js`,
`scripts/demo/seed-data-us.mjs`, `lib/quickbooks*.js`). What it has: quotes from an item library with rooms, optional
revisions and payment stages (percent of the quote) that become draft invoices on acceptance; invoices with a
sales tax rate per line (Texas 8.25% on furniture and materials, none on design fees and labor in the seed); vendor
POs (one item, qty, rate, project link) with partial deliveries and returns (outstanding = ordered − delivered +
returned) and bulk mark delivered; a freight rate card per route with overcharge flags; project profit (billed −
materials − estimated labor) in Atelier AI; QuickBooks Online: invoices, client payments (unapplied) and completed POs
as bills. What it **lacks**, so every page says "we'd build it": a markup or cost-vs-sell field on a line, vendor
acknowledgements and expected ship dates, vendor deposits, back-order status, a receiving-warehouse step, a client
deposit tied to a PO, a product budget per room, client approval of individual items, optional and variation lines (release 2 in
`QUOTATIONS-PLAN.md`, not built), and vendor payments to QuickBooks.

---

## How demand was measured

No keyword-volume tool was available, so volume is ranked from three signals, all gathered 7 Nov 2026:

1. **Google autocomplete** (US, English), the length and specificity of the suggestion list for each seed.
2. **People Also Ask** on google.com (US) in the built-in browser.
3. **What the vendors write for**: help-centre and blog pages from Studio Designer, Houzz Pro, Programa, Design
   Manager and DesignFiles (they publish where their buyers search).

Intent is scored for a firm owner choosing or replacing a system (high) vs a student or homeowner (low). "Answer
from the demo" is how much of the page the demo really shows.

| Seed | Autocomplete (selection) | People Also Ask |
|---|---|---|
| how to charge for interior design | services, consultation, projects, flat fee, "how to charge interior design fees" | How much should I charge for interior design services? What is the 15% rule? |
| how much do interior designers charge | per hour, per room, per project, per square foot, for consultation | |
| interior design markup | on furniture, standard markup, "what percentage do interior designers charge"; "do interior designers mark up furniture" | What is the average markup for furniture? How much of a discount do designers get on furniture? |
| how do interior designers make money | on furniture, reddit, "how do interior design firms make money" | |
| interior design invoice | template, example, template excel/word, breakdown, software | |
| interior design retainer / deposit / payment schedule | retainer agreement, retainer fee, payment schedule (template), payment terms, payment plan | |
| interior design purchase order | template, example; procurement: software, process, services, specialist | What is a procurement fee in interior design? What is procurement in interior design? |
| interior design receiving warehouse | near me (local intent) | |
| interior design sales tax | new york, nyc, california, services, "nys interior design sales tax"; "do interior designers charge sales tax"; "are interior design services taxable in texas"; "interior designer resale certificate" | Do contractors get charged sales tax? What fees do interior designers charge? |
| quickbooks for interior designers | "what software do interior designers use"; "studio designer vs quickbooks"; "houzz pro vs studio designer / programa / design files" | |
| interior design accounting / billing software | best interior design accounting software, billing software | |
| interior design budget | template, template excel, spreadsheet, calculator, google sheets, reddit | |
| designer trade discount | interior designer trade discounts, brand trade programs | What trade discount do interior designers get? Do interior designers pass on trade discounts? |

Vendor coverage: Houzz Pro publishes "how to price your interior design services" and a QuickBooks Online sync guide;
DesignFiles publishes a pricing-models comparison; Studio Designer writes on proposals and the first merchandise
deposit; Design Manager's manual walks through deposit → PO → acknowledgement → receiving → final invoice; Programa
sells purchase orders for designers. Pricing, deposits, procurement and QuickBooks are where all of them write.

## Ranking

Score = volume (1–5) × intent (1–5) × answer from the demo (1–3).

| # | Topic | Volume | Intent | Demo | Score | Page |
|---|---|---|---|---|---|---|
| 1 | QuickBooks for interior designers (and design software compared) | 3 | 5 | 3 | 45 | `/interiors/quickbooks-for-interior-designers` |
| 2 | Purchase orders and procurement tracking | 3 | 5 | 3 | 45 | `/interiors/purchase-orders-and-procurement` |
| 3 | How to charge: flat fee, hourly, cost-plus, markup on product | 5 | 4 | 2 | 40 | `/interiors/how-to-charge-for-interior-design` |
| 4 | Invoices, deposits and retainers | 4 | 4 | 2 | 32 | `/interiors/invoices-deposits-and-retainers` |
| 5 | Sales tax for interior designers (by state) | 4 | 4 | 2 | 32 | `/sales-tax/interior-designers-sales-tax` |
| 6 | Project budget vs what the client approved | 4 | 3 | 2 | 24 | `/interiors/project-budget-tracking` |
| 7 | Trade pricing and designer discounts | 3 | 3 | 1 | 9 | folded into #3 (no primary source gives typical discounts; brand programs differ) |
| – | Interior design software compared | 4 | 5 | 1 | 20 | folded into #1 as a table from each vendor's own pages; a standalone "vs" page would need hands-on testing |

All six are written. Order of writing: 3, 4, 2, 6, 1, then 5.

**Added on Pujan's ask (7 Nov), to round out the knowledge base:** trade accounts and designer discounts (#7, from
Arhaus's published trade terms, the only retailer whose terms could be read in full), the interior design contract
(`/interiors/interior-design-contract`, from ASID's 2018 contract forms guide; autocomplete: "interior design contract
template", "retainer agreement") and GST/HST for Canadian design firms (`/interiors/canada-gst-hst-for-interior-designers`,
from the CRA; the ICP includes Canada). Two glossary terms: `/systems/cost-plus`, `/systems/cutting-for-approval`.

**Batch 2 (7 Nov, written):** 1099s for installers and workrooms (IRS 1099-MISC/NEC instructions, `irs-1099`), freight
damage claims (49 U.S.C. 14706, 49 CFR 370.3/.5/.9 via Cornell LII), job costing for custom furniture and millwork shops
(Intuit projects, CDTFA, NY TSB-A-08(30)S, BC PST 139), New York and California interior design sales tax pages
(TB-ST-400; Publication 35 incl. improvements to real property and reporting), and BC PST on the Canada page (PST 139,
PST 301). Still open from the list below: white-glove and receiving-warehouse terms, Manitoba/Saskatchewan/Quebec.

**Earlier candidates:** 1099s for installers and workrooms (IRS Form 1099-NEC instructions), white-glove
delivery and receiving-warehouse terms (needs a warehouse's published terms), custom furniture and millwork shop
drawings and approvals (New York TSB-A-08(30)S taxes millwork shop drawings), provincial PST on design services
(British Columbia, Saskatchewan, Manitoba, Quebec), and per-state pages for the most-searched sales tax states
("interior design sales tax new york / california").

## Where the pages go

A new **`/interiors`** section (kind `interiors`), North America only (`NA_ONLY`), wired like `/sales-tax`: hub
page, `[slug]` route, sitemap, llms.txt, knowledge.json, `src/lib/interiors.ts` groups, `src/lib/interiors-images.ts`,
related map, `scripts/check-interiors-quotes.mjs`. The sales tax page goes in the existing `/sales-tax` section beside
`contractors-sales-tax` (same pattern, same reader), and links to `/sales-tax/resale-certificates` rather than
repeating it. The US interiors industry page and `/sales-tax/sales-tax-in-erp`, `/sales-tax/resale-certificates` and
`/manufacturing/quickbooks-integration` link into the new pages.

## Sources (opened 7 Nov 2026)

| Key (`doc:`) | Source | URL | Used on |
|---|---|---|---|
| `asid-mn` | ASID Minnesota chapter, Costs and fees | https://mn.asid.org/costs | charge, invoices |
| `asid-contract` | ASID, 2018 Residential Contract Form Agreements, user guide (PDF) | https://www.asid.org/lib24watch/files/download/5012 | charge |
| `qbo-billable` | Intuit, Enter billable expenses | https://quickbooks.intuit.com/learn-support/en-us/help-article/manage-customers/enter-billable-expenses/L37dCZU5O_US_en_US | charge, QuickBooks |
| `qbo-po` | Intuit, Create and send purchase orders | https://quickbooks.intuit.com/learn-support/en-us/help-article/purchase-orders/create-send-purchase-orders-quickbooks-online/L2mVpjOoq_US_en_US | POs, QuickBooks |
| `qbo-deposit` | Intuit, Request a customer deposit on an estimate | https://quickbooks.intuit.com/learn-support/en-us/help-article/bank-deposits/request-customer-deposit-estimate-quickbooks/L81Kln0bN_US_en_US | invoices, QuickBooks |
| `qbo-pricing` | Intuit, QuickBooks Online pricing (saved 6 Nov for the manufacturing hub) | https://quickbooks.intuit.com/pricing/ | QuickBooks |
| `dm-model` | Design Manager manual, An interior design business model | https://manuals.designmanager.com/manuals/dmpro/an_interior_design_business_model.htm | POs, invoices |
| `dm-ack` | Design Manager manual, Acknowledging purchase and work orders and receiving merchandise | https://manuals.designmanager.com/manuals/dmpro/acknowledging_purchase_orders_and_receiving_merchandise.htm | POs |
| `dm-deposit` | Design Manager manual, Deposit on project purchase order | https://manuals.designmanager.com/manuals/dmpro/deposit_on_project_po.htm | POs |
| `sd-proposal` | Studio Designer blog, Proposal confidence vs confusion | https://www.studiodesigner.com/blog/proposal-confidence-vs-confusion-how-interior-designers-can-get-it-right/ | invoices, budget |
| `programa-po` | Programa, Purchase orders for interior designers | https://programa.design/features/purchase-orders-for-interior-designers | POs, QuickBooks |
| `houzz-qbo` | Houzz Pro help, Sync Houzz Pro with QuickBooks Online | https://pro.houzz.com/pro-help/r/syncing-houzz-pro-to-quickbooks-online-faqs | QuickBooks |
| `houzz-po` | Houzz Pro help, Turn on purchase orders in QuickBooks Online | https://pro.houzz.com/pro-help/r/how-to-turn-on-purchase-orders-in-your-quickbooks-online | QuickBooks |
| `ny-tb-st-400` | New York Tax Bulletin ST-400, Interior decorating and design services | https://www.tax.ny.gov/pubs_and_bulls/tg_bulletins/st/inte_deco_and_design_serv.htm | sales tax |
| `ca-pub35-fees` | CDTFA Publication 35, Designer fees and charges related to the sale of merchandise | https://cdtfa.ca.gov/formspubs/pub35/designer-fees-and-charges-related-to-the-sale-of-merchandise.htm | sales tax, charge |
| `sd-accounting` | Studio Designer, Accounting software for interior designers | https://www.studiodesigner.com/accounting/ | QuickBooks |
| `arhaus-terms`, `arhaus-faq` | Arhaus, Trade program terms and conditions; Trade program FAQs | https://www.arhaus.com/pages/arhaus-trade-program-terms-conditions , https://arhaus.com/pages/trade-program-faq | trade |
| `cra-charge`, `cra-rates`, `cra-place`, `cra-register` | CRA: Charge and collect the GST/HST; GST/HST calculator and rates; Memoranda 3-3-3 and 3-3-6; When to register | canada.ca (URLs in the page's sources) | Canada |
| `ca-pub35-buy` | CDTFA Publication 35, Purchases, resale certificates and use tax | https://cdtfa.ca.gov/formspubs/pub35/purchases-resale-certificates-and-use-tax.htm | sales tax |
| `tx-96-259` | Texas Comptroller, Taxable Services (Pub 96-259) | https://comptroller.texas.gov/taxes/publications/96-259.php | sales tax |
| `tx-94-143` | Texas Comptroller, Draftsmen and Designers (Pub 94-143) | https://comptroller.texas.gov/taxes/publications/94-143.php | sales tax |

Refused or not usable: Washington DOR's interior decorators guide renders by script (text not saved; leave
Washington out); the Texas statutes site served an empty shell for Tax Code ch. 151, so Texas is quoted from the
Comptroller's publications; Intuit refuses scripts, so its four pages were read in the built-in browser and saved by
hand. DesignFiles' and Houzz Pro's pricing blogs are vendor opinion; they are cited as demand evidence only, never
for a fact.
