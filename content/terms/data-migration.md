---
kind: term
slug: data-migration
title: "Data migration"
answer: >
  Moving records from an old system or spreadsheets into a new one, checked so that nothing is lost or attached to the wrong record.
domain: [operations]
order: 12
published: 2026-10-25
updated: 2026-11-07
---

It matters because a new system is only trusted if its first day's numbers match the old one's, and a wrong match is worse than a missing row. For a company, the audit trail has to run unbroken through the move: books kept in software need an audit trail for every financial year from 1 April 2023, so plan the cutover at a period end.

Ahrom Labs moves history row by row and holds any row that can't be matched to exactly one record for a person, rather than guessing. See [moving from Tally to an ERP](/erp/tally-migration), the note [sales history moved without guessing](/notes/sales-history-moved-without-guessing) and the [migration requirement](/erp/requirements#sales-history-migration).
