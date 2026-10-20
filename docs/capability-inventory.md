# Capability inventory (20 Oct 2026)

Everything the client systems can do that could become a service on the site, read from each system's own documentation:

- **SB Ops**: the boiler client. Must not be named on the site; call it "a boiler and pressure-vessel manufacturer". `shanti-ops/SYSTEM.md`, all 13,200 lines.
- **Inventory Ops**: LS Technologies, electronics and PCB trading. `ls-inventory/SYSTEM.md` and `ls_crm/SYSTEM.md`.
- **Designer Ops**: Savistar Interiors and Saag Furniture. `savistar-ops/SYSTEM.md`, `DEMO.md` and `GAP-ANALYSIS.md`.

Nothing here is on the site yet. Mark it up: tick what to publish, correct any status that's wrong.

## Status key

- **Live**: deployed and used with the client's real data. Safe to claim.
- **Deployed**: live in the client's app, but the docs don't show the client using it yet. Confirm before claiming it as in use.
- **Built**: in the code, not switched on or not tested live (usually waiting on a client key, account or approval).
- **Partial**: part is live, part isn't. The note says which part.

Each candidate also lists its **proof**: the published note or pattern a service on the site would cite. The build fails if a cited note doesn't exist, so "needs a note" means one has to be written before the service can go up.

---

## Already on the site (7)

| Service | Systems | Status |
|---|---|---|
| One system for the whole business (Custom ERP) | all three | Live |
| GST returns and TDS (compliance) | SB Ops | Live. The e-way bill client is built but not live (no NIC account yet) |
| Your software and Tally in sync | Inventory Ops | Live |
| Sister concerns, one set of books | Designer Ops | Live |
| Your numbers without Excel (analytics) | SB Ops, Designer Ops | Live |
| Purchase bills read by AI, checked by your accountant | Inventory Ops | Live |
| Ask your own records a question (RAG) | this site; Designer Ops' assistant | This site: live. The client assistants (A3) are live in all three systems (Pujan, 20 Oct) |

---

## New candidates, grouped by a possible family

### Selling and customers

| # | Plain name | What it does | Systems | Status | Proof | Speaks to |
|---|---|---|---|---|---|---|
| S1 | **Your customers see their order's progress, without calling you** | A login per customer; each order as phases in business language with % done and expected dispatch; drawings, QC certificates, packing lists and invoices appear as they're released; status emails; the customer can upload their own drawings; a QR sticker on the nameplate opens the order | SB Ops (full), Inventory Ops (order status per line, progress bar) | **Live** (Pujan, 20 Oct): customers log in, follow their order through every department, approve drawings, upload their own, and open packing lists, invoices and POs any time. LS: the partner store's customer buys through it too | Needs a note | Everyone |
| S2 | **Every enquiry, from IndiaMART, TradeIndia, JustDial, WhatsApp and your website, in one list until it becomes an order** | Leads pulled from each portal every few minutes, shared out by round-robin, follow-up diary, weekly planner, enquiry → quotation → order, win/loss and funnel reports | SB Ops | **Partial**: Sales CRM live with real imported history (old CRM diary and quotations). Portal connections (IndiaMART, TradeIndia, JustDial) built, keys coming soon (Pujan, 20 Oct); website push tested live | Needs a note | Everyone, very Indian |
| S3 | **Customers and staff on WhatsApp, inside the business system** | Shared WhatsApp inbox on Meta's own API (no reseller), conversations routed to the right salesperson, approved templates, monthly spend shown | SB Ops; Ahrom Labs' own CRM | **Partial**: live and working in Ahrom Labs' own CRM. Built the same way in SB Ops, client number not connected yet | `docs/whatsapp-cloud-api-setup.md` exists (internal); needs a public note | Everyone |
| S4 | **Quotations and offers in your format, revised without starting again** | Product picker, your terms and conditions, GST lines and amount in words, revisions, price history, reminders for quotes that went quiet | SB Ops | Live (real quotation register imported). Composer page itself not click-tested | Needs a note | Manufacturers, traders |
| S5 | **A product catalogue your customers can browse and ask a quote from** | Catalogue by product group, "find the right model" by use, fuel, output and pressure, quote basket, no prices shown | SB Ops | **Live** (Pujan, 20 Oct): customers see what they can buy and request a quote, which reaches Sales as an enquiry | Needs a note (can share S1's) | Manufacturers with a range |
| S6 | **After-sales visits, AMCs and service costs tracked** | Service calls with SLA, visits, AMC contracts with renewals and profit, preventive maintenance due dates, engineers' cash requests and travel claims with approvals, signed commissioning reports | SB Ops | **Deployed**. Docs don't show real AMC or service data yet | Needs a note | Equipment makers, installers, fit-out |

### Buying and stores

| # | Plain name | What it does | Systems | Status | Proof | Speaks to |
|---|---|---|---|---|---|---|
| B1 | **Suppliers quote, confirm and ship through one link** | Purchase requests, RFQs, side-by-side quote comparison, PO drafted from the chosen quote, then the supplier's private page: their PO copy, dispatch with LR/vehicle and photos, delivery lots. Stores sees "on the way" | SB Ops | **Live** (Pujan, 20 Oct): suppliers get the RFQ link, enter rates, see if they were accepted, then see the PO. Talking to them still happens on WhatsApp, email or phone, as it did before | Needs a note | Manufacturers, traders |
| B2 | **Every plate, cut and offcut accounted for, from receipt to dispatch** | Traceability per piece, cutting and remnants back into stock, scrap, cost per cut piece, "steel reused" counter, heat and lot numbers | SB Ops | Live (stock register replaced from the client's own, 6 Oct) | `plate-remnants-back-into-stock` exists | Fabricators, manufacturers |
| B3 | **Stock you can scan: every reel, box and store, with a QR label** | Inward and outward by QR scan from a phone, labels and packing lists printed, multiple stores and transfers, staff entries approved by a manager, dead and low stock, daily report PDF | Inventory Ops | Live (5,256 reels on the live database) | Needs a note | Traders, distributors, any stockist |
| B4 | **Stock set aside for each customer order, and what's still to buy** | Reserve stock against a customer PO line; shortfall pooled into a procurement order (including imports), received goods reserved to waiting orders automatically | Inventory Ops; SB Ops material plan | **Live** (Pujan, 20 Oct): in use, refined with the client as they need | Needs a note | Traders, manufacturers |
| B5 | **Freight and vendor bills checked against your agreed rates** | Rate card per route and vendor; every charge compared and overcharges flagged; partial deliveries and returns netted | Designer Ops | Live | `reference-rate-anomaly-detection` exists | Everyone who ships |

### Making and delivering

| # | Plain name | What it does | Systems | Status | Proof | Speaks to |
|---|---|---|---|---|---|---|
| M1 | **Job cards and a shop-floor plan that knows what material is missing** | Work orders, job cards by product type, capacity by workstation, a schedule, a material plan that shows covered and short lines, alerts 14 days before a shortage hits | SB Ops | **Partial**: job cards and work orders live; the planning workspace was added 30 Sep, use not confirmed | Needs a note | Manufacturers |
| M2 | **Engineering calculations that stay with the drawing** | A calculation engine with formulas, validations, goal seek and change impact, linked to drawings and BOM releases | SB Ops | **Deployed** | Needs a note | Engineering manufacturers (niche) |
| M3 | **A BOM built from your Excel in minutes, and it learns your categories** | Import the client's own BOM sheet, auto-categorise, learn from each correction, release snapshots, where-used | SB Ops | Live (six real client files tested through the UI) | `one-confirmation-teaches-the-system` exists | Manufacturers |
| M4 | **Dispatch that combines loads and keeps the paperwork straight** | Packing lists, combining several orders on one truck, carrier and LR records, e-way bill numbers, combined PDFs | SB Ops; Inventory Ops packing lists | Live (packing). Shipments and carrier records deployed 4 Oct | Needs a note | Manufacturers, traders |
| M5 | **Projects, site visits and material palettes in one place for a design studio** | Milestones, site visits, mood boards of project photos, material palettes, workshop order board, conversation log per client | Designer Ops | **Partial**: core live; the photo and palette UI was on the demo first, live deploy pending | Needs a note | Designers, fit-out |

### Money and people

| # | Plain name | What it does | Systems | Status | Proof | Speaks to |
|---|---|---|---|---|---|---|
| F1 | **Who owes you, and who you owe, always current** | Receivables with ageing and a collections outlook, payables (domestic and import), sales and purchase registers, cash and bank, all pulled from Tally every few minutes; payment reminders become tasks | Inventory Ops | Live | `reconcile-against-source-of-truth` exists | Everyone on Tally |
| F2 | **Daily-wage attendance and payroll without a register** | One-tap attendance, work log per order, advances recovered automatically, payroll computed as days × rate − advances | Designer Ops; SB Ops payroll export | Live | Needs a note | Workshops, contractors, studios |
| F3 | **Approvals that happen on time** | Discounts, expenses, stock entries and access requests waiting for the right person, with a daily gate where needed | SB Ops, Inventory Ops | Live | `fail-closed-preserve-visibility` might fit | Everyone (better as a feature than a service) |

### Seeing and asking

| # | Plain name | What it does | Systems | Status | Proof | Speaks to |
|---|---|---|---|---|---|---|
| A1 | **An owner's page: on track, what needs me, is money moving** | Five KPIs, milestone tracker, top risks, dispatches due, outstanding, sales funnel, cash | SB Ops | Live | `compute-blockers-on-read` exists | Owners. Could fold into the analytics card |
| A2 | **A morning brief in your inbox** | Daily email at 8 AM: what's due, late and waiting | SB Ops | **Built**; no real email sent yet | Not ready | Owners |
| A3 | **Ask your business a question, in Hindi or English** | Read-only assistant over your own data, answers as tables, never invents a number, staff only see their own | Designer Ops, Inventory Ops | **Live** in all three (Pujan, 20 Oct). Built per system, not generic: Atelier AI in Designer Ops has its own personas; it compares periods, answers "what do I have tomorrow", saves notes against a client | Needs a note | Everyone. Could be the client-proven half of the RAG card |

---

## Left out, and why

- **USB, phone and website blocking for staff PCs** (SB Ops §9–17): a separate security product. It would confuse the "business backbone" story. It could be its own page later.
- **Quality NCRs, inspections and calibration**: real and deep, but niche. Better as detail on the IBR and manufacturing industry pages than as a home page service.
- **Multi-company onboarding, view as department head, help guide, alerts**: features of every system, not services anyone shops for.
- **Telegram document intake** (LS): a detail of the AI extraction card.

---

## What this suggests for the site

1. **Families:** the five headings above (Selling and customers; Buying and stores; Making and delivering; Money and people; Seeing and asking). They're named by the part of the business, which is what owners look for. The existing seven slot into them: compliance, Tally and sister concerns go to Money; ERP spans all of them and stays as the intro; analytics, extraction and RAG go to Seeing and asking.
2. **Page shape:** `/services/<family>` with a tab bar; each service at `/services/<slug>`. Every tab's summary stays in the HTML, so search engines and agents read all of them.
3. **Home page:** one card per family (five illustrations), not one per service.
4. **Order of work:** the ones safe to claim now with existing proof are B2, B5, F1 and M3. The ones worth writing a note for first (biggest reach) are S1, S2 and B3.

## Answers (Pujan, 20 Oct)

- **Customer portal and shop:** customers have logins; they follow orders through every department, approve or upload drawings, and open packing lists, invoices and POs any time. The shop shows what they can buy and sends quote requests to Sales.
- **Lead sources:** not connected yet, keys coming soon. WhatsApp works on Ahrom Labs' own number; the same setup will work for clients.
- **Supplier link:** live. Suppliers enter rates on the RFQ link, see whether they were accepted, then see the PO. Conversations stay on WhatsApp, email and phone. **The system fits the client's current way of working, not the other way round.** This is a positioning line worth using on the site.
- **Assistants:** live in all three systems, each built for its own system (custom tools, Designer Ops with personas), not a generic chatbot.
- **LS:** Orders, reservations and procurement in active use and refined with the client. The partner store (Gelco) is LS's second store, and its customer buys through the portal.

## Revised shortlist

**Ready to write up** (live, worth the most to a buyer):
1. S1 + S5 together: **customer portal and shop** ("Your customers see their order's progress and order again, without calling you")
2. A3: **an assistant built for your system**, replacing the RAG card's "no client deployment yet"
3. B1: **suppliers quote and see their PO through one link**
4. B3 + B4: **stock you can scan, set aside for each order**
5. Safe now with existing proof: B2 (offcuts), B5 (rate checks), F1 (receivables from Tally), M3 (BOM from Excel)

**Wait:** S2 (until the lead-source keys are connected), S3 in client systems, A2 (morning brief), M1 planning, M2 (niche).
