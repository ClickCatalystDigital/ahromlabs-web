import { renderOgImage, ogImageSize } from "@/lib/og-image";
import { getContent } from "@/lib/content";

export const alt = "Ahrom Labs";
export const size = ogImageSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return getContent("note").map((note) => ({ slug: note.slug }));
}

export default async function Image(props: PageProps<"/notes/[slug]">) {
  const { slug } = await props.params;
  const note = getContent("note").find((n) => n.slug === slug)!;
  return renderOgImage({ title: note.title, description: note.answer });
}
