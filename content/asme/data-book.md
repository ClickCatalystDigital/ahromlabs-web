---
kind: asme
slug: data-book
group: quality
title: "Pressure vessel data book: what goes in the MDB"
related:
  - /asme/data-reports
  - /asme/national-board-registration
  - /systems/manufacturers-data-book
  - /services/document-extraction
  - /industries/boiler-pressure-vessel-manufacturing
question: "What goes in a pressure vessel manufacturer's data book?"
answer: >
  A manufacturer's data book (MDB, also data dossier, final documentation or turnover package) is the bound set of
  records shipped with a vessel or heat exchanger: the Manufacturer's Data Report, drawings and calculations, MTRs,
  weld map, WPS, PQR and welder qualifications, NDE, PWHT and hydro test records, NCRs and the signed ITP. The
  purchaser's specification sets what goes in and in what order; only the data report is a Code document.
description: "Pressure vessel and heat exchanger data book (MDB): typical contents and order, Code vs purchaser, preliminary vs final, and building it as the job runs."
domain: [asme, quality, records]
published: 2026-11-14
updated: 2026-11-14
checked: 2026-11-14
sources:
  - title: "2025 ASME Boiler and Pressure Vessel Code (Section VIII, Division 1, UG-120)"
    publisher: ASME
    url: https://www.asme.org/codes-standards/bpvc-standards/bpvc-2025
    date: 2025-07-01
  - title: "ASME Data Report Forms"
    publisher: ASME
    url: https://www.asme.org/codes-standards/publications-information/asme-data-report-forms
    date: 2026-11-05
  - title: "Data Report Registration"
    publisher: The National Board of Boiler and Pressure Vessel Inspectors
    url: https://www.nationalboard.org/Index.aspx?pageID=9
    date: 2026-11-05
checks:
  - reg: National Board, Data Report Registration page
    doc: nb-registration
    quote: "NBBI maintains permanent records of pressure-retaining items that are registered by individual manufacturers who meet a set of requirements."
  - reg: National Board, Data Report Registration page
    doc: nb-registration
    quote: "Registration with NBBI indicates that a pressure-retaining item is constructed in accordance with the ASME Boiler and Pressure Vessel Code (ASME Code) and is inspected by a qualified NBBI Commissioned Inspector."
---

## What is a manufacturer's data book?

A manufacturer's data book (MDB) is the complete set of quality records for one vessel, exchanger or boiler, bound in
a set order with an index and handed to the purchaser at shipment. Purchasers call it many things: data book,
manufacturer's record book (MRB), data dossier, final documentation, turnover package. It is where the owner, their
inspector and later a repair shop look first to find out what the item is and how it was proved.

## Does the ASME Code require a data book?

No. The Code requires the [Manufacturer's Data Report](/asme/data-reports) (U-1, U-1A, P-2 and the rest), certified
by the manufacturer and the [Authorized Inspector](/asme/authorized-inspector), a copy for the user, and either
keeping it for the period in UG-120 or registering it with the National Board, which "maintains permanent records of
pressure-retaining items that are registered". Everything else in a data book is there because the purchase order or
the purchaser's specification asks for it. That is why two customers' data books for the same vessel differ in
content and order.

## What goes in a data book?

A typical order for a Section VIII vessel or shell-and-tube exchanger. Use the purchaser's list when they give one:

| Section | Contents |
|---|---|
| Cover and index | Job, purchase order, tag numbers, revision; contents with page numbers |
| Data report | U-1 or U-1A (U-1 with U-5 for shell-and-tube exchangers), National Board registration where applicable |
| Nameplate | A photo or rubbing of the stamped nameplate |
| Drawings and calculations | As-built general arrangement and details; design calculations |
| Signed ITP | Every point with its sign-offs; see [inspection and test plans](/asme/inspection-and-test-plan) |
| Material | [MTRs](/asme/mtr) for every pressure part, with a material traceability list by part and heat number |
| Welding | Weld map; [WPS, PQR and welder qualifications](/asme/wps-pqr-wpq) for every weld; [continuity](/asme/welder-continuity) |
| NDE | RT, UT, PT, MT reports with the examiners' qualifications |
| Heat treatment | [PWHT](/asme/pwht) charts and procedure, where done |
| Pressure test | [Hydrostatic test](/asme/hydrostatic-test) report, chart, gauge calibration certificates |
| Other tests the order asks for | Hardness surveys, PMI, ferrite, impact tests, tube expansion or leak tests |
| Nonconformances | NCR log with each NCR and its disposition; see [NCRs](/asme/nonconformance-report) |
| Bought-out items | Certificates for flanges, fittings, bolting, gaskets, relief devices |
| Dimensional and final inspection | Final dimensional report, visual, coating and preservation |
| Release | Shipping release, packing list |

For a Section I boiler the data report is a P-2 or P-3, and the purchaser's list usually adds the safety valve
certificates and trim.

## Where does each record come from?

From every department, which is why data books are late. Material receipt has the MTRs; welding has the WPS, PQR and
welder records; the NDE contractor sends reports; the heat treater sends charts; QC holds the ITP, the hydro test and
the NCRs; engineering holds the calculations and drawings; purchasing has the bought-out certificates. A data book
assembled after shipment means chasing all of them for records made weeks earlier.

## What is a preliminary vs a final data book?

Many purchase orders ask for a preliminary data book for review before shipment and a final one after. The
preliminary is marked as such on every page and lists what is still to come; the purchaser comments; the final
incorporates the comments and the last records (nameplate, final inspection, release) and is issued as a numbered
revision. Once a revision is sent it should never change: a correction is the next revision, with the old one kept.

## What format should a data book be in?

One searchable PDF per item (or per purchase order line), with:

- a contents page whose page numbers match the PDF's page numbers;
- bookmarks for every section;
- continuous page numbering, including inside the appended MTRs and reports;
- a revision and status on the cover;
- scans that are legible at 100% zoom, with the heat numbers readable.

Some purchasers still ask for a paper copy too; the PDF is the record.

## How do you build a data book as the job runs?

By deciding the contents before work starts and attaching each record to its line as it is made:

1. Set up the purchaser's list as a template: sections, required lines, which are not applicable and why.
2. Link every record to the job when it is made: MTRs at receipt, welds with their WPS and welder, NDE reports to
   the weld, the hydro report to the test.
3. Show what is missing at any time, so gaps are chased while the people are still on the job.
4. Refuse to release while a required line is missing or an NCR is open.
5. On release, store the PDF and a fingerprint of it, so the revision sent can be proved unchanged later.

Our US boiler demo does this. Job AB-1001's data book fills 16 lines from the records already in the system, marks 8
not applicable with reasons and shows the nameplate missing, so Release is disabled and says why; once the nameplate
is uploaded, the preview has a cover, contents with page numbers, bookmarks and a PRELIMINARY stamp, and Release stores
revision 1 with its SHA-256 fingerprint. Templates are edited per customer. Try it at the
[live demo](https://boiler-erp-us.ahromlabs.com/demo) (sample data) or see
[ERP for boiler and pressure vessel shops](/industries/boiler-pressure-vessel-manufacturing). The data report in it is
our own layout carrying the form's fields; file the official ASME form or use the National Board's EDT.
