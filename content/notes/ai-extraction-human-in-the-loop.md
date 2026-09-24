---
kind: note
slug: ai-extraction-human-in-the-loop
title: AI extraction with a human in the loop, five document types
answer: >
  Five document types — purchase invoices, freight invoices, bills of entry,
  purchase orders, bank statements — get extracted by an LLM reading the PDF
  directly, no separate OCR step. Zero-correction rates run 88-95% depending
  on type, purchase orders highest, bills of entry lowest. Every extraction
  still goes through a human review before anything is approved or posted.
domain: [ai-extraction, accounting-integration, trading]
systems: [ls-crm]
patterns: [human-confirmed-extraction]
evidence:
  - metric: purchase invoice zero-correction rate
    value: 94%
  - metric: freight invoice zero-correction rate
    value: 91%
  - metric: bill of entry zero-correction rate
    value: 88%
  - metric: purchase order zero-correction rate
    value: 95%
  - metric: bank statement zero-correction rate
    value: 89%
published: 2026-08-29
updated: 2026-09-24
---

## What gets extracted

LS Technologies, an electronics-components import/export trading business, runs five kinds of documents through AI extraction before anything reaches Tally: purchase invoices, freight invoices, bills of entry, purchase orders, and bank statements. Each has its own prompt tailored to that document's fields — a purchase invoice and a customs bill of entry don't share a structure, and treating them as one generic "document" would lose accuracy on both.

## How it reads a PDF

There's no separate OCR step. The PDF is sent straight to the model — an LLM with a file-parsing capability reads it directly, rather than running text extraction first and handing the model plain text. Bank statements get special handling: because they can run to many pages, the document is processed in chunks and the results are stitched back together and de-duplicated, rather than trying to reason over one long document in a single pass.

## How accurate it actually is

Reviewed against real usage, here's the share of each document type that needs zero correction before it's approved:

- Purchase order: 95%
- Purchase invoice: 94%
- Bank statement: 89%
- Freight invoice: 91%
- Bill of entry: 88%

Bills of entry come in lowest — customs documentation is the least standardized of the five, which tracks with what you'd expect from the least uniform paperwork. Every number here still means a meaningful share of documents need a correction, which is exactly why extraction alone was never the plan.

## How do these numbers compare with advertised accuracy?

Invoice-automation tools commonly advertise 95–99% accuracy. A 2026 benchmark review found those claims have converged in that range while being measured under conditions each vendor chooses, with no independent benchmark behind them ([Parseur](https://parseur.com/blog/ai-invoice-processing-benchmarks)). The figures above are lower, and deliberately so: they're per document type, from real usage, and they count any document a person had to correct — including customs paperwork such as bills of entry. A lower number measured honestly is more useful for planning than a higher one measured on a vendor's own samples.

## What happens to the rest

Nothing gets extracted and posted in one step. Every document — regardless of how confident the extraction looked — sits in a review state until a person checks it and approves it. That's not a hedge against a bad model; it's the same decision this practice makes anywhere a model's output could turn into a financial record: draft with AI, confirm with a person, post only after that.
