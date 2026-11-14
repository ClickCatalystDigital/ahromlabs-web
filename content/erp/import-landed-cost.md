---
kind: erp
slug: import-landed-cost
title: "Landed cost of imported goods in India: BCD, SWS and IGST"
metaTitle: "Import landed cost in India: BCD, SWS, IGST worked out"
related:
  - /erp/trading-distribution
  - /industries/electronics-component-trading
  - /services/tally-integration
  - /services/document-extraction
  - /systems/three-way-match
answer: >
  Landed cost is what an imported item really costs in your store: the assessable value (CIF, converted at the CBIC
  exchange rate on the bill of entry), plus basic customs duty, the social welfare surcharge (10% of the duty for
  most goods), clearing and freight to your warehouse. IGST on imports is charged on value plus duties, but it is
  input tax credit for a registered business, so it stays out of the item's cost.
description: "Landed cost of imports in India: assessable value, basic customs duty, 10% social welfare surcharge, IGST credit, a worked example and Tally."
domain: [erp, trading, imports]
published: 2026-11-14
updated: 2026-11-14
checked: 2026-11-14
image:
  src: /erp/erp-import-landed-cost.webp
  alt: "A carton on a pallet with a customs document envelope and a calculator on top: the landed cost of an import."
  width: 1086
  height: 362
sources:
  - title: Customs Tariff of India
    publisher: Central Board of Indirect Taxes and Customs (CBIC)
    url: https://www.cbic.gov.in/
    date: 2026-11-14
  - title: ICEGATE, Indian Customs Electronic Gateway
    publisher: CBIC
    url: https://www.icegate.gov.in/
    date: 2026-11-14
---

## What is landed cost?

The full cost of an imported item once it is in your store, ready to sell: the supplier's price, freight and
insurance to India, customs duties, clearing charges and transport to your warehouse. It is the number your margin
should be worked out on, and the cost your stock should carry. A trader who prices on the supplier's invoice alone
underprices every import.

## How is customs duty worked out?

From the bill of entry, in three steps:

1. **Assessable value**: the transaction value including freight and insurance to the Indian port (CIF), converted
   to rupees at the exchange rate CBIC notifies for imports, which changes every two weeks. The rate on the bill of
   entry's date applies, not your bank's rate.
2. **Basic customs duty (BCD)**: the rate in the Customs Tariff for the item's tariff heading, less any exemption
   notification that applies. Many electronic components carry low or nil BCD; others don't. Look up the eight-digit
   tariff item, not the four-digit heading.
3. **Social welfare surcharge (SWS)**: 10% of the BCD for most goods (some are exempt).

Then **IGST** is charged on the assessable value plus BCD plus SWS, at the item's GST rate, with compensation cess
where it applies.

## Can you show a worked example?

An illustrative import of connectors (rates are examples, not the rates for any item: look up yours):

| Line | Amount (₹) |
|---|---|
| Invoice, USD 10,000 FOB, plus freight and insurance USD 400 | |
| Assessable value at an exchange rate of ₹85 per USD: 10,400 × 85 | 8,84,000 |
| BCD at 10% | 88,400 |
| SWS at 10% of BCD | 8,840 |
| Value for IGST: 8,84,000 + 88,400 + 8,840 | 9,81,240 |
| IGST at 18% | 1,76,623 |
| Total paid to customs | 2,73,863 |
| Clearing agent, port and transport to the warehouse | 22,000 |
| **Landed cost (IGST taken as credit)**: 8,84,000 + 88,400 + 8,840 + 22,000 | **10,03,240** |

On 5,000 connectors, that is ₹200.65 each, against ₹176.80 for the supplier's price with freight and insurance.

## Is IGST on imports part of the cost?

Not for a registered business that uses the goods in taxable supplies: IGST paid on imports is input tax credit,
shown against the bill of entry in GSTR-2B from ICEGATE data. BCD and SWS are not credited and are part of the cost.
If the credit is blocked or you are not registered, IGST becomes cost too.

## How are clearing and freight added to each item?

By apportioning them across the lines of the bill of entry, usually by value (or by weight or volume where that
fits better, such as bulky low-value items). Decide the rule once and apply it every time, so costs are comparable
across shipments.

## How is landed cost booked in Tally?

The purchase is booked at the assessable value; BCD, SWS, clearing and freight go to the item's cost through
additional cost of purchase (apportioned to the stock items) rather than to an expense ledger; IGST goes to the input
IGST ledger. Without that, stock is valued below its real cost and margins look better than they are. A system that
reads the bill of entry and the clearing agent's invoice, apportions the charges and posts the voucher to Tally
removes the hand work. See [connecting to TallyPrime](/services/tally-integration).

## What should an ERP for importers do?

- Read the supplier invoice, bill of entry and clearing invoice (AI extraction with a person checking each field).
- Apply the exchange rate and duties from the bill of entry, not a guess.
- Apportion charges to items by a fixed rule and keep the landed cost per receipt.
- Post to Tally with IGST as credit and duties in the stock value.
- Show margin per sale on landed cost.

For an electronics component importer, LS Technologies, we built the reading and posting: each line of the bill of
entry is extracted and posted to its own ledger, and clearing charges go to named ledgers by type. See
[software for electronics importers and traders](/industries/electronics-component-trading) and
[ERP for trading and distribution firms](/erp/trading-distribution).
