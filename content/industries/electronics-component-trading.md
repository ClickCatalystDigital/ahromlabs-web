---
kind: industry
slug: electronics-component-trading
title: Software for electronics-component importers and traders
audience: Electronics-component importers, traders and distributors
answer: >
  Ahrom Labs built LS Technologies' ERP and CRM with TallyPrime automation, AI
  extraction of purchase and import paperwork, and a reel-level inventory
  system for PCB components with QR labels, dispatch checked against the
  customer's purchase order, and stock across two stores. Approved invoices
  post into Tally within 30 seconds, and five document types — bills of entry
  included — are extracted at 88–95% zero-correction, each approved by a person.
description: >
  Reel-level stock, QR labels, PO-checked dispatch and TallyPrime posting of
  import bills for electronics-component traders — built for LS Technologies.
domain: [trading, accounting-integration, ai-extraction, inventory]
clients: [ls-technologies]
services: [tally-integration, document-extraction, custom-erp-crm]
notes:
  - tally-voucher-posting
  - ai-extraction-human-in-the-loop
  - outgrown-tally-signs
patterns:
  - local-agent-cloud-db
  - failures-flagged-not-lost
  - reconcile-against-source-of-truth
  - human-confirmed-extraction
  - replay-queued-payload-through-existing-handler
  - self-healing-sequence-counters
flow:
  - step: Documents arrive
    detail: Purchase orders, purchase and freight invoices, bills of entry and bank statements, as PDFs.
  - step: AI extraction
    detail: Each document type read by its own prompt, straight from the PDF; long bank statements in chunks.
  - step: Human review
    detail: Every extraction approved by a person; ledger names checked against a snapshot of Tally's own.
  - step: Posted to Tally
    detail: A local agent on the Tally PC posts approved vouchers within 30 seconds.
  - step: Synced back
    detail: Voucher status and outstanding bills every 15 minutes; ledgers, stock items and voucher types nightly.
  - step: Reconciled
    detail: What the app posted is checked against what Tally holds; a voucher deleted in Tally is flagged again.
  - step: Held, not lost
    detail: Tally offline means retry on the next cycle; a real rejection is held with its reason for a person.
  - step: Reels in, labelled
    detail: Reels received into boxes at the item's standard pack quantity, each with its own QR label.
  - step: Dispatch checked
    detail: Reels scanned into a shipment and compared with the customer's purchase order before it can go.
evidence:
  - metric: Approved invoice to Tally voucher
    value: within 30 seconds
  - metric: Document types extracted by AI
    value: "5, including bills of entry"
  - metric: Zero-correction rate
    value: 88–95% depending on document type
  - metric: Documents posted without a person's approval
    value: None
published: 2026-09-24
updated: 2026-09-24
---

## Why does an import-trading business end up typing the same invoice twice?

Because operations and accounts live in different places. Purchase orders, supplier invoices, freight bills and customs paperwork arrive as PDFs; the team reads them, works in spreadsheets or a web app, and then someone types the same figures into TallyPrime. [LS Technologies](/work#ls-technologies), an electronics-components import and export business, had exactly that shape. The system Ahrom Labs built reads the documents, keeps the operational record, and posts the accounting entry into Tally itself.

## Can a cloud app post directly into TallyPrime?

Not directly — TallyPrime's integration gateway only listens on the machine that runs Tally. A small agent on that PC bridges the two: it picks up approved invoices every 30 seconds and posts them as vouchers, syncs voucher status and outstanding bills back every 15 minutes, and refreshes ledgers, stock items and voucher types nightly. A ledger that doesn't exist yet in Tally is flagged for a person, never created by the software. See [Posting vouchers into TallyPrime from a cloud app](/notes/tally-voucher-posting); the protocol code is open-sourced as [tally-voucher-xml](https://github.com/ahromlabs/tally-voucher-xml).

## How accurate is AI extraction on import documents?

Measured on real usage, the share of documents needing no correction is 95% for purchase orders, 94% for purchase invoices, 91% for freight invoices, 89% for bank statements and 88% for bills of entry. Those are lower than the 95–99% many invoice-automation tools advertise — but a 2026 benchmark review found those claims are measured under vendor-chosen conditions, with no independent benchmark ([Parseur](https://parseur.com/blog/ai-invoice-processing-benchmarks)). These are per-document-type numbers from a live system, and every document still waits for a person's approval before anything reaches the books. See [AI extraction with a human in the loop](/notes/ai-extraction-human-in-the-loop).

## What happens when Tally rejects a voucher?

The failure is classified before anything else happens. If Tally is simply offline, the voucher stays queued and posts on the next 30-second cycle, with no restart. If Tally rejects it — a missing ledger, a duplicate — it's held with the exact reason attached until a person fixes it. After every sync, the system checks what Tally actually holds; a voucher deleted inside Tally is marked unconfirmed again.

## How are import duty, IGST and clearing charges booked?

Each line of a bill of entry — basic customs duty, IGST paid on import, freight and insurance — is extracted as its own line and posted to its own ledger, so IGST paid at customs never mixes with IGST on domestic purchases. Clearing and forwarding charges are routed to named ledgers by what they are — CFS, delivery order, handling, THS, IGM, agency, warehousing and more — and anything the rules don't recognise goes to a miscellaneous ledger rather than being guessed. A freight bill books to a single freight purchase ledger with its GST. The document type itself is decided from structure: a purchase order has no invoice number or e-invoice reference, an e-invoice has an IRN, a freight bill carries airway-bill and airport details. An extracted purchase order becomes a purchase-order record rather than an accounting entry.

## How is every reel labelled and found again?

Stock is modelled the way a component store holds it: items, reels, and boxes of reels. Receiving an item creates its reels at the item's standard pack quantity and spreads them across boxes, each reel and box with its own number and a printed QR label — reel labels carry the item, quantity and batch; box labels list the reels inside. Reel and box numbers re-derive their counter from the data before each allocation, so a manual edit can never cause two reels to share a number.

Finding a reel later is one search box across reel number, item, box, customer and invoice, with each reel's full dispatch history, and the result exports to CSV exactly as filtered on screen.

## Can a shipment be checked against the customer's purchase order before it leaves?

Yes — that is how dispatch works. Reels are scanned into a shipment with a phone camera or a scanner; scanning a box adds only the reels in it that can actually ship and lists the rest with the reason, and scanning a reel twice is refused with an error sound. A reel ships whole or in part: a partial dispatch reduces the reel's quantity and leaves it in stock.

When the customer's purchase order is picked, the shipment is compared with it line by line — an item missing, short, over, or not on the order at all — and it can't be submitted until the two agree. The packing list is generated from the same shipment, grouped by item with each item's standard pack quantity, and can be reprinted later by customer and invoice.

## How is stock kept straight across two stores?

Every reel belongs to a store, and stock moves between stores by transfer — a single reel, or a whole box. A whole-box transfer moves every reel in it or none of them. A reel can also move on its own, so reels from one box can legitimately sit in two stores; each reel's move is logged separately, so undoing a transfer reverts exactly that reel and nothing else. Two people moving the same reel at the same moment can't both succeed — verified by forcing exactly that race.

Staff at the second store are locked to it on the server, and each day their manager signs off the previous day's dispatch summary before anyone there can record new movements. A dispatch always records the store the reel is actually in, never the store picked on screen — a rule added after a mislabelled dispatch showed that the two could disagree.

## Who approves stock movements?

Staff record receipts, dispatches and transfers; managers' actions go through immediately, and staff actions wait for approval. A manager can approve, reject with a reason, or correct and approve in one step. The queued request is replayed through exactly the same code path as an immediate one, so an approved action can't behave differently from a direct one.

## What can the owner see?

- **Stock summary** per item, as of today or any past date, per store or across both.
- **Analytics** — monthly receipts and dispatches, ageing of stock in hand and of dispatched reels, item velocity, top customers and an inventory timeline.
- **Dead and low stock** — an item only appears for a store when it has live stock there, so an empty store doesn't flag the whole catalogue as low.
- **Daily report**, on screen and as a PDF — the day's receipts and dispatches by item, transfers, dead and low stock, and pending approvals.

A customer can be given a read-only stock view. That account is limited at the server to the stock summary: every other endpoint in the system — about 60 — was tested against it and refused.

## What should a component trader ask before choosing inventory software?

1. **Does it track reels, or only item totals?** Partial reels, boxes and labels are where component stock actually goes wrong.
2. **Is dispatch checked against the customer's purchase order** before the shipment leaves, not after the complaint?
3. **What happens to import paperwork?** Bills of entry, freight and clearing bills should reach the books without being typed twice — and with duty and import IGST on the right ledgers.
4. **How does it work with Tally?** Replace it, sync with it, or post into it — and what happens when Tally rejects an entry.
5. **Who can see and change what?** Staff, managers, a second store, a customer — each enforced by the server, not just hidden on screen.

## Boundary

The Tally link depends on the office PC running Tally being switched on; if it's off, nothing posts until it's back, and the queue resumes on its own. This is not a cloud-to-cloud integration, because Tally doesn't offer one.

The inventory identifies an item by its code and description; manufacturer part numbers, alternates and date codes aren't separate fields, and a batch is a free-text label printed on the reel. Moisture-sensitivity (MSL) floor life isn't tracked, and stock is located by store, not by bin. Customs duty and freight are booked to their own ledgers rather than spread into each item's landed cost.
