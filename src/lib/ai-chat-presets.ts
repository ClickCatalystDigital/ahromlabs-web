// Ahrom AI's suggested questions, each with a fixed answer built from the same
// data the pages use (one fact, one node), so the questions we put in front of
// visitors are answered instantly and always right. Typed questions still go to
// AI Search. Business-owner questions, not ones we'd have to hint at.
import { engagementAnswers } from "@/lib/engagement";
import { engagements } from "@/lib/work";
import { families } from "@/lib/services";

export type Preset = {
  question: string;
  answer: string;
  sources: { url: string; title: string }[];
};

const site = "https://ahromlabs.com";
const answerOf = (id: string) => engagementAnswers.find((a) => a.id === id)!.answer;
const demos = engagements.flatMap((e) => (e.demo ? [e.demo] : []));

export const chatPresets: Preset[] = [
  {
    question: "What kind of systems do you build?",
    answer:
      "We build the operations and accounting systems a manufacturer or trading group runs on, as one system instead of separate tools:\n\n" +
      families.map((f) => `- ${f.shortName}`).join("\n") +
      `\n\nEach one is built around how your business already works. Every system we build is on the services page: ${site}/services`,
    sources: [
      { url: `${site}/services`, title: "Services" },
      { url: `${site}/work`, title: "Work" },
    ],
  },
  {
    question: "Can I see a live demo?",
    answer:
      `Yes. ${demos.length} live demos run on sample data, with no sign-up:\n\n` +
      demos.map((d) => `- ${d.name}: ${d.url}\n  ${d.blurb}`).join("\n"),
    sources: [{ url: `${site}/work`, title: "Work" }],
  },
  {
    question: "What would it cost us?",
    answer: `${answerOf("cost")} The pricing page explains how a fixed quote is reached: ${site}/engagement#cost`,
    sources: [{ url: `${site}/engagement`, title: "Pricing, licensing and support" }],
  },
  {
    question: "How soon could we start using it?",
    answer: `${answerOf("timeline")} More on timelines: ${site}/engagement#timeline`,
    sources: [{ url: `${site}/engagement`, title: "Pricing, licensing and support" }],
  },
];
