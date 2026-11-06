# /construction hub: image prompts

Same style and hand-over as the ASME hub (`docs/asme-image-prompts.md`): paste the **style block** from that file before each prompt, generate a wide PNG, name it as in the File column but ending `.png`, put them in one folder and give Claude the folder. Claude converts them with `python3 scripts/asme-images.py <folder> construction`. Alt text is in `src/lib/construction-images.ts`; re-check it against each delivered image. The hub serves India and North America: keep the pictures free of country-specific motifs (brand imagery is global).

**Status (5 Nov 2026): all 17 done**, in `public/construction/` (the 7 new pages show their image once each page exists).

| File | Page | Prompt (after the style block) |
|---|---|---|
| `construction-hub.webp` | Hub: construction billing and job cost | A white hard hat resting on a rolled set of drawings beside a clipboard holding a blank payment schedule. |
| `pay-applications.webp` | Pay applications (G702/G703) explained | A clipboard holding a blank schedule-of-values sheet with columns, a pencil and a small desk calculator. |
| `retainage.webp` | Retainage | A small glass jar part filled with coins on a site office desk, beside a clipboard. |
| `lien-waivers.webp` | Lien waivers | A signed blank release form on a clipboard with a pen across it and a ring of keys beside it. |
| `change-orders.webp` | Change orders | A drawing sheet with a revision cloud drawn in red pencil, a steel ruler and an eraser. |
| `wip-schedule.webp` | The WIP schedule | A printed spreadsheet of blank rows with a few rows highlighted, folded reading glasses resting on it. |
| `ra-bills.webp` | RA bills | A small stack of bound bill sheets with a desk calculator and a rubber stamp. |
| `measurement-book.webp` | Measurement book | An open hardbound register with handwritten-looking blank lines, a coiled steel measuring tape beside it. |
| `tds-on-contractor-payments.webp` | TDS on contractor payments | A cheque book, a calculator and a blank printed payment voucher on a desk. |
| `gst-on-works-contracts.webp` | GST on works contracts | Cement bags, a bundle of steel bars and a builder's spirit level on a concrete slab. |

## New contractor pages (batches 3b and 3c, 5 Nov 2026): 7 to make

Same style block and hand-over as above. Pages are being written now under these slugs; each shows its image once
the file exists, and its alt text goes into `src/lib/construction-images.ts` when the image arrives.

| File | Page | Prompt (after the style block) |
|---|---|---|
| `mechanics-lien-deadlines.webp` | Mechanics lien and preliminary notice deadlines by state (US) | A desk calendar with blank pages, several dates circled in navy pencil, and a small brass hourglass beside it. |
| `prompt-payment-acts.webp` | Prompt payment acts by state (US) | A steel stopwatch lying on a closed blank envelope beside a short stack of coins. |
| `certified-payroll.webp` | Certified payroll and Davis-Bacon (US) | A clipboard holding a blank weekly time-sheet grid, with a white hard hat and a pen beside it. |
| `labour-cess.webp` | Labour cess on construction (India, BOCW 1%) | A small steel cash box with its lid open showing coins, a white hard hat resting against its side. |
| `contract-labour-compliance.webp` | Contract labour compliance: CLRA, PF and ESIC (India) | A row of four blank ID badges on lanyards hanging from a wall hook board, a hard hat on the shelf below. |
| `price-escalation-clause.webp` | Price escalation clauses, CPWD clause 10CC (India) | A small brass balance scale with a short steel bar on one pan and a few coins on the other, a cement bag behind it. |
| `bank-guarantee-defect-liability.webp` | Performance bank guarantee and defect liability period (India) | A folded document tied with a navy ribbon, resting on a closed hardbound contract, with a small brass padlock beside it. |

The new sales tax page for contractors has its prompt in `docs/sales-tax-image-prompts.md`. The construction industry
page needs no new picture: its card uses the aerial site clip already in `public/industries/construction-company.*`.

## Construction after billing (batch 4, 6 Nov 2026): 3 to make

Same style block and hand-over as above. Each page shows its image once the file exists; add its alt text to
`src/lib/construction-images.ts` when the image arrives.

| File | Page | Prompt (after the style block) |
|---|---|---|
| `daily-progress-reports.webp` | Daily progress reports and site records (India) | A smartphone lying on a closed site order book, a white hard hat and a pencil beside it. |
| `material-consumption-vs-boq.webp` | Material consumption vs BOQ norms (India) | Three cement bags and a short bundle of steel bars beside a clipboard with a blank tally sheet, a weighing scale in front. |
| `job-cost-per-site.webp` | Job cost and margin per site (India) | A small stack of coins on an open ledger with a few columns ruled, a calculator and a hard hat beside it. |
