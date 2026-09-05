import { renderOgImage, ogImageSize } from "@/lib/og-image";

export const alt = "Patterns | Ahrom Labs";
export const size = ogImageSize;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage({
    title: "Reusable decisions from real engagements.",
    description: "The trade-offs we chose and why, so the next system doesn't start from zero.",
  });
}
