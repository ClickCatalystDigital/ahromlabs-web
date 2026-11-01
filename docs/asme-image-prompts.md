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
