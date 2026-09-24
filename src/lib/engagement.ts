// The questions a buyer asks before hiring a software firm, in the words they
// search with, answered the way the founder actually works. Feeds /engagement,
// llms.txt and /knowledge.json. Plain Q&A content, deliberately without
// FAQPage markup: Google retired FAQ rich results in May 2026 and a controlled
// test found no citation lift from the schema — the answers are what get lifted.
//
// Commercial terms were set by the founder on 2026-09-24 (docs/progress.md).
// Market figures are third-party and always carry `sources`; never present
// them as Ahrom Labs' own prices. Question wording follows the buyer phrasing
// in docs/research/competitive-analysis-2026-09.md §4–5.

export type Answer = {
  // Anchor on /engagement. Stable once published.
  id: string;
  question: string;
  // First sentence answers the question outright — the chunk that gets lifted.
  answer: string;
  detail?: string[];
  // Outbound citations for any third-party figure in the answer or detail.
  sources?: { label: string; href: string }[];
  // Internal pages that show the claim in practice.
  see?: { label: string; href: string }[];
};

export const engagementAnswers: Answer[] = [
  {
    id: "cost",
    question: "How much does a custom ERP cost in India?",
    answer:
      "Published 2026 guides put a custom ERP for a small Indian manufacturer at roughly ₹3–15 lakh, and a fuller build for a mid-sized manufacturer at ₹15–40 lakh. Where a project lands depends on scope, and Ahrom Labs quotes a fixed price for each phase once the business has been modeled — never an open-ended hourly bill.",
    detail: [
      "Those ranges are market figures from other firms' published guides, not our price list. We don't publish a rate card because two businesses that both want \"an ERP\" can need very different systems — the modeling phase is what makes a fixed quote honest.",
    ],
    sources: [
      { label: "ProftCode — custom ERP for Indian manufacturers", href: "https://www.proftcode.com/blog/why-indian-manufacturers-switching-custom-erp/" },
      { label: "NGD Technolab — custom ERP for manufacturing companies in India", href: "https://ngendevtech.com/blog/custom-erp-development-for-manufacturing-companies-in-india/" },
    ],
  },
  {
    id: "pricing",
    question: "How do you price a custom software project?",
    answer:
      "In fixed-price phases. Every engagement starts with a short, fixed-fee modeling phase that maps how the business works and ends with a phased plan and a fixed quote for each phase.",
    detail: [
      "You keep the model and the plan whether or not you continue with us. If you do, the modeling fee is credited against the first build phase.",
      "Each build phase is quoted before it starts, goes live, and is in use before the next one begins — so you never pay for months of work you can't see.",
    ],
  },
  {
    id: "cost-drivers",
    question: "What makes ERP software cost more or less?",
    answer:
      "Mostly how many departments and workflows it covers, what it has to integrate with, how much old data moves in, and whether we've solved the problem before.",
    detail: [
      "More departments and more hand-offs between them mean more to model and build.",
      "Integrations add work: TallyPrime, e-way bill, bank statements, government portals, software you want to keep.",
      "Migrating years of data out of spreadsheets or an old system is its own piece of work, quoted on its own.",
      "Anything already in our pattern library — Tally posting, document extraction, role-scoped finance, piece-level inventory — costs less, because it's reuse rather than invention.",
    ],
    see: [{ label: "The pattern library", href: "/patterns" }],
  },
  {
    id: "timeline",
    question: "How long does a custom ERP take to go live?",
    answer:
      "It depends on how new the problem is: something we've already built on another engagement can ship in days or weeks, while genuinely new ground takes a couple of months, delivered in phases so part of it is in use early.",
    detail: [
      "Every decision from past engagements is written down in our public pattern library, and the developers and AI agents working on a new system check it before designing anything. That's why a repeat problem is fast.",
      "The modeling phase ends with a dated plan per phase, so you know the timeline before you commit to the build.",
    ],
  },
  {
    id: "tally",
    question: "Will it work with Tally, or do we have to replace Tally?",
    answer:
      "Either way works: Tally can stay as your books, with approved invoices posted into it automatically within 30 seconds, or the books can move into the new system with Tally kept as an optional sync.",
    detail: [
      "LS Technologies kept Tally as the books. Shanti Boilers moved the ledger, GST and TDS into its operations system and kept Tally optional. Which fits depends on how much of your accounting starts as operational events.",
    ],
    see: [
      { label: "Seven signs your business has outgrown Tally", href: "/notes/outgrown-tally-signs" },
      { label: "Tally, ERPNext, Odoo or custom", href: "/notes/tally-vs-erpnext-vs-custom-erp" },
    ],
  },
  {
    id: "ownership",
    question: "Who owns the source code and the data?",
    answer:
      "You do. Once the project is paid in full, the custom code we wrote for you and all of your data are yours, transferred in writing.",
    detail: [
      "We keep ownership of pre-existing, reusable components — internal libraries and tools we use across clients — and give you a permanent licence to use them in your system.",
      "Your data is always yours, at every stage, paid or not.",
    ],
  },
  {
    id: "hosting",
    question: "Is it hosted on the cloud or on our own server?",
    answer:
      "Wherever suits you: during development we host it on our own server at no charge, and at go-live we set up a production cloud server in your name, recommending a provider based on the first interview.",
    detail: [
      "Server, storage and domain charges are paid by you directly to the provider, so there's no mark-up and no dependency on us to keep it running.",
      "If you'd rather use your own cloud account or your own premises, we deploy there instead.",
    ],
  },
  {
    id: "support",
    question: "What does the AMC cover, and what does it cost?",
    answer:
      "Support after go-live runs under an annual maintenance contract (AMC) of 15–21% of the project value per year — nearer 21% for smaller projects, nearer 15% for larger ones.",
    detail: [
      "The AMC covers fixes and keeping the system and its server running, plus small changes. A new module is quoted as its own phase.",
      "Support requests come in by email today, answered within 48 hours at most. A ticketing system for urgent work is on its way.",
    ],
  },
  {
    id: "scope-changes",
    question: "What happens when requirements change mid-project?",
    answer:
      "A change is written down, priced and agreed before it's built — never billed after the fact. Because the model is agreed first, most changes show up as a clear difference from it rather than as a surprise.",
    detail: [
      "A small change inside the current phase is absorbed into it; a change to how the business is modeled becomes part of a later phase, quoted before it starts.",
    ],
  },
  {
    id: "what-goes-wrong",
    question: "What goes wrong on your projects, and how do you catch it?",
    answer:
      "Real bugs, found by testing with real transactions before anyone depended on them — and they're written up in the engineering notes rather than hidden.",
    detail: [
      "A reverse-charge test that posted real documents through a new ledger found two posting bugs. Running a single order through every department end to end found that sales invoices weren't carrying their project link. Building per-piece plate costing uncovered an existing error in how average cost was recalculated for cut stock — fixed at the root, not patched in the report.",
      "An AI suggestion rule that looked reasonable matched the misspelling PALTE to VALVE as readily as to PLATE; it was caught and narrowed before it shipped.",
    ],
    see: [
      { label: "GST, TDS and the ledger inside a manufacturing ERP", href: "/notes/accounting-inside-the-manufacturing-erp" },
      { label: "One confirmation teaches the system", href: "/patterns/one-confirmation-teaches-the-system" },
    ],
  },
  {
    id: "why-erp-fails",
    question: "Why do ERP implementations fail in Indian SMEs, and what's different here?",
    answer:
      "Mostly because people go back to Excel and WhatsApp: the system doesn't match how the business actually runs, and old data turns out messier than anyone planned for. Modeling the business first, scoping data migration up front, and delivering in phases that are each in use before the next target exactly those failures.",
    detail: [
      "The modeling phase maps your entities, workflows and decisions as they really are, so the system is built around them rather than around a template.",
      "Data migration is scoped and quoted as its own piece of work instead of being discovered halfway through.",
    ],
    sources: [
      { label: "Manufacturing Today India — why ERP projects fail", href: "https://www.manufacturingtodayindia.com/why-erp-projects-fail" },
      { label: "Indian Printer Publisher — why traditional ERP systems fail in India", href: "https://indianprinterpublisher.com/blog/2026/05/traditional-erp-systems-india/" },
      { label: "Ultra Consultants — causes of ERP project failure", href: "https://ultraconsultants.com/erp-software-blog/15-causes-of-erp-project-failure/" },
    ],
  },
  {
    id: "references",
    question: "Can we see your work or talk to a past client?",
    answer:
      "Every client on our work page is named with their permission, and each system is written up in detail with real numbers. Ask, and we'll check whether a past client is willing to talk to you.",
    detail: [
      "The owners of Savistar and Saag have said publicly: \"It has brought much more structure, visibility, and control to the way we operate.\"",
    ],
    see: [
      { label: "Our work", href: "/work" },
      { label: "Industries", href: "/industries" },
    ],
  },
  {
    id: "continuity",
    question: "You're a small firm — what if you're unavailable?",
    answer:
      "The work doesn't depend on one person: a team of developers and AI agents carries the delivery load, and every system ships with a canonical system document that lets any developer or agent pick it up cold.",
    detail: [
      "That document records what exists, how it fits together, and every known gap — the operations system for Shanti Boilers has one running to thousands of lines, updated as each piece of work lands.",
      "Combined with owning your code and your server, it means you're never locked in: another team could take over from the document alone.",
    ],
  },
  {
    id: "fit",
    question: "Is my business a fit for a custom system?",
    answer:
      "Probably, if your business has outgrown spreadsheets and off-the-shelf software and a few people are the only ones who know how everything connects — industry matters less than the shape of the problem. If a standard package fits your processes, we'll say so.",
    see: [
      { label: "When a package is the better choice", href: "/notes/tally-vs-erpnext-vs-custom-erp" },
      { label: "Industries we've built for", href: "/industries" },
    ],
  },
];
