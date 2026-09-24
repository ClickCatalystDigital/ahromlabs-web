---
kind: industry
slug: interior-design-and-furniture
title: Software for interior design firms and furniture workshops
audience: Interior design firms, design-and-build studios and furniture manufacturers
answer: >
  Ahrom Labs built the backend Savistar (interior design) and Saag (furniture
  manufacturing) run on: workers, clients, vendors and freight, projects and
  site visits, workshop orders, and one finance ledger for two sister companies.
  Each invoice carries the right company's GSTIN, and staff see only their own
  cash entries — enforced at the server, not hidden in the screen.
domain: [interior-design, manufacturing, finance, access-control]
clients: [savistar-saag]
services: [custom-erp-crm, multi-company-finance, operational-intelligence]
notes:
  - two-companies-one-book
  - outgrown-tally-signs
patterns:
  - role-scoped-finance-views
  - reference-rate-anomaly-detection
  - derive-balances-dont-store-them
  - graceful-degradation-by-env-var
evidence:
  - metric: Companies on one book
    value: "2 sister concerns, one client list"
  - metric: Staff view of the cash ledger
    value: Own entries only
  - metric: Staff access to bank data
    value: None, refused at the server
  - metric: Vendor and freight charges
    value: Checked against reference rates; deviations flagged
published: 2026-09-24
updated: 2026-09-24
---

## Why do design firms outgrow spreadsheets and chat?

A design-and-build job touches clients, site visits, vendors, labour, freight and payments at once, usually spread across a spreadsheet per project and a chat group per site. The owners know how it all connects; nobody else does. [Savistar and Saag](/work#savistar-saag) — an interior design firm and a furniture workshop under the same owners — moved all of it into one system: workers, clients, vendors and freight, projects and site visits on the design side, workshop orders on the furniture side.

## Can a design studio and its furniture workshop share one system?

Yes, and without the weight of a multi-company ERP. Both businesses share one client list and one combined ledger; a design job lives under Projects and a furniture order under Orders, and each invoice carries its own company's letterhead, logo and GSTIN when the PDF is generated. It's a single app modeling two business lines — a sister-concern arrangement, in Indian accounting terms — which is exactly as much structure as the business needs. See [Two companies, one book](/notes/two-companies-one-book).

## How do you stop staff seeing the whole cash book?

By filtering at the point the data is fetched, not by hiding buttons. Staff log day-to-day cash, but their view of the cash ledger contains only the entries they created. Bank data isn't scoped for staff at all — every request for it from a staff account is refused before any query runs. Owners see everything.

## How are vendor and freight overcharges caught?

Every incoming charge is compared against a known reference rate, and anything that deviates is flagged automatically — instead of trusting every bill or asking someone to audit each line by hand. It catches overcharges as long as the reference rates are kept current.

## How are partial deliveries and advances tracked?

Outstanding amounts — a partial delivery, an advance against pay — are computed from the underlying transactions every time they're shown, rather than kept as a running total that can drift from the records that produced it.

## What did the owners say?

> "They really took the time to understand our concerns and requirements, and the system was built the way we had envisioned it. It has brought much more structure, visibility, and control to the way we operate."
>
> — Sachi & Haripriya, owners of Savistar and Saag

## Boundary

This is one shared app for two related businesses, not a multi-tenant platform: adding an unrelated third company would mean a different design, not a new setting.
