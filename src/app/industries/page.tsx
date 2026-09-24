import type { Metadata } from "next";
import Link from "next/link";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { Reveal } from "@/components/Reveal";
import { ClosingCta } from "@/components/ClosingCta";
import { getContent } from "@/lib/content";
import { resolveIndustryEdges } from "@/lib/industries";

const description =
  "Industries Ahrom Labs has built operational systems for — boiler and pressure-vessel manufacturing, electronics-component trading, interior design and furniture — each backed by a real system in use.";

export const metadata: Metadata = {
  title: "Industries: custom ERP and operations software by industry",
  description,
  alternates: { canonical: "/industries" },
  openGraph: {
    type: "website",
    url: "https://ahromlabs.com/industries",
    siteName: "Ahrom Labs",
    title: "Industries | Ahrom Labs",
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: "Industries | Ahrom Labs",
    description,
  },
};

export default function IndustriesPage() {
  // An industry page exists only where a real system was built — the list
  // grows with engagements, never ahead of them.
  const industries = getContent("industry");

  return (
    <>
      <SiteNav />
      <main className="flex-1">
        <section className="rail pt-16 pb-8 md:pt-24 md:pb-12">
          <h1 className="display text-5xl text-foreground sm:text-6xl">Industries</h1>
          <p className="prose-measure mt-6 text-lg leading-relaxed text-foreground-secondary sm:text-xl">
            Every industry below has a real system behind it, built by us and in use. Each page
            covers the problems that business actually has, what we built, and the engineering
            notes with the numbers.
          </p>
        </section>

        <Reveal>
          <section className="section border-t border-line">
            <div className="rail grid grid-cols-1 gap-x-12 gap-y-10 md:grid-cols-3">
              {industries.map((i) => {
                const { clients } = resolveIndustryEdges(i);
                return (
                  <Link
                    key={i.slug}
                    href={`/industries/${i.slug}`}
                    className="focus-ring block border-t border-line pt-6"
                  >
                    <h2 className="text-lg font-medium text-foreground">{i.title}</h2>
                    <p className="mt-2 leading-relaxed text-foreground-secondary">{i.answer}</p>
                    {clients.length > 0 && (
                      <p className="mt-3 text-sm text-foreground-secondary">
                        Built for {clients.map((c) => c.client).join(", ")}
                      </p>
                    )}
                  </Link>
                );
              })}
            </div>
          </section>
        </Reveal>

        <Reveal>
          <section className="section border-t border-line">
            <div className="rail prose-measure">
              <h2 className="display text-3xl text-foreground sm:text-4xl">Not on the list?</h2>
              <p className="mt-6 leading-relaxed text-foreground-secondary">
                Industry matters less than the shape of the problem. If your business has outgrown
                spreadsheets and off-the-shelf software, the same approach applies — see{" "}
                <Link href="/services" className="text-link focus-ring">what we build</Link> and{" "}
                <Link href="/engagement" className="text-link focus-ring">how an engagement works</Link>.
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
