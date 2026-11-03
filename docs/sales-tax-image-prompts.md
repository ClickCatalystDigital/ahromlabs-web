# /sales-tax hub: image prompts

Same style and hand-over as the ASME hub (`docs/asme-image-prompts.md`): paste the **style block** from that file before each prompt, generate a wide PNG, name it as in the File column but ending `.png`, put them in one folder and give Claude the folder. Claude converts them with `python3 scripts/asme-images.py <folder> sales-tax` (WebP in `public/sales-tax/`, share card in `src/assets/og-art/sales-tax/`). Alt text is in `src/lib/sales-tax-images.ts`; re-check it against each delivered image. No flags, maps with labels or state names in the pictures.

**Status (3 Nov 2026): all 8 done**, in `public/sales-tax/`.

| File | Page | Prompt (after the style block) |
|---|---|---|
| `sales-tax-hub.webp` | Hub: US sales tax for manufacturers, distributors and contractors | A sealed shipping carton on a wooden loading-dock edge, beside a clipboard holding a blank invoice and a small rubber stamp. |
| `sales-tax-nexus.webp` | What is sales tax nexus? | Plain outline map of the lower 48 states with no labels, a few states softly shaded, and a dotted parcel route crossing several of them. |
| `economic-nexus-thresholds.webp` | Economic nexus thresholds by state, with a checker | A two-pan brass balance scale, one pan holding a neat stack of blank invoices, the other one plain metal weight, the beam level. |
| `streamlined-sales-tax.webp` | Streamlined Sales Tax: member states and free services | A wire desk tray holding a row of identical blank forms, squared up neatly, one form slightly raised. |
| `resale-certificates.webp` | Resale and exemption certificates | An open filing drawer of manila customer folders, one folder lifted with a signed blank certificate inside. |
| `manufacturing-sales-tax-exemption.webp` | Sales tax exemptions for manufacturers | Steel bar stock entering the chuck of a small lathe, with a few freshly turned parts on a tray below. |
| `use-tax.webp` | Use tax for businesses | An opened cardboard shipping box with crumpled packing paper and a blank packing slip resting on top. |
| `sales-tax-in-erp.webp` | How an ERP should handle US sales tax | A clipboard with a blank order form showing address lines, item rows and one total line, beside a small stack of filed certificates held by a binder clip. |
