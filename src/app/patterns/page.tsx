import type { Metadata } from "next";
import Link from "next/link";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { Reveal } from "@/components/Reveal";
import { getContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "Patterns",
  description: "Reusable decisions extracted from real engagements — the trade-offs we chose and why, so the next system doesn't start from zero.",
  alternates: { canonical: "/patterns" },
  openGraph: {
    type: "website",
    url: "https://ahromlabs.com/patterns",
    siteName: "Ahrom Labs",
    title: "Patterns | Ahrom Labs",
    description: "Reusable decisions extracted from real engagements — the trade-offs we chose and why, so the next system doesn't start from zero.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Patterns | Ahrom Labs",
    description: "Reusable decisions extracted from real engagements — the trade-offs we chose and why, so the next system doesn't start from zero.",
  },
};

export default function PatternsPage() {
  const patterns = [...getContent("pattern")].sort((a, b) => b.published.localeCompare(a.published));

  return (
    <>
      <SiteNav />
      <main className="flex-1">
        <section className="rail pt-16 pb-8 md:pt-24 md:pb-12">
          <h1 className="text-5xl font-semibold tracking-tight text-foreground sm:text-6xl">
            Patterns
          </h1>
          <p className="prose-measure mt-6 text-lg leading-relaxed text-foreground-secondary sm:text-xl">
            Reusable decisions extracted from real engagements: the trade-offs we chose and why, so the next system doesn&apos;t start from zero.
          </p>
        </section>

        <Reveal>
          <section className="section border-t border-line">
            <div className="rail">
              <div className="grid grid-cols-1 gap-x-12 gap-y-10 md:grid-cols-2">
                {patterns.map((pattern) => (
                  <Link
                    key={pattern.slug}
                    href={`/patterns/${pattern.slug}`}
                    className="focus-ring block border-t border-line pt-6"
                  >
                    <h2 className="text-lg font-medium text-foreground">{pattern.title}</h2>
                    <p className="mt-2 max-w-[45ch] leading-relaxed text-foreground-secondary">{pattern.answer}</p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        </Reveal>
      </main>
      <SiteFooter />
    </>
  );
}
