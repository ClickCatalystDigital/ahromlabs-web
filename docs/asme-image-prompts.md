# ASME hub: image prompts

One image per ASME page, in the same style as the BOQ and AI hub images (`public/boq/`, `public/ai/`).

**How to hand them over:** generate each as a PNG at any size (wide is best), name it as in the File column but
ending `.png` (for example `asme-hub.png`), put them in one folder and give Claude the folder. Claude runs
`python3 scripts/asme-images.py <folder>`, which finds the object, centres it on the page colour at 1086 × 362,
writes `public/asme/<name>.webp` and the share-card crop, checks each picture against its alt text in
`src/lib/asme-images.ts`, rebuilds and commits. Each page picks up its image, share card, structured data and
sitemap entry automatically.

## Style block (paste before every prompt)

> Wide 3:1 illustration, 1086 × 362 pixels. One object, centred, filling about the middle third of the width,
> with empty space left and right so a 16:9 crop keeps the whole object. Clean editorial line illustration: confident
> dark charcoal outlines of even weight, flat fills with only subtle shading, palette of deep navy (#1d3461), warm
> off-white and cream, light grey, with brushed steel or brass as the only metallic accent. Plain background in exactly
> #fbfbfc, edge to edge, no vignette, no frame. A soft pale-grey elliptical shadow under the object. Three-quarter view
> from slightly above. No text, no letters, no numbers, no logos, no stamps or certification marks, no people, no
> hands. Neutral, global industrial setting with nothing country-specific.

Notes:
- **No ASME or National Board marks**, real or imitated: they are trademarks. Nameplates and stamps stay blank.
- Image models garble text, so every prompt avoids it; labels belong in the page, not the picture.
- If a result has text or a logo, regenerate rather than edit.

## Priority 1: hub, tools, question library (5)

| File | Page | Prompt (after the style block) |
|---|---|---|
| `asme-hub.webp` | /asme | A compact horizontal steel pressure vessel on two saddle supports, with 2:1 elliptical heads, two flanged nozzles on top and a blank rectangular nameplate on the shell. |
| `hydrostatic-test.webp` | /asme/hydrostatic-test | A round analog pressure gauge with a blank dial face and a needle, mounted on a short flanged pipe stub with a small valve, a few water droplets on the flange. |
| `shell-thickness.webp` | /asme/shell-thickness | A short cut-away section of a thick steel cylinder showing its wall thickness, with a steel ultrasonic thickness gauge probe resting on the cut edge. |
| `welder-continuity.webp` | /asme/welder-continuity | A welding helmet resting beside a desk calendar with blank pages, one page corner folded, and a stick electrode laid across the calendar. |
| `questions.webp` | /asme/questions | A thick technical code book lying closed with several coloured tab markers on its edge, a pair of reading glasses resting on the cover. |

## Priority 2: the most searched guides (8)

| File | Page | Prompt |
|---|---|---|
| `bpvc-sections.webp` | /asme/bpvc-sections | A row of six thick hardbound books standing upright on a shelf, navy spines with blank labels, one book pulled half out. |
| `section-viii.webp` | /asme/section-viii | Three pressure vessels side by side in increasing wall thickness: a slim tank, a heavier vessel, and a short very thick-walled forged vessel. |
| `section-ix.webp` | /asme/section-ix | A welded steel test plate with a neat weld bead along its centre, two cut test strips bent into a U-shape lying beside it. |
| `wps-pqr-wpq.webp` | /asme/wps-pqr-wpq | Three blank document sheets fanned out on a clipboard, a welding electrode and a small welded test coupon resting on top. |
| `stamps.webp` | /asme/stamps | A blank stainless steel equipment nameplate with four rivets, beside a set of steel letter punches in a small open wooden case, punch faces blank. |
| `u-stamp.webp` | /asme/u-stamp | A closed ring binder labelled with a blank spine, a pressure gauge and a small blank nameplate arranged neatly beside it on a desk surface. |
| `data-reports.webp` | /asme/data-reports | A thick bound document folder open to blank form pages, with a fountain pen lying across it and a blank metal nameplate beside it. |
| `asme-vs-ibr.webp` | /asme/asme-vs-ibr | Two identical small shell boilers side by side, one in navy, one in cream, connected by a single steam pipe between them. |

## Priority 3: the remaining guides (19)

| File | Page | Prompt |
|---|---|---|
| `section-i-vs-iv.webp` | /asme/section-i-vs-iv | A large industrial firetube steam boiler on the left and a small wall-hung heating boiler on the right, same scale, side by side. |
| `section-ii.webp` | /asme/section-ii | A stack of three steel plates of different thickness with chalk-white heat marks (blank, no characters), a steel pipe offcut and a forged flange beside them. |
| `section-v.webp` | /asme/section-v | An ultrasonic flaw detector with a blank screen and its probe on a cable, resting next to a welded steel plate. |
| `section-xiii.webp` | /asme/section-xiii | A brass and navy spring-loaded safety relief valve with a lifting lever, standing upright on its inlet flange. |
| `editions.webp` | /asme/editions | Two identical hardbound books, one newer and crisper in front of an older worn copy, a small page tab marker on the new one. |
| `quality-control-manual.webp` | /asme/quality-control-manual | A thick ring binder lying open, blank pages, with coloured index tabs and a set of calipers resting on it. |
| `authorized-inspector.webp` | /asme/authorized-inspector | A hard hat, a small flashlight and a magnifying glass resting on a clipboard with blank pages. |
| `national-board-registration.webp` | /asme/national-board-registration | A long wooden card-index drawer pulled open, filled with blank index cards, one card raised. |
| `essential-variables.webp` | /asme/essential-variables | A welding machine control panel with three rotary dials and a toggle switch, dials without numbers. |
| `welder-qualification.webp` | /asme/welder-qualification | A short length of steel pipe on a stand, held at a 45-degree angle, with a finished circumferential weld around it. |
| `p-numbers.webp` | /asme/p-numbers | Small rectangular metal sample coupons in different metal tones (carbon steel grey, stainless bright, copper, aluminium) laid in a neat row in an open tray. |
| `mawp.webp` | /asme/mawp | A pressure gauge with a blank dial and a single red marker line, mounted on top of a small vessel head. |
| `heads.webp` | /asme/heads | Three pressure vessel heads standing on edge, in profile: a deep hemispherical head, a 2:1 elliptical head and a shallow dished head. |
| `joint-efficiency.webp` | /asme/joint-efficiency | A cylindrical shell course with its long seam weld and one circumferential weld visible, and a radiography film cassette strapped over the seam. |
| `impact-testing.webp` | /asme/impact-testing | A Charpy pendulum impact tester with its hammer raised, a small notched test bar on the anvil, a few frost crystals on the bar. |
| `pwht.webp` | /asme/pwht | A welded steel ring wrapped in ceramic-pad heating elements with insulation blanket and thin thermocouple wires leading away. |
| `mtr.webp` | /asme/mtr | A steel plate with a stencilled blank heat-marking patch, a single sheet certificate clipped to it, and a white paint marker. |
| `buying-from-india.webp` | /asme/buying-from-india | A horizontal pressure vessel on transport cradles, strapped to a flatbed trailer bed, viewed alone without a truck. |
| `state-boiler-laws.webp` | /asme/state-boiler-laws | A framed blank certificate on a wall-mounted board next to a small boiler gauge glass and valve. |
| `b31-1-vs-b31-3.webp` | /asme/b31-1-vs-b31-3 | Two pipe spools crossing at a flanged tee, one insulated in navy cladding, one bare stainless with a valve. |

Glossary pages (/systems/…) don't use images.

## Quality control on the job (added 14 Nov 2026)

| File | Page | Prompt |
|---|---|---|
| `inspection-and-test-plan.webp` | /asme/inspection-and-test-plan | A clipboard holding a blank ruled checklist sheet with empty tick boxes, a small red hold tag on a string tied to the clip, and a pen beside it. |
| `nonconformance-report.webp` | /asme/nonconformance-report | A short welded steel plate with a circled section of weld seam marked in white paint, a blank red tag wired to the plate, and a small angle grinder resting beside it. |
| `data-book.webp` | /asme/data-book | A thick ring binder standing upright with many coloured index tabs along its edge, a small stack of loose blank certificates and a steel nameplate leaning against it. |
| `crn-canada.webp` | /asme/crn-canada | A blank stainless steel nameplate lying beside a small blank metal registration tag on a ring and a rolled engineering drawing tied with string. |
| `heat-exchangers.webp` | /asme/heat-exchangers | A shell-and-tube heat exchanger on two saddles with its tube bundle partly pulled out of the shell, showing the round tubesheet full of tube ends and a few baffle plates. |
| `hardness-and-pmi.webp` | /asme/hardness-and-pmi | A portable hardness tester with a probe on a cable and a handheld pistol-shaped alloy analyser, both resting on a short welded steel test coupon. |

## Content gap batch (14 Nov 2026), all hubs

Same style block. For the IBR, ERP and BOQ pages the image goes in the page's front matter once delivered; Claude
does that.

| File | Page | Prompt |
|---|---|---|
| `electronic-component-inventory.webp` | /manufacturing/electronic-component-inventory | A reel of surface-mount components half out of a silvery moisture barrier bag, with a short cut strip of carrier tape lying beside it. |
| `counterfeit-electronic-parts.webp` | /manufacturing/counterfeit-electronic-parts | A single black microchip on an anti-static mat seen through a round magnifying glass on a stand, an empty component tray beside it. |
| `reorder-point-safety-stock.webp` | /manufacturing/reorder-point-safety-stock | A warehouse bin of identical small boxes, with a red horizontal line painted on the inside wall of the bin marking the refill level. |
| `excess-and-obsolete-inventory.webp` | /manufacturing/excess-and-obsolete-inventory | Several dusty cardboard cartons stacked at the back of a steel shelf, one with a blank paper tag tied to it, cobweb in one corner. |
| `submittals-and-rfis.webp` | /construction/submittals-and-rfis | Two rolled shop drawings tied with string, a single sheet with a blank rectangular review stamp mark, and a white hard hat beside them. |
| `punch-list-closeout.webp` | /construction/punch-list-closeout | A section of freshly painted wall with a small strip of blue painter's tape marking a spot, and a clipboard with a blank checklist leaning against the wall below it. |
| `rate-analysis.webp` | /construction/rate-analysis | A bag of cement, a small heap of sand and a small heap of stone aggregate beside a calculator on a blank measurement sheet. |
| `ffe-specifications.webp` | /interiors/ffe-specifications | A fabric swatch, a small wood finish sample chip and a line drawing of an armchair clipped to a blank specification sheet. |
| `crn-canada.webp` | /asme/crn-canada | A blank stainless steel nameplate lying beside a small blank metal registration tag on a ring and a rolled engineering drawing tied with string. |
| `heat-exchangers.webp` | /asme/heat-exchangers | A shell-and-tube heat exchanger on two saddles with its tube bundle partly pulled out of the shell, showing the round tubesheet full of tube ends and a few baffle plates. |
| `hardness-and-pmi.webp` | /asme/hardness-and-pmi | A portable hardness tester with a probe on a cable and a handheld pistol-shaped alloy analyser, both resting on a short welded steel test coupon. |
| `ibr-stage-inspection.webp` | /ibr/stage-inspection | A boiler shell on a fabrication shop floor with a clipboard of blank stage sheets and a measuring tape resting on top of it. |
| `erp-import-landed-cost.webp` | /erp/import-landed-cost | A shipping carton on a pallet with a blank customs document envelope and a calculator resting on top. |
| `erp-hsn-codes.webp` | /erp/hsn-codes-electronic-components | Small electronic components laid out in a neat row on a tray: a capacitor, a resistor, a connector, a diode and a chip, each with a blank tag. |
| `interior-quotation-format.webp` | /boq/interior-quotation-format | A clipboard with a blank ruled quotation sheet, a laminate sample chip and a pen beside it on a desk. |

## Second gap batch (14 Nov 2026)

Same style block. Save as PNG with the file name below (any size), in Downloads, and tell Claude.

| File | Page | Prompt |
|---|---|---|
| `punch-list-closeout.webp` | /construction/punch-list-closeout | A section of freshly painted wall with a small strip of blue painter's tape marking a spot, and a clipboard with a blank checklist leaning against the wall below it. |
| `ontario-holdback.webp` | /construction/ontario-holdback | A small stack of coins with one tenth of them set apart under a glass dome, beside a blank invoice sheet. |
| `cost-codes.webp` | /construction/cost-codes | A row of file folders with coloured index tabs standing in a desk organiser, a calculator and a white hard hat beside them. |
| `rera-for-builders.webp` | /construction/rera-for-builders | A small architectural model of a residential tower beside a closed bank passbook and a blank certificate with a round seal. |
| `interior-design-software.webp` | /interiors/interior-design-software | An open laptop with a blank grid on the screen, fabric swatches and a miniature armchair on the desk beside it. |
| `architecture-firm-fees-and-phases.webp` | /interiors/architecture-firm-fees-and-phases | Rolled drawings, a triangular scale ruler and an open notebook with a blank ruled timesheet on a drafting table. |
| `r-stamp.webp` | /asme/r-stamp | A short section of steel pipe with a fresh weld band around its middle and a small blank metal tag wired beside the weld. |
| `ibr-renewal-inspection.webp` | /ibr/renewal-inspection | A small shell boiler with its manhole door open and a flashlight resting on top beside a clipboard with blank pages. |
| `ibr-steam-pipes.webp` | /ibr/steam-pipes | An insulated steam pipe with one flange bare, a pressure gauge on a short branch and a small valve. |
| `erp-architecture-firms.webp` | /erp/architecture-firms | A rolled building drawing, a stack of blank invoices and a calculator on a desk. |
| `erp-bis-registration.webp` | /erp/bis-registration-electronics | A power adapter and a power bank on a test bench beside a blank certificate with a round seal. |
| `interior-design-agreement.webp` | /boq/interior-design-agreement | A two-page blank agreement with a fountain pen lying across it, a laminate sample chip and a small house key beside it. |
| `pp-stamp.webp` | /asme/pp-stamp | A pipe spool with two welded elbows and a flange resting on pipe stands, a small blank nameplate tag wired to it. |
| `ibr-2026-changes.webp` (IBR, front matter) | /ibr/2026-changes | Two bound regulation books side by side, one worn with a faded cover and one new, a ribbon bookmark in the new one. |
| `erp-tally-vs-custom.webp` (ERP, front matter) | /erp/tally-vs-custom-erp | A ledger book and a small stack of index-card trays side by side on a desk, joined by a single brass paper clip chain. |
| `ai-construction-contractors.webp` (AI assistant) | /ai-assistant/construction-contractors | A white hard hat beside a small desk speaker-shaped device and a blank site diary on a desk. |
| `daily-progress-reports.webp` | /construction/daily-progress-reports | A site diary open to a blank ruled page with a pencil, beside a white hard hat and a small stack of bricks. |
| `job-cost-per-site.webp` | /construction/job-cost-per-site | Three small site models on a table, each with its own stack of coins and a blank tag in front of it. |
| `material-consumption-vs-boq.webp` | /construction/material-consumption-vs-boq | A stack of cement bags and a bundle of steel bars beside a clipboard with a blank two-column sheet. |
