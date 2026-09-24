// The questions a buyer asks before contacting a services firm, answered the
// way the founder actually works. Feeds /engagement and llms.txt. Plain Q&A
// content, deliberately without FAQPage markup: Google retired FAQ rich
// results in May 2026 and a controlled test found no citation lift from the
// schema — the answers themselves are what gets lifted (docs/progress.md).
//
// Every commercial term here was set by the founder on 2026-09-24. Change a
// term here and it changes everywhere; don't restate it in page copy.

export type Answer = {
  // Anchor on /engagement. Stable once published.
  id: string;
  question: string;
  // First sentence answers the question outright — the chunk that gets lifted.
  answer: string;
  detail?: string[];
};

export const engagementAnswers: Answer[] = [
  {
    id: "pricing",
    question: "How is a project priced?",
    answer:
      "In fixed-price phases, never an open-ended hourly bill. Every engagement starts with a short, fixed-fee modeling phase that maps how the business works and ends with a phased plan and a fixed quote for each phase.",
    detail: [
      "You keep the model and the plan whether or not you continue with us. If you do, the modeling fee is credited against the first build phase.",
      "Each build phase is quoted before it starts, goes live, and is in use before the next one begins — so you're never paying for months of work you can't see.",
      "We don't publish a rate card, because two businesses that both want \"an ERP\" can need very different systems. The modeling phase is what makes a fixed quote honest.",
    ],
  },
  {
    id: "cost-drivers",
    question: "What makes a system cost more or less?",
    answer:
      "Mostly how many departments and workflows it covers, what it has to integrate with, and whether we've solved the problem before.",
    detail: [
      "More departments and more hand-offs between them mean more to model and build.",
      "Integrations add work: TallyPrime, e-way bill, bank statements, government portals, existing software you want to keep.",
      "Migrating years of data out of spreadsheets or an old system is its own piece of work, quoted on its own.",
      "Anything already in our pattern library — Tally posting, document extraction, role-scoped finance, piece-level inventory — costs less, because it's reuse rather than invention.",
    ],
  },
  {
    id: "timeline",
    question: "How long does it take to go live?",
    answer:
      "It depends on how new the problem is: something we've already built on another engagement can ship in days or weeks; genuinely new ground takes a couple of months, delivered in phases so part of it is in use early.",
    detail: [
      "Every decision from past engagements is written down in our public pattern library, and the agents and developers working on a new system check it before designing anything. That's why a repeat problem is fast.",
      "The modeling phase ends with a dated plan per phase, so you know the timeline before you commit to the build.",
    ],
  },
  {
    id: "ownership",
    question: "Who owns the code and the data?",
    answer:
      "You do. Once the project is paid in full, the custom code we wrote for you and all of your data are yours, transferred in writing.",
    detail: [
      "We keep ownership of pre-existing, reusable components — internal libraries and tools we use across clients — and give you a permanent licence to use them in your system.",
      "Your data is always yours, at every stage, paid or not.",
    ],
  },
  {
    id: "hosting",
    question: "Where is the system hosted?",
    answer:
      "Wherever suits you: during development we host it on our own server at no charge, and at go-live we set up a production cloud server in your name, recommending a provider based on the first interview.",
    detail: [
      "Server, storage and domain charges are paid by you directly to the provider, so there's no mark-up and no dependency on us to keep it running.",
      "If you'd rather use your own cloud account or your own premises, we deploy there instead.",
    ],
  },
  {
    id: "support",
    question: "What happens after go-live?",
    answer:
      "Ongoing support runs under an annual maintenance contract (AMC) of 15–21% of the project value per year — nearer 21% for smaller projects, nearer 15% for larger ones.",
    detail: [
      "The AMC covers fixes and keeping the system and its server running, plus small changes. A new module is quoted as its own phase.",
      "Support requests come in by email today, answered within 48 hours at most. A ticketing system for urgent work is on its way.",
    ],
  },
  {
    id: "continuity",
    question: "Ahrom Labs is small — what if you're unavailable?",
    answer:
      "The work doesn't depend on one person: a team of developers and AI agents carries the delivery load, and every system ships with a canonical system document that lets any developer or agent pick it up cold.",
    detail: [
      "That document records what exists, how it fits together, and every known gap — the operations system for Shanti Boilers has one running to thousands of lines, updated as each piece of work lands.",
      "Combined with owning your code and your server, it means you're never locked in: another team could take over from the document alone.",
    ],
  },
  {
    id: "fit",
    question: "Is my business a fit?",
    answer:
      "If your business has outgrown spreadsheets and off-the-shelf software, and a few people are the only ones who know how everything connects, probably — industry matters less than the shape of the problem.",
    detail: [
      "We've built for boiler manufacturing, PCB and electronics trading, interior design and furniture. The fastest way to know is to tell us what the business runs on today.",
    ],
  },
];
