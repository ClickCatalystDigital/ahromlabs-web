# Knowledge base: how it is built, and what's next

Written 2 Nov 2026 as the hand-over for a new chat. Read this whole file, then `SYSTEM.md`, before writing any page.

## 1. Where things stand

- **221 pages.** By market signals (section 7): 108 lean India, 56 North America, 57 common. Rough score 62/100:
  depth 8/10, accuracy 9/10, machine readability 9/10, SEO structure 8/10, India coverage 8/10, **US coverage 5/10,
  outside links 2/10, measured results 2/10** (90 days: India 144 sessions, US/Canada 4).
- **Two markets, one site** (`src/lib/markets.ts`, `docs/markets-plan.md`). Visitors get their market's version at the
  shared URL (`src/proxy.ts`: `?market=` > saved choice > Cloudflare country). Pages with a US version also have their
  own URL under `/us` with `hreflang` (`languages()` in markets.ts); search engines and AI crawlers always get each
  URL as written. Only `/`, `/services`, `/services/inventory-and-reservations` have US versions today (`ADAPTIVE`).
  India-only links carry `data-only="IN"`, US-only `data-only="NA"` (`IN_ONLY` / `NA_ONLY` lists).
- **Hubs** (each: `content/<hub>/*.md` + `src/lib/<hub>.ts` + `src/components/<Hub>Page.tsx` on `GuidePage`):
  IBR (`/ibr`, India), BOQ (`/boq`, India), ERP requirements (`/erp`, India), AI assistants (`/ai-assistant`, common),
  ASME (`/asme`, US), manufacturing (`/manufacturing`, US), glossary (`/systems`), notes, patterns, industries,
  services (`src/lib/services.ts`).
- **Four US demos live** (separate deployments, US sample companies, `MARKET=NA` builds): interiors-erp-us,
  electronics-erp-us, boiler-erp-us (ASME), construction-erp-us, all `.ahromlabs.com`; owner pass 7878.
  Linked for US visitors through `usUrl` in `src/lib/work.ts`. Assistants: Atelier AI (interiors), Ohm AI
  (inventory), Ember AI (boiler), Datum AI (construction).
- **Measurement:** `npm run google -- gsc_queries '{"days":90,"country":"usa"}'` (also `gsc_pages`,
  `gsc_page_queries`; codes are ISO alpha-3: usa, can, ind). GA4 has user dimension "Market" and event dimension
  "Page market" (IN / NA) from `src/components/Analytics.tsx`.

## 2. Rules every page follows (the robustness)

1. **Answer first.** Frontmatter `answer` is 40–60 words that answer the page's question outright; `description` ≤160
   chars (build fails over); title ≤60 chars incl. " | Ahrom Labs" (`seoTitle`).
2. **Question-shaped headings** in the words people search; tables for comparisons; no FAQPage schema (retired).
3. **Facts from official sources only, quoted exactly.** Each page lists `sources` (title, publisher, https url,
   date). Quotes go in `checks` and are verified word for word at build against saved texts in
   `~/Developer/FOLDER SAMPLE - FOR APP/<Hub>/sources` (`scripts/check-*-quotes.mjs`). Paid standards (ASME, IS/BIS)
   are cited by number and explained, never reproduced.
4. **Every internal link must exist** (hub check scripts fail on dead links) and each guide links 2+ siblings.
5. **Market fit is checked** (`scripts/topics.check.ts`, in `npm run content:build`): AI pages must stay common;
   ASME and manufacturing must not lean Indian. Add every new hub to its `RULES`.
6. **US words for US pages** (estimate, inquiry, shipping, mill test report, sales tax, QuickBooks, $, imperial);
   Indian words for Indian pages. Never invent clients or numbers; Shanti Boilers is never named.
7. **Each page has an image** (prompts in `docs/<hub>-image-prompts.md`; Pujan generates PNGs;
   `python3 scripts/asme-images.py <folder> <hub>` makes the WebP + share card; alt text in the hub's images file).
8. **Boundary note** on every page: what it is not (legal/tax/engineering advice), the edition or date checked.
9. **`updated` bumped** whenever a committed page changes (build fails otherwise).
10. **Machine surfaces update themselves:** sitemap, `llms.txt`, `knowledge.json`, Markdown twins, the chatbot's
    entries (`src/lib/ahrom-ai.ts`: add a new hub's kind to its loop and the KINDS "about_us" line).

## 3. How to add a hub (the pattern)

Copy the ASME hub: `src/lib/asme.ts` (groups, order), `src/components/AsmePage.tsx` (frame, CTA by market with
`only()`), `src/app/asme/` (index, `[slug]`, questions + `.json`/`.csv`, opengraph images), `scripts/asme.check.ts`
(groups, links, calculators), `scripts/check-asme-quotes.mjs`, register the kind in `scripts/build-content.mjs`
(`KIND_DIRS`, validation, `RENDERERS`, `PAGE_SOURCES`) and `src/lib/content.ts`, then sitemap, llms.txt,
knowledge.json, footer and `FreeGuides`. Tools: pure maths in a `*-calc.ts` with asserts in the check script, UI in a
client component, optionally WebMCP tools in `WebMcpTools.tsx`.

## 4. Deferred work, in order, with what "done" means

1. **Topic map for every page.** Extend `topics.check.ts` with every kind and its market (IN / NA / common).
   Done: build fails if any page leans the wrong way; current pages pass or are fixed.
2. **US sales tax hub** (`/sales-tax` or inside manufacturing): nexus (economic thresholds), exemption and resale
   certificates, sales tax on manufacturing inputs, how an ERP should handle it. Sources: state revenue department
   pages and the Streamlined Sales Tax site, quoted and checked. Done: 6–8 guides, a nexus checker tool, links from
   the US home, services and the four US demos' pages; market check NA.
3. **Construction hub, both markets.** US: pay applications (AIA G702/G703 explained, not reproduced), retainage,
   lien waivers, change orders, job costing, WIP schedule. India: RA bills, measurement book, TDS 194C, GST on works
   contracts. Datum AI and both construction demos show all of it; link them. Done: hub with US and India groups,
   `/us` versions where a page differs, quote checks for Indian law, market check per page.
4. **QuickBooks pages** (Pujan's next task; manufacturing hub already has three) and **Tally vs custom / migrating
   off Tally** (India).
5. **Case studies with numbers**, one per demo industry (interiors, inventory, boiler, construction): situation,
   what was built, before/after figures only where the client confirms them. Done: on `/work` and each industry page;
   Shanti stays unnamed.
6. **US distributor inventory** (cycle counting, lot/serial traceability, FIFO valuation, barcodes) and **ERP choice
   for small US firms** (custom vs NetSuite, Acumatica, Odoo, Fishbowl, Katana; facts from vendors' own pages only).
7. **Source monitoring.** A script that re-fetches every `sources` URL, hashes the text and reports changes (weekly
   cron or deploy step). Done: replaces the monthly manual IBR/GST/Intuit checks in `docs/owner-todo.md`.
8. **Named reviewers**, one per hub (CA for GST, Authorized Inspector or QA engineer for ASME, lawyer for data
   safety), shown in the byline. Needs Pujan to find them.
9. **Monthly market report.** Per hub: impressions, clicks, top queries for `usa` and `ind`; pick the next pages
   from real queries. Done: a `npm run google` command or doc template, run around the 1st of each month.
10. **Outside links.** Share the calculators and checkers where buyers ask (LinkedIn, welding/manufacturing forums,
    r/manufacturing), finish directory listings, get client reviews. Pujan's part; track in `docs/owner-todo.md`.

Also open: merge the US demo branches into each repo's `main` after Pujan walks them (savistar-ops `us-demo`,
ls-inventory `demo-us-market`, shanti-ops US branch; structonova-ops already merged); request indexing for `/us`,
`/us/services`, `/us/services/inventory-and-reservations`.

## 5. How to work (traps we hit)

- **One deploy at a time from this folder.** Two `npm run deploy` runs at once corrupt `.open-next` (ENOENT); check
  `pgrep -f "npm run deploy"` first.
- **Disk:** builds need a few GB; delete `.next`, `.open-next` and scratch worktrees when done (`df -h /`).
- **Cloudflare overwrites `cf-ipcountry`** on live requests: test markets with `Cookie: market=NA|IN`, not the header.
- **A saved market choice wins** over country for a year; when the site "looks wrong", check the cookie first.
- **Usage is limited:** run one big piece at a time, commit and deploy each piece, write what's left here.

## 6. Done means

Build passes (all checks, incl. quotes, links, topics), deployed with `npm run deploy`, checked live (both markets
where relevant: `Cookie: market=NA` and `market=IN`), `docs/owner-todo.md` updated with anything Pujan must do
(images, indexing, reviews), and this file updated.

## 7. How the market lean is measured

Counted per 1,000 words of a page's own text. India signals: ₹, GST, Tally, IBR, lakh, crore, TDS, e-way, India(n),
Ahmedabad, DPDP, HSN, Hinglish. US signals: $amounts, QuickBooks, sales tax, ASME, US, United States, Canada, FTC,
CCPA. A page leans a market when that rate is 3+ and over twice the other's; otherwise it is common.
`scripts/topics.check.ts` has the lists.
