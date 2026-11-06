# SB Ops US demo (shanti-ops, branch `demo-us`): issues found while writing the ASME guides

Collected from the ASME batches (docs/batch-plans/asme.md). To be fixed together later in shanti-ops; the guides only
claim what the demo does today. Add new items at the bottom as later batches find them.

| # | Found | File | Issue | Fix |
|---|---|---|---|---|
| 1 | 2026-11-05 | `lib/qc-asme.mjs` (`ASME_FORMS['U-1A'].title`) | U-1A title reads "Completely Shop-Fabricated Vessels Only"; ASME's 2025 form is "Alternative Form for Single Chamber, Completely Shop- or Field-Fabricated Vessels Only" (ASME Data Report Forms page). | Update the title string. |
| 2 | 2026-11-05 | `scripts/demo/seed-acme-us.mjs` (hydro record for AB-1003) | The deaerator's 130 psi hydro test uses a 0–600 psi gauge; Section VIII Div. 1 UG-102 limits the dial to 4 × test pressure (520 psi), ideally about 2× (a 0–300 psi gauge). The boiler's 225 psi test with 0–600 psi is within range. | Seed a 0–300 psi gauge for the vessel. |
| 3 | 2026-11-05 | `lib/calc-engine.js`, `lib/db.js` | Calculation-sheet sources say "2023 Edition" while the record package files the job as 2025 Edition. | Label the formula sources 2025 (or the job's edition). |
| 4 | 2026-11-06 | `lib/qc-asme.mjs` (`continuityRows`) | Shows a welder "Current" on the lapse date itself (`lapse >= asOf`); QW-322.1(a) has the qualification expire after six months, and ahromlabs.com's checker and Excel log mark the lapse date as lapsed. | Use `lapse > asOf`. |
| 5 | 2026-11-05 | QC folder / ASME data | ASME record data (edition, stamp, inspector, welds, WPS, welders) is seeded only; there is no screen to enter it. Guides say so. | Build the entry screens when the US build gets a real client. |
| 6 | 2026-11-05 | Demo | No file storage: no MTR scans, drawings or NDE film; no National Board EDT filing; Division 1 vessels and Section I boilers only. Guides say so. | Later, if wanted. |
| 7 | 2026-11-05 | `lib/qc-asme-pdf.js` | Data report pages are our own layout, not the official form. The National Board requires the exact Code format for paper registration, so a shop must still file the official form or use EDT. Guides say so. | Optional: fill ASME's fillable PDF instead. |
| 8 | 2026-11-05 | Demo, Ohio | Demo company is in Ohio, whose rule (OAC 4101:4-3-01, eff. 1 Jul 2024) adopts the 2023 Code plus later supplements; the demo files 2025. Not wrong for a demo, but don't present it as Ohio-accepted. | None needed; keep the wording. |
