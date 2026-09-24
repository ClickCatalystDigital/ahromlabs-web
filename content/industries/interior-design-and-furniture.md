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
description: >
  One system for an interior design studio and its furniture workshop: projects,
  site visits, worker wages, vendors, freight and a shared GST book.
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
flow:
  - step: Client and job
    detail: One shared client list; a design job under Projects, a furniture order under Orders.
  - step: Site visits and people
    detail: Site visits, workers, vendors and freight recorded against the job they belong to.
  - step: Workshop day
    detail: Attendance and each worker's work on each order logged daily; wages computed from it.
  - step: Charges checked
    detail: Every vendor and freight charge compared with a reference rate; deviations flagged.
  - step: Invoices
    detail: Each invoice carries its own company's letterhead, logo and GSTIN.
  - step: Cash and bank
    detail: Staff record cash and see only their own entries; bank data is owners-only, refused at the server.
  - step: Balances
    detail: Outstanding amounts and advances computed from the transactions, never kept as a running total.
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

## How is a design project tracked from brief to handover?

Each project has a checklist of milestones with due dates, a log of site visits — who went, when, and what they found — and the workshop orders and vendor purchase orders that belong to it, on one page. Every conversation with a client is logged against the client and, when it's about a specific job, pinned to that project, so the history of a decision isn't buried in someone's chat.

The home screen is a month calendar of what's due across both businesses: tasks, project milestones, site visits and workshop delivery dates, with the weather forecast alongside for planning site work, and today's and overdue tasks beside it. Owners assign tasks to anyone; staff see their own and can only create tasks for themselves.

## How does the workshop know who made what?

A workshop order can come from a design project or straight from a walk-in client, and moves from pending to in progress, done and delivered. The daily worksheet records each worker's attendance — present, half day or absent, with in and out times — and what they worked on: which order, which part, from when to when, with a rating. Each order's work history then shows who worked on which part, and when.

## How are daily-wage and salaried workers paid?

Each worker is paid either a monthly salary or a daily wage. Advances and expenses are recorded as they happen, and the month's payroll is computed rather than worked out on paper: a daily-wage worker's days present — a half day counting as half — times their rate, or a salaried worker's monthly salary, minus that month's advances. Each payout is recorded for its period with the gross, the deductions and the net, so the figure paid and how it was reached stay together.

## How do you stop staff seeing the whole cash book?

By filtering at the point the data is fetched, not by hiding buttons. Staff log day-to-day cash, but their view of the cash ledger contains only the entries they created. Bank data isn't scoped for staff at all — every request for it from a staff account is refused before any query runs. Owners see everything.

## How are vendor and freight overcharges caught?

Every incoming charge is compared against a known reference rate, and anything that deviates is flagged automatically — instead of trusting every bill or asking someone to audit each line by hand. For freight, the reference is a rate card per transporter and per route — from one location to another, the amount expected — so a trip billed above its route's rate is flagged the moment it's entered, and each vendor shows its count of overcharges. It catches overcharges as long as the reference rates are kept current.

## How are partial deliveries and advances tracked?

A material order placed with a vendor is linked to the project or workshop order it's for, and every delivery and return against it is recorded as it happens. The order shows as open, complete, partially returned or fully returned, and what's still to arrive is computed from those deliveries.

Outstanding amounts — a partial delivery, an advance against pay — are computed from the underlying transactions every time they're shown, rather than kept as a running total that can drift from the records that produced it.

## Can bank statements and bills come in without retyping?

A bank statement is uploaded as a PDF, its transactions are read by AI, and an owner or manager reviews them line by line, adding a note or attaching the receipt behind any entry. Cash entries carry their attachments too. Invoices are raised per client, optionally against a project, with HSN codes and a GST rate per line; the CGST and SGST totals are computed from the lines every time rather than stored, and each invoice moves from draft to sent to paid.

Nothing is ever hard-deleted: a removed record stops showing but stays in the database, and deleting at all needs an owner, admin or manager.

## What should a design studio ask before choosing software?

1. **Does it hold the design side and the workshop side together** — projects, site visits, workshop orders and vendors — or only one of them?
2. **Can it pay daily-wage workers** from real attendance, with advances deducted, not from a separate notebook?
3. **Does it check vendor and freight bills** against what they should cost, or just record them?
4. **If you run two companies, does each invoice carry the right company's name and GSTIN** from one system?
5. **Who can see the money?** Staff logging petty cash shouldn't see the bank account — enforced by the server, not by hiding a menu.

## What did the owners say?

> "They really took the time to understand our concerns and requirements, and the system was built the way we had envisioned it. It has brought much more structure, visibility, and control to the way we operate."
>
> — Sachi & Haripriya, owners of Savistar and Saag

## Boundary

This is one shared app for two related businesses, not a multi-tenant platform: adding an unrelated third company would mean a different design, not a new setting.

There is no BOQ or quotation module, no 3D design or mood boards, and no client portal — clients are served by the team, not by a login. Invoices split tax into CGST and SGST for clients in the same state; an IGST path for out-of-state clients hasn't been needed yet and isn't built.
