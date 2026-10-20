---
kind: note
slug: sales-history-moved-without-guessing
title: Moving five years of sales history into one CRM, without guessing a single customer
description: How a manufacturer's old CRM diary, quotation register and Excel order tracker moved into one sales system, with every doubtful row held for review.
answer: >
  At a boiler manufacturer Ahrom Labs built for, sales history lived in an old
  CRM and an Excel tracker. Moving it in recovered all 20,167 diary rows,
  including 154 that a broken export had shifted, imported 2,221 quotations that
  matched exactly one customer and 1,006 orders with 1,905 payments, and held 303
  doubtful quotations for a person instead of guessing.
domain: [sales, data-quality, migration]
patterns: [failures-flagged-not-lost, reconcile-against-source-of-truth]
evidence:
  - metric: old CRM diary rows recovered
    value: 20,167 of 20,167, including 154 rows (0.76%) a broken export had shifted by one or two columns
  - metric: diary notes after removing repeats
    value: 2,199 distinct notes, attached to the customer they belong to
  - metric: quotations imported
    value: 2,221 that matched exactly one customer; 303 listed for review, not imported
  - metric: orders and payments from the Excel tracker
    value: 1,006 orders and 1,905 payments, five financial years
  - metric: rows given made-up content
    value: none — 214 organisations with no note text were skipped, not given a placeholder
published: 2026-10-20
updated: 2026-10-20
---

A sales team's memory is its history: who asked for what, what was quoted, what was promised on the last call. At one boiler and pressure-vessel manufacturer, that history sat in three places: an old CRM's diary, the same CRM's quotation register, and an Excel sheet tracking every order and payment. The operations system Ahrom Labs built needed all of it in one place, so a salesperson opening a customer sees everything that customer has ever asked for.

## Why not just import the files?

Because an export is never as clean as it looks, and a CRM that starts with wrong history is worse than one that starts empty. Every file was checked against itself before anything was loaded.

The diary export had 20,167 rows. In 154 of them (0.76%), a contact address written over several lines had pushed the later columns one or two places to the right, so a naive read by column name lost the real status off the end of the row. The importer finds those rows from their known last columns and reads them correctly. All 20,167 rows were recovered.

## Why import fewer notes than rows?

Because the old CRM repeated one note on every row for an organisation: one customer had the same note on 135 rows spanning a year. Importing row by row would have filled each customer's history with copies. Collapsed to distinct notes, the 20,167 rows became 2,199 real notes, each attached to the customer it belongs to. 214 organisations had rows but no note text ever written; they were skipped rather than given a made-up placeholder.

## What happens to a quotation that matches two customers?

It waits for a person. The quotation register named customers the way people type them, so "ABC Industries" and "A.B.C. Industries Pvt Ltd" could be the same company or two. 2,221 quotations (counting revisions) matched exactly one customer and were imported. 303 matched none, or more than one, and went into a review list instead. A quotation attached to the wrong customer would show up in someone's history as something they never asked for.

The order tracker, kept in Excel for five financial years, came in the same way: 1,006 orders and 1,905 payments, every row tagged with the import it came from so it can be removed as one batch if anything is ever found wrong.

## What does the sales team get?

One place for every enquiry. The funnel stage is an enquiry's only status, with its history, so nothing is "open" in one screen and "lost" in another. A follow-up diary and a weekly planner show who should call whom this week. Quotations go out as PDFs in the company's own format, with its terms, GST and the amount in words, and they can be revised without starting again. Product prices keep their history. Order and payment tracking, win/loss, funnel ageing and salesperson reports read the same records, and once an order is placed the customer follows it through [their own portal](/notes/customer-portal-one-order-every-department).

Connections to IndiaMART, TradeIndia, JustDial and website forms are built: each enquiry lands in Sales, assigned in turn, the moment the company adds its own key.

## Boundary

The old quotation register held only headers (number, date, customer, status), no line items or prices, so imported quotations show when and to whom, not what. New quotations carry their full lines.
