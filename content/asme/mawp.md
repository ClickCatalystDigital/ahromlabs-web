---
kind: asme
slug: mawp
group: design
title: "MAWP, design pressure, operating pressure and MDMT"
question: "What is the difference between MAWP and design pressure?"
answer: >
  Design pressure is the pressure the vessel is designed for, set from the process with a margin. MAWP is the
  highest pressure the finished vessel can take at the top, at its design temperature, worked out from the
  thicknesses actually used; it is at least the design pressure. Operating pressure sits below both, and the
  relief valve is set at or below MAWP.
description: "MAWP vs design pressure vs operating pressure in ASME Section VIII, how they relate to the relief valve set pressure, and what MDMT means on a nameplate."
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

## Four pressures, in order

| Pressure | What it is | Who sets it |
|---|---|---|
| Operating pressure | What the process normally runs at | The process |
| Relief set pressure | Where the relief device opens; at or below MAWP | The designer, within Code limits |
| Design pressure | What the vessel is designed for, at the top, with the coincident temperature | The owner or designer (UG-21) |
| MAWP | The most the completed vessel can take at the top, at the design temperature, from its actual thicknesses | Calculated (UG-98) |

A common margin is design pressure about 10% above the maximum operating pressure, or 25 psi above it for low pressures, so normal swings don't lift the relief valve. That margin is practice, not a Code rule.

## Why MAWP can be higher than design pressure

Plates come in standard thicknesses. If the [shell thickness](/asme/shell-thickness) needed for the design pressure is 0.30 in and you use 0.375 in plate, the shell can take more. MAWP is worked out back from each part's thickness, less corrosion allowance, and the weakest part sets it. Many owners simply set MAWP equal to design pressure to keep the relief valve and nameplate simple; that's allowed.

MAWP is stated at the **top** of the vessel in its operating position. Parts lower down see the static head of the liquid too, and are designed for it.

## Hot and corroded, new and cold

The thickness used for MAWP is the **corroded** thickness at the **design temperature**. Some owners also ask for MAP (maximum allowable pressure, new and cold), which is higher. The [hydrostatic test](/asme/hydrostatic-test) is set from MAWP.

## MDMT

The **minimum design metal temperature** is the coldest metal temperature the vessel may see at its MAWP: a cold winter start-up, an autorefrigerating flash, a cold fluid. It decides whether materials need impact testing; see [MDMT and impact testing](/asme/impact-testing). Both MAWP at its temperature and MDMT go on the nameplate and the [data report](/asme/data-reports).

## Overpressure

While a relief device is discharging, pressure may rise above MAWP by a set amount: in Division 1, generally 10% or 3 psi for a single device, 16% with several, 21% for fire exposure. See [Section XIII](/asme/section-xiii).
