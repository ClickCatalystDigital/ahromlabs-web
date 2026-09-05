import type { Metadata } from "next";
import type { ComponentProps } from "react";
import Markdown from "react-markdown";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { ClosingCta } from "@/components/ClosingCta";
import { getContent, formatDate } from "@/lib/content";
import { articleGraph, jsonLd } from "@/lib/schema";

export function generateStaticParams() {
  return getContent("pattern").map((pattern) => ({ slug: pattern.slug }));
}

export async function generateMetadata(props: PageProps<"/patterns/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const pattern = getContent("pattern").find((p) => p.slug === slug)!;
  const url = `https://ahromlabs.com/patterns/${pattern.slug}`;

  return {
    title: pattern.title,
    description: pattern.answer,
    alternates: { canonical: `/patterns/${pattern.slug}` },
    openGraph: {
      type: "article",
      url,
      siteName: "Ahrom Labs",
      title: pattern.title,
      description: pattern.answer,
      publishedTime: pattern.published,
      modifiedTime: pattern.updated,
      authors: ["Pujan Motiwala"],
    },
    twitter: {
      card: "summary_large_image",
      title: pattern.title,
      description: pattern.answer,
    },
  };
}

const markdownComponents = {
  h2: (props: ComponentProps<"h2">) => (
    <h2 className="mt-12 text-3xl font-semibold tracking-tight text-foreground first:mt-0 sm:text-4xl" {...props} />
  ),
  p: (props: ComponentProps<"p">) => <p className="mt-4 leading-relaxed text-foreground-secondary" {...props} />,
  ul: (props: ComponentProps<"ul">) => (
    <ul className="mt-4 list-disc space-y-2 pl-5 text-foreground-secondary" {...props} />
  ),
  li: (props: ComponentProps<"li">) => <li {...props} />,
  blockquote: (props: ComponentProps<"blockquote">) => (
    <blockquote className="mt-8 border-l-2 border-line pl-6 italic text-foreground" {...props} />
  ),
};

export default async function PatternPage(props: PageProps<"/patterns/[slug]">) {
  const { slug } = await props.params;
  const pattern = getContent("pattern").find((p) => p.slug === slug)!;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(articleGraph(pattern, `/patterns/${pattern.slug}`)) }}
      />
      <SiteNav />
      <main className="flex-1">
        <section className="rail pt-16 pb-8 md:pt-24 md:pb-12">
          <h1 className="text-5xl font-semibold tracking-tight text-foreground sm:text-6xl">{pattern.title}</h1>
          <p className="prose-measure mt-6 text-lg leading-relaxed text-foreground-secondary sm:text-xl">
            {pattern.answer}
          </p>
          <p className="mt-6 text-sm text-foreground-secondary">
            Pujan Motiwala
            {" · "}
            <time dateTime={pattern.published}>{formatDate(pattern.published)}</time>
            {pattern.updated !== pattern.published && (
              <>
                {" · Updated "}
                <time dateTime={pattern.updated}>{formatDate(pattern.updated)}</time>
              </>
            )}
          </p>
        </section>

        <section className="section border-t border-line">
          <div className="rail prose-measure">
            <Markdown components={markdownComponents}>{pattern.body}</Markdown>

            {pattern.evidence && pattern.evidence.length > 0 && (
              <dl className="mt-12 grid grid-cols-1 gap-x-12 gap-y-6 border-t border-line pt-8 sm:grid-cols-2">
                {pattern.evidence.map((item) => (
                  <div key={item.metric}>
                    <dt className="text-sm font-medium text-foreground-secondary">{item.metric}</dt>
                    <dd className="mt-1 text-base text-foreground">{item.value}</dd>
                  </div>
                ))}
              </dl>
            )}
          </div>
        </section>

        <ClosingCta />
      </main>
      <SiteFooter />
    </>
  );
}
