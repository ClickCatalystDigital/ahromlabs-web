import type { Metadata } from "next";
import Link from "next/link";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { Reveal } from "@/components/Reveal";
import { ClosingCta } from "@/components/ClosingCta";
import { FreeGuides } from "@/components/FreeGuides";
import Image from "next/image";

// One illustration beside a section's text, same layout as the /services hero.
// Page colour is baked into the file.
function Illustration({ name, alt }: { name: string; alt: string }) {
  return (
    <Image
      src={`/what-we-build/${name}.webp`}
      alt={alt}
      width={1086}
      height={362}
      sizes="(min-width: 1024px) 40vw, 100vw"
      className="aspect-video w-full object-cover lg:col-span-5"
    />
  );
}

export const metadata: Metadata = {
  title: "About: industrial systems engineering in Ahmedabad",
  description:
    "Ahrom Labs is an industrial systems engineering practice: we map how a factory or trading house actually runs, then build the systems it runs on.",
  alternates: { canonical: "/about" },
  openGraph: {
    type: "website",
    url: "https://ahromlabs.com/about",
    siteName: "Ahrom Labs",
    title: "About | Ahrom Labs",
    description:
      "Ahrom Labs is an industrial systems engineering practice: we map how a factory or trading house actually runs, then build the systems it runs on.",
  },
  twitter: {
    card: "summary_large_image",
    title: "About | Ahrom Labs",
    description:
      "Ahrom Labs is an industrial systems engineering practice: we map how a factory or trading house actually runs, then build the systems it runs on.",
  },
};

export default function AboutPage() {
  return (
    <>
      <SiteNav />
      <main className="flex-1">
        <section className="rail pt-16 pb-8 md:pt-24 md:pb-12">
          <h1 className="display text-5xl text-foreground sm:text-6xl">
            About
          </h1>
          <p className="prose-measure mt-6 text-lg leading-relaxed text-foreground-secondary sm:text-xl">
            Ahrom Labs exists for one kind of business: one that has outgrown the tools
            holding it together.
          </p>
        </section>

        <Reveal>
          <section className="section border-t border-line">
            <div className="rail grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <h2 className="display text-3xl text-foreground sm:text-4xl">
                  The business you&apos;re running now
                </h2>
                <p className="prose-measure mt-6 leading-relaxed text-foreground-secondary">
                  You didn&apos;t plan for a CRM, an ERP, six spreadsheets, and a chat channel
                  to become your source of truth. It happened one urgent decision at a time,
                  and now a handful of people are the only ones who remember how it all
                  actually connects. That works, until someone leaves, or the business grows
                  past what memory can hold.
                </p>
              </div>
              <Illustration
                name="about-improvised-wiring"
                alt="An electrical junction box held together with workarounds: extension boards plugged into each other, taped joints and tangled cables"
              />
            </div>
          </section>
        </Reveal>

        <Reveal>
          <section className="section border-t border-line">
            <div className="rail grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <h2 className="display text-3xl text-foreground sm:text-4xl">
                  What changes when there is one structure
                </h2>
                <p className="prose-measure mt-6 leading-relaxed text-foreground-secondary">
                  A business with one coherent model of its entities, workflows, and
                  decisions doesn&apos;t need someone to remember how things connect, because
                  the system already knows. New hires read the structure instead of asking
                  around. New tools plug into it instead of becoming another island.
                  Decisions carry their <Link href="/systems#evidence" className="text-link focus-ring">evidence</Link> instead of living in
                  someone&apos;s memory.
                </p>
              </div>
              <Illustration
                name="about-structured-wiring"
                alt="The same junction box wired properly: every cable routed in order to its own terminal on one rail"
              />
            </div>
          </section>
        </Reveal>

        <Reveal>
          <section className="section border-t border-line">
            <div className="rail grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <h2 className="display text-3xl text-foreground sm:text-4xl">
                  How we work with you
                </h2>
                <p className="prose-measure mt-6 leading-relaxed text-foreground-secondary">
                  Ahrom Labs is an industrial systems engineering practice: we build custom
                  ERP, CRM and AI systems, not off-the-shelf software. We take on a small number of engagements at a time, because
                  modeling a business properly takes real attention. We map how your
                  business actually works before we design or build anything, and that map
                  becomes the foundation the systems are built on.
                </p>
                <p className="prose-measure mt-4 leading-relaxed text-foreground-secondary">
                  The practice is run by{" "}
                  <Link href="/about/pujan-motiwala" className="text-link focus-ring">Pujan Motiwala</Link>,
                  founder and Principal: the same person who
                  does the modeling, writes the code, and answers your first message.
                  Ahrom Labs works out of Ahmedabad, Gujarat, with clients across India.
                </p>
                <p className="mt-4 leading-relaxed text-foreground-secondary">
                  <Link href="/engagement" className="text-link focus-ring">
                    See how an engagement runs: pricing, licensing and support
                  </Link>
                </p>
              </div>
              <Illustration
                name="about-theodolite-survey"
                alt="A surveyor's theodolite on a tripod, measuring the ground before anything is built"
              />
            </div>
          </section>
        </Reveal>

        <FreeGuides heading="What we publish" />

        <ClosingCta />
      </main>
      <SiteFooter />
    </>
  );
}
