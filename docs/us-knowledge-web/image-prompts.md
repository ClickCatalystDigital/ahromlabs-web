# /manufacturing hub: image prompts

Same style and hand-over as the ASME hub (`docs/asme-image-prompts.md`): paste the **style block** from that file before each prompt, generate a wide PNG, name it as in the File column but ending `.png`, put them in one folder and give Claude the folder. Claude converts them to `public/manufacturing/<name>.webp` with the hub's image script.

File names are fixed. **Status (2 Nov 2026): all done.** Every page in the hub has its image in `public/manufacturing/` (ai-in-erp is in `public/ai/`). Convert new ones with `python3 scripts/asme-images.py <folder> manufacturing`.

## Core pages (decided 2 Nov; confirmed by Keyword Planner data, see architecture.md)

| File | Page (working title) | Prompt (after the style block) |
|---|---|---|
| `manufacturing-hub.webp` | Hub: software for machine shops and fabricators | A compact CNC vertical machining center with its door open, an aluminium part clamped in the vise, and a small steel parts cart beside it holding a tray of finished parts. |
| `quickbooks-for-manufacturing.webp` | Does QuickBooks work for manufacturing? (edition by edition) | A closed hardbound ledger book lying flat, a pen across its cover, with three machined steel parts standing next to it: a flange, a bracket and a short shaft. |
| `quickbooks-integration.webp` | Keep QuickBooks, add a shop system (connector in progress) | Two cream desk trays side by side, joined by a short brass roller conveyor carrying one blank document card from the left tray to the right one. |
| `job-shop-scheduling.webp` | Job shop scheduling: machines, shifts and due dates | A wall-mounted magnetic planning board with a grid of empty rows, coloured magnetic blocks of different lengths along the rows, and one block lifted slightly off the board. |
| `job-costing.webp` | Job costing: estimated vs actual, with a worked example | A two-pan brass balance scale, one pan holding a machined steel bracket, the other holding plain blank metal weights, the beam tipped slightly to one side. |
| `machine-shop-erp.webp` | ERP for small machine shops and fabricators | A tidy steel workbench with a bench vise, a tray of finished machined parts and a closed laptop resting on the bench. |
| `ai-rfq-quoting.webp` | Customer RFQ to approved quote with AI (human-approved pricing) | An engineering drawing sheet lying flat with simple line views of a flanged part and an empty title block, the real machined part resting on one corner, and a small brass magnifying glass beside it. |
| `custom-vs-off-the-shelf.webp` | Custom vs off-the-shelf ERP for a small manufacturer | A ring of identical blank steel keys lying beside a small key-cutting machine that is cutting one single key. |
| `shop-floor-tracking.webp` | Shop-floor and WIP tracking with barcoded travelers | A handheld barcode scanner resting on a stack of grey plastic parts bins, each bin with a blank label strip, the top bin half full of turned steel parts. |

## Added after the Keyword Planner data (2 Nov): generate these too

| File | Page | Prompt (after the style block) |
|---|---|---|
| `manufacturing-inventory.webp` | QuickBooks Online inventory: what it tracks and where manufacturers outgrow it | Steel shelving with three shelves of grey parts bins with blank labels, bar stock on the bottom shelf and boxed finished parts on the top shelf. |
| `scheduling-template.webp` | Free job shop production schedule template (Excel) | A blank paper spreadsheet grid on a clipboard, a few rows shaded in different soft colours like booked machine time, a pencil and a small steel ruler lying across it. |
| `ai-in-erp.webp` | AI in ERP: what it can safely do today (in the /ai-assistant hub) | A small brass desk lamp lighting one open steel filing drawer full of blank index cards, one card lifted slightly out of the drawer. |

## Added 3 Nov 2026 (roadmap item 6): all done 3 Nov

| File | Page | Prompt (after the style block) |
|---|---|---|
| `distributor-inventory-control.webp` | Inventory control for distributors: counts, lots, FIFO, barcodes | A handheld barcode scanner resting on a warehouse shelf of labelled cartons, one carton pulled slightly forward showing a blank lot label. |
| `quickbooks-vs-erp.webp` | QuickBooks vs ERP: signs you've outgrown QuickBooks | A small steel toolbox overflowing with tools beside a larger open tool chest with neatly labelled drawers. |
| `quickbooks-desktop-end-of-support.webp` | QuickBooks Desktop 2023 end of support | A beige desktop computer tower with a blank paper tag tied to its handle, beside a closed laptop. |
| `quickbooks-online-vs-desktop.webp` | QuickBooks Online vs Desktop for manufacturers | A desktop computer and a laptop side by side on a workbench, the same closed ledger book in front of each. |
| `erp-requirements-checklist.webp` | ERP requirements checklist for US manufacturers (Excel) | A clipboard holding a printed checklist with some boxes ticked, a pen beside it and a small machined steel part. |
| `small-business-erp-options.webp` | Choosing an ERP: NetSuite, Acumatica, Odoo, Fishbowl, Katana | Five different brass and steel keys laid in a row on a wooden workbench, one key lifted beside a closed padlock. |

## Later or not needed

- `quickbooks-integration.webp`: keep the prompt above, but its page waits for the sandbox connector (integration is a section of the QuickBooks page for now). Generate it whenever convenient.
- Dropped (demand too low; existing pages cover them): heat-number traceability, US requirements checklist.
