import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { renderOgImage, ogImageSize } from "@/lib/og-image";
import { families, services } from "@/lib/services";

export const alt = "Ahrom Labs";
export const size = ogImageSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return [...families, ...services].map((x) => ({ slug: x.slug }));
}

// The illustration as a JPEG crop (src/assets/og-art, made from the page art),
// so a link shared on WhatsApp or LinkedIn shows the same object as the page.
async function artFor(slug: string) {
  const jpg = await readFile(join(process.cwd(), "src/assets/og-art", `${slug}.jpg`)).catch(() => null);
  return jpg ? `data:image/jpeg;base64,${jpg.toString("base64")}` : undefined;
}

// The plain-words heading leads; the search name is the line under it.
export default async function Image(props: PageProps<"/services/[slug]">) {
  const { slug } = await props.params;
  const art = await artFor(slug);
  const family = families.find((f) => f.slug === slug);
  if (family) return renderOgImage({ title: family.plainName, description: family.name, art });
  const service = services.find((s) => s.slug === slug)!;
  return renderOgImage({ title: service.plainName, description: service.name, art });
}
