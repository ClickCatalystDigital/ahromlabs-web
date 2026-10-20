# Plan: service families, service pages, new services (20 Oct 2026)

Nothing here is built. Source list: `docs/capability-inventory.md`.

## 1. URLs

| URL | What it is |
|---|---|
| `/services` | Stays. The full catalogue: intro, the five families, every service with its anchor (`#custom-erp-crm` …). Old links such as `/services#tally-integration` keep working: a fragment can't be redirected, so the anchors stay forever. Each section gains a link to its own page. |
| `/services/<family>` | **New.** A family page: tab bar on top (one tab per service in the family), then every service's plain name, answer and evidence below. |
| `/services/<service>` | **New.** One service per page: the same tab bar with its tab selected, then the full detail (answer, who it's for, evidence, clients, proof notes). |

- Families and services share one dynamic route, `src/app/services/[slug]/page.tsx`, built with `generateStaticParams` like `/notes/[slug]`. The build fails if a family slug and a service slug collide.
- **Tabs are links, not JavaScript.** Clicking a tab goes to that service's page, so every tab has its own URL, title and description. A search engine or agent reading the family page gets every service's text in the HTML. To a person it feels like the content below changes; `<Link>` keeps it instant.
- Flat service URLs (`/services/customer-portal`, not `/services/selling/customer-portal`) so a service can move family without its URL changing.

## 2. Families

| Slug | Plain name (people) | `name` (search and agents) | Services |
|---|---|---|---|
| `selling-and-customers` | Win orders and keep customers in the loop | Sales CRM, quotations and customer portal | customer-portal, (later: sales-crm, service-and-amc) |
| `buying-and-stores` | Buy at the right price and know what's in stock | Procurement, supplier portal and inventory | supplier-portal, inventory-and-reservations |
| `making-and-delivering` | Know what goes into everything you make | Production, BOM and dispatch | bom-from-excel, material-traceability, (later: dispatch) |
| `money-and-people` | Keep the books, GST and wages right the first time | Accounting, GST, Tally and payroll | compliance-accounting, tally-integration, multi-company-finance, receivables-from-tally, daily-wage-payroll |
| `seeing-and-asking` | See your numbers and ask your own records | Analytics and AI | operational-intelligence, document-extraction, custom-ai-assistant, rag-knowledge-graphs |

`custom-erp-crm` belongs to no family. It's the whole system, so it introduces `/services` and the home page section, and every family page links back to it.

The four-layer ladder (records → operations → analytics → AI) stays on `/services` as the "how we build it" story. Families are for finding things; layers are for the order we build them in. Same data, two views.

## 3. Data shape (`src/lib/services.ts`)

```ts
export type Family = {
  slug: "selling-and-customers" | "buying-and-stores" | "making-and-delivering" | "money-and-people" | "seeing-and-asking";
  name: string;        // search/agent wording, used in <title> and schema
  plainName: string;   // the heading people read
  summary: string;     // 40-60 words, answer-first, for the family page and llms.txt
  image: string;       // /what-we-build/<family>.webp
};

export type Service = {
  slug: string;
  name: string;
  plainName: string;
  family: Family["slug"] | null;   // null only for custom-erp-crm
  layer: Layer["slug"];            // unchanged
  answer: string;
  forWhom: string;
  evidence: { metric: string; value: string }[];
  proof: { kind: "note" | "pattern"; slug: string }[];
  links?: { href: string; label: string }[];
};
```

- One new field on services (`family`), one new array (`families`). Everything else stays.
- `serviceUrl(s)` and `familyUrl(f)` helpers in `services.ts`, so the URL format lives in one place. Every consumer switches to them.
- A build check (next to `resolveProof`): every family has at least one service, and no slug is used twice.

## 4. What changes where

| File | Change |
|---|---|
| `src/app/services/[slug]/page.tsx` (+ `opengraph-image.tsx`) | New: family page or service page, by slug |
| `src/app/services/page.tsx` | Groups by family; each service section links to its page; anchors kept |
| `src/app/page.tsx` | "What we build": five family cards (see §6) |
| `src/lib/schema.ts` | Each Service's `@id` and `url` become its own page. The OfferCatalog nests one OfferCatalog per family. |
| `src/app/knowledge.json/route.ts` | New `kind: "family"` nodes; each service node gains `family` and its own `url` |
| `src/app/llms.txt/route.ts` | Services listed under family headings, each with its own URL |
| `src/app/sitemap.ts` | Adds the 5 family pages and every service page |
| `notes`, `patterns`, `industries`, `work` pages | "Used in" links point to the service's own page instead of `/services#slug` |
| Chatbot / AI Search | Nothing to do: the deploy sync picks up the new pages |

Risk check: nothing is removed, old anchors still resolve, `name` and `answer` stay word for word, so what agents already quote stays true. The only visible change for agents is better URLs.

## 5. New services (first batch: live, and buyers would recognise them)

| Slug | Family | Plain name | Clients (as named on the site) | Proof |
|---|---|---|---|---|
| `customer-portal` | selling | Your customers follow their order and order again, without calling you | boiler manufacturer, LS Technologies | **New note 1** |
| `custom-ai-assistant` | seeing | An assistant built on your own system, that answers in your words and never invents a number | Savistar & Saag, LS Technologies, boiler manufacturer | **New note 2** + `unconfirmed-inferences-stay-read-only` |
| `supplier-portal` | buying | Suppliers quote on a link and see their PO when you accept | boiler manufacturer | **New note 3** |
| `inventory-and-reservations` | buying | Stock you can scan, set aside for each customer order | LS Technologies | **New note 4** |
| `material-traceability` | making | Every plate, cut and offcut accounted for | boiler manufacturer | `plate-remnants-back-into-stock` (exists) |
| `bom-from-excel` | making | A BOM built from your own Excel, and it learns your categories | boiler manufacturer | `one-confirmation-teaches-the-system` (exists) |
| `receivables-from-tally` | money | Who owes you and who you owe, always current, straight from Tally | LS Technologies | `reconcile-against-source-of-truth`, `local-agent-cloud-db` (exist) |
| `daily-wage-payroll` | money | Daily-wage attendance and payroll without a register | Savistar & Saag | `derive-balances-dont-store-them` (exists); a short note would help |

Freight and vendor rate checks (B5) are already the evidence on `operational-intelligence`. They stay there, not as a separate service.

**Later, once live or connected:** sales CRM with lead sources (S2, when the IndiaMART/TradeIndia/JustDial keys are in), WhatsApp in client systems (S3), service and AMC (S6), dispatch and shipments (M4), planning (M1), morning brief (A2).

The positioning line from Pujan's answers goes into the `/services` intro and the ERP answer: **"The system fits the way your business already works, not the other way round."**

## 6. Home page

- **Section intro:** the ERP card becomes the lead: "One system for the whole business, from enquiry to dispatch", with the gear-train image wide, then the positioning line.
- **Five family cards** under it: illustration, family plain name, its services' plain names as small links, the whole card linking to the family page. Five cards instead of 7 (or 15) keeps the page short as services grow.
- **Illustrations:** reuse the stamp for money and people, the gauge for seeing and asking, the gears for the ERP lead. Three new ones in the same style: selling (a shop counter bell, or a parcel with a tracking tag), buying (a wooden crate with a shipping label), making (a bench vice holding a cut plate). Prompts to follow, same style block as before. The other existing images (flange, keys, loupe, card drawer) become the images on their service pages.
- **The 7-card version in the working tree** (illustrations and plain names, uncommitted) can go live now and be replaced when this lands, or wait and ship together.

## 7. Notes to write first

All four use facts from the system docs; the boiler client stays unnamed.

1. **"What a customer sees: one boiler order through eight departments"**: the portal (phases in business language, drawings to approve or upload, QC certificates, packing lists, invoices, the QR sticker on the nameplate), plus how LS's partner store buys through it. Proof for `customer-portal`.
2. **"An assistant that only answers from your ledger"**: a decision model picks the question type and a fixed look-up runs the query, so numbers come from the same maths as the screens; the persona number guard; refusals; the misses list; 55/55 eval questions including Hinglish. Proof for `custom-ai-assistant`.
3. **"Suppliers quote on a link, not a login"**: RFQ link, comparison, accepted quote becomes a PO, the supplier records dispatch with the LR and photos, Stores sees it on the way; conversation stays on WhatsApp and phone. Proof for `supplier-portal`, and the "fits how you already work" idea.
4. **"Reels, boxes and two stores"**: QR scan from a phone, approvals for staff entries, a partner store with its own daily gate, reservations against customer POs, 5,256 reels migrated with no loss. Proof for `inventory-and-reservations`.

## 8. Order of work

1. Notes 1–4 (each validated by `npm run content:build`).
2. Data: `families`, `family` on services, the eight new services, helpers and build checks.
3. Routes: `/services/[slug]`, the `/services` regroup, internal links, schema, `knowledge.json`, `llms.txt`, sitemap.
4. Home page: ERP lead and five family cards (after the three new illustrations).
5. Check: build, every old `/services#…` anchor still lands, Search Console request indexing for the new pages (about 13).
