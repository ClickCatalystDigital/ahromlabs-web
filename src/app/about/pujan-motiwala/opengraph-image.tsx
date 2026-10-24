import { renderOgImage, ogImageSize } from "@/lib/og-image";

export const alt = "Pujan Motiwala, founder of Ahrom Labs";
export const size = ogImageSize;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage({
    title: "Pujan Motiwala, founder of Ahrom Labs",
    description: "Map how the business runs, then build the system it runs on.",
  });
}
