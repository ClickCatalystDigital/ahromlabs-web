import type { Metadata } from "next";
import Link from "next/link";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { Reveal } from "@/components/Reveal";
import { ClosingCta } from "@/components/ClosingCta";
import { engagementAnswers } from "@/lib/engagement";

const description =
  "What a custom ERP costs in India, how long it takes, whether it works with Tally, who owns the code, hosting, AMC and what happens when requirements change — answered plainly by Ahrom Labs.";

export const metadata: Metadata = {
  title: "Custom ERP cost, timelines, Tally, ownership and AMC — working with us",
  description,
  alternates: { canonical: "/engagement" },
  openGraph: {
    type: "website",
    url: "https://ahromlabs.com/engagement",
    siteName: "Ahrom Labs",
    title: "Working with us | Ahrom Labs",
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: "Working with us | Ahrom Labs",
    description,
  },
};

export default function EngagementPage() {
  return (
    <>
      <SiteNav />
      <main className="flex-1">
        <section className="rail pt-16 pb-8 md:pt-24 md:pb-12">
          <h1 className="display text-5xl text-foreground sm:text-6xl">Working with us</h1>
          <p className="prose-measure mt-6 text-lg leading-relaxed text-foreground-secondary sm:text-xl">
            The questions every business asks before hiring a software firm — what a custom ERP
            costs, how long it takes, whether it works with Tally, who owns what, and what happens
            after launch — answered plainly, with sources for every market figure.
          </p>
          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
            {engagementAnswers.map((a) => (
              <li key={a.id}>
                <a href={`#${a.id}`} className="text-link focus-ring">
                  {a.question}
                </a>
              </li>
            ))}
          </ul>
        </section>

        {engagementAnswers.map((a) => (
          <Reveal key={a.id}>
            <section id={a.id} className="section scroll-mt-16 border-t border-line">
              <div className="rail prose-measure">
                <h2 className="display text-3xl text-foreground sm:text-4xl">{a.question}</h2>
                <p className="mt-6 text-lg leading-relaxed text-foreground">{a.answer}</p>
                {a.detail?.map((d) => (
                  <p key={d} className="mt-4 leading-relaxed text-foreground-secondary">
                    {d}
                  </p>
                ))}
                {a.see && a.see.length > 0 && (
                  <p className="mt-6 text-sm leading-relaxed text-foreground-secondary">
                    See:{" "}
                    {a.see.map((s, i) => (
                      <span key={s.href}>
                        {i > 0 && " · "}
                        <Link href={s.href} className="text-link focus-ring">
                          {s.label}
                        </Link>
                      </span>
                    ))}
                  </p>
                )}
                {a.sources && a.sources.length > 0 && (
                  <p className="mt-3 text-sm leading-relaxed text-foreground-secondary">
                    Sources:{" "}
                    {a.sources.map((s, i) => (
                      <span key={s.href}>
                        {i > 0 && " · "}
                        <a href={s.href} className="text-link focus-ring" rel="noopener">
                          {s.label}
                        </a>
                      </span>
                    ))}
                  </p>
                )}
              </div>
            </section>
          </Reveal>
        ))}

        <Reveal>
          <section className="section border-t border-line">
            <div className="rail prose-measure">
              <p className="leading-relaxed text-foreground-secondary">
                See{" "}
                <Link href="/services" className="text-link focus-ring">what we build</Link>, the{" "}
                <Link href="/work" className="text-link focus-ring">systems we&apos;ve built</Link>, and the{" "}
                <Link href="/patterns" className="text-link focus-ring">pattern library</Link> that makes a
                repeat problem fast.
              </p>
            </div>
          </section>
        </Reveal>

        <ClosingCta />
      </main>
      <SiteFooter />
    </>
  );
}
