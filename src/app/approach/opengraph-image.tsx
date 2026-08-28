import { renderOgImage, ogImageSize } from "@/lib/og-image";

export const alt = "Approach | Ahrom Labs";
export const size = ogImageSize;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage({
    title: "We treat your business as one system, not separate functions.",
    description:
      "How Ahrom Labs models a business before automating it, and why architecture is the unit of value.",
  });
}
