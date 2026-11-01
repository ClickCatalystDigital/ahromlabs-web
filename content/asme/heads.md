---
kind: asme
slug: heads
group: design
title: "Pressure vessel heads (UG-32): ellipsoidal vs torispherical"
question: "What is a 2:1 ellipsoidal head?"
answer: >
  A 2:1 ellipsoidal head is half an ellipse in section, its depth a quarter of its diameter, and it needs about
  the same thickness as the shell it closes. Torispherical (flanged and dished) heads are shallower and cheaper
  but thicker; hemispherical heads are the deepest and need about half the shell thickness. ASME UG-32 gives a
  formula for each.
description: "ASME UG-32 formed heads compared: 2:1 ellipsoidal, torispherical (F&D, ASME 80-10) and hemispherical, with their thickness formulas and when to use each."
domain: [asme, design]
published: 2026-11-01
updated: 2026-11-01
checked: 2026-11-01
sources:
  - title: "2025 ASME Boiler and Pressure Vessel Code (Section VIII, Division 1)"
    publisher: ASME
    url: https://www.asme.org/codes-standards/bpvc-standards/bpvc-2025
    date: 2025-07-01
---

## The three common formed heads

| Head | Shape | Thickness (UG-32), internal pressure | Relative thickness | Typical use |
|---|---|---|---|---|
| 2:1 ellipsoidal | Depth = D/4 | t = PD / (2SE − 0.2P) | About the shell's | The default for most vessels |
| Torispherical (standard "ASME F&D": crown radius about equal to the diameter, knuckle radius 6% of the crown radius) | Shallower, a spherical crown with a knuckle | t = 0.885PL / (SE − 0.1P) | Thicker than the shell | Low pressure, storage, where height matters |
| Hemispherical | Half a sphere | t = PL / (2SE − 0.2P) | About half the shell's | High pressure, large diameters |

D is the inside diameter, L the inside crown (or sphere) radius, and P, S and E are as in the [shell thickness](/asme/shell-thickness) guide. Each formula has validity limits, and other proportions (other ellipses, other crown and knuckle radii) use the general rules in Mandatory Appendix 1-4.

## Choosing

- **Cost**: a hemispherical head is the thinnest but the hardest to form and the deepest; torispherical heads are the cheapest to form but the thickest. The 2:1 ellipsoidal sits between and is the usual answer.
- **Height and volume**: torispherical heads save height; hemispherical heads add the most volume.
- **Joint efficiency**: a seamless head's E depends on the radiography of the weld that joins it to the shell; see [joint efficiency and radiography](/asme/joint-efficiency).

## Heads are formed thin

Forming thins the plate, most at the knuckle. Order the head with a **minimum thickness after forming** equal to or above the required thickness plus corrosion; the head maker adds their own thinning allowance. The minimum thickness after forming goes on the [data report](/asme/data-reports).

## Flat heads and covers

Flat heads, blind flanges and bolted covers are designed under UG-34 instead, with a factor for how the head is attached. They are far thicker than a formed head for the same pressure, which is why formed heads are used wherever they fit.

The finished vessel is proved by the [hydrostatic test](/asme/hydrostatic-test), at a pressure set from its [MAWP](/asme/mawp).
