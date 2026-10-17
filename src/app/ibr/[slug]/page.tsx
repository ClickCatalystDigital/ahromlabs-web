import type { Metadata } from "next";
import Markdown from "react-markdown";
import { IbrPage, ibrMarkdown } from "@/components/IbrPage";
import { getContent } from "@/lib/content";
import { ibrPageGraph } from "@/lib/schema";

// Unknown slugs 404 rather than render on demand (see notes/[slug]). /ibr/forms
// is its own route; build-content.mjs keeps a guide from taking that slug.
export const dynamicParams = false;

export function generateStaticParams() {
  return getContent("guide").map((g) => ({ slug: g.slug }));
}

const get = (slug: string) => getContent("guide").find((g) => g.slug === slug)!;

export async function generateMetadata(props: PageProps<"/ibr/[slug]">): Promise<Metadata> {
  const g = get((await props.params).slug);
  const description = g.description ?? g.answer;
  return {
    title: g.title,
    description,
    alternates: { canonical: `/ibr/${g.slug}` },
    openGraph: {
      type: "article",
      url: `https://ahromlabs.com/ibr/${g.slug}`,
      siteName: "Ahrom Labs",
      title: g.title,
      description,
      publishedTime: g.published,
      modifiedTime: g.updated,
      authors: ["Pujan Motiwala"],
    },
    twitter: { card: "summary_large_image", title: g.title, description },
  };
}

export default async function IbrGuidePage(props: PageProps<"/ibr/[slug]">) {
  const g = get((await props.params).slug);
  const path = `/ibr/${g.slug}`;
  const trail = [
    { name: "IBR", path: "/ibr" },
    { name: g.title, path },
  ];

  return (
    <IbrPage
      graph={ibrPageGraph({ path, title: g.title, description: g.answer, published: g.published, updated: g.updated, trail })}
      trail={trail}
      title={g.title}
      lead={g.answer}
      checked={g.checked!}
      updated={g.updated}
      sources={g.sources}
    >
      {g.image && (
        // Infographic of the page's main point; alt text repeats every label, since
        // crawlers and the site chatbot read the text, not the picture.
        // eslint-disable-next-line @next/next/no-img-element
        <img src={g.image.src} alt={g.image.alt} loading="lazy" className="mb-12 w-full border border-line" />
      )}
      <Markdown components={ibrMarkdown}>{g.body}</Markdown>

      <div className="mt-12 border-t border-line pt-8">
        <h2 className="text-sm font-medium text-foreground-secondary">Quoted from the regulations</h2>
        {g.checks!.map((c) => (
          <blockquote key={c.quote} className="mt-4 border-l-2 border-line pl-6 text-foreground-secondary">
            <p className="italic text-foreground">&ldquo;{c.quote}&rdquo;</p>
            <p className="mt-1 text-sm">{c.reg}</p>
          </blockquote>
        ))}
      </div>
    </IbrPage>
  );
}
