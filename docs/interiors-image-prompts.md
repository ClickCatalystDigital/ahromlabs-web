# /interiors hub: image prompts

Same style and hand-over as the ASME hub (`docs/asme-image-prompts.md`): paste the **style block** from that file before each prompt, generate a wide PNG, name it as in the File column but ending `.png`, put them in one folder and give Claude the folder. Claude converts them with `python3 scripts/asme-images.py <folder> interiors` (WebP in `public/interiors/`, share card in `src/assets/og-art/interiors/`). Alt text is in `src/lib/interiors-images.ts`; re-check it against each delivered image. The sales tax page's image belongs to the sales tax hub: put it in a separate folder and run `python3 scripts/asme-images.py <folder> sales-tax` (alt text in `src/lib/sales-tax-images.ts`). No brand names, logos, flags or labelled maps in the pictures, and no country-specific motifs (brand imagery is global).

**Status (7 Nov 2026): all 15 done**, in `public/interiors/` and `public/sales-tax/`.

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

## Batch 2 (7 Nov 2026): done

Same style block. The first three go in the interiors folder (`python3 scripts/asme-images.py <folder> interiors`), the
last two in a separate folder for the sales tax hub (`python3 scripts/asme-images.py <folder> sales-tax`).

| File | Page | Prompt (after the style block) |
|---|---|---|
| `1099s-for-installers-and-workrooms.webp` | 1099s for installers, workrooms and subcontractors | A cordless drill lying beside a neatly folded drapery panel, and a clipboard holding a blank tax form with a few boxes. |
| `freight-damage-claims.webp` | Freight damage claims for furniture | A furniture carton with one crushed corner on a wooden pallet, and a clipboard with a blank claim form leaning against it. |
| `custom-furniture-job-costing.webp` | Job costing for custom furniture and millwork shops | A half-finished turned walnut table leg held in a bench vise, a blank work ticket with pencil marks and a pencil on the bench beside it. |
| `new-york-interior-design-sales-tax.webp` *(sales-tax)* | New York sales tax on interior design services | A rolled set of interior floor plans tied with string, a fabric swatch and a few coins beside it. |
| `california-interior-design-sales-tax.webp` *(sales-tax)* | California sales tax for interior designers | A drapery panel spread on a sewing table with pins and a pair of shears, a blank receipt and a few coins at its edge. |
