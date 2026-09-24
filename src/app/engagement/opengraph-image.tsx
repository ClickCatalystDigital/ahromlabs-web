import { renderOgImage, ogImageSize } from "@/lib/og-image";

export const alt = "Working with us | Ahrom Labs";
export const size = ogImageSize;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage({
    title: "Fixed-price phases. Your code, your data, your server.",
    description:
      "How Ahrom Labs prices, delivers and supports custom software for Indian businesses.",
  });
}
