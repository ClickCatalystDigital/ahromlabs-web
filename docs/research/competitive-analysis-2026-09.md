# Competitive analysis — buyer intents, who ranks, where we can win

Run 2026-09-24. Step 1 of 3 (research → rewrite plan → build). **Ranks 1–6 were built the same
day** — see docs/progress.md; rank 7 (off-site) is the founder's.

## Method and limits

- ~25 web searches across the buyer intents below, US-region results, 2026-09-24.
- **Competitor pages could not be opened** — the session's egress proxy blocks direct fetches, so
  page structure (headings, FAQs, depth) is inferred from search summaries, not read.
- **No search-volume data** — no keyword tool available. "Crowded / open" below means how many
  purpose-built pages answer the intent, not how many people search it.
- **Attribution caveat.** Figures in §1 come from search summaries that pooled several 2026
  citation studies; the linked study is the most likely source, but open it before quoting a
  number publicly.
- **No LLM testing.** ChatGPT, Perplexity and Gemini weren't queried from here. The 15 prompts in
  `docs/citation-baseline-2026-08.md` still need running by hand; that is the real baseline.

## 1. Where AI answers come from (drives where effort goes)

| Finding | Source |
|---|---|
| Perplexity's most-cited domains: LinkedIn, YouTube, Reddit | [Orbit Media, 13,184 citations](https://www.orbitmedia.com/blog/ai-citation-sources/) |
| Reddit ≈ 47% of Perplexity's top citation sources | [Enrich Labs](https://www.enrichlabs.ai/blog/generative-engine-optimization-geo-complete-guide-2026) |
| ChatGPT cites vendor pages twice as often as Perplexity (24% vs 12%), and favours pricing and help pages | [Growfusely](https://growfusely.com/blog/ai-citation-analysis-b2b-software/), [Discovered Labs](https://discoveredlabs.com/blog/chatgpt-claude-perplexity-and-google-ai-overviews-how-each-platform-cites-sources-differently) |
| Review sites (G2, Capterra, Gartner…) combined ≈ 7.3% of B2B citations | [Averi](https://www.averi.ai/how-to/chatgpt-vs.-perplexity-vs.-google-ai-mode-the-b2b-saas-citation-benchmarks-report-(2026)) |
| "Best company" queries are answered from listicles and directories: Clutch, DesignRush, agency top-10 posts | [Clutch](https://clutch.co/in/developers), [DesignRush](https://www.designrush.com/agency/software-development/in) |
| Quotations +41%, statistics +32%, cited sources +30% visibility lift in generative engines | KDD 2024 GEO study, via [Enrich Labs](https://www.enrichlabs.ai/blog/generative-engine-optimization-geo-complete-guide-2026) |
| FAQ rich results retired 2026-05-07; adding schema gave no significant ChatGPT/AI Mode lift | [HOTH](https://www.thehoth.com/blog/google-faq-rich-results-deprecated/), [Ahrefs test summary](https://aifromthefield.substack.com/p/faq-schema-dead-ai-citations) |

**Implication:** the site itself mostly wins **ChatGPT** (vendor pages, pricing pages).
**Perplexity** is won off-site — LinkedIn, YouTube, Reddit. **"Best firm for X"** answers are won
by being listed where the listicles pull from (Clutch, DesignRush, GoodFirms).

## 2. Market map — by buyer intent

| Buyer intent (their words) | Who ranks today | Their angle | Competition | Our asset |
|---|---|---|---|---|
| "ERP for boiler / pressure vessel manufacturer" | **Nobody** — only manufacturer directories | — | **Open** | Whole ShantiOps system |
| "IBR Form III / IV A software", "compile test certificates" | Regulator PDFs, Scribd, [Pathnovo](https://pathnovo.com/compliance/ibr) (registers/templates for boiler **owners**) | Compliance registers, Excel templates | **Open** for manufacturers | IBR folder note |
| "Tally vs ERP for manufacturing", "is Tally an ERP", "when Tally stops being enough" | [ERPDrive](https://erpdrive.in/blog/erp-vs-tally-for-manufacturing.html), [QuoteERP](https://blog.quoteerp.com/when-tally-stops-being-enough), Tally itself, Quora | "Stock as an attribute of a voucher is not manufacturing" | Crowded, **high intent** | Accounting-in-ERP note; multi-level BOM work |
| "ERPNext vs Odoo vs custom" | [Ksolves](https://www.ksolves.com/blog/odoo/compare-odoo-vs-erpnext), [Cudio](https://www.cudio.com/blog/erpnext-vs-odoo), [Shivit](https://shivit.com/blog/index.php/2026/02/18/zoho-erp-alternatives-india-manufacturing/) | Mostly recommend ERPNext for Indian compliance | Crowded | **A real story:** ShantiOps planned ERPNext for accounts, then reversed |
| "Custom ERP cost India" | Cost guides: [Digittrix](https://www.digittrix.com/blogs/erp-development-cost-india), [Appinventiv](https://appinventiv.com/blog/cost-of-erp-software-development/), [Bigsunworld](https://bigsunworld.com/blog/custom-erp-software-development-cost-in-india.html) | ₹3–15 lakh small, ₹15–40 lakh full; 3–12 months | Crowded | `/engagement` (no ₹ yet) |
| "Why ERP implementations fail" (India SMEs) | [Manufacturing Today India](https://www.manufacturingtodayindia.com/why-erp-projects-fail), [Indian Printer Publisher](https://indianprinterpublisher.com/blog/2026/05/traditional-erp-systems-india/), consultants | Adoption, data migration, mismatch with Indian operations | Medium | Model-first + phased delivery is the direct answer |
| "Tally integration with CRM / website / app" | Tally partners ([PrecisionTech](https://precisiontech.in/apps/tally/tally-integration/), [Welfare Infotech](https://www.welfareinfotech.com/tally-api-integration)), connectors ([api2books](https://api2books.com/), [CData](https://www.cdata.com/drivers/tally/)), Tally's own page | Sell a connector or TDL service | Crowded | Tally note + open-source library: the only public engineering write-up |
| "Tally XML import error: ledger does not exist" | Error guides: [excel4tally](http://blog.excel4tally.com/ledger-does-not-exist-in-tally-tally-xml-import-error/), [TrulyInvoice](https://www.trulyinvoice.com/blog/resolve-tally-excel-xml-import-errors), [importxml](https://www.importxml.com/blog/tally-xml-import-errors-and-fixes/), TallyHelp | One-off fixes | Medium | Our error taxonomy (transient vs structural) + code |
| "Automate purchase entry in Tally", "AI invoice OCR Tally" | SaaS: [Suvit](https://www.suvit.io/post/ai-gst-reconciliation-tally-automation), [AI Accountant](https://www.aiaccountant.com/blog/purchase-bill-entry-in-tally), [accubrAI](https://accubrai.in/), [TrulyInvoice](https://www.trulyinvoice.com/blog/automate-purchase-entry-tally), [KhataClerk](https://www.khataclerk.com/), even [ICAI](https://ai.icai.org/usecases_details.php?id=99) | Self-serve tools, 95–99% accuracy claims | **Very crowded** (products) | Real per-document zero-correction rates incl. bills of entry and freight |
| "Bank statement to Tally" | Tally built-in (145+ banks), TrulyInvoice, TDL vendors | Import features | Very crowded | Mutually-unique matching pattern (niche) |
| "Plate remnant / offcut tracking" | Global products: [Fulcrum](https://fulcrumpro.com/article/product-showcase-video-using-materials-for-remnant-tracking-quoting-purchasing-and-nesting-in-fulcrum), [FastTRACK](https://www.fastcam.com/fasttrack-database-for-processed-steel-plate.html), [STRUMIS](https://www.strumis.com/strumis_inventory.php), [RealSTEEL](https://www.realsteelsoftware.com/features/inventory-management/) | Tied to nesting software | Medium, **none Indian or ERP-integrated** | Remnant note with conservation numbers |
| "Software for interior design firm India" | SaaS: [DesignOS](https://designos.work/) (India, GST/TDS), [HelloGrowthCRM](https://hellogrowthcrm.com/industries/interior-design), Programa | Products | Crowded (products) | Design firm + sister furniture workshop on one book |
| "Sister concern / two firms same owner" | [CAclubindia](https://www.caclubindia.com/experts/two-firms-same-proprietor-but-different-work--2485504.asp) GST-law threads | Legal Q&A, no software answer | **Open** for a software answer | Two-companies-one-book note |
| "Electronic component inventory, reels" | Global SaaS: [PartsBox](https://partsbox.com/), BOMIST | Engineer/hardware-startup focus | Open for Indian traders on Tally | LS inventory patterns (thin today) |
| "RAG chatbot for company documents" | Agency listicles ([Softcolon](https://www.softcolon.com/blogs/rag-chatbot-development-companies-in-india/), [Nonivision](https://nonivision.in/rag-development-company-in-india/)) | Generic | Crowded, generic | Only our own corpus — no client deployment yet |

## 3. The single most useful finding

AI invoice-extraction vendors' **accuracy claims have "converged at 95–99%, measured under
vendor-chosen conditions with no independent benchmark"**
([Parseur, 2026](https://parseur.com/blog/ai-invoice-processing-benchmarks)). Professional-grade
now means "a verification layer that flags uncertain documents… and the ability to learn from
corrections".

Our published numbers are lower (88–95%) **and more credible**: zero-correction rates per
document type, from real usage, with a human approval step and learning from corrections. That
contrast is a positioning line on its own — and it is exactly the gap Phase 5.2 of the plan
(the independent extraction benchmark) was designed to fill. Nobody else has run it.

## 4. Buyer language to adopt (phrases seen repeatedly)

- "outgrown Tally", "when Tally stops being enough", "is Tally an ERP"
- "stock as an attribute of a voucher", "parallel Excel for work orders"
- "double entry", "entering the same invoice twice", "mismatch between accounts and sales"
- "real-time outstanding balance for sales"
- "custom ERP cost in India", "how long does ERP implementation take"
- "ERP implementation failed", "employees went back to Excel and WhatsApp"
- "multi-level BOM", "material traceability", "heat number", "MTC / mill test certificate"
- "IBR Form III / III-A / IV-A", "Directorate of Boilers", "Inspecting Authority"
- "sister concern", "two firms same proprietor", "separate GSTIN"
- "purchase entry automation", "GSTR-2B reconciliation", "bill of entry"

## 5. What buyers want to know before hiring a firm

From the hiring checklists ([Stratagem](https://www.stratagem-systems.com/blog/questions-to-ask-before-hiring-software-development-company-2026), [ProftCode](https://www.proftcode.com/blog/best-erp-software-development-company-india/), [Zunderdog](https://www.zunderdog.com/blog/10-questions-to-ask-before-hiring-a-software-development-company)):

1. Have you built this for a business like mine? *(we answer: /work — but not per industry)*
2. How does requirement gathering work, step by step? *(partly: modeling phase)*
3. What happens after launch, for how long? *(answered: /engagement)*
4. How do you handle scope changes mid-project? *(not answered)*
5. Can I speak to a past client? *(not answered)*
6. "Tell me about a project that went badly and what you changed." *(not answered — and we have real material: bugs found in live tests are documented in every note)*

## 6. Gaps in our current site, against the above

| # | Gap | Evidence |
|---|---|---|
| 1 | Headings and Q&A are in our words, not the buyer's — no "Tally", "ERP", "India", "manufacturer", "₹" in the `/engagement` questions | §4 |
| 2 | No comparison content (Tally vs custom vs ERPNext/Odoo) — the most-cited B2B content type | §2 |
| 3 | No industry pages — boiler/IBR is completely open and we have the only real system | §2 |
| 4 | No ₹ figure anywhere — cost queries will cite cost guides instead | §2 |
| 5 | Scope changes, references, "a project that went badly" unanswered | §5 |
| 6 | Extraction numbers not framed against the market's unbenchmarked 95–99% claims | §3 |
| 7 | Off-site: no LinkedIn posts of notes, no YouTube, no Reddit/Quora presence, no Clutch/DesignRush/GoodFirms listing | §1 |

## 7. Opportunities, ranked

Scored on: competition (open wins), buyer intent, and whether we already have the proof.

| Rank | Opportunity | Why | Needs from founder |
|---|---|---|---|
| 1 | **Industry page: software for boiler & pressure-vessel manufacturers (IBR)** | Nobody ranks; we have the system, 3 notes, 5 patterns | Nothing new |
| 2 | **Comparison note: Tally vs ERPNext/Odoo vs custom, for a manufacturer** — including when *not* to go custom, told through ShantiOps' ERPNext-then-reverse decision | Highest-cited content type; honest version doesn't exist | Confirm the reversal can be told publicly |
| 3 | **Rewrite `/engagement` in buyer language** + add scope-change, references, "a project that went badly" answers | Directly answers hiring checklists; ChatGPT favours vendor pricing/help pages | ₹ range (or permission to quote market ranges); reference policy |
| 4 | **"Outgrown Tally?" note** — the signs, and what changes | High-intent phrase family; ties to every client | Nothing new |
| 5 | **Extraction accuracy framed against unbenchmarked claims**; later, the Phase 5.2 benchmark | Unique, citable, defensible | Nothing now; benchmark needs documents later |
| 6 | **"Why ERP projects fail in Indian SMEs — and the model-first answer"** | Medium competition; our method is the answer | Nothing new |
| 7 | Off-site: LinkedIn post per note, Clutch + GoodFirms + DesignRush listings, Google Business Profile, Reddit/Quora answers | Perplexity and "best firm" queries live off-site | Founder's time only |
| — | Not recommended: competing on "AI invoice OCR for Tally" as a product, or generic RAG pages | Saturated by SaaS/listicles; we'd be the weakest page there | — |

## Next step (step 2)

Turn ranks 1–6 into a concrete rewrite plan: exact page titles and question headings in buyer
language, which existing notes/patterns each links to, and what's needed from the founder —
then build through `docs/corpus-playbook.md`.
