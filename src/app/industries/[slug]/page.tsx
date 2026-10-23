import type { Metadata } from "next";
import type { ComponentProps } from "react";
import Link from "next/link";
import Markdown from "react-markdown";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { ClosingCta } from "@/components/ClosingCta";
import { getContent, formatDate } from "@/lib/content";
import { resolveIndustryEdges } from "@/lib/industries";
import { serviceUrl } from "@/lib/services";
import { industryGraph, jsonLd } from "@/lib/schema";
import { FlowFigure } from "@/components/FlowFigure";
import { OpenOnWide } from "@/components/OpenOnWide";
import { headingId, textOf, markdownHeadings } from "@/lib/headings";
import { Slow, Drawer, Hub } from "@lucasmarkes/hairline/react";

// Unknown slugs 404 instead of rendering on demand and 500ing — see notes/[slug].
export const dynamicParams = false;

export function generateStaticParams() {
  return getContent("industry").map((i) => ({ slug: i.slug }));
}

export async function generateMetadata(props: PageProps<"/industries/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const industry = getContent("industry").find((i) => i.slug === slug)!;
  const url = `https://ahromlabs.com/industries/${industry.slug}`;
  const description = industry.description ?? industry.answer;

  return {
    title: industry.title,
    description,
    alternates: { canonical: `/industries/${industry.slug}` },
    openGraph: {
      type: "website",
      url,
      siteName: "Ahrom Labs",
      title: industry.title,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title: industry.title,
      description,
    },
  };
}

const markdownComponents = {
  h2: ({ node, ...props }: ComponentProps<"h2"> & { node?: unknown }) => (
    <h2
      id={headingId(textOf(props.children))}
      className="display mt-12 scroll-mt-24 text-3xl text-foreground first:mt-0 sm:text-4xl"
      {...props}
    />
  ),
  p: ({ node, ...props }: ComponentProps<"p"> & { node?: unknown }) => <p className="mt-4 leading-relaxed text-foreground-secondary" {...props} />,
  ul: ({ node, ...props }: ComponentProps<"ul"> & { node?: unknown }) => (
    <ul className="mt-4 list-disc space-y-2 pl-5 text-foreground-secondary" {...props} />
  ),
  ol: ({ node, ...props }: ComponentProps<"ol"> & { node?: unknown }) => (
    <ol className="mt-4 list-decimal space-y-2 pl-5 text-foreground-secondary" {...props} />
  ),
  li: ({ node, ...props }: ComponentProps<"li"> & { node?: unknown }) => <li {...props} />,
  a: ({ node, ...props }: ComponentProps<"a"> & { node?: unknown }) => <a className="text-link focus-ring" {...props} />,
};

// Decorative line figure beside the hero on wide screens, one per industry.
const FIGURES: Record<string, typeof Slow> = {
  "boiler-pressure-vessel-manufacturing": Slow,
  "electronics-component-trading": Drawer,
  "interior-design-and-furniture": Hub,
};

export default async function IndustryPage(props: PageProps<"/industries/[slug]">) {
  const { slug } = await props.params;
  const industry = getContent("industry").find((i) => i.slug === slug)!;
  const edges = resolveIndustryEdges(industry);
  // ponytail: stock hairline figures; swap boiler for a custom plate-cut figure later.
  const Figure = FIGURES[industry.slug];
  const headings = markdownHeadings(industry.body);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(industryGraph(industry, edges)) }}
      />
      <SiteNav />
      <main className="flex-1">
        <section className="rail grid grid-cols-1 items-center gap-12 pt-16 pb-8 md:pt-24 md:pb-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="text-sm font-medium text-foreground-secondary">
              <Link href="/industries" className="focus-ring hover:underline">Industries</Link>
              {" · "}
              {industry.audience}
            </p>
            <h1 className="display mt-3 text-5xl text-foreground sm:text-6xl">{industry.title}</h1>
            <p className="prose-measure mt-6 text-lg leading-relaxed text-foreground-secondary sm:text-xl">
              {industry.answer}
            </p>
            {industry.demo && (
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
                <a href={industry.demo.url} className="subscribe-submit focus-ring inline-block">
                  {industry.demo.label}
                </a>
                <span className="text-sm text-foreground-secondary">Sample company. Free. Resets every night.</span>
              </div>
            )}
            <p className="mt-6 text-sm text-foreground-secondary">
              Pujan Motiwala
              {" · "}
              <time dateTime={industry.published}>{formatDate(industry.published)}</time>
              {industry.updated !== industry.published && (
                <>
                  {" · Updated "}
                  <time dateTime={industry.updated}>{formatDate(industry.updated)}</time>
                </>
              )}
            </p>
          </div>
          {/* Wrapper carries the breakpoint: the figure's own unlayered display:block beats Tailwind's layered .hidden. */}
          {Figure && (
            <div className="hidden lg:col-span-5 lg:block">
              <Figure intensity={0.5} play aria-hidden className="hairline-figure" />
            </div>
          )}
        </section>

        {industry.evidence && industry.evidence.length > 0 && (
          <section className="border-t border-line">
            <div className="rail py-10">
              <dl className="grid grid-cols-1 gap-x-12 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
                {industry.evidence.map((item) => (
                  <div key={item.metric}>
                    <dt className="text-sm font-medium text-foreground-secondary">{item.metric}</dt>
                    <dd className="mt-1 text-base text-foreground">{item.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </section>
        )}

        {(industry.image || (industry.flow && industry.flow.length > 0)) && (
          <section className="section border-t border-line">
            <div className="rail">
              {industry.image && (
                // A real photo from the engagement, when the client has cleared one.
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={industry.image.src}
                  alt={industry.image.alt}
                  loading="lazy"
                  className="mb-12 w-full border border-line object-cover grayscale-[15%]"
                />
              )}
              {industry.flow && industry.flow.length > 0 && (
                <FlowFigure title="How an order moves through the system" steps={industry.flow} />
              )}
            </div>
          </section>
        )}

        <section className="section border-t border-line">
          <div className="rail lg:grid lg:grid-cols-[minmax(0,65ch)_minmax(0,16rem)] lg:justify-between lg:gap-16">
          {/* Contents: collapsed on phones (it ran 500–800px), and on wide screens a
              sticky column beside the text instead of a block above it. */}
          {headings.length > 3 && (
            <nav aria-label="On this page" className="mb-12 border-b border-line pb-6 lg:order-2 lg:mb-0 lg:border-0 lg:pb-0">
              <OpenOnWide className="group lg:sticky lg:top-24 lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto">
                <summary className="focus-ring cursor-pointer list-none text-sm font-medium text-foreground-secondary lg:pointer-events-none">
                  On this page <span aria-hidden="true" className="lg:hidden">({headings.length})</span>{" "}<span aria-hidden="true" className="inline-block transition-transform group-open:rotate-90 lg:hidden">›</span>
                </summary>
                <ol className="mt-3 space-y-2 text-sm">
                  {headings.map((h) => (
                    <li key={h}>
                      <a href={`#${headingId(h)}`} className="text-link focus-ring">
                        {h}
                      </a>
                    </li>
                  ))}
                </ol>
              </OpenOnWide>
            </nav>
          )}
          <div className="prose-measure lg:order-1">
            <Markdown components={markdownComponents}>{industry.body}</Markdown>

            {industry.demo && (
              <div className="mt-12 border-t border-line pt-8">
                <p className="text-lg text-foreground">See it with a sample company before you talk to anyone.</p>
                <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-4">
                  <a href={industry.demo.url} className="subscribe-submit focus-ring inline-block">
                    {industry.demo.label}
                  </a>
                  <span className="text-sm text-foreground-secondary">Free. Resets every night.</span>
                </div>
              </div>
            )}

            <div className="mt-12 grid grid-cols-1 gap-8 border-t border-line pt-8 sm:grid-cols-2">
              <div>
                <p className="text-sm font-medium text-foreground-secondary">The engineering notes</p>
                <ul className="mt-3 space-y-2">
                  {edges.notes.map((n) => (
                    <li key={n.slug}>
                      <Link href={`/notes/${n.slug}`} className="text-link focus-ring">
                        {n.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-foreground-secondary">Services</p>
                <ul className="mt-3 space-y-2">
                  {edges.services.map((s) => (
                    <li key={s.slug}>
                      <Link href={serviceUrl(s)} className="text-link focus-ring">
                        {s.name}
                      </Link>
                    </li>
                  ))}
                </ul>
                {edges.clients.length > 0 && (
                  <>
                    <p className="mt-8 text-sm font-medium text-foreground-secondary">Built for</p>
                    <ul className="mt-3 space-y-2">
                      {edges.clients.map((c) => (
                        <li key={c.slug}>
                          <Link href={`/work#${c.slug}`} className="text-link focus-ring">
                            {c.client}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </div>

            {edges.patterns.length > 0 && (
              <div className="mt-12 border-t border-line pt-8">
                <p className="text-sm font-medium text-foreground-secondary">Decisions behind it</p>
                <ul className="mt-3 space-y-2">
                  {edges.patterns.map((p) => (
                    <li key={p.slug}>
                      <Link href={`/patterns/${p.slug}`} className="text-link focus-ring">
                        {p.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          </div>
        </section>

        <ClosingCta />
      </main>
      <SiteFooter />
    </>
  );
}
