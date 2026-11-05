# Questions for the AI assistant shorts

Questions for short vertical videos (20–40 s each) showing each assistant answering from a business's own records.
Every question here is one the assistant answers today, from the checked list in `src/lib/ai-assistant.ts` (statuses
checked against each system's code on 25 Oct 2026), except where marked **test first**.

## Before recording

- **Use the demo pass.** Visitors get two questions per browser; open `/demo#pass=<PIN>` (Worker secret `DEMO_PASS`)
  on the recording browser to lift the limit.
- **Pick the login the question needs.** Money questions are refused to staff logins, which makes a good short of its
  own (see "Safety shorts").
- **Record on the sample company only.** Every name and number in the demos is made up; nothing real is shown.
- **India or US build.** Questions marked *IN only* use GST, TDS, PF or ESIC and are not in the US builds; the US
  builds ask the same thing with "sales tax".
- **One shape per short:** hook on screen (≤ 8 words) → the question typed → the answer appearing → a one-line close
  ("Answered from your own records. Nothing made up.").

## Ember AI: boiler and pressure-vessel manufacturer (SB Ops)

Demo: boiler-erp.ahromlabs.com (India), boiler-erp-us.ahromlabs.com (US). At the real client the data questions are
switched off; in the demo they answer from the sample company. **Test each data question on the demo before
recording.**

| # | Hook | Question to type | Login | What the answer shows |
|---|---|---|---|---|
| 1 | "Which boiler is late, and why?" | Is a project delayed? | Owner / Manager | AB-1005 at Shell Welding, 3 days late, delay category Material. **Test first** |
| 2 | "Who owes us the most?" | Which customers owe us the most? | Owner / Manager | Outstanding by customer (AB-1003 is on deposit only). **Test first** |
| 3 | "What's stuck in purchasing?" | Which purchase orders haven't been received? | Procurement | AB-1004's open orders: tubes and pipe in transit, gauge ordered. **Test first** |
| 4 | "What's below minimum in stores?" | Which items are below their minimum? | Stores | MS angle below its reorder point. **Test first** |
| 5 | "What needs my sign-off?" | What approvals are waiting for me? | Stores or QC | Inward and pre-dispatch approvals waiting for that person. **Test first** |
| 6 | "New hire, day one" | How do I assign test certificates to units? | QC | The quality guide's steps, with a link to the screen. |
| 7 | "No more training calls" | How do I release the BOM? | Engineering | The engineering guide's BOM release section. |
| 8 | "It stays on topic" | Write me a poem. | Any | A fixed reply saying what it can help with; the question never reaches a writing model. |

## Ohm AI: electronic component trader (Inventory Ops)

Demo: electronics-erp.ahromlabs.com (India), electronics-erp-us.ahromlabs.com (US). Logins: owner, manager, store staff. Stock and CRM only; it keeps no
money, so money questions get "the data doesn't have that".

| # | Hook | Question to type | Login | What the answer shows |
|---|---|---|---|---|
| 1 | "What runs out next month?" | Which items will run out in 30 days? | Owner | Days of cover per item: stock ÷ average pieces shipped per day over the last 90 days, with how much history it used. |
| 2 | "Customers who went quiet" | Which customers have stopped ordering? | Owner or Manager | Customers silent for more than twice their own usual gap between orders. |
| 3 | "Find one reel in two stores" | Where is a particular reel? | Store staff | That reel's status, quantity, the customer it went to and its transfers between stores. |
| 4 | "Dead stock, in one question" | Which items haven't shipped in 30 days? | Owner | Items with stock and no outward in the last 30 days, or ever. |
| 5 | "The owner's morning" | What happened today? | Owner | The day's inward, outward, transfers and approvals waiting. |
| 6 | "Two questions at once" | Low stock and pending approvals? | Owner | Two look-ups answered together, each as its own table. |
| 7 | "It won't guess" | How much does a customer owe us? | Owner | "The data doesn't have that": the system keeps stock, not money, so it says so. |
| 8 | "Read-only, on purpose" | Delete a reel. | Any | Not done: the assistant only reads. |

## Atelier AI: interior design studio and furniture workshop (DesignerOps)

Demo: interiors-erp.ahromlabs.com (India), interiors-erp-us.ahromlabs.com (US). Logins: owner, manager, office (staff).

| # | Hook | Question to type | Login | What the answer shows |
|---|---|---|---|---|
| 1 | "Did this project make money?" | Did the Carter house make money? (US) / Did a named project make money? | Owner | Billed, minus vendor materials, minus estimated workshop labour, with the margin. |
| 2 | "How much money do we actually have?" | How much money do we have? | Owner | Cash in hand, bank balances from the latest statements and what is owed to us, separately and together. |
| 3 | "Is the transporter overcharging?" | Did a transporter charge us above the rate card? | Owner or Manager | Freight charges above that carrier's rate for the same route, and by how much. |
| 4 | "One project, one answer" | How is a named project going? | Owner | Milestones done and overdue, next milestone, site visits, workshop orders, open POs, invoiced and paid. |
| 5 | "Clients we've ignored" | Which clients haven't we spoken to in two weeks? | Owner or Manager | Clients with an active project and no conversation logged in 14 days. |
| 6 | "Who's our best craftsman?" | Who is doing the best work? | Owner | Each workshop person's logged work rated 1–5, with logs, days and orders. |
| 7 | "Quotes we're still chasing" | Which quotations are still waiting for a reply? | Owner or Manager | Quotes drafted or sent, not accepted or declined, with value and whether they've expired. |
| 8 | "It remembers for you" | Remind me to call a client on Friday. | Any | A drafted task for Friday; nothing is saved until the person presses Save. |
| 9 | "Staff can't see payroll" | What is the payroll this month? | Office (staff) | Refused: staff see only their own tasks and cash entries, as on the screens. |
| 10 | "Billing vs last month" | How did billing this month compare with last month? | Owner | Both months side by side with the change. |

US build: say "quotes" and "sales tax" (the US build's own words); "How much did we bill this month, and how much GST?"
is *IN only*.

## Datum AI: construction contractor (Sitebook Ops)

Demo: construction-erp.ahromlabs.com (India), construction-erp-us.ahromlabs.com (US). Logins: director, project manager, site engineer, storekeeper, accountant. Site engineers
and storekeepers don't see company money, margins or payroll.

| # | Hook | Question to type | Login | What the answer shows |
|---|---|---|---|---|
| 1 | "Is this site making money?" | Is a site making money? | Director | Contract value, work done, billed, cost to date, margin so far and projected margin against the estimate. |
| 2 | "Same question, site engineer" | Is this site making money? | Site engineer | Refused: site engineers don't see company money, as on the screens. (Pair with 1 as one short.) |
| 3 | "Using more cement than the BOQ allows?" | Is a site using more material than the BOQ allows? | Director or Project manager | Material used against what approved work should have used at the BOQ norm, with the excess. |
| 4 | "Did every site report today?" | Did every site send its daily report today? | Director or Project manager | Sites that filed, sites missing, and reports waiting for the PM to approve. |
| 5 | "Machines doing nothing" | Which machines are idle? | Director | Each machine's location, hours run in 30 days, idle time on site, and what's under repair. |
| 6 | "Who owes us, and how late?" | Who owes us money, and how late is it? | Director or Accountant | Bills and invoices per customer by age: not due, 1–30, 31–60, 61–90, over 90 days. |
| 7 | "Cash sitting at sites" | How much cash is at each site? | Accountant | Site cash given, spent and in hand per site, and weekly claims waiting. |
| 8 | "Cheapest supplier, instantly" | Which supplier has the best rate for a material? | Director | The rate to use per material and what open orders still need beyond godown stock. |
| 9 | "Gate passes expiring" | Whose KYC is pending, and which gate passes expire this week? | Project manager | Workers with KYC due, gate passes active, expired or expiring this week. |
| 10 | "Tax due, before the CA calls" | What GST and TDS is due this month? | Director or Accountant | Output GST, GSTR-1/3B due dates, what's missing, TDS and its deposit date. *IN only* |

US build: the bills are pay applications, and 10 is *IN only*.

## Shorts that work across all four

- **"It only answers from your data"**: the same refusal from each assistant (Ohm "how much does a customer owe us",
  Atelier "should we raise our design fee", Ember "write me a poem"), cut together.
- **"Owner vs staff"**: one money question asked from an owner login, then a staff login (Atelier 9, Datum 1+2).
- **"Monday morning"**: the morning question per assistant (Ohm "What happened today?", Atelier and Datum "What's on
  this week?").
