---
kind: erp
slug: tally-migration
title: "Moving from Tally to an ERP: what to migrate and how to check it"
answer: >
  Decide first whether Tally stays as the books or goes. Then move masters, opening balances, outstanding bills,
  stock with its batches, and the history people actually look up, each checked against its source: count the
  rows, hold anything that matches two records for a person, and tag every import so it can be removed as a
  batch. Keep the audit trail unbroken through the switch.
description: "How to move from Tally to an ERP in India: keep Tally or replace it, what to migrate, how to check each import, and the audit-trail rule at cutover."
domain: [erp, tally, migration]
published: 2026-10-25
updated: 2026-10-25
checked: 2026-10-25
image:
  src: /erp/tally-to-erp-migration.webp
  alt: "Two filing cabinets with an open box of files between them."
  width: 1086
  height: 362
sources:
  - title: Companies (Accounts) Second Amendment Rules, 2022 (G.S.R. 235(E))
    publisher: Ministry of Corporate Affairs, Gazette of India
    url: https://egazette.gov.in/WriteReadData/2022/234733.pdf
    date: 2022-03-31
checks:
  - reg: Companies (Accounts) Second Amendment Rules, 2022
    doc: mca-audit-trail-2022
    quote: the figures, letters and words “1st day of April, 2023” shall be substituted
---

## Keep Tally, or replace it?

Both work, and the choice decides what you migrate.

- **Tally stays as the books.** The ERP runs sales, stock and operations, and posts approved invoices into TallyPrime as vouchers. Your accountant keeps working in Tally. Very little accounting history moves; what moves is masters and open items. LS Technologies runs this way: approved invoices reach TallyPrime within 30 seconds, and every posted voucher is checked against Tally's own data.
- **The ERP keeps the books.** Ledgers, GST returns and TDS move into the ERP, and Tally becomes optional or goes. More moves, and the [audit trail](/systems/audit-trail) has to carry across. A boiler manufacturer Ahrom Labs built for runs this way, with GSTR-1, GSTR-3B and TDS from the operations system.

How each connection to Tally works, and why TallyPrime needs an agent on its own PC, is in [four ways to connect a business system to TallyPrime](/notes/connecting-tallyprime-four-ways).

## What to move

| What | Why it matters | How to check it |
|---|---|---|
| Ledger and party masters | Every transaction hangs off them | Count before and after; no duplicates by GSTIN |
| Item masters, with units and HSN | Stock and tax depend on them | Count; every HSN valid; units consistent |
| Opening balances | The books must agree on day one | Trial balance in the ERP equals Tally's on the cutover date |
| Outstanding bills (receivable and payable) | Collections and payments continue | Each party's total matches Tally's outstanding |
| Stock, with batches or units | Reservations and costing need it | Quantity and value per item match; batches or units as labelled |
| GST history you look up | Returns and notices refer back | The periods you need, read-only, with their filing status |
| Sales history (enquiries, quotations, orders) | Sales can't work without it | Row counts; doubtful rows held, not guessed |

## How to check each import

Three rules, from moving five years of a manufacturer's sales history (see [the note](/notes/sales-history-moved-without-guessing)):

1. **Check the file against itself first.** A broken export had shifted 154 of 20,167 diary rows by a column or two; read naively, they would have lost their status. All 20,167 were recovered by checking each row's known last columns.
2. **Hold, don't guess.** A quotation that matched no customer, or more than one, went to a review list: 2,221 matched exactly one customer and came in; 303 waited for a person.
3. **Tag every import.** Each row carries the import it came from, so a batch found wrong later can be removed as one.

## Cutover and the audit trail

A company keeping its books in software must have an audit trail for every financial year from 1 April 2023 (the date was substituted by the Companies (Accounts) Second Amendment Rules, 2022). Plan the cutover so the trail doesn't break: close a period in Tally, move balances as at that date, and start the ERP's trail from the first entry after. Keep Tally's data for the years before, read-only, for the auditor. See the [audit-trail requirement](/erp/requirements#accounts-audit-trail-date).

## A sequence that works

1. Freeze masters for a week; clean duplicates in Tally first.
2. Move masters, then check counts.
3. Pick a cutover date at a period end.
4. Move opening balances and outstanding bills as at that date; tie the trial balance.
5. Move stock and check quantity and value per item.
6. Run both systems for one cycle if Tally stays as the books; compare.
7. Move history last, read-only, and hold doubtful rows for a person.

See also the [migration requirement](/erp/requirements#sales-history-migration) and the [Tally integration requirements](/erp/requirements#integrations-tally).
