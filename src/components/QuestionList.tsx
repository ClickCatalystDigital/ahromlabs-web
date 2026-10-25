import { questionsFor, questionAnchor, ASSISTANT, SYSTEM_OF, DEMO_URL, ROLE_LABEL, KIND_LABEL, STATUS_LABEL, type Question } from "@/lib/ai-assistant";
import type { Industry } from "@/lib/erp";

// One industry's questions from the AI assistant library: on /ai-assistant/questions and on each industry guide.

function Item({ q }: { q: Question }) {
  return (
    <article id={questionAnchor(q.id)} className="mt-8 scroll-mt-24 border-t border-line pt-5">
      <h3 className="text-lg font-medium text-foreground">{q.question}</h3>
      <p className="mt-1 text-xs uppercase tracking-wide text-foreground-secondary">
        {ROLE_LABEL[q.role]} · {KIND_LABEL[q.kind]} · {STATUS_LABEL[q.status]}
      </p>
      <dl className="mt-3 space-y-2 text-sm leading-relaxed">
        <div>
          <dt className="font-medium text-foreground">{q.kind === "refuse" ? "What a good assistant does" : "What should answer it"}</dt>
          <dd className="text-foreground-secondary">{q.answer}</dd>
        </div>
        <div>
          <dt className="font-medium text-foreground">Check it against</dt>
          <dd className="text-foreground-secondary">{q.check}</dd>
        </div>
        {q.alsoAsked && q.alsoAsked.length > 0 && (
          <div>
            <dt className="font-medium text-foreground">Also asked as</dt>
            <dd className="text-foreground-secondary">{q.alsoAsked.map((a) => `“${a}”`).join(" · ")}</dd>
          </div>
        )}
      </dl>
    </article>
  );
}

export function QuestionList({ industry }: { industry: Industry }) {
  const sys = SYSTEM_OF[industry];
  const a = ASSISTANT[sys];
  return (
    <>
      <p className="mt-4 leading-relaxed text-foreground-secondary">
        Status is {a.name}&apos;s, the assistant in {a.system}, used by {a.who}. Try it on the{" "}
        <a href={DEMO_URL[sys]} className="text-link focus-ring">public demo</a>: {a.demo}.
      </p>
      {questionsFor(industry).map((q) => (
        <Item key={q.id} q={q} />
      ))}
    </>
  );
}
