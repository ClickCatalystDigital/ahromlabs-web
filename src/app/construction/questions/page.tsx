import type { Metadata } from "next";
import { ConstructionPage } from "@/components/ConstructionPage";
import { QuestionLibrary } from "@/components/QuestionLibrary";
import { CON_PUBLISHED } from "@/lib/construction";
import { constructionQuestions } from "@/lib/questions";
import { mfgPageGraph } from "@/lib/schema";

const title = "Construction billing questions, answered";
const description = "Short answers to contractors' questions on pay applications, retainage, lien waivers and change orders in the US, and RA bills, TDS and GST in India.";

export const metadata: Metadata = {
  title: { absolute: "Construction billing questions, answered | Ahrom Labs" },
  description,
  alternates: { canonical: "/construction/questions" },
  openGraph: { type: "website", url: "https://ahromlabs.com/construction/questions", siteName: "Ahrom Labs", title, description },
  twitter: { card: "summary_large_image", title, description },
};

export default function ConstructionQuestions() {
  const lib = constructionQuestions();
  const lead = `${lib.questions.length} questions contractors ask about getting paid and tracking job cost, each answered in a few lines and linked to the guide that explains it with its sources. Free to reuse as data under CC BY 4.0.`;
  const trail = [{ name: "Construction", path: "/construction" }, { name: title, path: "/construction/questions" }];
  const updated = [lib.checked, ...lib.questions.map((q) => q.updated)].sort().at(-1)!;
  return (
    <ConstructionPage
      graph={mfgPageGraph({ path: "/construction/questions", title, description: lead, published: CON_PUBLISHED, updated, trail, questions: lib.questions.map((q) => ({ q: q.question, a: q.answer })) })}
      trail={trail}
      title={title}
      lead={lead}
      checked={lib.checked}
      updated={updated}
    >
      <QuestionLibrary lib={lib} />
    </ConstructionPage>
  );
}
