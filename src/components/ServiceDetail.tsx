import Link from "next/link";
import { type Service, resolveProof, proofHref } from "@/lib/services";
import { engagements } from "@/lib/work";

// The body of one service: answer, who it's for, how it works, the numbers,
// buyer questions, proof and clients.
// Rendered only on /services/<slug>: /services and the family pages summarise
// and link here, so the full detail exists once.
export function ServiceDetail({ service }: { service: Service }) {
  const clients = engagements.filter((e) => e.services.includes(service.slug));
  // Fails the build if a demo points at a client without a public demo.
  const demos = (service.demos ?? []).map(({ client, as }) => {
    const e = engagements.find((x) => x.slug === client);
    if (!e?.demo) throw new Error(`services.ts: "${service.slug}" lists a demo for "${client}", which has none`);
    return { client, as, url: e.demo.url, name: e.demo.name };
  });
  return (
    <>
      <p className="mt-6 text-lg leading-relaxed text-foreground">{service.answer}</p>
      <p className="mt-4 leading-relaxed text-foreground-secondary">
        <span className="font-medium text-foreground">Who it&apos;s for: </span>
        {service.forWhom}
      </p>

      {demos.length > 0 && (
        // Try before talking: the public demos where this service can be seen.
        <div className="mt-8 border border-line p-5">
          <p className="text-sm font-medium text-foreground">Try it yourself</p>
          <ul className="mt-3 space-y-3">
            {demos.map((d) => (
              <li key={d.client}>
                <a href={d.url} className="text-link focus-ring">{d.name}</a>
                <span className="mt-0.5 block text-sm text-foreground-secondary">{d.as}</span>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-sm text-foreground-secondary">Sample company. Free. Resets every night.</p>
        </div>
      )}

      <h2 className="mt-12 text-sm font-medium text-foreground-secondary">How it works</h2>
      <ol className="mt-4 space-y-4">
        {service.steps.map((step, i) => (
          <li key={step} className="grid grid-cols-[2rem_1fr] gap-2 leading-relaxed text-foreground">
            <span className="text-sm text-foreground-secondary tabular-nums">{String(i + 1).padStart(2, "0")}</span>
            <span>{step}</span>
          </li>
        ))}
      </ol>

      <h2 className="mt-12 text-sm font-medium text-foreground-secondary">The numbers</h2>
      <dl className="mt-4 grid grid-cols-1 gap-x-12 gap-y-6 border-t border-line pt-6 sm:grid-cols-2">
        {service.evidence.map((item) => (
          <div key={item.metric}>
            <dt className="text-sm font-medium text-foreground-secondary">{item.metric}</dt>
            <dd className="mt-1 text-base text-foreground">{item.value}</dd>
          </div>
        ))}
      </dl>

      <h2 className="mt-12 text-sm font-medium text-foreground-secondary">Questions buyers ask</h2>
      <dl className="mt-4 divide-y divide-line border-t border-line">
        {service.questions.map(({ q, a }) => (
          <div key={q} className="py-5">
            <dt className="font-medium text-foreground">{q}</dt>
            <dd className="mt-2 leading-relaxed text-foreground-secondary">{a}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-10 grid grid-cols-1 gap-8 border-t border-line pt-8 sm:grid-cols-2">
        <div>
          <p className="text-sm font-medium text-foreground-secondary">How it works, in detail</p>
          <ul className="mt-3 space-y-2">
            {service.proof.map((ref) => (
              <li key={ref.slug}>
                <Link href={proofHref(ref)} className="text-link focus-ring">
                  {resolveProof(ref).title}
                </Link>
              </li>
            ))}
            {service.links?.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="text-link focus-ring">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        {clients.length > 0 && (
          <div>
            <p className="text-sm font-medium text-foreground-secondary">Built for</p>
            <ul className="mt-3 space-y-2">
              {clients.map((c) => (
                <li key={c.slug}>
                  <Link href={`/work#${c.slug}`} className="text-link focus-ring">
                    {c.client}
                  </Link>
                  <span className="text-foreground-secondary"> — {c.industry}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
}
