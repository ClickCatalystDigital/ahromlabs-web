---
kind: asme
slug: heads
group: design
title: "Pressure vessel heads (UG-32): ellipsoidal vs torispherical"
metaTitle: "Pressure vessel heads (UG-32): 2:1, F&D and hemi"
related:
  - /asme/shell-thickness
  - /asme/joint-efficiency
  - /notes/plate-remnants-back-into-stock
  - /industries/boiler-pressure-vessel-manufacturing
  - /services/material-traceability
question: "What is a 2:1 ellipsoidal head?"
answer: >
  A 2:1 ellipsoidal head is half an ellipse in section, its depth a quarter of its diameter, and it needs about
  the same thickness as the shell it closes. Torispherical (flanged and dished) heads are shallower and cheaper to
  form but thicker; hemispherical heads are the deepest and need about half the shell thickness. ASME UG-32 gives a
  formula for each, and Mandatory Appendix 1-4 covers other proportions such as 80:10.
description: "ASME UG-32 heads compared: 2:1 ellipsoidal, F&D and 80:10 torispherical, hemispherical, with formulas, a worked 48 in example and how to order them."
domain: [asme, design]
published: 2026-11-01
updated: 2026-11-06
checked: 2026-11-06
sources:
  - title: "BPVC Section VIII Division 1 (2025)"
    publisher: ASME
    url: https://www.asme.org/codes-standards/find-codes-standards/bpvc-viii-1-bpvc-section-viii-rules-construction-pressure-vessels-division-1
    date: 2025-07-01
checks:
  - reg: ASME Section VIII Division 1 product page, description
    doc: asme-viii1
    quote: "ASME BPVC Section VIII Division 1 provides design, fabrication, inspection, testing & certification rules for pressure vessels operating over 15 psig, fired/unfired."
---

## What is a 2:1 ellipsoidal head?

A formed head that is half an ellipse in section, with a depth of a quarter of its inside diameter (a 2:1 ratio of
diameter to twice the depth). Under UG-32 of Section VIII Division 1 its required thickness for internal pressure is
t = PD / (2SE − 0.2P), about the same as the cylinder it closes, which is why it is the default head for most vessels.
The Code text is ASME's and paid; formulas are written out here to check against your 2025 book.

## What are the three common formed heads?

| Head | Shape | Thickness (UG-32), internal pressure | Relative thickness | Typical use |
|---|---|---|---|---|
| 2:1 ellipsoidal | Depth = D/4 | t = PD / (2SE − 0.2P) | About the shell's | The default for most vessels |
| Torispherical, standard "ASME F&D" (crown radius L about equal to the diameter, knuckle radius 6% of L) | Shallower: a spherical crown with a knuckle | t = 0.885PL / (SE − 0.1P) | Thicker than the shell | Low pressure, storage, where height matters |
| Hemispherical | Half a sphere | t = PL / (2SE − 0.2P) | About half the shell's | High pressure, large diameters |

D is the inside diameter, L the inside crown (or sphere) radius, and P, S and E are as in the
[shell thickness](/asme/shell-thickness) guide. Each formula has validity limits.

## What is an 80:10 torispherical head?

A torispherical head with a crown radius of 80% of the diameter and a knuckle radius of 10%: deeper and thinner than
a standard F&D. Its proportions aren't those of the 0.885 formula, so it is designed with Mandatory Appendix 1-4's
general torispherical formula, t = PLM / (2SE − 0.2P), where M = ¼ (3 + √(L/r)) and r is the knuckle radius. For
L/r = 8, M = 1.457.

## Can you show a worked example?

A 48 in inside diameter vessel at 150 psi, S = 20,000 psi, seamless heads with E = 1.0, before corrosion allowance:

| Head | Working | Thickness |
|---|---|---|
| 2:1 ellipsoidal | 150 × 48 / (40,000 − 30) = 7,200 / 39,970 | **0.180 in** |
| Standard F&D (L = 48 in) | 0.885 × 150 × 48 / (20,000 − 15) = 6,372 / 19,985 | **0.319 in** |
| 80:10 (L = 38.4 in, r = 4.8 in, M = 1.457) | 150 × 38.4 × 1.457 / 39,970 | **0.210 in** |
| Hemispherical (L = 24 in) | 150 × 24 / 39,970 | **0.090 in** |

Add the corrosion allowance to each (0.125 in gives 0.305, 0.444, 0.335 and 0.215 in), then order the head with a
minimum thickness after forming at least that.

## Which head is cheapest?

Usually the 2:1 ellipsoidal overall. A hemispherical head is the thinnest but the hardest to form and the deepest; a
standard F&D head is the cheapest to form but the thickest, so it wins at low pressure, where thickness is set by
minimums anyway. Torispherical heads also save height; hemispherical heads add the most volume.

## What thickness should I order a head at?

A minimum thickness after forming equal to or above the required thickness plus corrosion allowance. Forming thins
the plate, most at the knuckle, and the head maker adds their own thinning allowance to the starting plate. The
minimum thickness after forming goes on the [data report](/asme/data-reports).

## What joint efficiency does a seamless head use?

It depends on the radiography of the weld joining it to the shell: 1.0 with that joint spot radiographed to the rule
for this case, otherwise 0.85. See [joint efficiency and radiography](/asme/joint-efficiency).

## How are flat heads designed?

Under UG-34, with a factor for how the head or cover is attached. Flat heads, blind flanges and bolted covers are far
thicker than a formed head for the same pressure, which is why formed heads are used wherever they fit.

## Do heads need checking for vacuum?

Yes: external pressure is a separate check (UG-33), often governing for thin heads on vessels that see vacuum.

## When does UG-32 apply?

To heads of Section VIII Division 1 vessels, the Division ASME describes as covering "pressure vessels operating over
15 psig, fired/unfired". Boilers under Section I have their own head rules in Part PG.

## What does our software keep for heads?

Our US boiler demo records head material and thickness on the job's data report layout and files the head plate's MTR
by heat number in the ASME record package. How offcuts from head and shell plate go back into stock with their heat
number is in [plate remnants back into stock](/notes/plate-remnants-back-into-stock).
