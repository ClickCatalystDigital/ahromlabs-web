---
kind: erp
slug: hsn-codes-electronic-components
title: "HSN codes for electronic components: capacitors to ICs"
related:
  - /erp/import-landed-cost
  - /erp/trading-distribution
  - /industries/electronics-component-trading
  - /systems/e-invoice
  - /services/compliance-accounting
answer: >
  Most electronic components sit in chapter 85 of the tariff: capacitors 8532, resistors 8533, printed circuits 8534,
  switches, relays, fuses and connectors 8536, diodes, transistors and LEDs 8541, integrated circuits 8542,
  transformers and inductors 8504, and insulated wire and cable 8544. Invoices show 4 digits up to ₹5 crore turnover
  and 6 digits above it; imports need the full 8-digit tariff item.
description: "HSN codes for electronic components in India: capacitors, resistors, PCBs, connectors, diodes, ICs and cables, and how many digits invoices need."
domain: [erp, trading, gst]
published: 2026-11-14
updated: 2026-11-14
checked: 2026-11-14
image:
  src: /erp/erp-hsn-codes.webp
  alt: "A tray of electronic components, a capacitor, resistor, connector, diode and chip, each with a blank tag: classifying components by HSN code."
  width: 1086
  height: 362
sources:
  - title: Customs Tariff of India, Chapter 85
    publisher: Central Board of Indirect Taxes and Customs (CBIC)
    url: https://www.cbic.gov.in/
    date: 2026-11-14
  - title: "Notification No. 78/2020-Central Tax (HSN digits on tax invoices)"
    publisher: CBIC, Ministry of Finance
    url: https://cbic-gst.gov.in/
    date: 2026-11-14
---

## What is an HSN code?

The Harmonized System of Nomenclature code classifies goods for customs and GST. The first six digits are
international; India's Customs Tariff adds two more for the eight-digit tariff item. The same code sets the customs
duty on import and is printed on GST invoices, so a trader's item master needs it on every item.

## Which HSN codes cover electronic components?

The four-digit headings in chapter 85 that a component trader uses most:

| Component | Heading |
|---|---|
| Transformers, inductors, chokes, power supplies and converters | 8504 |
| Capacitors (fixed, variable, ceramic, electrolytic, tantalum, film) | 8532 |
| Resistors, including potentiometers and thermistors (not heating resistors) | 8533 |
| Printed circuits (bare boards) | 8534 |
| Switches, relays, fuses, connectors, sockets and terminals, up to 1,000 V | 8536 |
| Diodes, transistors, thyristors, LEDs, photosensitive devices, crystals | 8541 |
| Electronic integrated circuits: processors, memories, amplifiers and other ICs | 8542 |
| Insulated wire, cable and connectors fitted to cable | 8544 |

Each heading splits further into six- and eight-digit lines: 8542 into processors and controllers, memories,
amplifiers and others; 8532 by dielectric. Assembled modules and finished products usually fall outside these
headings, under the heading for the product or as parts of the machine they belong to; classify them on their own.

## How many HSN digits must an invoice show?

It depends on aggregate turnover in the previous financial year, under Notification No. 78/2020-Central Tax: four
digits up to ₹5 crore, six digits above ₹5 crore. A bill of entry for imports uses the full eight-digit tariff item.
Using the eight-digit code in the item master covers every case.

## What GST rate applies to electronic components?

The rate follows the tariff item, and most components are taxed at 18%; some items carry other rates, and rates
change by notification. Take the rate from the current GST rate schedule for your tariff item, not from an old
invoice or a supplier's quotation.

## What happens if the HSN code is wrong?

On imports, a wrong tariff item can mean the wrong duty, a query from customs and penalties; on GST invoices, a
mismatch with your buyer's records and e-invoice rejections. Classification disputes are common between ICs, modules
and finished goods. When in doubt, ask your customs broker, or apply for an advance ruling.

## How do you classify a part that could fit two headings?

By the tariff's own rules: the heading that describes the item most specifically, then the section and chapter
notes, then the General Rules for the Interpretation of the tariff. Common cases for traders:

- **A module with an IC on a board** (a Bluetooth module, a sensor board) is usually not an IC under 8542; it is
  classified as the module or as a part of the machine it serves.
- **An LED** is a semiconductor device under 8541; an LED lamp or module is classified as the lamp or lighting
  product.
- **A connector fitted to a cable** is classified with the cable under 8544, not as a connector under 8536.
- **A bare PCB** is 8534; a populated board is classified by its function.

Record the reasoning on the item when a classification isn't obvious, so the next buyer or a customs query gets the
same answer.

## What does a clean item master look like?

| Field | Example |
|---|---|
| Item | MLCC 100 nF 50 V X7R 0603 |
| Manufacturer and part number | Maker, MPN |
| HSN (8-digit tariff item) | 8532 24 00 |
| GST rate and the date it was last checked | 18%, checked 14 Nov 2026 |
| Import duty basis | Tariff item, any exemption notification |
| Unit of measure | Each, reel of 4,000 |

Keep the date checked: rates and classifications change, and an item master with no dates can't tell you which
records are stale.

## How should an ERP keep HSN codes?

On the item, once, with the GST rate it implies and the date it was last checked; carried onto every purchase,
sale, e-invoice and bill of entry line automatically; and with a report of items missing a code. Our inventory
system for an electronics trading company keeps the HSN code and GST rate on each item, copies them onto every
invoice line, and refuses to invoice an item that has neither. See [software for electronics importers and traders](/industries/electronics-component-trading),
[e-invoicing](/systems/e-invoice) and the [landed cost of imports](/erp/import-landed-cost).
