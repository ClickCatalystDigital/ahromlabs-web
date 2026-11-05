import type { Metadata } from "next";
import Link from "next/link";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { Reveal } from "@/components/Reveal";
import { ClosingCta } from "@/components/ClosingCta";
import { HoverVideo } from "@/components/HoverVideo";
import { getContent } from "@/lib/content";
import { resolveIndustryEdges, industryForClient } from "@/lib/industries";
import { clientInSentence, engagements, NOT_LIVE } from "@/lib/work";
import { metaDescription } from "@/lib/seo";
import { only } from "@/lib/markets";
import { jsonLd, pageDateOf, siteUrl } from "@/lib/schema";

const description = metaDescription("Industries Ahrom Labs has built operational systems for — boiler and pressure-vessel manufacturing, electronics-component trading, interior design and furniture, construction — each backed by a real system in use.");

export const metadata: Metadata = {
  title: "Industries we build ERP software for",
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

// What each card's clip shows (public/industries/<slug>.*): its alt text, and the caption of its poster in the
// page's ItemList schema.
const CLIP_ALT: Record<string, string> = {
  "boiler-pressure-vessel-manufacturing": "A hand holding a tablet with a task board open: To do and Processing columns",
  "electronics-component-trading": "A warehouse worker with a tablet checking cartons on the shelves",
  "interior-design-and-furniture": "A design team gathered round a laptop in front of a pinboard of sketches",
  "construction-company": "Aerial view of a large construction site, with cranes and rebar laid out across the slab",
};

export default function IndustriesPage() {
  // An industry page exists only where a real system was built — the list
  // grows with engagements, never ahead of them. Every card shows in both markets
  // (North America sees the Indian implementations too, marked "in India").
  const industries = getContent("industry");
  // ponytail: a client without its own industry page yet links to its /work entry, so the index still lists every industry built for.
  const unpaged = engagements.filter((e) => !industryForClient(e.slug));

  // The index as a list of its cards, each with its page and its poster frame, for search and answer engines.
  const cards = [
    ...industries.map((i) => ({ slug: i.slug, url: `${siteUrl}/industries/${i.slug}`, name: i.title, description: i.answer })),
    ...unpaged.map((e) => ({ slug: e.slug, url: `${siteUrl}/work#${e.slug}`, name: e.industry, description: e.built })),
  ];
  const graph = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${siteUrl}/industries#page`,
    url: `${siteUrl}/industries`,
    name: "Industries we build ERP software for",
    description,
    isPartOf: { "@id": `${siteUrl}/#website` },
    ...(pageDateOf("industries") ? { dateModified: pageDateOf("industries") } : {}),
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: cards.length,
      itemListElement: cards.map((c, n) => ({
        "@type": "ListItem",
        position: n + 1,
        url: c.url,
        name: c.name,
        description: c.description,
        image: { "@type": "ImageObject", url: `${siteUrl}/industries/${c.slug}.jpg`, width: 720, height: 900, caption: CLIP_ALT[c.slug] },
      })),
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(graph) }} />
      <SiteNav />
      <main className="flex-1">
        <section className="rail pt-16 pb-8 md:pt-24 md:pb-12">
          <h1 className="display text-5xl text-foreground sm:text-6xl">Industries</h1>
          <p className="prose-measure mt-6 text-lg leading-relaxed text-foreground-secondary sm:text-xl">
            Every industry below has a real system behind it, built by us for a real business. Each page
            covers the problems that business actually has, what we built, and the engineering
            notes with the numbers.
          </p>
        </section>

        <Reveal>
          <section className="border-t border-line pt-10 pb-24 md:pt-12 md:pb-32">
            <div className="rail grid grid-cols-1 gap-x-12 gap-y-14 md:grid-cols-2">
              {industries.map((i) => {
                const { clients } = resolveIndustryEdges(i);
                return (
                  <Link
                    key={i.slug}
                    href={`/industries/${i.slug}`}
                    className="focus-ring block"
                  >
                    <HoverVideo base={`/industries/${i.slug}`} alt={CLIP_ALT[i.slug]} />
                    {/* North America reads the US version's words where the page has one (content/industries/us). */}
                    <h2 className="text-lg font-medium text-foreground">
                      <span {...only(i.na ? ["IN"] : undefined)}>{i.title}</span>
                      {i.na && <span {...only(["NA"])}>{i.na.title}</span>}
                    </h2>
                    <p className="mt-2 leading-relaxed text-foreground-secondary">
                      <span {...only(i.na ? ["IN"] : undefined)}>{i.answer}</span>
                      {i.na && <span {...only(["NA"])}>{i.na.answer}</span>}
                    </p>
                    {clients.length > 0 && (
                      <p className="mt-3 text-sm text-foreground-secondary">
                        Built for {clients.map(clientInSentence).join(", ")}<span {...only(["NA"])}> in India</span>
                        {clients.some((c) => c.live === false) && `, ${NOT_LIVE.replace("built, ", "")}`}
                      </p>
                    )}
                  </Link>
                );
              })}
              {unpaged.map((e) => (
                <Link key={e.slug} href={`/work#${e.slug}`} className="focus-ring block">
                  {/* public/industries/<client slug>.{jpg,webm,mp4}, the same frame as the industry pages' cards. */}
                  <HoverVideo base={`/industries/${e.slug}`} alt={CLIP_ALT[e.slug]} />
                  <h2 className="text-lg font-medium text-foreground">{e.industry}</h2>
                  <p className="mt-2 leading-relaxed text-foreground-secondary">{e.built}</p>
                  <p className="mt-3 text-sm text-foreground-secondary">Built for {clientInSentence(e)}<span {...only(["NA"])}> in India</span>{e.live === false && `, ${NOT_LIVE.replace("built, ", "")}`}</p>
                </Link>
              ))}
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
