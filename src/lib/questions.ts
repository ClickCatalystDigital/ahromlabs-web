import { CON_CHECKED, CON_GROUPS, conGuides } from "./construction";
import { INT_CHECKED, INT_GROUPS, intGuides } from "./interiors";
import { formName, ibrFormPages, ibrGroups, IBR_FORMS_CHECKED } from "./ibr-forms";
import { getContent } from "./content";

// Question libraries for the construction, interiors and IBR hubs, like /asme/questions: one question per guide (or
// per IBR form) with its short answer, as a page and as data (CC BY 4.0). One shape for page, JSON and llms.txt.

export type QA = { question: string; answer: string; topic: string; market?: "IN" | "NA"; url: string; updated: string };
export type Library = { hub: string; name: string; checked: string; topics: { name: string; market?: "IN" | "NA" }[]; questions: QA[] };

const clean = (s: string) => s.replace(/\s+/g, " ").trim();
const SITE = "https://ahromlabs.com";

export function constructionQuestions(): Library {
  const topic = (slug?: string) => CON_GROUPS.find((g) => g.slug === slug)!;
  return {
    hub: "construction",
    name: "Construction billing and job cost questions, answered",
    checked: CON_CHECKED,
    topics: CON_GROUPS.map((g) => ({ name: g.name, market: g.market })),
    questions: conGuides().map((g) => ({
      question: g.question ?? g.title,
      answer: clean(g.answer),
      topic: topic(g.group).name,
      market: topic(g.group).market,
      url: `${SITE}/construction/${g.slug}`,
      updated: g.updated,
    })),
  };
}

export function interiorsQuestions(): Library {
  return {
    hub: "interiors",
    name: "Interior design business questions, answered",
    checked: INT_CHECKED,
    topics: INT_GROUPS.map((g) => ({ name: g.name })),
    questions: intGuides().map((g) => ({
      question: g.question ?? g.title,
      answer: clean(g.answer),
      topic: INT_GROUPS.find((x) => x.slug === g.group)!.name,
      url: `${SITE}/interiors/${g.slug}`,
      updated: g.updated,
    })),
  };
}

// IBR guides have no question field of their own; these are the questions people search.
const IBR_GUIDE_Q: Record<string, string> = {
  "2026-changes": "What changed from IBR 1950 to IBR 2026?",
  "registration-documents": "Which documents are needed to register a boiler under IBR 2026?",
  "stage-inspection": "At which stages is a boiler inspected during manufacture under IBR 2026?",
  "renewal-inspection": "How is a boiler certificate renewed under IBR 2026?",
  "steam-pipes": "How are steam pipes approved under IBR 2026?",
  "record-keeping": "How long must boiler records be kept under IBR 2026?",
  "small-industrial-boilers": "What are the rules for small industrial boilers under IBR 2026?",
};

export function ibrQuestions(): Library {
  const guides = getContent("guide").map((g) => ({
    question: IBR_GUIDE_Q[g.slug] ?? g.title,
    answer: clean(g.answer),
    topic: "IBR 2026 guides",
    url: `${SITE}/ibr/${g.slug}`,
    updated: g.updated,
  }));
  const forms = ibrFormPages().map((f) => ({
    question: `What is IBR ${formName(f)}${f.old ? ` (formerly ${f.old.form})` : ""}?`,
    answer: clean(`${f.summary} Prescribed under regulation ${f.regulation}. Issued by: ${f.page!.issuedBy}`),
    topic: ibrGroups.find((x) => x.id === f.group)!.name,
    url: `${SITE}/ibr/forms/${f.slug}`,
    updated: IBR_FORMS_CHECKED,
  }));
  return {
    hub: "ibr",
    name: "IBR 2026 questions, answered",
    checked: IBR_FORMS_CHECKED,
    topics: [{ name: "IBR 2026 guides" }, ...ibrGroups.map((g) => ({ name: g.name }))],
    questions: [...guides, ...forms],
  };
}

/** The library as data: licence and citation travel with it. */
export const libraryJson = (lib: Library) => ({
  name: lib.name,
  publisher: "Ahrom Labs",
  url: `${SITE}/${lib.hub}/questions`,
  checked: lib.checked,
  license: "https://creativecommons.org/licenses/by/4.0/",
  citation: `Ahrom Labs, "${lib.name}", ${lib.checked}, ${SITE}/${lib.hub}/questions`,
  note: "General information, not legal, tax or engineering advice; each answer links to the guide that explains it with its sources.",
  questions: lib.questions,
});
