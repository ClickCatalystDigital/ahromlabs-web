---
kind: asme
slug: joint-efficiency
group: design
title: "Joint efficiency and radiography (UW-11, UW-12)"
related:
  - /asme/shell-thickness
  - /asme/section-v
  - /asme/heads
  - /services/material-traceability
  - /industries/boiler-pressure-vessel-manufacturing
question: "What is joint efficiency in ASME Section VIII?"
answer: >
  Joint efficiency (E) is the factor ASME Section VIII Division 1 applies to a welded joint in the thickness
  formulas. It depends on the joint type and how much it is radiographed: a double-welded butt joint is 1.0 with
  full radiography, 0.85 with spot radiography and 0.70 with none (Table UW-12). Less radiography means a thicker
  shell.
description: "ASME UW-12 joint efficiency by joint type and radiography, joint categories A to D, when full RT is mandatory (UW-11), seamless parts, and the cost trade-off."
domain: [asme, design, nde]
published: 2026-11-01
updated: 2026-11-06
checked: 2026-11-06
sources:
  - title: "BPVC Section VIII Division 1 (2025)"
    publisher: ASME
    url: https://www.asme.org/codes-standards/find-codes-standards/bpvc-viii-1-bpvc-section-viii-rules-construction-pressure-vessels-division-1
    date: 2025-07-01
  - title: "BPVC Section V: Nondestructive Examination (2025)"
    publisher: ASME
    url: https://www.asme.org/codes-standards/find-codes-standards/bpvc-v-bpvc-section-v-nondestructive-examination
    date: 2025-07-01
checks:
  - reg: ASME Section VIII Division 1 product page, description
    doc: asme-viii1
    quote: "ASME BPVC Section VIII Division 1 provides design, fabrication, inspection, testing & certification rules for pressure vessels operating over 15 psig, fired/unfired."
---

## What is joint efficiency in ASME Section VIII?

Joint efficiency (E) is the factor Division 1 applies to a welded joint in the thickness formulas, set by the joint
type and how much of it is radiographed (Table UW-12, 2025 Edition). It goes straight into the
[shell thickness](/asme/shell-thickness) and [head](/asme/heads) formulas, so a lower E means a thicker wall. The
Code text is ASME's and paid; this guide cites paragraphs.

## What are the joint efficiency values?

For the common butt joints, from Table UW-12:

| Joint type | Description | Full radiography | Spot radiography | None |
|---|---|---|---|---|
| 1 | Double-welded butt joint, or equivalent full penetration | 1.00 | 0.85 | 0.70 |
| 2 | Single-welded butt joint with a backing strip left in | 0.90 | 0.80 | 0.65 |
| 3 | Single-welded butt joint without backing | – | – | 0.60 |

Lap and fillet joints (Types 4 to 6 and others) have lower values again and are limited in where they may be used.

## What is the difference between joint type and joint category?

Type is what the joint is (its form, Types 1 to 8); category is where it sits (A to D), because location decides how
much stress it carries:

- **Category A**: longitudinal welds in shells and nozzles, and the weld joining a hemispherical head to the shell. They carry the hoop stress, the higher one.
- **Category B**: circumferential welds between shell courses and between the shell and most formed heads.
- **Category C**: welds attaching flanges, tubesheets and flat heads.
- **Category D**: welds attaching nozzles and communicating chambers.

Both go on the [data report](/asme/data-reports).

## When is full radiography mandatory?

UW-11(a) makes full radiography of butt welds mandatory in several cases, among them:

- vessels in **lethal service**;
- butt welds thicker than the limit for the material (for P-No. 1 carbon steel, 1¼ in, 32 mm);
- **unfired steam boilers** with a design pressure above 50 psi (3.4 bar);
- wherever the designer has taken the full-radiography efficiency (E = 1.0 for a Type 1 joint).

Otherwise the choice is the designer's, and it is commercial: full radiography costs more in examination and saves
steel.

## How much thicker does a shell get with less radiography?

Take a 48 in inside diameter shell at 150 psi, S = 20,000 psi, corrosion allowance 0.125 in, Type 1 longitudinal
joints:

| Radiography | E | Hoop thickness | With corrosion | Plate |
|---|---|---|---|---|
| Full | 1.00 | 3,618.75 / 19,910 = 0.182 in | 0.307 in | 5/16 in or ⅜ in |
| Spot | 0.85 | 3,618.75 / 16,910 = 0.214 in | 0.339 in | ⅜ in |
| None | 0.70 | 3,618.75 / 13,910 = 0.260 in | 0.385 in | 7/16 in |

The [shell calculator](/asme/shell-thickness) takes a separate E for the circumferential joints, which govern the
longitudinal-stress check.

## What joint efficiency does a seamless shell or head get?

A seamless part has no longitudinal joint, but its E still depends on the circumferential welds joining it: with
those spot radiographed to the rule for this case (UW-11(a)(5)(b)), a seamless part uses E = 1.0; without, 0.85
(UW-12(d)).

## Does full radiography of the long seams need anything else?

Yes: to take E = 1.0 on Category A joints, the Category B and C butt joints that intersect them must at least be spot
radiographed (UW-11(a)(5)(b)). That is why designers often specify "full RT of Category A, spot of Category B".

## Who sets the radiography method and acceptance?

The method comes from [Section V](/asme/section-v), which ASME describes as its NDE standards; acceptance comes from
Division 1: UW-51 for full radiography and UW-52 for spot. Division 1 also allows ultrasonic examination in place of
radiography in defined cases; check your 2025 book for the conditions.

## When does joint efficiency apply at all?

To Section VIII Division 1 vessels, which ASME describes as covering "pressure vessels operating over 15 psig,
fired/unfired". Section I boilers have their own weld rules in Part PW.

## What does our software keep for joint efficiency?

Our US boiler demo's weld map records each seam's category (A, B or D), joint type, WPS, welder stamps, NDE method
(RT spot or full, UT, MT) and report, and prints it in the job's ASME record package, so the E on the calculation and
the radiography actually done can be compared. See
[ERP for boiler and pressure vessel shops](/industries/boiler-pressure-vessel-manufacturing).
