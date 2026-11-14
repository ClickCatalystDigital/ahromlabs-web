import type { Metadata } from "next";
import { IbrPage } from "@/components/IbrPage";
import { QuestionLibrary } from "@/components/QuestionLibrary";
import { IBR_FORMS_PUBLISHED } from "@/lib/ibr-forms";
import { ibrQuestions } from "@/lib/questions";
import { ibrPageGraph } from "@/lib/schema";

const title = "IBR 2026 questions, answered";
const description = "Short answers on the Indian Boiler Regulations, 2026: every IBR form and its old IBR 1950 name, registration, stage inspection, renewal, steam pipes and records.";

export const metadata: Metadata = {
  title: { absolute: "IBR 2026 questions and forms, answered | Ahrom Labs" },
  description,
  alternates: { canonical: "/ibr/questions" },
  openGraph: { type: "website", url: "https://ahromlabs.com/ibr/questions", siteName: "Ahrom Labs", title, description },
  twitter: { card: "summary_large_image", title, description },
};

export default function IbrQuestions() {
  const lib = ibrQuestions();
  const lead = `${lib.questions.length} questions on the Indian Boiler Regulations, 2026: what each form is, who issues it and under which regulation, and the rules for registration, inspection and records. Each links to its page, quoted from the Gazette. Free to reuse as data under CC BY 4.0.`;
  const trail = [{ name: "IBR", path: "/ibr" }, { name: title, path: "/ibr/questions" }];
  const updated = [lib.checked, ...lib.questions.map((q) => q.updated)].sort().at(-1)!;
  return (
    <IbrPage
      graph={ibrPageGraph({ path: "/ibr/questions", title, description: lead, published: IBR_FORMS_PUBLISHED, updated, trail })}
      trail={trail}
      title={title}
      lead={lead}
      checked={lib.checked}
      updated={updated}
    >
      <QuestionLibrary lib={lib} />
    </IbrPage>
  );
}
