import type { Metadata } from "next";
import { InteriorsPage } from "@/components/InteriorsPage";
import { QuestionLibrary } from "@/components/QuestionLibrary";
import { INT_PUBLISHED } from "@/lib/interiors";
import { interiorsQuestions } from "@/lib/questions";
import { mfgPageGraph } from "@/lib/schema";

const title = "Interior design business questions, answered";
const description = "Short answers to interior design firms' questions on fees, contracts, deposits, purchase orders, FF&E, sales tax and software.";

export const metadata: Metadata = {
  title: { absolute: "Interior design business questions, answered | Ahrom Labs" },
  description,
  alternates: { canonical: "/interiors/questions" },
  openGraph: { type: "website", url: "https://ahromlabs.com/interiors/questions", siteName: "Ahrom Labs", title, description },
  twitter: { card: "summary_large_image", title, description },
};

export default function InteriorsQuestions() {
  const lib = interiorsQuestions();
  const lead = `${lib.questions.length} questions interior design firms ask about charging, buying product and running the books, each answered in a few lines and linked to the guide that explains it with its sources. Free to reuse as data under CC BY 4.0.`;
  const trail = [{ name: "Interiors", path: "/interiors" }, { name: title, path: "/interiors/questions" }];
  const updated = [lib.checked, ...lib.questions.map((q) => q.updated)].sort().at(-1)!;
  return (
    <InteriorsPage
      graph={mfgPageGraph({ path: "/interiors/questions", title, description: lead, published: INT_PUBLISHED, updated, trail, questions: lib.questions.map((q) => ({ q: q.question, a: q.answer })) })}
      trail={trail}
      title={title}
      lead={lead}
      checked={lib.checked}
      updated={updated}
    >
      <QuestionLibrary lib={lib} />
    </InteriorsPage>
  );
}
