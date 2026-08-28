import { renderOgImage, ogImageSize } from "@/lib/og-image";

export const alt = "About | Ahrom Labs";
export const size = ogImageSize;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage({
    title: "Ahrom Labs exists for one kind of business.",
    description:
      "One that has outgrown the tools holding it together. We model it before we build anything.",
  });
}
