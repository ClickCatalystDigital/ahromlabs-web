import type { Metadata } from "next";
import Link from "next/link";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { getContent } from "@/lib/content";
import { tourGraph, jsonLd } from "@/lib/schema";
import { seoTitle, metaDescription } from "@/lib/seo";

// The watch page for each industry demo's narrated tour. Google only indexes a video as a video result
// on a page where it is the main content, so the tour lives here and the industry page links to it.
export const dynamicParams = false;

const withVideo = () => getContent("industry").filter((i) => i.video);

export function generateStaticParams() {
  return withVideo().map((i) => ({ slug: i.slug }));
}

export async function generateMetadata(props: PageProps<"/industries/[slug]/tour">): Promise<Metadata> {
  const { slug } = await props.params;
  const industry = withVideo().find((i) => i.slug === slug)!;
  const video = industry.video!;
  return {
    title: seoTitle(video.name),
    description: metaDescription(video.description),
    alternates: { canonical: `/industries/${slug}/tour` },
    openGraph: {
      type: "video.other",
      url: `https://ahromlabs.com/industries/${slug}/tour`,
      siteName: "Ahrom Labs",
      title: video.name,
      description: video.description,
      images: [`https://i.ytimg.com/vi/${video.id}/maxresdefault.jpg`],
    },
  };
}

export default async function TourPage(props: PageProps<"/industries/[slug]/tour">) {
  const { slug } = await props.params;
  const industry = withVideo().find((i) => i.slug === slug)!;
  const video = industry.video!;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(tourGraph({ slug, title: industry.title, video })) }}
      />
      <SiteNav />
      <main className="flex-1">
        <section className="rail pt-16 pb-16 md:pt-24">
          <p className="text-sm text-foreground-secondary">
            <Link href={`/industries/${slug}`} className="underline underline-offset-4">
              {industry.title}
            </Link>{" "}
            › Demo tour
          </p>
          <h1 className="mt-4 max-w-4xl text-3xl font-semibold tracking-tight text-foreground md:text-4xl">{video.name}</h1>
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${video.id}`}
            title={video.name}
            allow="encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
            className="mt-8 aspect-video w-full max-w-4xl rounded-lg border border-line"
          />
          <p className="mt-6 max-w-3xl text-base text-foreground">{video.description}</p>
          <p className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-base">
            {industry.demo && (
              <a href={industry.demo.url} className="font-medium underline underline-offset-4">
                Try the live demo yourself
              </a>
            )}
            <Link href={`/industries/${slug}`} className="underline underline-offset-4">
              Read the full {industry.title} guide
            </Link>
          </p>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
