---
kind: note
slug: plate-remnants-back-into-stock
title: Putting steel plate offcuts back into stock, by weight derived from geometry
answer: >
  At Shanti Boilers, every cut of a plate or section records what was used and
  what usable remnant was kept; the system derives every weight from dimensions
  and density, returns the remnant to stock for a later project, and books the
  rest as scrap. A 157.00 kg plate became 127.17 kg used, 15.70 kg remnant and
  14.13 kg scrap — conserved exactly.
domain: [manufacturing, inventory, cost-accounting]
patterns: [derive-balances-dont-store-them]
evidence:
  - metric: live cut test
    value: 157.00 kg source → 127.17 kg used + 15.70 kg remnant + 14.13 kg scrap
  - metric: weights typed by the operator
    value: none — plate L×W×T×density, sections length×kg/m
  - metric: piece traceability
    value: every cut output chained to its source piece (used, remnant, scrap)
  - metric: cost of a used piece
    value: by weight fraction — 100 kg used of a 157 kg, ₹1,000 plate → ₹636.94
published: 2026-09-24
updated: 2026-09-24
---

A boiler maker buys steel plate in standard sizes and cuts it to the parts a design needs. The leftover is often big enough to use on the next job — if anyone knows it exists. At Shanti Boilers & Pressure Vessels, it used to be re-bought or scrapped blindly. This is how the operations system Ahrom Labs built now keeps it.

## Why couldn't the old stock record hold an offcut?

Inventory was a single number per item — how many plates of a grade and size were on hand. An offcut isn't one of those plates; it's a specific piece with its own dimensions. With nowhere to record a piece, a remnant sitting in the stores could never be matched to a future bill of materials, even when it was exactly the right size.

## What gets recorded at the moment of cutting?

Each physical piece carries its own dimensions: length, width and thickness for a plate; length and weight-per-metre for an angle, channel, beam, pipe or bar. At the cut, the operator enters only what was used and what usable remnant they kept. The source piece is closed, each used piece is linked to the project it went into, each remnant goes back into stock as an available piece, and whatever weight is left over is booked as scrap automatically. Every output is chained to the piece it came from, so a part on a finished boiler traces back to the plate it was cut from.

## Why derive weight instead of weighing or typing it?

Weight is computed from geometry and density — never typed. That makes the arithmetic self-checking: used plus remnant plus scrap must equal the source. In the live test, a 2000 × 1000 × 10 mm plate (157.00 kg) was cut into a 127.17 kg part and a 15.70 kg remnant, leaving 14.13 kg of scrap — summing exactly back to the source. A typed weight can't be held to that standard; a derived one can't fail it.

## How does a remnant get reused?

Because a remnant is stored as a real piece with real dimensions, it's matched against bill-of-materials lines still waiting for material, exactly like a newly purchased plate. When a BOM is released, a fitting piece is reserved automatically — the least-waste piece first, a thickness mismatch rejected, rotation allowed so an offcut that fits sideways still counts — and only the shortfall goes to Procurement to buy. In the live test, a line needing two pieces with one matching remnant in stock reserved that remnant and sent only the second piece to purchasing.

## What does a cut piece cost?

Cost follows weight. A used piece carries the fraction of its source's cost that its weight represents: 100 kg used from a 157 kg plate that cost ₹1,000 is booked at ₹636.94. Building this surfaced a real, pre-existing error in how average cost was being recalculated for piece-tracked stock — fixed at the root rather than patched in the report.

## Boundary

Piece tracking is switched on per item and applies to plate and section stock that's actually cut. Matching looks for one sufficient piece per requirement; nesting — planning the most economical 2D layout of several parts on one plate before cutting — is not part of this system.
