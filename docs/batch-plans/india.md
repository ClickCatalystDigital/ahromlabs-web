# India batches 15–18 and glossary batches 19–21: plan

Written 6 Nov 2026 for `docs/content-roadmap.md` batches 15–21. Same standard as the ASME batches
(`docs/batch-plans/asme.md`): every H2 a buyer's question answered in its first sentence; facts only from primary
sources already saved and checked; `checks` quotes verified by the section's checker; `related:` 3–5 paths with at
least two outside the section; title ≤ 60 (else `metaTitle`), description ≤ 160; `updated` and `checked` set when a
page is touched. Demo lines claim only what the demo does; construction is not live at any client.

## Sources (already saved, already checked by the build)

| Section | Checker | Primary texts |
|---|---|---|
| ERP | `scripts/erp.check.ts` (`ERP_DOCS` + Tally vendor pages) | MCA audit-trail rules 2021 and 2022; CBIC Notification 10/2023 (e-invoice); CGST rule 138 (e-way bill); GSTN 30-day IRP advisory; MSMED Act 2006; Income-tax Act 2025; DPDP Act 2023 and Rules 2025 |
| BOQ | `scripts/check-boq-quotes.mjs` | CPWD General Conditions of Contract for Construction Works 2026 |
| IBR | `scripts/check-ibr-quotes.mjs` | IBR 2026 (Gazette No. 596); Boilers Act 2025; IBR 1950 forms index |
| AI assistant | `scripts/ai-assistant.check.ts` (shares `ERP_DOCS`) | DPDP Act 2023 and Rules 2025; MCA audit trail |

No new sources are fetched unless a page states a fact none of these covers.

## Batches

| # | Pages | Main work |
|---|---|---|
| 15a | erp/compliance, tally-migration, tally-vs-custom-erp, contract-checklist, readiness | Question H2s; related lists; dates |
| 15b | erp/implementation-plan, selection-matrix, vendor-demo-script, small-manufacturers, trading-distribution, interior-design-firms | Same, plus statutory checks where a page states a rule |
| 16 | boq/what-is-a-boq, how-to-make-an-interior-boq, measurement-rules, material-specifications, variation-orders | Question H2s (1 of 32 today); CPWD GCC checks where measurement and variation rules are stated |
| 17 | ibr/2026-changes, record-keeping, registration-documents, small-industrial-boilers | Already in question shape: add related lists (none today), check first sentences, dates |
| 18a | ai-assistant/ai-in-erp, how-it-works, data-safety | Question H2s; DPDP checks |
| 18b | ai-assistant/manufacturers, trading-distribution, interior-design-firms, construction-contractors | Question H2s; demo claims checked against the industry pages; construction says "not live at a client" |
| 19 | Glossary, ASME and pressure-equipment terms (joint-efficiency, nbic, procedure-qualification-record, authorized-inspector, hydrostatic-test, manufacturers-data-report, welder-continuity, p-number, asme-certification-mark, heat-number, welder-performance-qualification, welding-procedure-specification, mdmt, mawp, material-traceability) | Definition first, why it matters to a buyer, link to its guide |
| 20 | Glossary, construction and billing terms (over-under-billing, pay-application, schedule-of-values, lien-waiver, measurement-book, retainage, change-order, variation-order, ra-bill, bill-of-quantities, measurement-basis) | Same |
| 21 | Glossary, ERP, tax and AI terms (reverse-charge, three-way-match, fixed-asset-register, grounding-check, role-based-access, data-migration, fixed-look-up, text-to-sql, stock-reservation, tds-on-purchases, msme-payment-rule, ibr-statutory-folder, e-way-bill, ai-hallucination) | Same |

Glossary terms with no body today (bill-of-materials, work-order, job-traveler, finite-capacity-scheduling and the
pattern vocabulary such as entity, decision, workflow) have no page; they stay that way unless a guide needs them
linked, since a new page needs its own sources.

## Rules for glossary pages

- The `answer` is the definition, answered in its first sentence.
- The body says why it matters to the person buying or running the system, in two or three sentences, with one fact
  from a primary source where the term is statutory (e.g. the e-way bill's ₹50,000 under rule 138).
- It links to the guide that explains it, and to the service or industry page where it is built.

## Status

Filled in after each batch: batch, commit, what is unverified.
