// The short-video series: ten episodes per assistant, each one question asked on the public demo (sample company,
// made-up data). Sources: docs/ai-shorts-questions.md (Atelier AI) and docs/drafts/ai-episodes-ohm-ember-datum.md
// (Ohm, Ember, Datum; answers tested on the live demos on 10 Nov 2026). Each episode points at a question in the
// library (src/lib/ai-assistant.ts); scripts/ai-assistant.check.ts fails if the question is missing or isn't answered
// on the demo. When an episode is published, add its YouTube id: the pages then embed it with VideoObject markup.
import type { System } from "./ai-assistant";

export type Level = "descriptive" | "diagnostic" | "predictive" | "guardrail";
export type Episode = {
  system: System;
  n: number;
  hook: string; // the line on screen, and the video's title
  question: string; // a library question id
  level: Level;
  youtube?: string; // YouTube video id, once published
  published?: string; // YYYY-MM-DD, with youtube
};

export const LEVEL_LABEL: Record<Level, string> = {
  descriptive: "What happened",
  diagnostic: "Why, or against the plan",
  predictive: "What will happen",
  guardrail: "What it won't do",
};

// The guide for each assistant's industry, where its series is listed under the text.
export const EPISODE_PAGE: Record<System, string> = {
  "boiler-manufacturer": "manufacturers",
  "ls-technologies": "trading-distribution",
  "savistar-saag": "interior-design-firms",
  "construction-company": "construction-contractors",
};

const e = (system: System, list: [string, string, Level][]): Episode[] => list.map(([hook, question, level], i) => ({ system, n: i + 1, hook, question, level }));

export const episodes: Episode[] = [
  ...e("boiler-manufacturer", [
    ["Your customer wants an update. Is the boiler on schedule?", "manufacturing.project-status", "diagnostic"],
    ["Production needs material. Which purchase orders haven't arrived?", "manufacturing.po-pending", "diagnostic"],
    ["Which critical materials are below minimum stock?", "manufacturing.below-min", "diagnostic"],
    ["Do we actually have the steel in stores?", "manufacturing.stock", "descriptive"],
    ["How much do customers still have to pay on their orders?", "manufacturing.who-owes", "descriptive"],
    ["Boiler dispatched. Is it paid for?", "manufacturing.order-value", "descriptive"],
    ["What's waiting for the QC head's approval?", "manufacturing.my-approvals", "descriptive"],
    ["What does the production head need to handle today?", "manufacturing.my-tasks", "descriptive"],
    ["Two checks before the morning production meeting", "manufacturing.project-status", "diagnostic"],
    ["Can your stores team see customer money?", "manufacturing.who-owes", "guardrail"],
  ]),
  ...e("ls-technologies", [
    ["A customer needs a component. Do you actually have it?", "trading.item-stock", "descriptive"],
    ["How much stock is sitting on your shelves without moving?", "trading.dead-stock", "diagnostic"],
    ["Which components could run out next month?", "trading.run-out", "predictive"],
    ["Your customer confirmed the PO. Why hasn't it shipped?", "trading.po-status", "diagnostic"],
    ["A reel has gone missing. Can you trace it?", "trading.trace", "descriptive"],
    ["Your regular customers have stopped ordering. Did anyone notice?", "trading.quiet-customers", "diagnostic"],
    ["You weren't at the store today. What happened?", "trading.today", "descriptive"],
    ["Two stores, hundreds of movements. Who's keeping track?", "trading.transfers", "descriptive"],
    ["A customer disputes a shipment. What do your records say?", "trading.shipped", "descriptive"],
    ["Your sales team says they're following up. Are they?", "trading.tasks", "diagnostic"],
  ]),
  ...e("savistar-saag", [
    ["Did this project make money?", "projects.profit", "diagnostic"],
    ["How much money do we actually have?", "projects.money", "descriptive"],
    ["Is the transporter overcharging?", "projects.freight", "diagnostic"],
    ["One project, one answer", "projects.one-project", "descriptive"],
    ["Clients we've ignored", "projects.quiet-clients", "diagnostic"],
    ["Who's our best craftsman?", "projects.work-ratings", "descriptive"],
    ["Quotes we're still chasing", "projects.open-quotes", "descriptive"],
    ["It remembers for you", "projects.remind", "descriptive"],
    ["Staff can't see payroll", "projects.staff-payroll", "guardrail"],
    ["Is billing up or down on last month?", "projects.compare", "diagnostic"],
  ]),
  ...e("construction-company", [
    ["Four sites running. Which one is losing money?", "construction.margin", "predictive"],
    ["The work is done. Why is the payment still stuck?", "construction.ra-bills", "diagnostic"],
    ["Extra work done. Has it been approved?", "construction.change-orders", "diagnostic"],
    ["Is a site using more material than the BOQ allows?", "construction.material-use", "diagnostic"],
    ["Money goes to every site. Where is it?", "construction.site-cash", "descriptive"],
    ["It's 7 pm. Which sites haven't reported?", "construction.daily-reports", "diagnostic"],
    ["You're paying for machines that sit idle", "construction.machinery", "diagnostic"],
    ["Are you buying at the lowest recorded rate?", "construction.supplier-rates", "diagnostic"],
    ["Who's on site today, and are their papers in order?", "construction.workforce", "descriptive"],
    ["Workers took advances. Have they been recovered?", "construction.advances", "descriptive"],
  ]),
];

export const episodesFor = (system: System) => episodes.filter((x) => x.system === system);
export const youtubeUrl = (id: string) => `https://www.youtube.com/watch?v=${id}`;
