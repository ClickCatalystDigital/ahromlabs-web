---
kind: pattern
slug: compute-once-render-many
title: One computed result, several renderers — never recalculate a report per format
answer: >
  A report shown on screen, returned as JSON and exported as PDF should come
  from one computation, with each format only rendering its result. Register
  each report once with the exact function that computes it; on-screen table,
  API and PDF all call that function. Across 23 reports and documents, the
  three formats cannot disagree.
domain: [architecture, reporting]
evidence:
  - metric: reports built this way
    value: 19 catalog reports + 4 per-record PDFs
  - metric: calculations per report
    value: 1, shared by the JSON route, the screen and the PDF
published: 2026-09-24
updated: 2026-09-24
---

## Context

Business reports get asked for in more than one form: a table on screen, a PDF to email to the auditor, sometimes raw data for another system. The quick way to add a PDF is to write a PDF generator that queries the data again. Now there are two calculations of the same trial balance, and the day one of them changes, the screen and the printout disagree.

## Decision

Each report is registered once in a catalog, and its entry points at the same `compute` function the report's JSON route already uses. The screen and the PDF don't compute anything; they take that result and render it, with a small hand-written function per report to shape it into a table. A shared PDF frame supplies the identity header, page numbers and a table header that repeats across pages, so every report looks like it came from the same company.

## Why

When there is only one calculation, "the numbers don't match" stops being a possible bug class. It also makes adding a format cheap: a new renderer reuses every report's existing, already-tested computation.

## Trade-off

The per-report shaping functions are hand-written rather than generated from a generic report definition. Report results differ too much — a trial balance is a flat table, GSTR-1 is two tables matching the GST portal's split, GSTR-3B is only totals — for one generic template to render them all well, so a little repetition was chosen over a configuration language nobody would want to maintain.
