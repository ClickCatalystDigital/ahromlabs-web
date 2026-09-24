---
kind: industry
slug: boiler-pressure-vessel-manufacturing
title: ERP software for boiler and pressure-vessel manufacturers
audience: Boiler and pressure-vessel manufacturers
answer: >
  Ahrom Labs built the operations system Shanti Boilers & Pressure Vessels runs
  on — BOM, procurement, stores, plate cutting, production, QC, IBR statutory
  folders, job costing, GST and TDS accounting, service contracts and a
  customer portal, in one system. Each
  boiler's IBR folder is generated from its bill of materials and a bank of
  material test certificates.
domain: [manufacturing, compliance, quality-control]
clients: [shanti-boilers]
services: [custom-erp-crm, compliance-accounting, operational-intelligence, document-extraction]
notes:
  - ibr-statutory-folder-from-bom
  - plate-remnants-back-into-stock
  - accounting-inside-the-manufacturing-erp
  - same-confidence-different-autonomy
  - tally-vs-erpnext-vs-custom-erp
patterns:
  - compute-blockers-on-read
  - one-confirmation-teaches-the-system
  - unconfirmed-inferences-stay-read-only
  - human-verified-statutory-rates
  - auto-match-only-when-mutually-unique
  - compute-once-render-many
flow:
  - step: Enquiry to sale order
    detail: CRM lead, quotation and sale order, with payment stages tracked per order.
  - step: Project and model
    detail: The boiler model sets the IBR form set; the maker-number prefix sets the legal entity.
  - step: Design and BOM
    detail: Role-approved drawings, calculation sheets, and a multi-level BOM tree with reusable structure templates.
  - step: BOM release
    detail: Remnants already in stock are reserved first; only the shortfall goes to Procurement.
  - step: Procurement
    detail: Requests, sourcing, supplier quotes, selection and purchase orders, with delivery lots per PO.
  - step: Receiving
    detail: Inward QC approval on each delivery; test-certificate PDFs read by AI into the certificate bank.
  - step: Cutting and production
    detail: Plates cut into parts, remnant and scrap by weight; work orders and job cards on the shop floor.
  - step: Quality
    detail: Incoming and finished-goods inspection, hold points, NCRs, calibration; certificates matched to parts.
  - step: IBR folder and dispatch
    detail: Statutory folder generated; packing list approved by QC and Production; e-way bill and freight captured.
  - step: Accounts and after-sales
    detail: Invoice, GST and TDS in the same ledger; service calls, contracts and service reports after commissioning.
evidence:
  - metric: IBR forms generated
    value: Cover letter, Forms II(1), III, III A and IV A
  - metric: Boiler models, each with its own form set
    value: "8"
  - metric: Reports and documents
    value: "23, one computation each"
  - metric: Live plate-cut test
    value: 157.00 kg → 127.17 used + 15.70 remnant + 14.13 scrap
published: 2026-09-24
updated: 2026-09-24
---

## What does a boiler manufacturer need that a generic ERP doesn't give?

Four things generic ERPs treat as edge cases are the core of this business. Every boiler is its own project, with its own bill of materials and a chain of milestones across design, procurement, stores, production, QC, dispatch and commissioning. Every plate and tube has to trace back to the material test certificate it arrived with. Every unit ships with statutory paperwork for the Directorate of Boilers under the Indian Boiler Regulations. And steel plate is bought in standard sizes and cut, so stock is pieces with dimensions, not a count. The system Ahrom Labs built for [Shanti Boilers & Pressure Vessels](/work#shanti-boilers) is designed around those four facts rather than bolted onto a generic stock-and-invoice model.

## Can the IBR statutory folder be generated instead of typed?

Yes. The folder — covering letter, Forms II(1), III, III A and IV A — is generated from the project's bill-of-materials tree and a bank of material test certificates. The form set is chosen by boiler model, Form IV A's lettered sections come from the BOM's own structure, and certificate PDFs are read by AI on upload. Matching a certificate to the part it covers is suggested by confidence but always confirmed by a person, because it ends up in paperwork an inspector relies on. The details are in [Generating a boiler's IBR statutory folder](/notes/ibr-statutory-folder-from-bom).

## How is material traced from test certificate to finished boiler?

Each test certificate is identified by certificate, cast and plate number together — one certificate number covered four casts in the client's own sample — and one certificate is typically used across several boilers. When a plate is cut, every used piece, remnant and scrap piece is chained to the plate it came from. QC records heat and lot numbers, non-conformance reports with a disposition and a verification step before closing, and hold points that stop a job until inspection clears it.

The heat number and certificate are captured once, when a plate is received, and every piece cut from it inherits them automatically — nobody re-types them at the cutting table. A non-conformance can be dispositioned as rework, repair, scrap or use-as-is: rework and repair open a new job card that carries the lineage of the original, and scrap or use-as-is can't be saved without a written justification. Hold points come from the work order's own route — a step marked as a quality checkpoint holds the job until QC releases it — so there is no separate inspection plan to keep in step with production.

## How does work move between departments without chasing people?

Each project's milestones declare what they depend on, and the system shows what each one is waiting for, computed fresh every time the page is opened. Procurement runs as a visible pipeline — requests, sourcing, supplier selection, purchase order issued, closed — with new-item requests from engineering accepted into procurement rather than appearing unannounced. On the shop floor, work orders and job cards carry production; engineering has its own calculation sheets linked to the drawings they substantiate.

## What did each boiler actually cost, and what did we make on it?

Once a sale order has its project, the system shows its actual cost against its selling price. Material cost is the sum of purchase orders actually issued against that project — drafts and cancelled orders don't count as spend. Labour cost is the time logged on the project's job cards multiplied by each employee's cost rate. Margin is the sale order value minus both. When nothing has been bought or logged yet, material and labour show as empty rather than as an estimate.

Work orders carry a planned cost as well as an actual one: planned material from the quantities and unit costs on the work order, planned labour from each route step's planned minutes and the workstation's machine-hour rate. The gap between the two is the Production Cost Variance report. For management, Project Profitability and Customer Profitability run the same costing across every order in a period, so there is one calculation of margin, not three that disagree.

Costing is only as complete as its inputs. Purchase orders and job-card time are counted; outside job work is listed but not priced, overheads aren't allocated yet, and a margin is only real once purchasing and time logging are actually happening in the system.

## What can the owner see across all orders?

Each department has its own reports, and the management reports reuse those numbers rather than recalculating them:

- **Project and customer profitability** — material and labour against selling value, per order and per customer.
- **Manufacturing performance** — work-order throughput, rejection rate, material yield and cost variance.
- **Procurement spend** — by supplier, with a six-month spend trend and each supplier's win rate on quotes.
- **Working capital** — cash plus receivables plus inventory, minus payables.
- **Production** — work order register, rework and rejection, material and labour utilisation, and material shortage against open work orders.
- **Sales** — leads, conversion rate and follow-up completion per salesperson.

The management reports export to PDF from the same computation the screen shows. Machine downtime and OEE are deliberately left out: no machine data is collected, so there would be nothing honest to report.

## Which installed boilers are due for service, and are contracts being renewed?

After commissioning, each boiler stays in the system as the equipment its service calls and contracts attach to. A service call carries a priority and a response time in hours, and moves from open to assigned, in progress, resolved and closed; the resolved and closed times are stamped by the system at the moment the status changes, so response times can't be edited after the fact. Every site visit is logged against its call.

A service contract records its coverage window, visit frequency and what is covered. Renewing one creates a new contract linked to the old one rather than overwriting it, so the history of what was covered, and when, survives. Four reports come off that data: commissioning progress and delay reasons; service calls by priority with response-time compliance; each technician's calls and average resolution time; and active contracts, contracts expiring in the next 30 days, and the renewal rate.

## What happens to plate offcuts?

They go back into stock as real pieces with dimensions, and every weight is derived from geometry rather than typed. In a live test, a 157.00 kg plate became 127.17 kg of parts, a 15.70 kg remnant returned to stock, and 14.13 kg of scrap — summing exactly to the source. When a BOM is released, a fitting remnant is reserved before anything is bought. See [Putting steel plate offcuts back into stock](/notes/plate-remnants-back-into-stock).

## Can GST, TDS and accounts live in the same system?

They do here. The system is the book of record — ledger, GSTR-1 and GSTR-3B, input-tax-credit reconciliation, TDS, reverse charge, fixed assets, bank reconciliation, a books lock and an audit log — with Tally available as an optional sync target. The original plan left regulated accounting to a separate ERP package; in August 2026 that was reversed, and the operations system became the book of record. See [GST, TDS and the general ledger inside a manufacturing ERP](/notes/accounting-inside-the-manufacturing-erp).

## What does the customer see?

A read-only portal: each order as a stepper from order received to commissioning, with overall progress, estimated dispatch, and the QC certificates and packing lists filed under the stage they belong to. A customer only ever sees their own orders.

## Can it stop drawings leaving the office on a USB drive?

The same system runs a device-control layer on office PCs. USB drives, CDs and DVDs, phones and chosen websites are blocked by default; an employee's attempt to use one files a request, a manager approves it with a one-time code, and access opens for a time-boxed window — 15 minutes by default. Every step is audited.

## What modules does a boiler manufacturer's ERP need?

One per department, sharing the same records rather than handing spreadsheets between them. In the system built for Shanti Boilers:

- **Sales and CRM** — leads, quotations, sale orders and a payment tracker with stages per order.
- **Engineering** — a multi-level bill of materials with where-used and common/uncommon views, engineering change notes, reusable structure templates, drawings approved by role, and calculation sheets linked to the drawings they substantiate.
- **Procurement** — requests from engineering accepted into a sourcing pipeline, supplier quotes compared side by side, purchase orders with delivery lots, and purchase returns.
- **Stores** — delivery-by-delivery receiving, piece-level plate and section stock with remnants, material indents and gate passes.
- **Production** — work orders above job cards, routed per unit when one order covers several boilers.
- **Quality** — incoming, finished-goods, sub-assembly and job-work inspection, instrument calibration, non-conformance reports with disposition, hold points, and the test-certificate bank behind the IBR folder.
- **Dispatch** — packing lists that need both QC and Production sign-off, freight cost and e-way bill details captured against the invoice.
- **Accounts** — ledger, GST returns, TDS, reverse charge, fixed assets and bank reconciliation, with 23 reports.
- **Installation** — service calls with priorities and response times, service contracts, and service reports.

## Can existing Excel records come across?

Yes, and they were. Bills of materials are imported from the plant's own spreadsheets into the BOM tree, with each line categorised automatically — and when a person corrects a misspelled item once, the import remembers it. Five years of order and payment history came across from the existing Excel tracker and were checked field by field against the sheet, with zero mismatches, before anyone relied on them.

## Should a boiler maker buy an engineering ERP package or build custom?

Engineering ERP packages exist with hundreds of installations, and if one fits your processes with little customisation, it will be cheaper and faster. The Shanti Boilers system was scoped against one such package's feature list, item by item — then built custom, because the parts that matter most here (the IBR folder generated from the BOM, piece-level plate traceability, a customer portal filed by boiler stage) aren't what packages are built around. The trade-offs in general are in [Tally, ERPNext, Odoo or a custom ERP](/notes/tally-vs-erpnext-vs-custom-erp).

## What should a boiler maker ask any software vendor?

Whoever builds or sells it, these five questions separate a system that fits from one that gets worked around:

1. **Where does money leak today?** Late quotations, cost overruns, slow collections or unbilled service work — the system should be designed around the biggest one first.
2. **Can it show the real cost of one boiler?** Material and labour against selling price, per order, from the purchase orders and job cards themselves — not from a spreadsheet kept on the side.
3. **Can it produce the statutory and quality paperwork from its own records?** The IBR forms, test certificates, inspection results and non-conformances, traced to the parts they cover.
4. **What happens after dispatch?** Service calls, visits and contracts against the specific boiler, with renewals that keep their history.
5. **Who owns the system and the data?** The code, the server and the records — and what it takes to change something next year. Our answer is in [Working with Ahrom Labs](/engagement).

## IBR terms, in one place

- **Form II(1)** — the inspection certificate: inspecting authority, working pressure, hydraulic test pressure and date, drawing numbers and signatories.
- **Form III** — the boiler's description: dimensions, pressures, heating surface, evaporation, parts manufactured, construction and seams.
- **Form III A** — a material table for one named part, such as the feed pipeline, including steel-making process and heat treatment.
- **Form IV A** — the material table for the boiler, each part with its test certificate, grouped into lettered sections.
- **Form XVII** — used for a small industrial boiler in place of Forms II(1) and III.
- **Material test certificate (MTC)** — the mill's certificate for a plate, tube or forging, identified here by certificate, cast and plate number together.
- **Hold point** — a stage production can't pass until QC clears it.
- **NCR** — a non-conformance report, closed only after a disposition and a separate QC verification.

## Boundary

Nesting — planning the layout of several parts on one plate — is not part of the system. E-invoicing is researched and deferred. Quotations are priced from default and customer price lists; there is no configurator that builds a price from a boiler's specification, and a pre-sale cost estimate was deliberately left out, because nothing real exists to cost before an order becomes a project. Welding is tracked as a job-card operation, not joint by joint — there is no weld map, WPS or welder-qualification record, or NDT result linked to a joint yet. Remote monitoring of installed boilers (sensors, IoT, SCADA) is not part of this system. The generated IBR forms have been checked against the client's real filed documents; the remaining gaps are formatting, and are being closed form by form.
