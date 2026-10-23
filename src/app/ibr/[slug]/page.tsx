import type { Metadata } from "next";
import Markdown from "react-markdown";
import { IbrPage, IbrQuotes, ibrMarkdown } from "@/components/IbrPage";
import { markdownHeadings } from "@/lib/headings";
import { getContent } from "@/lib/content";
import { ibrPageGraph } from "@/lib/schema";
import { seoTitle, metaDescription } from "@/lib/seo";

// Unknown slugs 404 rather than render on demand (see notes/[slug]). /ibr/forms
// is its own route; build-content.mjs keeps a guide from taking that slug.
export const dynamicParams = false;

export function generateStaticParams() {
  return getContent("guide").map((g) => ({ slug: g.slug }));
}

const get = (slug: string) => getContent("guide").find((g) => g.slug === slug)!;

export async function generateMetadata(props: PageProps<"/ibr/[slug]">): Promise<Metadata> {
  const g = get((await props.params).slug);
  const description = metaDescription(g.description ?? g.answer);
  return {
    title: seoTitle(g.title),
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
      // The page's infographic is the share image; pages without one keep the site default.
      // The guide's infographic, or the IBR hub's: a page's openGraph replaces the parent's, so without one it would share no image.
      images: g.image
        ? [{ url: g.image.src, width: g.image.width, height: g.image.height, alt: g.image.alt }]
        : [{ url: "/ibr/ibr-forms-1950-to-2026.webp", width: 2752, height: 1536, alt: "IBR forms renumbered on 1 October 2026, IBR 1950 to IBR 2026" }],
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
      graph={ibrPageGraph({ path, title: g.title, description: g.answer, published: g.published, updated: g.updated, trail, image: g.image })}
      trail={trail}
      title={g.title}
      lead={g.answer}
      checked={g.checked!}
      updated={g.updated}
      sources={g.sources}
      headings={markdownHeadings(g.body)}
      image={g.image && { src: g.image.src, alt: g.image.alt, width: g.image.width!, height: g.image.height!, caption: g.image.caption! }}
    >
      <Markdown components={ibrMarkdown}>{g.body}</Markdown>
      <IbrQuotes quotes={g.checks!} />
    </IbrPage>
  );
}
