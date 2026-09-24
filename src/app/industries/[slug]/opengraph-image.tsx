import { renderOgImage, ogImageSize } from "@/lib/og-image";
import { getContent } from "@/lib/content";

export const alt = "Ahrom Labs";
export const size = ogImageSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return getContent("industry").map((i) => ({ slug: i.slug }));
}

export default async function Image(props: PageProps<"/industries/[slug]">) {
  const { slug } = await props.params;
  const industry = getContent("industry").find((i) => i.slug === slug)!;
  return renderOgImage({ title: industry.title, description: industry.answer });
}
