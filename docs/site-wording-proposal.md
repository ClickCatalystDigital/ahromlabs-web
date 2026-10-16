# Site wording: ownership and the IBR-from-BOM claim (proposal, 16 Oct 2026)

Section A was applied on 16 Oct 2026 (licence permanent once paid; data used only anonymised and aggregated; servers stay in the client's name, so A7 kept). Section B waits for Pujan's answer on what the IBR/BOM feature does today.

## A. Code and data ownership

Your position: the code stays Ahrom's; client data may be used for insights. The site currently promises the opposite in 9 places.

| # | Where | Today | Proposed |
|---|---|---|---|
| A1 | Homepage, "How we work" (`src/app/page.tsx:301`) | "Every project is priced in fixed phases, and the code, the data and the server end up in your name." | "Every project is priced in fixed phases, with the scope written down and agreed before any work starts." |
| A2 | Homepage link under it (`page.tsx:304`) | "How pricing, ownership and support work" | "How pricing, licensing and support work" |
| A3 | /engagement, question (`src/lib/engagement.ts:87`) | "Who owns the source code and the data?" | "Who owns the software, and what happens to our data?" |
| A4 | /engagement, answer (`engagement.ts:89`) | "You do. Once the project is paid in full, the custom code we wrote for you and all of your data are yours, transferred in writing." | "The software stays ours, and you get a licence to use your system **[Q1]**. Your business data lives in your system and you can export it at any time." |
| A5 | /engagement, detail (`engagement.ts:91`) | "We keep ownership of pre-existing, reusable components … and give you a permanent licence to use them in your system." | Remove (covered by A4). |
| A6 | /engagement, detail (`engagement.ts:92`) | "Your data is always yours, at every stage, paid or not." | "We may use your data in anonymised, aggregated form to improve our systems and to publish industry benchmarks; nothing that identifies your business or your customers is shared. **[Q2]**" |
| A7 | /engagement, hosting answer (`engagement.ts:99`) | "… at go-live we set up a production cloud server in your name …" | Keep **if** servers will still be in the client's name (they pay the provider directly). Otherwise: "… at go-live we move it to a production cloud server, recommending a provider based on the first interview." **[Q3]** |
| A8 | /engagement, continuity (`engagement.ts:173`) | "Combined with owning your code and your server, it means you're never locked in: another team could take over from the document alone." | "It means support never hangs on one person: any of our developers or agents can pick the system up from the document alone." |
| A9 | Link labels: About (`about/page.tsx:99`), Services (`services/page.tsx:165`), closing box on every page (`ClosingCta.tsx:19`), page title (`engagement/page.tsx:13`), llms.txt (`llms.txt/route.ts:40`) | "pricing, ownership and support" / "code and data ownership" | "pricing, licensing and support" / "software licensing and data use" |

Questions that decide A4, A6 and A7:
- **Q1 Licence terms.** Is the licence permanent once the project is paid, or does it run with the AMC? The /engagement page should say which; a buyer will ask.
- **Q2 Data for insights.** Is "anonymised and aggregated, never identifying the business or its customers" right? Whatever you choose should also be a clause in the client agreement; India's data protection law (DPDP Act, 2023) expects data use to be stated up front.
- **Q3 Servers.** Still in the client's name with them paying the provider, or on Ahrom's account?

## B. "IBR folder generated from the bill of materials"

You said this is not done correctly. Before I change it: **is the feature built but unreliable in practice, or not built?** The site describes it in detail (Form IV A sections derived from the BOM tree, 8 boiler models, certificate reuse of about 3.2 boilers), so I need to know which parts are still true.

| # | Where | Today | Proposed (if the BOM part should go) |
|---|---|---|---|
| B1 | Boiler industry page, answer (`content/industries/boiler-pressure-vessel-manufacturing.md:11`) | "Each boiler's IBR folder is generated from its bill of materials and a bank of material test certificates." | "Every plate traces back to the material test certificate it arrived with, and certificates are kept in one bank, matched to plates by a person." |
| B2 | Same page, description (line 14) | "IBR forms generated from test certificates" | "plate traceability to test certificates" |
| B3 | Same page, FAQ "Can the IBR statutory folder be generated instead of typed?" (line 78–80) | Whole answer: generated from the BOM tree and the certificate bank; Form IV A sections from the BOM structure | Replace the question with "How are test certificates kept for the IBR folder?" and answer only what is true today (certificate bank keyed on cert + cast + plate number, AI reads the PDF, a person confirms each match). |
| B4 | Engineering note `/notes/ibr-statutory-folder-from-bom` (title, answer, evidence, body) | "Generating a boiler's IBR statutory folder from its BOM and test certificates" | Either unpublish it, or retitle to the certificate part only, e.g. "Keeping material test certificates for IBR: one certificate, many plates", and cut the Form IV A / BOM sections. The URL is linked from the boiler page, Services and Work, so unpublishing means removing those links too. |
| B5 | Note "Tally, ERPNext, Odoo or custom" (`tally-vs-erpnext-vs-custom-erp.md:38`) | "a boiler maker's IBR statutory folder generated from its bill of materials and test certificates" | "a boiler maker's material test certificates traced to every plate" |
| B6 | Services, compliance card (`src/lib/services.ts:89`) | "IBR Forms II(1), III, III A and IV A, from the BOM and test certificates" | "IBR forms with material test certificates traced to each plate" |
| B7 | Work, Shanti Boilers (`src/lib/work.ts:75`) | "Each boiler's IBR statutory folder — cover letter and Forms II(1), III, III A and IV A — generated from its bill of materials and a bank of material test certificates." | "A bank of material test certificates, each traced to the plates cut from it and the boilers they went into." |

After a change, the Markdown copies for agents, llms.txt and knowledge.json are rebuilt by the normal build, and `npm run deploy` publishes it.
