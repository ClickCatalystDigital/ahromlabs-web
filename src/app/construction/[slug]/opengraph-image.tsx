import { renderOgImage, ogImageSize } from "@/lib/og-image";
import { conGuide, conGuides } from "@/lib/construction";
import { conOgArt } from "@/lib/construction-images";

export const alt = "Ahrom Labs";
export const size = ogImageSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return conGuides().map((g) => ({ slug: g.slug }));
}

export default async function Image(props: PageProps<"/construction/[slug]">) {
  const g = conGuide((await props.params).slug)!;
  return renderOgImage({ title: g.title, description: g.question ?? g.answer, art: await conOgArt(g.slug) });
}
