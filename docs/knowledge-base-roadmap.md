# Knowledge base: what's next (2 Nov 2026)

State: 221 pages; by market signals 108 lean India, 56 North America, 57 common. Rough score 62/100: strong on depth,
accuracy (quotes checked at build) and machine readability; weak on US coverage, outside links and measured results.
US pages now have their own URLs (/us…) with hreflang; Search Console reports filter by country (`country: "usa"`);
GA4 records each visitor's market (user dimension "Market", event dimension "Page market"). Four US demos are live.

Guard in place: `scripts/topics.check.ts` (in `npm run content:build`) keeps the AI assistant pages common and the
ASME and manufacturing hubs from leaning Indian.

## Deferred, in order

1. **Topic map for every page.** Extend `topics.check.ts`: tag each hub IN / NA / common in one list and fail the build
   on drift (today only three hubs are guarded).
2. **US sales tax for manufacturers and distributors**: nexus, exemption and resale certificates, sales tax in the
   ERP. High US search demand; ties to the four US demos.
3. **Construction hub (both markets)**: US pay applications (AIA G702/G703), retainage, lien waivers, change orders,
   job costing, WIP schedule; India RA bills, measurement books, TDS 194C. The US and Indian construction demos and
   Datum AI already show all of it.
4. **QuickBooks pages** (Pujan's next task) and Tally vs custom / migrating off Tally (India).
5. **Case studies with numbers**, one per demo industry: before/after figures (time to quote, stock accuracy, days
   to close the month).
6. **Inventory for US distributors**: cycle counts, lot/serial traceability, FIFO valuation, barcodes; and ERP
   choice for small US firms (custom vs NetSuite, Acumatica, Odoo, Fishbowl, Katana).
7. **Source monitoring**: a script that re-fetches each official source (Gazette, CBIC, ASME, Intuit, state pages) and
   flags changes, replacing the monthly manual check.
8. **Named reviewers**: one per hub (CA for GST, AI or QA engineer for ASME, lawyer for data safety).
9. **Monthly market report**: per hub, impressions and queries for `usa` and `ind`; write the next pages from them.
10. **Outside links**: share the calculators and checkers where buyers ask (LinkedIn, forums), listings, client reviews.
