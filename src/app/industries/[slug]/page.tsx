import type { Metadata } from "next";
import type { ComponentProps } from "react";
import Link from "next/link";
import Markdown from "react-markdown";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { ClosingCta } from "@/components/ClosingCta";
import { getContent, formatDate } from "@/lib/content";
import { resolveIndustryEdges } from "@/lib/industries";
import { industryGraph, jsonLd } from "@/lib/schema";
import { FlowFigure } from "@/components/FlowFigure";

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

// Stable anchor for a question heading, so each answer can be linked to (and
// cited) on its own. The contents list and the rendered <h2> both derive it
// from the same text, so they can't disagree.
function headingId(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function textOf(node: React.ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(textOf).join("");
  return "";
}

const markdownComponents = {
  h2: (props: ComponentProps<"h2">) => (
    <h2
      id={headingId(textOf(props.children))}
      className="display mt-12 scroll-mt-24 text-3xl text-foreground first:mt-0 sm:text-4xl"
      {...props}
    />
  ),
  p: (props: ComponentProps<"p">) => <p className="mt-4 leading-relaxed text-foreground-secondary" {...props} />,
  ul: (props: ComponentProps<"ul">) => (
    <ul className="mt-4 list-disc space-y-2 pl-5 text-foreground-secondary" {...props} />
  ),
  ol: (props: ComponentProps<"ol">) => (
    <ol className="mt-4 list-decimal space-y-2 pl-5 text-foreground-secondary" {...props} />
  ),
  li: (props: ComponentProps<"li">) => <li {...props} />,
  a: (props: ComponentProps<"a">) => <a className="text-link focus-ring" {...props} />,
};

export default async function IndustryPage(props: PageProps<"/industries/[slug]">) {
  const { slug } = await props.params;
  const industry = getContent("industry").find((i) => i.slug === slug)!;
  const edges = resolveIndustryEdges(industry);
  const headings = [...industry.body.matchAll(/^## (.+)$/gm)].map((m) => m[1].trim());

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(industryGraph(industry, edges)) }}
      />
      <SiteNav />
      <main className="flex-1">
        <section className="rail pt-16 pb-8 md:pt-24 md:pb-12">
          <p className="text-sm font-medium text-foreground-secondary">
            <Link href="/industries" className="focus-ring hover:underline">Industries</Link>
            {" · "}
            {industry.audience}
          </p>
          <h1 className="display mt-3 text-5xl text-foreground sm:text-6xl">{industry.title}</h1>
          <p className="prose-measure mt-6 text-lg leading-relaxed text-foreground-secondary sm:text-xl">
            {industry.answer}
          </p>
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
          <div className="rail prose-measure">
            {headings.length > 3 && (
              <nav aria-label="On this page" className="mb-12 border-b border-line pb-8">
                <p className="text-sm font-medium text-foreground-secondary">On this page</p>
                <ol className="mt-3 space-y-2 text-sm">
                  {headings.map((h) => (
                    <li key={h}>
                      <a href={`#${headingId(h)}`} className="text-link focus-ring">
                        {h}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            )}
            <Markdown components={markdownComponents}>{industry.body}</Markdown>

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
                      <Link href={`/services#${s.slug}`} className="text-link focus-ring">
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
        </section>

        <ClosingCta />
      </main>
      <SiteFooter />
    </>
  );
}
