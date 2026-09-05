import { renderOgImage, ogImageSize } from "@/lib/og-image";

export const alt = "Notes | Ahrom Labs";
export const size = ogImageSize;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage({
    title: "Engineering notes from real client work.",
    description: "What we built, why, and what it actually does in production.",
  });
}
