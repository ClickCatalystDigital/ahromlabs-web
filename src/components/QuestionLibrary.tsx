import Link from "next/link";
import { GuideH2 } from "@/components/GuidePage";
import { only } from "@/lib/markets";
import type { Library } from "@/lib/questions";

// The body of a hub's question library (/construction/questions, /interiors/questions, /ibr/questions): a download
// line, then each topic's questions with the answer and a link to the full guide. Topics for one market are hidden
// in the other, like the hub pages.
export function QuestionLibrary({ lib }: { lib: Library }) {
  return (
    <>
      <p className="leading-relaxed text-foreground-secondary">
        Download the questions and answers as{" "}
        <a href={`/${lib.hub}/questions.json`} className="text-link focus-ring">JSON</a>. Free under CC BY 4.0: use them,
        credit Ahrom Labs.
      </p>
      {lib.topics.map((t) => {
        const qs = lib.questions.filter((q) => q.topic === t.name);
        return qs.length === 0 ? null : (
          <section key={t.name} {...only(t.market ? [t.market] : undefined)}>
            <GuideH2>{t.name}</GuideH2>
            <dl className="mt-6 divide-y divide-line border-y border-line">
              {qs.map((q) => (
                <div key={q.url} className="py-6">
                  <dt className="text-lg font-medium text-foreground">{q.question}</dt>
                  <dd className="mt-2 leading-relaxed text-foreground-secondary">
                    {q.answer}{" "}
                    <Link href={q.url.replace("https://ahromlabs.com", "")} className="text-link focus-ring">Read the guide</Link>
                  </dd>
                </div>
              ))}
            </dl>
          </section>
        );
      })}
    </>
  );
}
