---
kind: asme
slug: asme-vs-ibr
group: bridge
title: "ASME vs IBR 2026: how the two boiler codes fit together"
related:
  - /ibr/2026-changes
  - /ibr/small-industrial-boilers
  - /industries/boiler-pressure-vessel-manufacturing
question: "Does IBR accept ASME boilers and materials?"
answer: >
  In India a boiler is registered under the Indian Boiler Regulations, 2026, whatever code it was designed to.
  IBR 2026 does accept ASME in defined ways: ASME materials, ASME welding consumables and NDT certificates,
  ASME-designed parts where IBR has no provision, and inspection of export boilers to a foreign code with a
  Form I Part A certificate.
description: "ASME BPVC vs IBR 2026 side by side: who approves, inspects and stamps, the forms, and every place IBR 2026 accepts ASME, quoted from the Gazette."
domain: [asme, ibr, boilers, india]
published: 2026-11-01
updated: 2026-11-05
checked: 2026-11-01
sources:
  - title: Indian Boiler Regulations, 2026 (Gazette of India, Extraordinary, No. 596)
    publisher: Central Boilers Board, Department for Promotion of Industry and Internal Trade
    url: https://egazette.gov.in/WriteReadData/2026/276813.pdf
    date: 2026-10-01
  - title: "Boiler and Pressure Vessel Certificates of Authorization and the Certification Mark: Informational Handbook (BPV-GUI-03)"
    publisher: ASME
    url: https://www.asme.org/getmedia/cb8f63c5-3aa2-45ee-a2d1-b999d37733f7/bpv-gui-03-informational-handbook_1.pdf
    date: 2023-05-12
checks:
  - reg: IBR 2026, regulation 3(4)
    doc: ibr-2026
    quote: "Where no specific provision is made in these regulations for design or manufacture of any pressure part, the Inspecting Authority may permit the design, manufacture, stage inspections and certification of such pressure parts including the valves; mountings and fittings conforming to the Codes or Standards like British Standards (BS), European Standards (EN), American Society of Mechanical Engineers (ASME) Boiler and Pressure Vessel Code"
  - reg: IBR 2026, regulation 4
    doc: ibr-2026
    quote: "the inspecting authority may inspect any boiler meant for export during the various stages of its construction to comply with the requirements of any foreign code and may grant a certificate in Part-A of Form-I."
  - reg: IBR 2026, regulation 5(1)
    doc: ibr-2026
    quote: "design and construction of boiler or boiler component is in accordance with international code or standard including British Standards (BS), European Standards (EN), American Society of Mechanical Engineers (ASME) Boiler and Pressure Vessel Code"
  - reg: IBR 2026, regulation 30, notes to the material table
    doc: ibr-2026
    quote: "In addition to the above, materials conforming to IS or to any of the International codes BS, EN, ASME, DIN and JIS can also be used."
  - reg: IBR 2026, regulation 71(2)
    doc: ibr-2026
    quote: "Specifications for Filler Alloys (SFA) of American Society of Mechanical Engineers (ASME) Part IIC"
  - reg: IBR 2026, regulation 7
    doc: ibr-2026
    quote: "Level-III NDT Certificates from Indian Society for Non-destructive Testing(I.S.N.T.) or American Society for Non-destructive Testing( A.S.N.T.)"
  - reg: IBR 2026, regulation 3(5)
    doc: ibr-2026
    quote: "The tubes of boilers and heat exchangers made of titanium and other exotic metals may be approved as per international codes, including American Society of Mechanical Engineers (ASME)"
---

## Side by side

| | ASME BPVC | IBR 2026 |
|---|---|---|
| What it is | A private standard, given legal force by US states and Canadian provinces that adopt it | Statutory regulations under the Boilers Act, 2025, in force across India |
| Written by | ASME committees | The Central Boilers Board |
| Covers | Boilers, pressure vessels, nuclear, transport tanks | Boilers, steam pipes and their parts (pressure vessels are outside IBR) |
| Shop approval | ASME certificate, after a joint review ([U and S stamps](/asme/u-stamp)) | Recognition as a manufacturer by class, under IBR 2026 |
| Independent inspection | [Authorized Inspector](/asme/authorized-inspector) from an accredited agency | Inspecting Authority, Competent Person |
| Record of the item | [Manufacturer's Data Report](/asme/data-reports) (P-2, P-3, U-1) | Forms: Inspecting Authority's certificate (Form I), maker's certificate (Form IV), material certificates (Form V) |
| Welders | Section IX qualification ([WPQ](/asme/wps-pqr-wpq)) | IBR welder certificate |
| In service | NBIC and the jurisdiction | IBR registration, periodic inspection and certificate for use |

The biggest practical difference: in India IBR applies to **boilers and steam pipes**, while unfired pressure vessels are not regulated by IBR at all (vessels for compressed gases fall under PESO's Static and Mobile Pressure Vessels (Unfired) Rules instead); in the US, a pressure vessel is usually regulated by the state and built to [Section VIII](/asme/section-viii).

## Where IBR 2026 accepts ASME

Quoted from the Gazette below:

- **Parts IBR doesn't cover** may be designed, made, inspected and certified to the ASME Code (among others), with the Inspecting Authority's permission (regulation 3(4)).
- **Exotic tubes** (titanium and the like) may be approved to ASME and other international codes (regulation 3(5)).
- **Export boilers** may be inspected by an Indian Inspecting Authority to a foreign code and certified in Form I Part A (regulation 4). See [buying from India](/asme/buying-from-india) and [IBR Form I Part A](/ibr/forms#form-i-part-a).
- **Exemption** of a boiler or component built to an international code, ASME included, on conditions (regulation 5).
- **Materials** to ASME (and IS, BS, EN, DIN, JIS) may be used; IBR's own material table lists ASME SA and SB specifications by name (regulation 30); the [materials list](/asme/items) shows which common ones it names. See [Section II](/asme/section-ii).
- **Electrodes** are classified to ASME Section II Part C (SFA) or AWS specifications (regulation 71).
- **NDT personnel** with ASNT certificates are accepted alongside ISNT (regulation 7). See [Section V](/asme/section-v).

## What a shop working to both needs

An Indian boiler maker building to ASME for export and to IBR at home keeps two sets of approvals, two sets of welder qualifications and two report formats over the same welds and materials. The records underneath are the same: [heat numbers](/asme/mtr), welders, procedures, NDE, tests. That's the case for keeping them once and printing either set of forms; the IBR side is covered in the [IBR 2026 guide](/ibr) and [boiler registration documents](/ibr/registration-documents).
