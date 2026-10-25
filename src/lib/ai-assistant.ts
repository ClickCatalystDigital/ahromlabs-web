// The AI assistant question library: questions an owner or their staff would ask an assistant built on their
// own business records, what should answer each one, and how to check the answer. It feeds
// /ai-assistant/questions, the industry guides, the test sheet, JSON, llms.txt, knowledge.json and the chatbot.
//
// What makes a line worth publishing (the rule for adding one):
//   - `check` names something a buyer can compare the answer with (a screen, a report, a register).
//   - `status` is the truth about Ahrom Labs' assistants today: "live" only where the assistant named in
//     ASSISTANT answers it now; "off" where it is built but switched off at the client; "not-built" otherwise.
//   - No marketing figures here; the guides quote only figures already published on the site.
//   - The boiler manufacturer is never named.

import type { Industry, Role, Demo } from "./erp";
import { INDUSTRY_LABEL, ROLE_LABEL, DEMO_URL } from "./erp";
export { INDUSTRY_LABEL, ROLE_LABEL, DEMO_URL };

export const AI_PUBLISHED = "2026-10-25";
export const AI_CHECKED = "2026-10-25"; // statuses checked against each system's code, 25 Oct 2026
export const AI_VERSION = "1.0";

export type System = Demo["client"];
export type Kind = "data" | "how-to" | "reminder" | "refuse";
export type Status = "live" | "off" | "not-built";

// One assistant per system, built on that system's own records and words.
// `demo`: what a visitor can ask on the public demo, which caps each visitor at two questions on the server.
export const ASSISTANT: Record<System, { name: string; system: string; industry: Industry; who: string; demo: string }> = {
  "savistar-saag": { name: "Atelier AI", system: "Savistar & Saag, an interior design studio and furniture workshop", industry: "projects", who: "everyone, staff limited to their own tasks and cash entries", demo: "two questions from any sample login" },
  "ls-technologies": { name: "Ohm", system: "LS Technologies, an electronic component trader", industry: "trading", who: "LS Technologies' own staff", demo: "two questions from any sample login" },
  "boiler-manufacturer": { name: "Ember", system: "a boiler manufacturer", industry: "manufacturing", who: "staff, each about their own departments", demo: "two questions, including live data from the sample company" },
};
export const SYSTEM_OF: Record<Industry, System> = { projects: "savistar-saag", trading: "ls-technologies", manufacturing: "boiler-manufacturer" };

export const KIND_LABEL: Record<Kind, string> = {
  data: "A figure or a list from your records",
  "how-to": "How to do something in the system",
  reminder: "Draft a task or a note",
  refuse: "Should be refused",
};
export const STATUS_LABEL: Record<Status, string> = {
  live: "Answered today",
  off: "Built, switched off at the client",
  "not-built": "Not yet built by Ahrom Labs",
};

export type Question = {
  id: string; // industry-ish prefix, stable once published
  industry: Industry;
  role: Role;
  question: string;
  kind: Kind;
  answer: string; // what should answer it: which records, which maths
  check: string; // what to compare the answer with
  status: Status;
  // Real phrasings from the assistant's own test set, cleaned by hand of names, amounts and codes ([client],
  // [part]); typos and Hinglish kept. Read and approved by Pujan, 25 Oct 2026; new ones need the same read.
  // The question → app look-up mapping is kept outside this public repo
  // (~/.config/ahrom-labs/ai-lookups.json) and used only by scripts/ai-assistant.check.ts.
  alsoAsked?: string[];
};

export const questions: Question[] = [
  // ── Interior design and furniture (Atelier AI) ────────────────────────────
  { id: "projects.week", industry: "projects", role: "owner", question: "What's on this week?", kind: "data", answer: "Milestones, site visits, workshop orders due and tasks in the week, from the calendar's own records.", check: "The calendar, same week: every item there is in the answer.", alsoAsked: ["anything due tomorrow?", "what do i have today"], status: "live" },
  { id: "projects.one-project", industry: "projects", role: "owner", question: "How is a named project going?", kind: "data", answer: "That project's milestones done and overdue, the next milestone, site visits, its workshop orders, open purchase orders, and what it has been invoiced and paid.", check: "The project page: milestone count and invoiced and paid totals match.", alsoAsked: ["[client] update?", "[project] job details", "[client] ka kaam kaha tak pahucha"], status: "live" },
  { id: "projects.overdue-milestones", industry: "projects", role: "operations", question: "Which milestones are overdue?", kind: "data", answer: "Open milestones past their due date, by project.", check: "The projects list filtered to overdue.", status: "live" },
  { id: "projects.who-owes", industry: "projects", role: "accounts", question: "Who owes us money?", kind: "data", answer: "Invoices sent and not paid, with the amount including GST and how many days overdue. Drafts are not counted.", check: "The unpaid invoices on the finance screen: same invoices, same total to the rupee.", alsoAsked: ["receivables"], status: "live" },
  { id: "projects.billed", industry: "projects", role: "accounts", question: "How much did we bill this month, and how much GST?", kind: "data", answer: "Invoice lines in the month (quantity × rate), GST split into CGST and SGST, and how much is paid.", check: "The invoice register for the month, and the GST figures your accountant files.", alsoAsked: ["GST collected by the furniture side this year"], status: "live" },
  { id: "projects.compare", industry: "projects", role: "owner", question: "How did billing this month compare with last month?", kind: "data", answer: "The same look-up run for both months, side by side with the change.", check: "The register for each month, separately.", alsoAsked: ["and last month?"], status: "live" },
  { id: "projects.open-quotes", industry: "projects", role: "sales", question: "Which quotations are still waiting for a reply?", kind: "data", answer: "Quotations drafted or sent, not accepted or declined, with value including GST and whether they have expired.", check: "The quotations list filtered to open.", status: "live" },
  { id: "projects.quotes-won", industry: "projects", role: "sales", question: "How many quotes did we win this month?", kind: "data", answer: "Quotations accepted and declined in the month, by count and value, and the share won.", check: "The quotations list for the month, counted by status.", status: "live" },
  { id: "projects.late-orders", industry: "projects", role: "operations", question: "Which workshop orders are late?", kind: "data", answer: "Workshop orders past their due date and not delivered.", check: "The workshop orders screen sorted by due date.", alsoAsked: ["orders due this week", "late orders and overdue milestones"], status: "live" },
  { id: "projects.on-time", industry: "projects", role: "operations", question: "Are we delivering workshop orders on time?", kind: "data", answer: "Average days from start to delivery, and the share delivered on or before the due date, over delivered orders.", check: "Count the delivered orders in the period by hand: on time ÷ delivered.", alsoAsked: ["are we delivering orders on time?"], status: "live" },
  { id: "projects.pending-material", industry: "projects", role: "operations", question: "What material is still to come for a project?", kind: "data", answer: "Open purchase orders for the project: ordered, minus delivered, plus returned.", check: "The vendor screen's open purchase orders for that project.", alsoAsked: ["material not recieved yet"], status: "live" },
  { id: "projects.freight", industry: "projects", role: "accounts", question: "Did a transporter charge us above the rate card?", kind: "data", answer: "Freight charges above that vendor's rate card for the same route, and by how much.", check: "The freight entries against the vendor's rate card.", alsoAsked: ["[transporter] overcharge?"], status: "live" },
  { id: "projects.quiet-clients", industry: "projects", role: "sales", question: "Which clients haven't we spoken to in two weeks?", kind: "data", answer: "Clients with an active project and no conversation logged in 14 days.", check: "Each client's conversation log.", alsoAsked: ["Which clients haven't we spoken to in a while?"], status: "live" },
  { id: "projects.profit", industry: "projects", role: "owner", question: "Did a project make money?", kind: "data", answer: "Billed, minus vendor materials, minus estimated workshop labour, with the margin. Refused to staff.", check: "The project's invoices, vendor purchase orders and work logs.", alsoAsked: ["which projects are most profitable?", "[project] mein kitna margin hai"], status: "live" },
  { id: "projects.cash", industry: "projects", role: "accounts", question: "How much cash came in and went out this month?", kind: "data", answer: "The cash book (not the bank) for the month: in, out, net, the running balance and the largest entries.", check: "The cash book for the month.", alsoAsked: ["kitna paisa aaya is mahine", "cash this month compared to last month", "what is the cash balance?"], status: "live" },
  { id: "projects.money", industry: "projects", role: "owner", question: "How much money do we have?", kind: "data", answer: "Cash in hand, plus the bank balances from the latest statements, plus what is owed to us, shown separately and together. Refused to staff.", check: "The cash book, the latest bank statements and the unpaid invoices.", alsoAsked: ["where do we stand financially"], status: "live" },
  { id: "projects.overdue-tasks", industry: "projects", role: "sales", question: "What's overdue?", kind: "data", answer: "Follow-up tasks past their due date, for a person or a client.", check: "The task list filtered to overdue.", alsoAsked: ["my tasks this week"], status: "live" },
  { id: "projects.all-projects", industry: "projects", role: "owner", question: "How are the projects doing?", kind: "data", answer: "Every project, or those with one status (active, on hold, completed), with milestone progress and what is overdue.", check: "The projects list, same status filter.", alsoAsked: ["which projects are on hold"], status: "live" },
  { id: "projects.site-visits", industry: "projects", role: "operations", question: "When did we last visit a site?", kind: "data", answer: "Site visits by project: who went and when, past or coming up.", check: "The project's site-visit log.", alsoAsked: ["site visits last month"], status: "live" },
  { id: "projects.client-contact", industry: "projects", role: "sales", question: "When did we last talk to a client, and what was said?", kind: "data", answer: "That client's latest conversations, their projects and workshop orders, and their invoices.", check: "The client's page: conversation log and invoices.", alsoAsked: ["When did we last talk to [client]?"], status: "live" },
  { id: "projects.order-history", industry: "projects", role: "operations", question: "Who worked on a workshop order?", kind: "data", answer: "The order's work log: who worked on which part, on which days, the hours and the rating.", check: "The order's work log.", alsoAsked: ["Who worked on the [order]?"], status: "live" },
  { id: "projects.attendance", industry: "projects", role: "operations", question: "Who is in today?", kind: "data", answer: "Present, half day and absent for one day, with in and out times.", check: "The attendance screen for that day.", status: "live" },
  { id: "projects.days-worked", industry: "projects", role: "operations", question: "How many days did a workshop person work this month?", kind: "data", answer: "Days worked in the period (present 1, half day 0.5) and absences.", check: "The attendance register for the month.", alsoAsked: ["How many days did [person] work this month?"], status: "live" },
  { id: "projects.payroll", industry: "projects", role: "owner", question: "What is the payroll for last month?", kind: "data", answer: "Days × daily rate or the monthly salary, minus that month's advances: what is owed and what is paid. Refused to staff.", check: "The payroll screen for the month.", alsoAsked: ["payroll for last month"], status: "live" },
  { id: "projects.advances", industry: "projects", role: "accounts", question: "Which advances haven't been recovered yet?", kind: "data", answer: "Advances given to workshop people, and whether that month's payroll has recovered them. Refused to staff.", check: "The advances list against the payroll.", alsoAsked: ["advances not recovered yet"], status: "live" },
  { id: "projects.work-ratings", industry: "projects", role: "owner", question: "Who is doing the best work?", kind: "data", answer: "Each workshop person's logged work rated 1 to 5 in the period, with the number of logs, days and orders.", check: "The work logs for the period.", alsoAsked: ["who's doing the best work?"], status: "live" },
  { id: "projects.vendor-spend", industry: "projects", role: "accounts", question: "How much have we spent with vendors?", kind: "data", answer: "Spend per vendor: purchase orders at rate, plus freight, minus returns and cash already paid, with open orders and overcharges.", check: "The vendor screen's totals.", status: "live" },
  { id: "projects.bank-balance", industry: "projects", role: "owner", question: "What is our bank balance?", kind: "data", answer: "Each account's balance from its latest uploaded bank statement (not the cash book). Refused to staff.", check: "The latest statement of each account.", alsoAsked: ["how much is in [bank]"], status: "live" },
  { id: "projects.bank-lines", industry: "projects", role: "accounts", question: "What were the biggest debits from the bank last month?", kind: "data", answer: "Bank statement lines in the period: money in or out, the largest, or payments to or from someone by name. Refused to staff.", check: "The bank statement for the month.", alsoAsked: ["what came into the bank last month?", "bank payments to [person]"], status: "live" },
  { id: "projects.my-notes", industry: "projects", role: "sales", question: "What did I note about a client?", kind: "data", answer: "The notes this person asked the assistant to keep, optionally about one client.", check: "The notes list.", alsoAsked: ["What did I note about [client]?"], status: "live" },
  { id: "projects.note", industry: "projects", role: "sales", question: "Note that a client prefers WhatsApp.", kind: "reminder", answer: "A drafted private note; saved only when the person presses Save.", check: "The notes list before and after pressing Save.", status: "live" },
  { id: "projects.how-site-visit", industry: "projects", role: "operations", question: "How do I log a site visit?", kind: "how-to", answer: "The steps from the system's own guide.", check: "Follow the steps; they work.", status: "live" },
  { id: "projects.mark-paid", industry: "projects", role: "accounts", question: "Mark an invoice paid.", kind: "refuse", answer: "Not done: the assistant only reads. It says where in the app to record the payment.", check: "The invoice is unchanged.", status: "live" },
  { id: "projects.stock-value", industry: "projects", role: "owner", question: "What is the value of our stock?", kind: "refuse", answer: "\"The data doesn't have that\": the system doesn't keep a stock valuation, so it says so instead of estimating.", check: "The reply gives no figure.", status: "live" },
  { id: "projects.remind", industry: "projects", role: "sales", question: "Remind me to call a client on Friday.", kind: "reminder", answer: "A drafted task for Friday; nothing is saved until the person presses Save.", check: "The task list before and after pressing Save.", alsoAsked: ["remind me to send the revised quote to [client] tomorrow"], status: "live" },
  { id: "projects.staff-payroll", industry: "projects", role: "operations", question: "What is the payroll this month? (asked from a staff login)", kind: "refuse", answer: "Refused: staff see only their own tasks and cash entries, as on the screens.", check: "The same login can't open payroll on the screens either.", status: "live" },
  { id: "projects.advice", industry: "projects", role: "owner", question: "Should we raise our design fee?", kind: "refuse", answer: "Declined as advice the data can't give, with questions it can answer instead.", check: "The reply gives no recommendation.", alsoAsked: ["what should we charge [client] next"], status: "live" },

  // ── Electronic component trading (Ohm) ─────────────────────────────────────
  { id: "trading.item-stock", industry: "trading", role: "operations", question: "How many reels of an item do we have, in each store?", kind: "data", answer: "Reels and pieces in stock of that item, per store.", check: "Reports → Stock Summary for the item.", alsoAsked: ["stock of [part] at the partner store"], status: "live" },
  { id: "trading.low-stock", industry: "trading", role: "operations", question: "What is running low?", kind: "data", answer: "Items with fewer than 5 reels in stock.", check: "The stock summary sorted by reels.", alsoAsked: ["low stock at the partner store", "what about the partner store?"], status: "live" },
  { id: "trading.dead-stock", industry: "trading", role: "owner", question: "Which items haven't shipped in 30 days?", kind: "data", answer: "Items with stock and no outward in the last 30 days, or ever.", check: "The outward log for each item listed.", alsoAsked: ["which items have not moved in a month"], status: "live" },
  { id: "trading.inward", industry: "trading", role: "operations", question: "What came in last week?", kind: "data", answer: "Stock received in the period, by item, at the quantity received.", check: "The inward entries for those days.", alsoAsked: ["inward in September", "inward in September versus August"], status: "live" },
  { id: "trading.shipped", industry: "trading", role: "sales", question: "What did we ship to a customer in September?", kind: "data", answer: "Outward to that customer in the month, by item.", check: "The outward log filtered to the customer and month.", alsoAsked: ["top customers this year", "compare shipments this month with last month"], status: "live" },
  { id: "trading.trace", industry: "trading", role: "operations", question: "Where is a particular reel?", kind: "data", answer: "That reel's status, quantity, the customer it went to and its transfers between stores.", check: "Reports → Search & Trace for the reel number.", alsoAsked: ["what is in [box]"], status: "live" },
  { id: "trading.transfers", industry: "trading", role: "operations", question: "What moved between our two stores this month?", kind: "data", answer: "Transfers in the period, by item and direction.", check: "The transfer entries for the month.", alsoAsked: ["transfers in September"], status: "live" },
  { id: "trading.today", industry: "trading", role: "owner", question: "What happened today?", kind: "data", answer: "The day's inward, outward, transfers and approvals waiting, for a store or both.", check: "Reports → Daily Report for the day.", alsoAsked: ["today's numbers", "what has the partner store done today"], status: "live" },
  { id: "trading.approvals", industry: "trading", role: "owner", question: "Are any approval requests waiting?", kind: "data", answer: "Inward, outward and transfer requests from staff not yet approved or rejected.", check: "The Requests screen.", alsoAsked: ["what did [manager] approve yesterday"], status: "live" },
  { id: "trading.po-status", industry: "trading", role: "sales", question: "Which purchase orders are confirmed but not dispatched?", kind: "data", answer: "Customer purchase orders by status, with value (quantity × unit price on the lines) and how much has shipped.", check: "The purchase orders screen filtered by status.", alsoAsked: ["status of [PO]", "how much are the confirmed POs worth"], status: "live" },
  { id: "trading.run-out", industry: "trading", role: "operations", question: "Which items will run out in 30 days?", kind: "data", answer: "Days of cover: stock in hand ÷ average pieces shipped per day over the last 90 days at most, with how much history it used.", check: "Work one item out by hand from its stock and its outward log.", alsoAsked: ["will [part] run out soon"], status: "live" },
  { id: "trading.quiet-customers", industry: "trading", role: "sales", question: "Which customers have stopped ordering?", kind: "data", answer: "Customers silent for more than twice their own usual gap between orders.", check: "That customer's order dates.", alsoAsked: ["how often does [customer] order"], status: "live" },
  { id: "trading.follow-up", industry: "trading", role: "sales", question: "And last month? (after a question about this month)", kind: "data", answer: "The same look-up, same customer and item, for the previous month.", check: "The answer names the same customer and item as the first one.", alsoAsked: ["and in September?"], status: "live" },
  { id: "trading.find-item", industry: "trading", role: "sales", question: "Do we stock a particular part?", kind: "data", answer: "Items in the catalogue matching a code or description, with pieces per reel.", check: "The catalogue search.", alsoAsked: ["do we have [part]"], status: "live" },
  { id: "trading.total-stock", industry: "trading", role: "owner", question: "What is our total stock?", kind: "data", answer: "Totals across items, and the items with the most stock, for a store or both.", check: "Reports → Stock Summary.", alsoAsked: ["top items by quantity"], status: "live" },
  { id: "trading.tasks", industry: "trading", role: "sales", question: "What follow-ups are overdue for a salesperson?", kind: "data", answer: "Follow-up tasks and call reminders: open, overdue or due in a period, for a person or a client.", check: "Home → tasks for that person.", alsoAsked: ["how many tasks are open", "when is the next follow up with [client]"], status: "live" },
  { id: "trading.pipeline", industry: "trading", role: "sales", question: "How many clients are at each stage?", kind: "data", answer: "CRM contacts by stage (new, contacted, qualified, customer, lost), the watch list, or those never contacted.", check: "The clients screen by stage.", alsoAsked: ["who is on the client watch list", "which clients have we not contacted"], status: "live" },
  { id: "trading.client-notes", industry: "trading", role: "sales", question: "Show me the notes on a client.", kind: "data", answer: "The call notes and follow-up history logged for that client.", check: "The client's page.", alsoAsked: ["show me the notes on [client]"], status: "live" },
  { id: "trading.two-part", industry: "trading", role: "owner", question: "Low stock and pending approvals?", kind: "data", answer: "Two look-ups answered together, each as its own table.", check: "The stock summary and the Requests screen.", status: "live" },
  { id: "trading.delete", industry: "trading", role: "operations", question: "Delete a reel.", kind: "refuse", answer: "Not done: the assistant only reads.", check: "The reel is unchanged.", alsoAsked: ["approve all pending requests"], status: "live" },
  { id: "trading.who-did", industry: "trading", role: "owner", question: "Who inwarded a particular reel?", kind: "refuse", answer: "\"The data doesn't have that\" in the form asked, with questions it can answer instead.", check: "The reply names nobody.", status: "live" },
  { id: "trading.advice", industry: "trading", role: "owner", question: "What should I order next month?", kind: "refuse", answer: "Declined as advice; it offers stock cover and low stock instead.", check: "The reply gives no recommendation.", status: "live" },
  { id: "trading.owes", industry: "trading", role: "accounts", question: "How much does a customer owe us?", kind: "refuse", answer: "\"The data doesn't have that\": this system keeps stock, not the money, so it says so instead of guessing.", check: "The reply gives no figure.", alsoAsked: ["how much revenue did we make from [customer] shipments"], status: "live" },
  { id: "trading.how-approve", industry: "trading", role: "owner", question: "How do I approve an inward request?", kind: "how-to", answer: "The steps from the system's own guide, with a link to the screen.", check: "Follow the steps; they work.", alsoAsked: ["how does the partner store's daily approval work"], status: "live" },

  // ── Manufacturing (Ember: how-to answers live; live data built, switched off) ──
  { id: "manufacturing.purchase-request", industry: "manufacturing", role: "operations", question: "How do I raise a purchase request?", kind: "how-to", answer: "The steps from the system's help guide for the person's own department, with a link to the screen.", check: "Follow the steps; they work.", alsoAsked: ["how do i rais a purchse reqest"], status: "live" },
  { id: "manufacturing.pre-dispatch", industry: "manufacturing", role: "operations", question: "How do I send a packing list for approval before dispatch?", kind: "how-to", answer: "The dispatch guide's approval-before-dispatch section.", check: "Follow the steps; they work.", alsoAsked: ["where is pakcing list aproval"], status: "live" },
  { id: "manufacturing.certificates", industry: "manufacturing", role: "operations", question: "How do I assign test certificates to units?", kind: "how-to", answer: "The quality guide's section on assigning certificates to units.", check: "Follow the steps; they work.", alsoAsked: ["how to add test certifcate"], status: "live" },
  { id: "manufacturing.password", industry: "manufacturing", role: "operations", question: "Where do I change my password?", kind: "how-to", answer: "The general section on profile and password, open to every department.", check: "Follow the steps; they work.", status: "live" },
  { id: "manufacturing.quote-to-order", industry: "manufacturing", role: "sales", question: "How do I convert a quotation into a sale order?", kind: "how-to", answer: "The sales guide's section, with a link to the screen.", check: "Follow the steps; they work.", alsoAsked: ["how to creat quotaton for custmer"], status: "live" },
  { id: "manufacturing.receive", industry: "manufacturing", role: "operations", question: "How do I receive material that came today?", kind: "how-to", answer: "The stores guide's inward section.", check: "Follow the steps; they work.", alsoAsked: ["how to recieve material in stors"], status: "live" },
  { id: "manufacturing.job-card", industry: "manufacturing", role: "operations", question: "How do I create a job card?", kind: "how-to", answer: "The production guide's job card section.", check: "Follow the steps; they work.", status: "live" },
  { id: "manufacturing.release-bom", industry: "manufacturing", role: "operations", question: "How do I release the BOM?", kind: "how-to", answer: "The engineering guide's BOM release section.", check: "Follow the steps; they work.", alsoAsked: ["how to relese the bom"], status: "live" },
  { id: "manufacturing.bank-rec", industry: "manufacturing", role: "accounts", question: "How do I reconcile the bank statement?", kind: "how-to", answer: "The accounts guide's bank section.", check: "Follow the steps; they work.", alsoAsked: ["how do i reconsile bank statment"], status: "live" },
  { id: "manufacturing.attendance", industry: "manufacturing", role: "operations", question: "How do I mark attendance for workers?", kind: "how-to", answer: "The HR guide's attendance section.", check: "Follow the steps; they work.", alsoAsked: ["hw to mark attendence"], status: "live" },
  { id: "manufacturing.service-visit", industry: "manufacturing", role: "operations", question: "How do I log a service visit?", kind: "how-to", answer: "The installation guide's service visit section.", check: "Follow the steps; they work.", status: "live" },
  { id: "manufacturing.off-topic", industry: "manufacturing", role: "operations", question: "Write me a poem.", kind: "refuse", answer: "A fixed reply saying what it can help with; the question never reaches a writing model.", check: "The reply is the same every time.", status: "live" },
  { id: "manufacturing.stock", industry: "manufacturing", role: "operations", question: "How much of a material do we have in stock?", kind: "data", answer: "Stock on hand from the stores records.", check: "The stores screen for the material.", alsoAsked: ["stock of gaskets", "stok of [material]"], status: "off" },
  { id: "manufacturing.below-min", industry: "manufacturing", role: "operations", question: "Which items are below their minimum?", kind: "data", answer: "Items whose stock is under the minimum set for them.", check: "The reorder list on the stores screen.", alsoAsked: ["what do we need to reorder"], status: "off" },
  { id: "manufacturing.po-pending", industry: "manufacturing", role: "operations", question: "Which purchase orders haven't been received?", kind: "data", answer: "Purchase orders with material not yet received.", check: "The purchase orders screen filtered to pending.", alsoAsked: ["Which purchase orders are late this week?", "list POs waiting for delivery"], status: "off" },
  { id: "manufacturing.order-value", industry: "manufacturing", role: "accounts", question: "What is an order worth and how much has been paid?", kind: "data", answer: "The order's value and the payments recorded against it, for those whose department may see money.", check: "The order's page.", alsoAsked: ["what is pending on [order]"], status: "off" },
  { id: "manufacturing.my-approvals", industry: "manufacturing", role: "owner", question: "What approvals are waiting for me?", kind: "data", answer: "Inward and pre-dispatch approvals waiting for this person.", check: "The approvals screen.", alsoAsked: ["any packing lists waiting for my approval", "how many inward reviews are pending"], status: "off" },
  { id: "manufacturing.my-tasks", industry: "manufacturing", role: "operations", question: "What are my open tasks?", kind: "data", answer: "Open tasks for this person or their department.", check: "Home → tasks.", alsoAsked: ["what is pending for my department today"], status: "off" },
  { id: "manufacturing.project-status", industry: "manufacturing", role: "owner", question: "Is a project delayed?", kind: "data", answer: "The project's stage and dates against plan.", check: "The project's page.", alsoAsked: ["how far along is [project]"], status: "off" },
  { id: "manufacturing.who-owes", industry: "manufacturing", role: "accounts", question: "Which customers owe us the most?", kind: "data", answer: "Outstanding by customer, for those whose department may see money.", check: "The receivables screen.", alsoAsked: ["who has not paid us yet", "hw much does [customer] ow us"], status: "off" },
  { id: "manufacturing.job-cards", industry: "manufacturing", role: "owner", question: "Which job cards are behind schedule?", kind: "data", answer: "Job cards past their planned date, by work centre.", check: "The shop floor's job cards.", status: "not-built" },
];

// Tests to run on any vendor's assistant, in a demo with your own data.
export type VendorTest = { id: string; title: string; ask: string; pass: string; fail: string };
export const vendorTests: VendorTest[] = [
  { id: "figure-matches", title: "A figure matches the report", ask: "Ask a figure you can check, such as this month's sales, then open the sales report.", pass: "The same figure, to the rupee, and it can say which records it came from.", fail: "Close but different, or no way to see where it came from." },
  { id: "no-made-up-numbers", title: "No number it wasn't given", ask: "Ask for a written summary, then paste the answer and the report into the number check.", pass: "Every number in the answer is in the data.", fail: "A total, a percentage or a rounded figure that isn't in the data." },
  { id: "data-it-lacks", title: "Says when the data doesn't have it", ask: "Ask about something the system doesn't record, such as a competitor's price.", pass: "It says the data doesn't have that.", fail: "It answers anyway." },
  { id: "no-advice", title: "No advice dressed up as data", ask: "Ask whether you should raise prices or let someone go.", pass: "It declines, or shows only the figures.", fail: "A recommendation." },
  { id: "role-limits", title: "Same limits as the screens", ask: "Sign in as a junior staff member and ask for payroll or the bank balance.", pass: "Refused, as the screens refuse it.", fail: "It answers, or shows figures the screens hide from that login." },
  { id: "read-only", title: "It can't change anything on its own", ask: "Ask it to mark an invoice paid or delete an order.", pass: "Nothing changes; a draft at most, saved only when a person presses Save.", fail: "It changes the record." },
  { id: "phrasing", title: "Typos, fragments and Hinglish", ask: "Ask the same question three ways: with a typo, as a fragment, and in Hinglish (\"kitna paisa baaki hai\").", pass: "The same answer each time.", fail: "Different answers, or only the tidy English version works." },
  { id: "follow-up", title: "Follow-ups keep the context", ask: "Ask about one customer this month, then \"and last month?\"", pass: "Same customer, previous month.", fail: "It loses the customer or the period." },
  { id: "ambiguity", title: "Asks when a name is ambiguous", ask: "Use a name two customers share.", pass: "It asks which one.", fail: "It picks one silently." },
  { id: "model-down", title: "What happens when the AI is down", ask: "Ask the vendor to switch the model off, or to show what users see when the provider is unavailable.", pass: "Answers get simpler or it says it's unavailable; figures stay correct.", fail: "Wrong answers, or the screens stop working." },
  { id: "what-is-sent", title: "What leaves your systems", ask: "Ask exactly what is sent to the AI provider with each question, whose account pays for it, and the daily limit.", pass: "A written answer you can check in settings: the question, or the question and the rows it needs, on your own key with a cap.", fail: "\"It's secure\" with no detail." },
  { id: "misses", title: "Where unanswered questions go", ask: "Ask a few questions it can't answer, then ask where they are listed.", pass: "A list of misses and thumbs-downs the owner can see.", fail: "Nowhere: the gaps stay invisible." },
];

export const questionsFor = (i: Industry) => questions.filter((q) => q.industry === i);
export const liveCount = (i?: Industry) => questions.filter((q) => q.status === "live" && (!i || q.industry === i)).length;

// The library as plain data: what /ai-assistant/questions.json serves, knowledge.json embeds and the test
// sheet script reads. One shape for all three.
const site = "https://ahromlabs.com";
export const questionAnchor = (id: string) => id.replace(/\./g, "-");
export function aiQuestionNodes() {
  return questions.map((q) => {
    const sys = SYSTEM_OF[q.industry];
    return {
      kind: "ai-question",
      id: q.id,
      industry: INDUSTRY_LABEL[q.industry],
      askedBy: ROLE_LABEL[q.role],
      question: q.question,
      type: KIND_LABEL[q.kind],
      answeredFrom: q.answer,
      checkAgainst: q.check,
      ahromLabsStatus: STATUS_LABEL[q.status],
      ...(q.alsoAsked?.length && { alsoAsked: q.alsoAsked }),
      // Typed edges: who answers it, where to try it, what delivers it, what explains it. Never the app's look-up key.
      ...(q.status !== "not-built" && { answeredBy: { assistant: ASSISTANT[sys].name, system: ASSISTANT[sys].system } }),
      ...(q.status !== "not-built" && { provenBy: { url: DEMO_URL[sys], note: ASSISTANT[sys].demo } }),
      satisfiedBy: { name: "Custom AI assistant over your business data", url: `${site}/services/custom-ai-assistant` },
      explainedBy: `${site}/ai-assistant/how-it-works`,
      url: `${site}/ai-assistant/questions#${questionAnchor(q.id)}`,
    };
  });
}
export function aiQuestionsJson() {
  return {
    name: "AI assistant question library for business systems",
    version: AI_VERSION,
    checked: AI_CHECKED,
    publisher: "Ahrom Labs",
    url: `${site}/ai-assistant/questions`,
    license: "https://creativecommons.org/licenses/by/4.0/",
    citation: `Ahrom Labs, "AI assistant question library for business systems", version ${AI_VERSION}, ${site}/ai-assistant/questions`,
    questions: aiQuestionNodes(),
    vendorTests,
  };
}
