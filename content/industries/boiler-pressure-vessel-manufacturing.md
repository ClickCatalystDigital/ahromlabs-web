---
kind: industry
slug: boiler-pressure-vessel-manufacturing
title: Software for boiler and pressure-vessel manufacturers
audience: Boiler and pressure-vessel manufacturers
answer: >
  Ahrom Labs built the operations system Shanti Boilers & Pressure Vessels runs
  on — BOM, procurement, stores, plate cutting, production, QC, IBR statutory
  folders, GST and TDS accounting, and a customer portal, in one system. Each
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

## How does work move between departments without chasing people?

Each project's milestones declare what they depend on, and the system shows what each one is waiting for, computed fresh every time the page is opened. Procurement runs as a visible pipeline — requests, sourcing, supplier selection, purchase order issued, closed — with new-item requests from engineering accepted into procurement rather than appearing unannounced. On the shop floor, work orders and job cards carry production; engineering has its own calculation sheets linked to the drawings they substantiate.

## What happens to plate offcuts?

They go back into stock as real pieces with dimensions, and every weight is derived from geometry rather than typed. In a live test, a 157.00 kg plate became 127.17 kg of parts, a 15.70 kg remnant returned to stock, and 14.13 kg of scrap — summing exactly to the source. When a BOM is released, a fitting remnant is reserved before anything is bought. See [Putting steel plate offcuts back into stock](/notes/plate-remnants-back-into-stock).

## Can GST, TDS and accounts live in the same system?

They do here. The system is the book of record — ledger, GSTR-1 and GSTR-3B, input-tax-credit reconciliation, TDS, reverse charge, fixed assets, bank reconciliation, a books lock and an audit log — with Tally available as an optional sync target. The original plan left regulated accounting to a separate ERP package; in August 2026 that was reversed, and the operations system became the book of record. See [GST, TDS and the general ledger inside a manufacturing ERP](/notes/accounting-inside-the-manufacturing-erp).

## What does the customer see?

A read-only portal: each order as a stepper from order received to commissioning, with overall progress, estimated dispatch, and the QC certificates and packing lists filed under the stage they belong to. A customer only ever sees their own orders.

## Can it stop drawings leaving the office on a USB drive?

The same system runs a device-control layer on office PCs. USB drives, CDs and DVDs, phones and chosen websites are blocked by default; an employee's attempt to use one files a request, a manager approves it with a one-time code, and access opens for a time-boxed window — 15 minutes by default. Every step is audited.

## Boundary

Nesting — planning the layout of several parts on one plate — is not part of the system. E-invoicing is researched and deferred. The generated IBR forms have been checked against the client's real filed documents; the remaining gaps are formatting, and are being closed form by form.
