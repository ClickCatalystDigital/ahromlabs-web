# ahromlabs.com: next changes for SEO and AEO

Written 5 Nov 2026 from a crawl of all 249 pages in the live sitemap (after the US industry pages went live), plus
two changes agreed in chat. AEO = being picked up and quoted by answer engines (ChatGPT, Claude, Perplexity, Google AI
Overviews). Each item says what is wrong, where, and what done looks like. Ordered by impact for the effort.

## Already in good shape (don't redo)

- All 249 sitemap pages answer 200, one `<h1>` each, canonical matches the URL, no duplicate meta descriptions.
- India and US versions joined by hreflang (home, services, inventory service, boiler and interiors industry pages).
- robots.txt allows every AI crawler; llms.txt, llms-full.txt, knowledge.json, Markdown twins and MCP are live;
  Cloudflare skips Browser Integrity Check on public pages (custom rule, 4 Nov).
- Notes and industry pages already use question headings with the answer in the first sentence.
- Trailing-punctuation URLs from crawlers (`/asme/mawp).`) redirect to the real page.

## P1: high impact, small effort (next session)

1. **Broken link: `/ibr/forms/form-i-part-a` returns 404.** Linked from `content/asme/data-reports.md:71` and
   `content/asme/asme-vs-ibr.md:71`. Form I Part A has no `page` in `src/lib/ibr-forms.ts`, so no page is built.
   Done: link to the form's row on `/ibr/forms` (anchor) instead, or give the form a page.
2. **Construction has no industry page.** It only has a card on /industries pointing at `/work#construction-company`,
   though it has a live demo (India and US builds) and a narrated YouTube tour (Sitebook Ops, 1:23). Done:
   `content/industries/construction-company.md` (India: daily reports, BOQ, RA bills, GST on works contracts) plus
   `content/industries/us/…` (US: pay applications, retainage, lien waivers, change orders), the YouTube tour as the
   page's VideoObject, then the /industries card links to it instead of /work. Biggest single gap for "construction
   ERP" searches.
3. **/work, North America: link text is the India title.** `src/app/work/page.tsx:59` prints `industry.title`
   ("ERP software for boiler and pressure-vessel manufacturers") for every market; the link already opens the US page.
   Done: show `industry.na.title` to North America with `only(["NA"])`, as /industries does.
4. **/industries: nothing tells you to scroll.** The 4:5 cards put almost all of the first row below the fold on a
   laptop. Done: the top of the first row's images shows above the fold at 1280×800 (less space above the grid, or a
   shorter 4:3 frame). Not a loading skeleton: that reads as "still loading".
5. **Duplicate title: `/services` and `/us/services`** both say "Services: custom ERP, CRM, analytics and AI | Ahrom
   Labs". Done: a US title (QuickBooks, job shops) in `src/app/us/services/page.tsx`.
6. **36 pages have no date in their schema** (`dateModified`): `/`, `/services` and its 22 service pages, `/work`,
   `/about`, `/approach`, `/engagement`, `/industries`, `/notes`, `/patterns`, `/agents`, `/privacy` and the 4 `/us`
   pages. Answer engines favour pages that say when they were last checked. Done: `dateModified` from the last commit
   of each page's source (the sitemap already computes these dates in `build-content.mjs`).

## P2: high impact, more work

7. **Guide headings are statements, not questions (about 110 pages).** ASME (31), BOQ, ERP, AI assistant,
   manufacturing, sales tax and construction guides use headings like "Four pressures, in order" or "Hot and
   corroded, new and cold" (`/asme/mawp`). Answer engines match a buyer's question to a heading, then quote the first
   sentence under it. Done: each H2 is the question a buyer types ("What is MAWP?", "Why can MAWP be higher than
   design pressure?"), with the answer in the first sentence below it. Start with ASME (US buyers, highest intent),
   then manufacturing and sales tax.
8. **US tour videos for the two new US industry pages.** `/us/industries/boiler-pressure-vessel-manufacturing` and
   `/us/industries/interior-design-and-furniture` have no video (the India tours show IBR forms and rupees). Done: a
   short narrated tour of each US demo on YouTube, added as `video:` in `content/industries/us/<slug>.md` (the
   content build would need to accept it there) so it becomes the page's VideoObject.
9. **64 titles longer than 60 characters** get cut off in search results, e.g. `/erp/compliance` (88),
   `/erp/selection-matrix` (80), `/erp/small-manufacturers` (71). Done: under 60 with the main keyword first.
10. **Glossary pages are thin: 40 `/systems` terms under 200 words**, 35 under 150 (e.g. `/systems/reverse-charge`
    83 words, `/systems/nbic` 88) and 20 of them have only one link pointing at them. Done: each term gets "where this
    shows up in a system we built" with a link to the note or industry page, and is linked from inside the notes
    where the term is used. Or merge the weakest into their parent guide.
11. **No breadcrumbs in the schema on 83 pages**: notes (17), patterns (20), systems (42) and industries (4). Done:
    `BreadcrumbList` like the service and guide pages already have.

## P3: worth doing, lower impact

12. **Service page illustrations have empty alt text** (`alt=""` on `/what-we-build/*.webp`, on 26 pages: `/`,
    `/services` and the service pages). Fine for screen readers if purely decorative, but it gives image search
    nothing. Done: a short description per illustration.
13. **5 meta descriptions over 160 characters**: `/about/pujan-motiwala` (167), `/erp/template` (166),
    `/construction` (163), `/ai-assistant/number-check` (162), `/sales-tax` (161).
14. **Question-and-answer structure in the schema** for notes and industry pages: their question headings could
    feed a `Question`/`Answer` list. Google no longer shows FAQ rich results for most sites, so this is for answer
    engines only; do it after 7.
15. **Client quote as a review**: the Savistar & Saag owners' quote on the interiors page could be marked up as a
    `Review` of the Organization. Google ignores self-published reviews for rich results; AI engines may still read it.
    Low priority; ask the clients first.
16. **More client quotes and outside reviews** (from the earlier audit: the biggest gap in proof). One named quote
    each from LS Technologies and the boiler client, and 2–3 reviews on Clutch, GoodFirms or DesignRush. Only Pujan can
    get these.

## Not problems (checked)

- `/us`, `/us/services`, `/us/industries/*` have no links pointing at them inside page content: by design, North
  American visitors get them at the shared URL and crawlers find them through hreflang and the sitemap.
- `/agents` and `/privacy` are linked from the footer only; fine for pages of that kind.
