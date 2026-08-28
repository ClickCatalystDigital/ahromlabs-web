import { renderOgImage, ogImageSize } from "@/lib/og-image";

export const alt = "Ahrom Labs";
export const size = ogImageSize;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage({
    title: "We build the systems your business runs on.",
    description:
      "Ahrom Labs designs and builds custom operational infrastructure, modeled around how your business actually works.",
  });
}
