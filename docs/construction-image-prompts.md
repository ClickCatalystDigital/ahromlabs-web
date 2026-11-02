# /construction hub: image prompts

Same style and hand-over as the ASME hub (`docs/asme-image-prompts.md`): paste the **style block** from that file before each prompt, generate a wide PNG, name it as in the File column but ending `.png`, put them in one folder and give Claude the folder. Claude converts them with `python3 scripts/asme-images.py <folder> construction`. Alt text is in `src/lib/construction-images.ts`; re-check it against each delivered image. The hub serves India and North America: keep the pictures free of country-specific motifs (brand imagery is global).

**Status (3 Nov 2026): none generated yet.**

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
