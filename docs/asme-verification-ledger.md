# ASME verification ledger

Every item in `docs/batch-plans/asme-code-check.md`, checked on 7 Nov 2026 against free official sources only: ASME's
published Code interpretations (the Interpretations Database at cstools.asme.org, free to read), ASME's own product and
certification pages, and the National Board's own pages. No Code copies from third parties were used, and no other
website repeating a value was counted as evidence.

**What an interpretation proves.** An interpretation is ASME's official reply to a question about one edition. Where
its reply only makes sense if the guide's value is right (for example, a reply that a coupon of 0.25 in and one of
0.75 in together qualify 0.125 to 1.5 in, which is T/2 to 2T), it supports the value for that edition. It does not
prove the 2025 wording, so no item below is VERIFIED_OFFICIAL on an interpretation alone. Interpretation links are
`https://cstools.asme.org/Interpretation/InterpretationDetail.cfm?TrackingNumber=<n>` (written `IDB <n>` below); the
text loads in a browser.

**Statuses.** VERIFIED_OFFICIAL: an official free text states the value for the current edition. CORRECTED: the page
was changed on official evidence. PARTIALLY_VERIFIED: official evidence supports part of the claim or an earlier
edition. LICENSED_SOURCE_REVIEW_REQUIRED: only the paid 2025 Code can settle it. UNRESOLVED: evidence found but
unclear or conflicting.

Every row keeps "Reviewer required: Yes" for calculations and safety-critical values: the pages carry the "not yet
reviewed by an Authorized Inspector" notice, and nothing here replaces a competent person with the 2025 books.

| Guide | Standard | Edition | Paragraph | Claim | Evidence URL | Status | Change made | Reviewer required |
|---|---|---|---|---|---|---|---|---|
| welder-qualification | BPVC IX | 2025 | QW-461.9 | 6G pipe test qualifies groove welds in all positions, plate and pipe | IDB 25508 (IX-25-11, 2023 ed.: a welder tested on pipe in 6G, or 2G and 5G, is qualified for any special position; "All" includes SP) | PARTIALLY_VERIFIED | None | Yes |
| welder-qualification | BPVC IX | 2025 | QW-461.9 | Plate tests qualify pipe only over 24 in (610 mm) OD, in the positions tested | IDB 16845 (IX-18-32, 2017 ed.: a welder qualified on plate in 2G, 3G and 4G may not weld a 2 in set-in nozzle on a 24 in shell). Consistent; the 24 in limit itself not stated | PARTIALLY_VERIFIED | None | Yes |
| welder-qualification | BPVC IX | 2025 | QW-452.3 | Coupon OD 1 in to < 2⅞ in qualifies 1 in and up | IDB 23542 (IX-24-16, 2023 ed.), IDB 19725 (IX-20-28, 2019 ed.: an NPS 2 coupon qualifies 1 in OD minimum) | PARTIALLY_VERIFIED | None | Yes |
| welder-qualification | BPVC IX | 2025 | QW-452.3 | Coupon OD < 1 in qualifies its size and up; ≥ 2⅞ in qualifies 2⅞ in and up | No interpretation found that states either band | LICENSED_SOURCE_REVIEW_REQUIRED | None | Yes |
| welder-qualification, section-v | BPVC IX | 2025 | QW-304 | RT/UT allowed instead of bends for most processes, "not GMAW short-circuit" | IDB 14777 (IX-16-28, 2015 ed.: a GMAW-S performance test weld may be accepted by ultrasonic examination under QW-304, QW-305 and QW-191.2); IDB 16574 (IX-18-19); IDB 14841 (IX-16-42: FCAW counts as GMAW in QW-304, volumetric allowed unless short circuit); IDB 4858 (IX-04-13: a lapsed GMAW-S qualification can't be renewed by radiographing a production weld) | CORRECTED | Both pages now say GMAW-S can't be qualified by radiography but may be by UT (IX-16-28), and renewal by radiography isn't allowed (IX-04-13); sources added | Yes: confirm the 2025 QW-304 wording on RT vs UT for GMAW-S |
| welder-continuity | BPVC IX | 2025 | QW-322.1(a) | Qualification lapses after 6 months without welding with the process | IDB 15582 (IX-17-18, 2015 ed.: qualified 1 Jan, last welded 1 Mar, not qualified on 2 Sep), IDB 21736 (IX-23-13, 2021 ed.: "6 month period of effectiveness"), IDB 805 (IX-15-13), IDB 4939 (IX-13-15: non-Code welds keep continuity; extension can repeat), IDB 20233 (IX-20-26: Code Case 2996 added 3 months during COVID) | PARTIALLY_VERIFIED | None | Yes |
| welder-continuity | BPVC IX | 2025 | QW-322.1(b) | Revocation when there is a specific reason to question the welder's ability | No interpretation found stating the trigger | LICENSED_SOURCE_REVIEW_REQUIRED | None | Yes |
| welder-continuity | BPVC IX | 2025 | QW-322.2 | Renewal with one test coupon of any thickness, position and diameter | IDB 20233 (IX-20-26: renewal under QW-322.2(a) reinstates the qualifications); coupon freedom not stated | PARTIALLY_VERIFIED | None | Yes |
| wps-pqr-wpq, essential-variables | BPVC IX | 2025 | QW-451.1 | Groove PQR qualifies base metal up to 2T, and up to 8 in for coupons 1½ in and over | IDB 15814 (IX-17-37, 2015 ed.: a ⅜ in coupon qualifies 1/16 to ¾ in; a 1½ in coupon qualifies 3/16 to 8 in), IDB 21743 (IX-23-14, 2021 ed.: 0.25 in and 0.75 in coupons together qualify 0.125 to 1.5 in) | PARTIALLY_VERIFIED | None | Yes |
| wps-pqr-wpq | BPVC IX | 2025 | QW-451.1 | Groove PQR tests: tension plus guided bends | IDB 16866 (IX-18-06: bend tests on dissimilar-thickness groove PQRs) shows bends are part of the PQR; full test list not stated | PARTIALLY_VERIFIED | None | Yes |
| essential-variables | BPVC IX | 2025 | QW-409.1 | Heat input is a supplementary essential variable (when toughness is required) | IDB 19080 (IX-19-23, 2017 ed.: an increase in heat input requires requalification; good impact results don't allow a higher maximum), IDB 18477 (IX-19-16), IDB 14503 (IX-16-20) | PARTIALLY_VERIFIED | None | Yes |
| essential-variables | BPVC IX | 2025 | QW-403.5 | Group number is a supplementary essential variable | IDB 21414 (IX-24-01, 2019 ed.: with impact testing, a PQR joining two P-No./Group combinations doesn't qualify each to itself), IDB 21706 (IX-23-11) | PARTIALLY_VERIFIED | None | Yes |
| essential-variables | BPVC IX | 2025 | QW-406.1, QW-407.1 | Preheat drop over 100 °F is essential; PWHT is essential | Only 1978–1985 interpretations on QW-406.1 listed; none states the 100 °F figure. QW-407.1 not found | LICENSED_SOURCE_REVIEW_REQUIRED | None | Yes |
| p-numbers | BPVC IX | 2025 | QW/QB-422, QW-432, QW-433 | SA-516 Gr 70 is P-No. 1 Group 2; E7018 F-4, E6010 F-3, E7024 F-1, E6013 F-2, ER70S-6 F-6; F-4 covers F-1 to F-3 | The tables are in the paid Code. IDB 22697 (IX-23-37) and IDB 4913 (IX-10-23) concern F-numbers but don't list these assignments | LICENSED_SOURCE_REVIEW_REQUIRED | None | Yes |
| section-viii | BPVC VIII-1 | 2025 | U-1(c)(2) | Excludes vessels at 15 psi or less | ASME's own Section VIII Division 1 product page (saved 6 Nov 2026, in the `asme-viii1` quote source): the Division covers vessels operating above 15 psig. IDB 19458 (VIII-1-20-03: the U-1(c)(2)(-h) pressure is the design pressure) | VERIFIED_OFFICIAL | None | Yes, for edge cases (−h, −i wording) |
| section-viii | BPVC VIII-1 | 2025 | U-1(c)(2) | Excludes vessels of 6 in ID or less | No official free text found | LICENSED_SOURCE_REVIEW_REQUIRED | None | Yes |
| section-viii | BPVC VIII-1, VIII-2 | 2025 | (design margins) | Design factor 3.5 (Div 1), 2.4 (Div 2) | No official free text found | LICENSED_SOURCE_REVIEW_REQUIRED | None | Yes |
| section-i-vs-iv | BPVC IV | 2025 | HG-101 | Section IV limits: 15 psi steam, 160 psi / 250 °F water | ASME's B31.1 product page (saved 6 Nov 2026) states the mirror boundary for power boilers: steam above 15 psig, water above 160 psig and/or 250 °F. Section IV's own HG-101 text not found free; interpretations on HG-101 are 1977–1991 | PARTIALLY_VERIFIED | None | Yes |
| section-i-vs-iv | BPVC I | 2025 | PG-99 | Section I hydro at least 1.5 × MAWP | IDB 18432 (I-19-07, 2017 ed.: the 90% yield limit in PG-99.1 applies to B16.5 flanges), IDB 20610 (I-21-12); neither states 1.5 | LICENSED_SOURCE_REVIEW_REQUIRED | None | Yes |
| shell-thickness, mawp | BPVC VIII-1 | 2025 | UG-27(c)(1), (c)(2), (d) | Limits: hoop P ≤ 0.385SE and t ≤ R/2; longitudinal P ≤ 1.25SE and t ≤ R/2; sphere P ≤ 0.665SE and t ≤ 0.356R | IDB 16095 (VIII-1-17-49, 2015 ed.: beyond t > 0.5R or P > 0.385SE use 1-2(a)(1); P > 1.25SE use 1-2(a)(2); t > 0.356R or P > 0.665SE use 1-3) | PARTIALLY_VERIFIED | None (all six limits match) | Yes: formulas themselves not stated free |
| shell-thickness | BPVC VIII-1 | 2025 | UG-27 | t = PR/(SE − 0.6P), PR/(2SE + 0.4P), PR/(2SE − 0.2P) | No official free text; IDB 14087 (VIII-1-16-3: no tolerance on R is required) | LICENSED_SOURCE_REVIEW_REQUIRED | None | Yes |
| shell-thickness | BPVC VIII-1 | 2025 | UG-16(c) | Plate under-tolerance up to 0.01 in or 6% | IDB 14539 (VIII-1-16-70) mentions the UG-16(c) under-tolerance but not the values | LICENSED_SOURCE_REVIEW_REQUIRED | None | Yes |
| mawp, section-xiii | BPVC VIII-1 | 2025 | UG-150 to UG-156 | Overpressure: 10% or 3 psi one device; 16% or 4 psi several; 21% fire | No interpretation under UG-150 to UG-156 (search returned none); older ones under UG-125 don't state the limits | LICENSED_SOURCE_REVIEW_REQUIRED | None | Yes |
| hydrostatic-test | BPVC VIII-1 | 2025 | UG-99(b) | Test at 1.3 × MAWP × lowest stress ratio | IDB 14706 (VIII-1-16-71, 2015 ed.: "1.3 times the LSR") | PARTIALLY_VERIFIED | None | Yes |
| hydrostatic-test | BPVC VIII-1 | 2025 | UG-99(b) | "Bolting is left out" of the stress ratio | IDB 14706 (VIII-1-16-71: bolting need not be considered only if 1.3 × LSR doesn't stress bolts above 90% of yield at test temperature) | CORRECTED | Page now gives the 90% of yield condition and cites the interpretation | Yes |
| hydrostatic-test | BPVC VIII-1 | 2025 | UG-99(g) | Inspect at not less than test pressure ÷ 1.3 | IDB 5801 (VIII-1-01-02, 1998 ed.: test accepted if tight after reducing to not less than test pressure divided by 1.3) | PARTIALLY_VERIFIED | None | Yes |
| hydrostatic-test | BPVC VIII-1 | 2025 | UG-99(h) | Metal at least MDMT + 30 °F; not above 120 °F | IDB 8212 (VIII-1-89-211, 1989 ed.: the 30 °F margin is not mandatory) | CORRECTED | Page now says both are recommendations, citing the interpretation | Yes |
| hydrostatic-test | BPVC VIII-1 | 2025 | UG-100 | Pneumatic test 1.1 × MAWP × ratio | IDB 10009 (VIII-1-16-12: UG-100(b) to (e) apply; Section V Art. 10 procedure not required); factor not stated | LICENSED_SOURCE_REVIEW_REQUIRED | None | Yes |
| hydrostatic-test | BPVC VIII-1 | 2025 | UG-102 | Gauge range 1.5 to 4 × test pressure, about 2× preferred | IDB 14429 (VIII-1-16-16: no redundant gauges required); range not stated | LICENSED_SOURCE_REVIEW_REQUIRED | None | Yes |
| joint-efficiency | BPVC VIII-1 | 2025 | Table UW-12 | Type 1: 1.00 / 0.85 / 0.70; Type 2: 0.90 / 0.80 / 0.65; Type 3: 0.60 | IDB 15056 (VIII-1-16-89: Table UW-12 values apply with UT in lieu of RT), IDB 7428, IDB 19575; none lists the values | LICENSED_SOURCE_REVIEW_REQUIRED | None | Yes |
| joint-efficiency | BPVC VIII-1 | 2025 | UW-11(a)(1)–(5), UW-12(d) | Full RT for lethal service, > 1¼ in P-1, unfired steam boilers > 50 psi; seamless 1.0 / 0.85 | IDB 15033 (VIII-1-16-72: full RT of UW-11(a) welds with Type 3 joints meets RT 4); IDB 14219 (VIII-1-16-17: E = 1.0 with UW-11(a)(5)(b)); thresholds not stated | LICENSED_SOURCE_REVIEW_REQUIRED | None | Yes |
| pwht | BPVC VIII-1 | 2025 | Table UCS-56-1 | P-1: 1,100 °F; 1 h/in to 2 in (15 min min), 2 h + 15 min/in over 2 in; exempt ≤ 1¼ in, ≤ 1½ in with 200 °F preheat | IDB 20215 (VIII-1-20-24) confirms Table UCS-56-1 has exemptions; values not stated | LICENSED_SOURCE_REVIEW_REQUIRED | None | Yes |
| pwht | BPVC VIII-1 | 2025 | UCS-56(d) | Heating 400/t and cooling 500/t °F/h above 800 °F | IDB 19085 (VIII-1-20-11: the heating limit applies to the maximum observed rate above 800 °F, not the average), IDB 23590 (VIII-1-24-08, 2023 ed.: rates below 100 °F/h are not prohibited), IDB 776 (250 °F gradient within 15 ft); 400/500 not stated | PARTIALLY_VERIFIED | None | Yes |
| impact-testing | BPVC VIII-1 | 2025 | UG-20(f) | Exemption conditions include design temperature −20 to 650 °F | IDB 8158 (VIII-1-89-166: impact testing is required if the design temperature exceeds 650 °F), IDB 8661 (VIII-1-95-111), IDB 8532 (UG-20(f) can exempt where Fig. UCS-66 wouldn't), IDB 5756 (UCS-68(c) reduction can't be added to UG-20(f)); −20 °F not stated | PARTIALLY_VERIFIED | None | Yes |
| impact-testing | BPVC VIII-1 | 2025 | UCS-66, UCS-66.1, UG-84, UCS-68 | Curves A–D; testing generally required below −55 °F; PWHT credit | IDB 14536 (interpolation in Table UCS-66 allowed), IDB 20215 (a P-1 MDMT colder than −55 °F context); curve values not stated | LICENSED_SOURCE_REVIEW_REQUIRED | None | Yes |
| heads | BPVC VIII-1 | 2025 | UG-32, 1-4(d) | 2:1 t = PD/(2SE − 0.2P); F&D 0.885PL/(SE − 0.1P); hemi PL/(2SE − 0.2P); 80:10 via M = ¼(3 + √(L/r)) | IDB 774 (VIII-1-15-14: Table 1-4 variables are in the corroded condition), IDB 7930 (torispherical head must meet UG-32 / 1-4); formulas not stated | LICENSED_SOURCE_REVIEW_REQUIRED | None | Yes |
| data-reports | BPVC VIII-1 | 2025 | UG-120 | Manufacturer keeps the Data Report for a set period or registers it with the National Board | National Board Data Report Registration page (saved 5 Nov 2026, `nb-registration` quote source) covers registration; retention period: IDB 7424 (VIII-1-10-29: design calculations kept three years, under Appendix 10-13) is about records, not the Data Report | PARTIALLY_VERIFIED | None | Yes |
| quality-control-manual | BPVC VIII-1, CA-1 | 2025 | Mandatory Appendix 10 | Still holds the QC system elements in 2025 (vs CA-1) | ASME's Required Code Books page (saved 5 Nov 2026) lists CA-1 for every certificate; it doesn't say where the QC elements sit. IDB 7408, 7424 (Appendix 10-13 records) are 2007–2010 editions | UNRESOLVED | None | Yes |
| b31-1-vs-b31-3 | B31.1 | 2026 | 137 (137.4.5) | Hydro 1.5 × design, no stress-ratio increase | IDB 22962 (B31.1-24-03, 2020 ed.: 137.4.5 doesn't require raising the test pressure by the stress ratio) | PARTIALLY_VERIFIED | None | Yes |
| b31-1-vs-b31-3 | B31.3 | 2024 | 345.4.2 | Hydro 1.5 × design × stress ratio | IDB 13027 (13-13, 1993 ed.: not less than 1.5 × design unless 345.4.2(c) or 345.4.3(b) applies), IDB 12929 (18-03, 1999 ed.: Eq. (24) with ST and S at each point) | PARTIALLY_VERIFIED | None | Yes |

## Summary

- 40 rows: 1 VERIFIED_OFFICIAL, 3 CORRECTED, 18 PARTIALLY_VERIFIED, 17 LICENSED_SOURCE_REVIEW_REQUIRED, 1 UNRESOLVED.
- Pages changed (7 Nov 2026): `content/asme/welder-qualification.md`, `content/asme/section-v.md`,
  `content/asme/hydrostatic-test.md`. No value was found wrong outright; the three corrections remove overstatements
  (GMAW-S and UT, bolting in the stress ratio, the 30 °F margin as a requirement).
- Still needs a reviewer with the 2025 books: every LICENSED_SOURCE_REVIEW_REQUIRED row, the QW-304 GMAW-S wording
  in 2025, and Appendix 10 vs CA-1. The 20-minute check in `docs/batch-plans/asme-code-check.md` stands; this ledger
  shortens it to the rows not already supported.

## How it was checked

Searches on ASME's Interpretations Database by standard and paragraph (31 searches, 7 Nov 2026), then each relevant
interpretation's question and reply read in full. Interpretations from before 2008 were used only where nothing newer
covered the point, and the ledger gives each one's edition.
