# /interiors hub: image prompts

Same style and hand-over as the ASME hub (`docs/asme-image-prompts.md`): paste the **style block** from that file before each prompt, generate a wide PNG, name it as in the File column but ending `.png`, put them in one folder and give Claude the folder. Claude converts them with `python3 scripts/asme-images.py <folder> interiors` (WebP in `public/interiors/`, share card in `src/assets/og-art/interiors/`). Alt text is in `src/lib/interiors-images.ts`; re-check it against each delivered image. The sales tax page's image belongs to the sales tax hub: put it in a separate folder and run `python3 scripts/asme-images.py <folder> sales-tax` (alt text in `src/lib/sales-tax-images.ts`). No brand names, logos, flags or labelled maps in the pictures, and no country-specific motifs (brand imagery is global).

**Status (7 Nov 2026): 10 to make.** Pages are being written under these slugs; each shows its image once the file exists.

| File | Page | Prompt (after the style block) |
|---|---|---|
| `interiors-hub.webp` | Hub: running an interior design firm that sells product | An upholstered armchair in navy fabric with a brass-capped leg, a small fabric swatch card and a blank price tag on a string resting on its seat. |
| `how-to-charge-for-interior-design.webp` | How to charge for interior design: flat fee, hourly, cost-plus and markup | A brass desk calculator beside a fanned set of three fabric swatches, one blank price tag tied to the top swatch. |
| `invoices-deposits-and-retainers.webp` | Interior design invoices, deposits and retainers | A clipboard holding a blank invoice with a few line rows and a total line, a fountain pen across it and a small stack of coins beside it. |
| `purchase-orders-and-procurement.webp` | Interior design purchase orders and procurement | A large wrapped furniture carton on a small flatbed hand truck, a blank packing slip in a clear sleeve taped to the carton and a roll of tape on top. |
| `project-budget-tracking.webp` | Interior design project budget vs client approval | An open ring binder showing a blank grid sheet with a few rows ticked in navy pencil, a fabric swatch and a pencil resting on the page. |
| `interior-design-contract.webp` | Interior design contract: what the agreement must say | A clipboard holding a signed blank letter of agreement with a fountain pen across it and a small fabric swatch clipped to its top corner. |
| `trade-accounts-and-designer-discounts.webp` | Trade accounts and designer discounts | A brass key ring holding a few blank account cards, lying on a closed fabric sample book beside a blank price tag with one line struck through. |
| `canada-gst-hst-for-interior-designers.webp` | GST/HST for Canadian interior designers | A small wooden side table with a blank printed receipt and a few coins on its top, a wrapped parcel with a blank delivery label at its foot. |
| `quickbooks-for-interior-designers.webp` | QuickBooks for interior designers, and where design software fits | A closed laptop with a blank ledger book lying on its lid and a brass paper clip chain joining the ledger to a single fabric swatch. |

## Sales tax hub page (run with `sales-tax`)

| File | Page | Prompt (after the style block) |
|---|---|---|
| `interior-designers-sales-tax.webp` | Sales tax for interior designers: design fees and furnishings | A table lamp with a pleated cream shade standing beside a blank printed receipt and a few coins. |
