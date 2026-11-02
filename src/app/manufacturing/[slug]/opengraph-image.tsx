import { renderOgImage, ogImageSize } from "@/lib/og-image";
import { mfgGuide, mfgGuides } from "@/lib/manufacturing";
import { mfgOgArt } from "@/lib/manufacturing-images";

export const alt = "Ahrom Labs";
export const size = ogImageSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return mfgGuides().map((g) => ({ slug: g.slug }));
}

export default async function Image(props: PageProps<"/manufacturing/[slug]">) {
  const g = mfgGuide((await props.params).slug)!;
  return renderOgImage({ title: g.title, description: g.question ?? g.answer, art: await mfgOgArt(g.slug) });
}
