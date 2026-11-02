# US manufacturing buyer research (2 Nov 2026)

Phase A of the US knowledge web plan. What US manufacturing buyers ask, in their words, before we pick pages. **No search volumes here**: those come from Pujan's Keyword Planner export (Phase B). Everything below is a demand *signal*, not a measured volume.

Sources used: Google US autocomplete (`gl=us`), Google US results pages (sampled), Practical Machinist / CNCzone / Eng-Tips / Intuit Community threads, Intuit help docs, competitor pages. Reddit could not be read directly (blocked for our tools); Reddit threads appear only where Google listed them.

## 1. What the results pages show (who ranks)

| Query | Who ranks | What that means for us |
|---|---|---|
| erp for small machine shop | Reddit (r/CNC, r/Machinists), Practical Machinist threads and videos, then ECI, workcell.ai listicle, top10erp, OnRamp, ProShop | **Forums outrank vendors.** Buyers want peer answers; a plain, honest vendor-neutral page can compete. |
| rfq automation manufacturing | All AI startups (dac.digital, venqon, circuit.ai, heyiris, spiralscout, luminovo, rfqautopilot) | Crowded with vendor pages that look alike. PAA asks basics ("What does RFQ mean in manufacturing?", "RFP vs RFQ?"). Our edge: customer RFQ vs supplier RFQ, and what must stay human-approved. |
| does quickbooks work for manufacturing | Intuit's own pages (3 of top 3), Katana, Rand Group, r/QuickBooks, Method | Intuit owns it. PAA: "Why are people leaving QuickBooks?", "What are people replacing QuickBooks with?", "Why do CPAs not like QuickBooks Online?". Win with an edition-by-edition answer Intuit won't write. |

Google showed its "unusual traffic" check on 3 other sampled queries; we skipped them rather than bypass it.

## 2. Facts worth building on (checked against the source)

- **QuickBooks manufacturing orders are only in Intuit Enterprise Suite**, not standard QuickBooks Online plans: "Manufacturing features are currently available in Intuit Enterprise Suite." and "Multi level bill of materials with sub assemblies aren't supported in Intuit Enterprise Suite." Downgrading makes BOMs and manufacturing orders view-only. No routing or work centers mentioned. ([Intuit help](https://quickbooks.intuit.com/learn-support/en-us/help-article/sales-orders/learn-manufacturing-orders-assemblies/L7ffspckB_US_en_US))
  Older community threads still say "QBO has no assemblies", so most of the web is out of date. An up-to-date, edition-specific page is original by default.
- Duplicate-sync complaints on Intuit Community are mostly connector issues: orders synced without invoices then re-keyed by hand (stock deducted twice); products matched by SKU, so missing SKUs cause duplicates. ([thread](https://quickbooks.intuit.com/learn-support/en-us/other-questions/shopify-inventory-synced-with-quickbooks-online/00/1279192), [Why is QuickBooks duplicating transactions?](https://quickbooks.intuit.com/learn-support/en-us/other-questions/why-is-quickbooks-duplicating-transactions/00/1331277))

## 3. Buyer wording from forums (paraphrased)

**Choosing a system / QuickBooks**
- Small shops run QuickBooks for books and estimates, but "it isn't a manufacturing system"; the gap is managing a job from PO receipt to invoice. Common path: QuickBooks + a shop add-on (AllOrders, Realtrac, Quick-Jobshop, JobBOSS Starter). ([PM: machine shop ERP recommendations](https://www.practicalmachinist.com/forum/threads/machine-shop-erp-recommendations.400718/), [PM: small machine shop software](https://www.practicalmachinist.com/forum/threads/small-machine-shop-software-recommendations.331267/))
- A full ERP "needs at least a full-time admin" — too much for a 3–10 person shop. ([PM: ERP software advice](https://www.practicalmachinist.com/forum/threads/erp-software-advice.349959/))
- Packaged ERP complaints: bloated, weak scheduling, long learning curve. JobBOSS vs ProShop debates. ([PM: JobBOSS2 vs ProShop vs something actually good](https://www.practicalmachinist.com/forum/threads/erp-jobboss-2-vs-proshop-vs-something-actually-good.411796/))
- **Build vs buy** is a live debate: shops that built in-house praise speed of change; critics cite cost, unfinished projects and dependence on one developer; middle paths are Airtable/FileMaker/configurable ERP. ([PM: ERP systems](https://www.practicalmachinist.com/forum/threads/erp-systems.395119/page-2), [PM: free ERP system](https://www.practicalmachinist.com/forum/threads/free-erp-system.394704/page-2))

**Scheduling**
- Excel with a column per machine and a row per day; breaks once 2–3 people share it. Gantt tools show overload but don't resolve it. Packaged ERPs "not intelligent enough" for an operational schedule. ([PM: machine scheduling](https://www.practicalmachinist.com/forum/threads/machine-scheduling.393367/), [PM: scheduling software not quite ERP](https://www.practicalmachinist.com/forum/threads/machine-scheduling-software-not-quite-erp.386668/))
- Gantt charts are weak for quoting the shortest lead time on a tentative order. ([PM: scheduling/capacity software](https://www.practicalmachinist.com/forum/threads/scheduling-capacity-software.427334/page-2))

**Quoting / RFQ**
- Many quote in spreadsheets; fast (same-day) quotes win work; quotes should carry into the shop order and traveler. AI quoting is arriving (CloudNC Quote Agent: drafts plan + cost from RFQ email/files for estimator review). ([PM: quoting/estimation software](https://www.practicalmachinist.com/forum/threads/quoting-estimation-software.375039/), [PM: methods to expedite quoting](https://www.practicalmachinist.com/forum/threads/methods-to-expedite-quoting.375813/), [CloudNC Quote Agent](https://www.practicalmachinist.com/cloudnc-launches-quote-agent-to-help-machine-shops-win-more-work/))

**Job costing**
- "How many shops track actual hours vs the bid price?" One owner logs estimate vs actual per job and raises quoted time when a 3-month window shows a consistent miss. Warning: don't track data you won't use. ([PM: actual hours vs bid](https://www.practicalmachinist.com/forum/threads/how-many-shops-track-actual-hours-vs-the-bid-price.446887/), [PM: time tracking for job costing](https://www.practicalmachinist.com/forum/threads/time-tracking-for-job-costing.330086/), [PM: man hours or machine hours](https://www.practicalmachinist.com/forum/threads/man-hours-or-machine-hours.397480/))

**Shop floor / WIP**
- Barcoded travelers scanned at set points; tablets get dirty, dropped, slow on Wi-Fi; scanning feels like surveillance unless tied to payroll; pays off around 7–10 employees. ([PM: paperless job tracking](https://www.practicalmachinist.com/forum/threads/paperless-or-less-paper-job-tracking-routing-job-shop-specific.327437/), [PM: tablets on the shop floor](https://www.practicalmachinist.com/forum/threads/computers-tablets-on-the-shop-floor.322887/))

**Traceability**
- Scan mill certs, write heat number on the traveler, own lot code cross-referenced to heat number; transfer heat numbers before cutting. ([PM: material traceability](https://www.practicalmachinist.com/forum/threads/how-do-you-handle-material-traceability.243094/), [Eng-Tips: heat number vs traceability code](https://www.eng-tips.com/threads/marking-of-heat-number-vs-traceability-code.301098/))

Note: most forum threads are years old. Good for wording and pain, not for current product facts.

## 4. Competitor content themes

- **Vendors** (Fulcrum, ProShop, JobBOSS, MRPeasy, Katana): feature pages per capability ("Job Costing" etc.) and generic explainers ("What is job costing"). Katana publishes "How to use QuickBooks Online for manufacturing" (inventory-first, QBO/Xero integration).
- **Templates are commodity**: Smartsheet, ProjectManager, Fuzen, Paperform all give free scheduling and job-cost templates. A plain template won't stand out; one tied to a worked example with real-looking numbers and a reconcile step might.
- **Comparison listicles** (workcell.ai, top10erp, Fabrico, Capterra/GetApp) dominate "best ERP for…" queries.
- **Gap nobody fills well**: vendor-neutral, edition-specific QuickBooks answers; honest build-vs-buy with disqualifiers; how a sync avoids duplicates; what AI may and may not decide in quoting/scheduling.

## 5. Autocomplete findings

46 seed stems × 36 expansions each (stem, a–z, vs/for/with, how/what/best/can/does/why), Google US, 2 Nov 2026. About 2,300 unique suggestions; after filtering off-topic ones (travel jobs, OR-research "job shop scheduling problem", QuickBooks downloads, slang), **1,326 keywords** remain in `seed-keywords.csv`. A spot-check of 10 random rows against live autocomplete gave 10 of 10.

How many distinct suggestions a stem gets is a rough signal of how many ways people search it, **not volume**. Inflated stems are marked.

| Strong | Medium | Thin or none |
|---|---|---|
| job shop scheduling (131) | quickbooks manufacturing (75) | custom manufacturing erp (14) |
| quickbooks online inventory (114) | manufacturing inventory management (69) | erp for fabrication shop (12) |
| production scheduling software (94) | production scheduling excel (56) | quickbooks bom (12) |
| ai erp (247), ai mrp (228)*, oee (296)*, job traveler (250)* | quickbooks job costing (54), wip tracking (52) | job costing manufacturing (12), shop floor data collection (9) |
| | metal fabrication software (47), cnc shop software (44), automate quoting (41) | outgrowing quickbooks (2); replace excel manufacturing, quickbooks sync duplicate, estimated vs actual job cost (0) |

\* inflated by unrelated meanings (MRP = retail price, "traveler" = travel jobs, OEE = car parts); filtered in the CSV.

What this says before any volumes:
- **People don't type the pain; they type the tool.** "replace excel", "sync duplicate", "estimated vs actual" get no suggestions, while "production scheduling excel", "quickbooks job costing" and "job shop scheduling software" are rich. Pages should target the tool words and handle the pain inside.
- **QuickBooks demand is about features and editions** (inventory on/off, Essentials vs Plus, work orders, Manufacturing & Wholesale edition, Enterprise), not about integration. Integration has few suggestions (15): the integration page should be a section/next step of the "does QuickBooks work for manufacturing" page, or a smaller page.
- **"Custom" is rarely searched** (custom manufacturing erp: 14). Build-vs-buy is a decision page for people already looking, not a traffic page.
- **Scheduling is the biggest problem cluster**, and much of it is template/Excel intent ("job shop scheduling excel template"). A downloadable schedule with machine/shift constraints fits it.

## 6. Files

- `seed-keywords.csv`: keyword, group, evidence (autocomplete / PAA / related search / forum / Intuit docs / workbook hypothesis), evidence_url, persona, intent, candidate_page. Every row has an https evidence URL. Rows marked "workbook hypothesis" came from the ChatGPT workbook and were not observed by us (their Reddit links were not verifiable).
- `seed-keywords.txt`: the same keywords, one per line, to paste into Keyword Planner.
- Next: Pujan's Keyword Planner export goes in `kp-export.csv`; Phase B joins it to the CSV.
