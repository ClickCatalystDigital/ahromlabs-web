---
title: ERP software for ASME boiler and pressure vessel manufacturers
metaTitle: ERP for ASME boiler and pressure vessel shops
audience: Boiler and pressure vessel fabricators in the US and Canada
answer: >
  Ahrom Labs builds the operations system an ASME boiler and pressure vessel shop
  runs on: estimates, jobs, BOM, purchasing, plate and remnant stock, job cards,
  QC with NCRs and hold points, shipping, job costing and service, in one
  system that sends invoices, payments and vendor bills to QuickBooks Online.
  Each job's ASME record package (Form P-2 or U-1A, weld map, WPS/PQR, welder
  continuity, MTRs by heat number, NDE, PWHT and hydro test) prints from the
  records the shop already keeps.
description: >
  ERP for ASME boiler and pressure vessel shops: MTRs by heat number, weld maps,
  welder continuity, data report packages, job costing and QuickBooks Online sync.
demo:
  url: https://boiler-erp-us.ahromlabs.com/demo
  label: Try the live demo
services: [custom-erp-crm, material-traceability, operational-intelligence, document-extraction, sales-crm, customer-portal, supplier-portal, bom-from-excel]
notes:
  - plate-remnants-back-into-stock
  - customer-portal-one-order-every-department
  - suppliers-quote-on-a-link
  - same-confidence-different-autonomy
flow:
  - step: Inquiry to sales order
    detail: CRM inquiry, estimate and sales order, with deposit and progress payments tracked per job.
  - step: Design and BOM
    detail: Calculation sheets (ASME PG-27), approved drawings and a multi-level BOM per job.
  - step: BOM release
    detail: Plate remnants already in stock are reserved first; only the shortfall goes to Purchasing.
  - step: Purchasing
    detail: Requests, RFQs, supplier quotes compared side by side, purchase orders and deliveries per PO.
  - step: Receiving
    detail: Receiving inspection on each delivery; each plate and tube keeps its heat number and mill test report.
  - step: Cutting and production
    detail: Plates cut into parts, remnant and scrap by weight; work orders and job cards on the shop floor.
  - step: Quality
    detail: Hold points, NCRs with a disposition, NDE, PWHT and hydro test recorded against the job.
  - step: ASME record package and shipping
    detail: Data report, weld map, WPS/PQR, welder continuity and MTRs printed as one package; packing list, shipment and freight.
  - step: Invoicing and QuickBooks
    detail: Invoice with sales tax per line; invoices, payments, vendor bills and bill payments go to QuickBooks Online.
  - step: Service
    detail: Site visits, commissioning report, service calls and contracts after startup.
evidence:
  - metric: ASME record package
    value: Form P-2 or U-1A, weld map with welder stamps, WPS/PQR, QW-322 continuity, MTRs, NDE, PWHT, hydro test
  - metric: QuickBooks Online
    value: Invoices, payments, vendor bills and bill payments, sent automatically
  - metric: Sample jobs in the demo
    value: "5, from a 150 HP firetube boiler to a Section VIII deaerator tank"
  - metric: Live plate-cut test
    value: 346.1 lb plate → 280.4 lb used + 34.6 lb remnant + 31.2 lb scrap
published: 2026-11-05
updated: 2026-11-05
---

## Can I try it before talking to anyone?

Yes. A live demo runs at [boiler-erp-us.ahromlabs.com](https://boiler-erp-us.ahromlabs.com/demo) with a made-up shop, Acme Boilers Inc. of Cleveland, Ohio, and five sample jobs: a 150 HP and a 250 HP firetube boiler already shipped and invoiced, a 1,500 gallon deaerator tank built to Section VIII with a "U" stamp, a 350 HP boiler in purchasing, and a 250 HP boiler in production with a failed stay-tube lot and its NCR. Leave a name and email, pick a department head to log in as, and use the real screens in dollars, imperial units and US dates. The data resets every night, so nothing you do there reaches anyone.

## What does an ASME boiler shop need that a generic ERP doesn't give?

Four things a generic ERP treats as edge cases are the core of this business. Every boiler or vessel is its own job, with its own bill of materials and milestones across design, purchasing, receiving, production, QC, shipping and startup. Every plate and tube has to trace back to its [mill test report and heat number](/asme/mtr). Every unit ships with a code record package that an [Authorized Inspector](/asme/authorized-inspector) signs off. And steel plate is bought in standard sizes and cut, so stock is pieces with dimensions, not a count. The system is built around those four facts rather than bolted onto a generic stock-and-invoice model.

## Can the ASME data report package come out of the system?

Yes. The job's QC folder prints the ASME record package from the records kept while the job was built: the data report ([Form P-2](/asme/data-reports) for a Section I firetube boiler, Form U-1A for a Section VIII vessel), the weld map with each welder's stamp, the [WPS and PQR](/asme/wps-pqr-wpq) behind each weld, [welder continuity under QW-322](/asme/welder-continuity) (six months per process), the MTRs by heat number, NDE, [post-weld heat treatment](/asme/pwht) and the [hydrostatic test](/asme/hydrostatic-test). Nobody retypes heat numbers or welder stamps into a separate document; the package is a view of what QC and the shop floor already recorded.

## How is material traced from mill test report to finished boiler?

The heat number and mill test report are captured once, when a plate or tube is received, and every piece cut from it inherits them, so nobody re-types them at the cutting table. When a plate is cut, every used piece, remnant and scrap piece is chained to the plate it came from. Receiving inspection can fail a lot and open an NCR; an NCR is dispositioned as rework, repair, scrap or use-as-is, and scrap or use-as-is can't be saved without a written justification. Hold points come from the work order's own route, so a step marked as a quality checkpoint holds the job until QC releases it.

## Does it work with QuickBooks Online?

Yes. QuickBooks Online stays the books, and the operations system sends it what accounting needs. The shop connects its QuickBooks company once (Intuit sign-in), and its accounts are mapped to the system's accounts, with suggested matches reviewed before they are saved. After that, an invoice goes to QuickBooks with its customer when it is issued, and a payment when it is recorded; on the purchasing side, a vendor bill goes when it is approved and a bill payment when it is made. Each send carries a request id, so a retry never creates a duplicate, and a failure is shown on the invoice or bill with its reason and a Retry button. Sales tax is left to QuickBooks' automated sales tax: each line is sent as taxable or not with the ship-to address, and QuickBooks' total is shown beside ours. In the demo it is connected to an Intuit sandbox company. For the wider picture see [connecting QuickBooks Online to a shop system](/manufacturing/quickbooks-integration).

## What did each job actually cost, and what did we make on it?

Each sales order's job shows actual cost against its selling price. Material cost is the sum of purchase orders actually issued for that job; drafts and canceled orders don't count. Labor cost is the time logged on the job's job cards multiplied by each employee's cost rate. Margin is the order value minus both. Work orders carry a planned cost as well, from planned quantities and each route step's planned minutes at the work center's machine-hour rate, so the variance between planned and actual is a report rather than a spreadsheet. Job profitability and customer profitability run the same costing across every job in a period. See [estimated vs actual job costing](/manufacturing/quickbooks-job-costing) for how this compares with costing inside QuickBooks.

## How does sales tax work?

One sales tax amount per invoice line. In the demo, Ohio customers are taxed and out-of-state shipments are at 0%, and a line can be marked non-taxable. When QuickBooks Online is connected, its automated sales tax works the tax out from the ship-to address. [How an ERP should handle US sales tax](/sales-tax/sales-tax-in-erp) covers nexus, exemption certificates and what to check in any system.

## What happens to plate offcuts?

They go back into stock as real pieces with dimensions, and every weight is derived from geometry rather than typed. In a live test, a 346.1 lb plate became 280.4 lb of parts, a 34.6 lb remnant returned to stock and 31.2 lb of scrap, summing exactly to the source. When a BOM is released, a fitting remnant is reserved before anything is bought. Dimensions are entered and shown in inches and pounds by default, with a Units setting for metric. See [Putting steel plate offcuts back into stock](/notes/plate-remnants-back-into-stock).

## What can the owner see across all jobs?

An executive view of active jobs, value in progress, cash collected and outstanding by customer, with any job running late flagged with its reason. Under it, each department's reports: job and customer profitability, production throughput, rejection rate and cost variance, purchasing spend by supplier with each supplier's win rate on quotes, working capital, and sales conversion per salesperson. The management reports export to PDF from the same calculation the screen shows.

## Which installed boilers are due for service?

After startup each boiler stays in the system as the equipment its service calls and contracts attach to. A service call carries a priority and a response time, and its resolved and closed times are stamped by the system, so response times can't be edited after the fact. Renewing a service contract creates a new contract linked to the old one, so the history of what was covered survives.

## What should a boiler or vessel shop ask before choosing software?

1. **Does it keep the heat number on every piece cut from a plate**, or only on the plate you received?
2. **Can it print the data report package from shop records**, or does someone assemble it in Word at the end?
3. **Does it track welder continuity** per process, so a lapsed welder is caught before the weld, not at the audit?
4. **Does it work beside QuickBooks Online**, sending invoices and bills without double entry, or does it ask you to replace your books?
5. **Does job costing use real purchase orders and logged hours**, or estimates someone types in?

## Where can I read up on the ASME rules behind these records?

In our [ASME guides](/asme), each written to the 2025 Edition from ASME's and the National Board's own pages. The
ones Code shops ask about most: [Section VIII Division 1 vs 2](/asme/section-viii) and
[Section I vs Section IV](/asme/section-i-vs-iv) for which book a job is built to; [Section IX](/asme/section-ix) for
welding qualification; [ASME stamps](/asme/stamps) and [Section XIII relief devices](/asme/section-xiii) for the
certificates; [which ASME edition each state requires](/asme/state-boiler-laws) and [how Code editions work](/asme/editions);
[B31.1 vs B31.3](/asme/b31-1-vs-b31-3) for piping; and [buying ASME equipment from India](/asme/buying-from-india).

## Boundary

The system was first built for a boiler and pressure vessel manufacturer in India and runs that business every day; this North American version is the same code with ASME records, US units, sales tax, an estimate of US payroll withholding and QuickBooks Online, shown here on a sample company. It has not yet been used by a US or Canadian shop. QuickBooks sending covers invoices, payments, vendor bills and bill payments; credit and debit notes are not sent yet, and a document edited after it was sent is not sent again. The system records the shop's code work; it does not replace the shop's [quality control manual](/asme/quality-control-manual) or the Authorized Inspector.
