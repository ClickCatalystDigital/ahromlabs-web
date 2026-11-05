# ahromlabs.com content roadmap: batches, internal linking, SEO

Written 5 Nov 2026 from a crawl of all 249 live pages and a count of every content file (words, headings, sources,
links in and out). Rules agreed with Pujan: improve the page we already have before writing a new one; facts only
from cited primary sources; every H2 a buyer's question answered in its first sentence; 5 pages per batch, then
review. Construction pages are also the knowledge base Datum AI will be trained on, so they must be complete.

## Where the content stands

| Section | Pages | Avg words | H2s that are questions | Sources per page | Notes |
|---|---|---|---|---|---|
| ASME (US) | 31 | 403 | 0 of 136 | 1.7 | Thinnest US section; highest buyer intent |
| Manufacturing / QuickBooks (US) | 15 | 663 | 8 of 72 | 2.3 | Two pages have no sources |
| Sales tax (US) | 7 | 604 | 33 of 37 | 3.4 | Already in the target shape |
| Construction (US + India) | 9 | 438 | 15 of 40 | 1.2 | One page (WIP schedule) has no sources |
| ERP (India) | 11 | 563 | 2 of 54 | 2.0 | |
| BOQ (India) | 5 | 578 | 1 of 32 | 2.2 | |
| IBR (India) | 4 | 407 | 21 of 21 | 1.0 | Shape fine; few sources |
| AI assistant | 7 | 523 | 15 of 34 | 0.6 | |
| Notes | 16 | 557 | 55 of 92 | n/a | Real engagements; fine |
| Glossary terms | 56 | 30 | n/a | n/a | 40 thin pages, 15 terms with no page |

## Internal linking: what's wrong

1. **Sections are silos.** Counting links written inside page text: ASME guides link to other ASME guides 178 times
   and to manufacturing, sales tax, construction, notes, industry pages and services 0 times. Manufacturing links
   to ASME 0 times; construction links almost only to itself; sales tax only to itself and manufacturing.
2. **Guides never send readers to what we sell.** No guide body links to a service page. The industry pages get 2–3
   links each from all guides and notes, and the two US industry pages get none.
3. **Glossary terms are mentioned but not linked.** "Authorized Inspector" appears unlinked on 14 pages, "hydrostatic
   test" on 9, "heat number" on 7, "P-number", "job costing", "routing" and "bill of materials" on 6 each.
4. *(Checked 5 Nov: not a problem. Each guide's closing list already shows only its own group plus the hub.)*
5. **25 content pages get no link from any other page's text** (only from hubs and footers), e.g.
   `/asme/bpvc-sections`, `/manufacturing/erp-requirements-checklist`, `/erp/implementation-plan`,
   `/ai-assistant/construction-contractors`, `/ibr/2026-changes`.

## Internal linking: the fix (built 5 Nov; each batch keeps it up)

- **Related, across sections.** Each guide gets a `related:` list in its front matter (3–5 paths, at least two outside
  its own section), shown as "Related" under the text, checked at build so a dead path fails. Examples: `asme/mtr` →
  `/notes/plate-remnants-back-into-stock`, `/systems/heat-number`, `/services/material-traceability`,
  `/industries/boiler-pressure-vessel-manufacturing`; `construction/pay-applications` → `/manufacturing/quickbooks-integration`,
  `/construction/retainage`, the construction industry page.
- **Every hub points at what we sell.** Each hub's closing block names its industry page and service: ASME →
  the boiler industry page (North America gets the US version at the same URL) and material traceability;
  manufacturing → inventory and reservations and the job shop industry pages; construction → the construction
  industry page; sales tax → custom ERP.
- **Glossary links on first mention.** At build, the first mention of a glossary term in a guide's text links to its
  `/systems` page (once per page, never inside a heading or an existing link).
- **No orphans.** Each batch gives every page it touches at least two links from the text of related pages.

## Batches (5 pages each; review after each)

Batch 1 is in progress. After it, batches go cluster by cluster, so each finished cluster links up completely.

| # | Pages | Why now |
|---|---|---|
| 1 *(running)* | construction/pay-applications, construction/lien-waivers, asme/u-stamp, asme/mtr, manufacturing/quickbooks-for-manufacturing | Sets the style across sections |
| 2 | construction/retainage, change-orders, wip-schedule (no sources yet), the `/construction` hub, **new: construction industry page (India + US)** | Completes US billing; the industry page becomes the cluster's hub and links to all of it |
| 3 | construction/ra-bills, measurement-book, gst-on-works-contracts, tds-on-contractor-payments (+ mobilisation advance, retention money and final bill folded into `ra-bills`) | Completes India billing: Datum AI's first full knowledge base |
| 3a | **new:** construction glossary terms (short `/systems` pages): RA bill, retainage, measurement book, lien waiver, pay application, schedule of values, change order, WIP / over-under billing | Gives the glossary links something to point at; each term links back to its guide |
| 3b | **new (US):** mechanics lien and preliminary notice deadlines by state, prompt payment acts by state, sales tax for contractors (in `/sales-tax`), certified payroll (Davis-Bacon; a guide only, the demo doesn't do it) | US contractor questions no existing page answers |
| 3c | **new (India):** labour cess (BOCW, 1%), contract labour compliance (CLRA, PF/ESIC for contractors), price escalation clauses (CPWD clause 10CC), performance bank guarantee and defect liability period | India contractor questions no existing page answers |
| 4 | asme/section-viii, section-i-vs-iv, stamps, data-reports, authorized-inspector | ASME code basics: the most-searched questions |
| 5 | asme/section-ix, wps-pqr-wpq, welder-qualification, welder-continuity, p-numbers | ASME welding cluster |
| 6 | asme/mawp, shell-thickness, hydrostatic-test, joint-efficiency, pwht | ASME design and test (the pages with calculators) |
| 7 | asme/section-ii, impact-testing, heads, essential-variables, editions | ASME materials and code changes |
| 8 | asme/quality-control-manual, national-board-registration, section-v, section-xiii, state-boiler-laws | ASME certification and jurisdiction |
| 9 | asme/bpvc-sections, b31-1-vs-b31-3, asme-vs-ibr, buying-from-india, the `/asme` hub | Finishes ASME; India–US bridge pages |
| 10 | manufacturing/quickbooks-integration, quickbooks-job-costing, quickbooks-online-inventory, quickbooks-online-vs-desktop, quickbooks-desktop-end-of-support | QuickBooks cluster |
| 11 | manufacturing/quickbooks-vs-erp, job-shop-erp, small-business-erp-options, custom-vs-off-the-shelf-erp, erp-requirements-checklist (no sources yet) | Choosing an ERP (US) |
| 12 | manufacturing/production-scheduling-software, production-schedule-template (no sources yet), wip-tracking, distributor-inventory-control, the `/manufacturing` hub | Shop floor and inventory |
| 13 | **new: US version of the electronics industry page** (North American visitors now see the India text: 24 India-only terms), sales-tax/sales-tax-in-erp, sales-tax-nexus, economic-nexus-thresholds, manufacturing-sales-tax-exemption | Electronics US gap + sales tax refresh (already in shape: lighter pass) |
| 14 | sales-tax/resale-certificates, use-tax, streamlined-sales-tax, the `/sales-tax` hub, `/us/services/inventory-and-reservations` | Finishes US guides |
| 15–17 | India: ERP (11), BOQ (5), IBR (4) | Same treatment; ERP has 2 question headings in 54 |
| 18 | AI assistant guides (7) | Few sources (0.6 per page) |
| 19–21 | Glossary: the 40 thin terms, by the cluster that mentions them (ASME terms with batch 9, etc.) | After the glossary auto-linking sends traffic to them |
| Later | Construction: material vs BOQ norms, site control from the phone, job cost and margin per site (into existing pages where they fit) | Agreed order after billing |

New pages in this plan: the construction industry page (batch 2), the construction glossary terms and the 8 new
contractor pages (batches 3a–3c, added 5 Nov so Datum AI can answer what contractors ask), and the electronics US version (batch 13),
because nothing existing covers them. Anything else research turns up goes into the existing page it belongs to.

## Other SEO work, in order

1. ~~Technical pass for internal linking~~ Done 5 Nov: `related:` (src/lib/related.ts, checked at prerender), glossary
   links on first mention (src/lib/glossary-links.ts, 79 links added, check in `content:build`), hub closing blocks
   link their industry page and service, and the 9 orphan guides each get two links from related lists.
2. **Question-and-answer schema** from question headings on guides and notes, once a section's headings are
   questions (answer engines read it; Google no longer shows FAQ results for most sites).
3. **US tour videos** for the boiler and interiors US pages (Pujan records them), then electronics and construction.
4. **Client quotes and reviews** (Pujan): one named quote each from LS Technologies and the boiler client; 2–3
   reviews on Clutch, GoodFirms or DesignRush.
5. **Measure:** if Search Console is connected for ahromlabs.com, pick each batch's order by the pages with the most
   impressions and the lowest click-through; otherwise keep this order.

## Done already (5 Nov, not yet deployed)

Construction no longer shown as live; Form I Part A link; /work and /industries fixes; `/us/services` title; dates on
all hub pages; breadcrumbs on notes, patterns, glossary and industry pages; every title ≤ 60 characters (build check);
descriptions ≤ 160; alt text on all illustrations; link checker retries and skips script-blocking sites.
