---
kind: asme
slug: joint-efficiency
group: design
title: "Joint efficiency and radiography: full vs spot (UW-11, UW-12)"
question: "What is joint efficiency in ASME Section VIII?"
answer: >
  Joint efficiency (E) is the factor ASME Section VIII Division 1 applies to a welded joint in the thickness
  formulas. It depends on the joint type and how much it is radiographed: a double-welded butt joint is 1.0 with
  full radiography, 0.85 with spot radiography and 0.70 with none (UW-12). Less radiography means a thicker
  shell.
description: "ASME UW-12 joint efficiency values by joint type and radiography, joint categories A to D, when full radiography is mandatory (UW-11), and the cost trade-off."
domain: [asme, design, nde]
published: 2026-11-01
updated: 2026-11-01
checked: 2026-11-01
sources:
  - title: "2025 ASME Boiler and Pressure Vessel Code (Section VIII, Division 1)"
    publisher: ASME
    url: https://www.asme.org/codes-standards/bpvc-standards/bpvc-2025
    date: 2025-07-01
---

## Joint efficiency by type and examination

Section VIII Division 1, Table UW-12, for the common butt joints:

| Joint type | Description | Full radiography | Spot radiography | None |
|---|---|---|---|---|
| 1 | Double-welded butt joint, or equivalent full penetration | 1.00 | 0.85 | 0.70 |
| 2 | Single-welded butt joint with a backing strip left in | 0.90 | 0.80 | 0.65 |
| 3 | Single-welded butt joint without backing | – | – | 0.60 |

Lap and fillet joints have lower values again and are limited in where they may be used.

## Joint categories

Division 1 names joints by **location**, because location decides how much stress they carry:

- **Category A**: longitudinal welds in shells and nozzles, and the welds joining a hemispherical head to the shell. They carry the higher (hoop) stress.
- **Category B**: circumferential welds between shell courses and between shell and most formed heads.
- **Category C**: welds attaching flanges, tubesheets and flat heads.
- **Category D**: welds attaching nozzles and communicating chambers.

Type is what the joint is; category is where it is. Both go on the [data report](/asme/data-reports).

## When full radiography is required

UW-11 makes full radiography of butt welds mandatory in several cases, among them:

- vessels in **lethal service**;
- butt welds thicker than a limit set by the material (for carbon steel, 1¼ in);
- **unfired steam boilers** above 50 psi;
- where the designer has used E = 1.0.

Otherwise the designer chooses, and the choice is commercial: full radiography costs more in examination and saves steel by allowing E = 1.0.

## Seamless parts

A seamless shell or head has no longitudinal joint, but its efficiency still depends on the circumferential welds joining it: with those spot radiographed to the rule for this case, a seamless part uses E = 1.0; without, 0.85.

## Where it is used

E goes straight into the [shell thickness](/asme/shell-thickness) and [head](/asme/heads) formulas. The method and acceptance standards for the radiographs come from [Section V](/asme/section-v) and UW-51 (full) or UW-52 (spot).
