import { renderOgImage, ogImageSize } from "@/lib/og-image";

export const alt = "Approach | Ahrom Labs";
export const size = ogImageSize;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage({
    title: "We treat your business as one system, not separate functions.",
    description:
      "How Ahrom Labs maps a business before automating it, and builds the whole workflow once instead of a patch per department.",
  });
}
