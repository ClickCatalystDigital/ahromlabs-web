import { renderOgImage, ogImageSize } from "@/lib/og-image";

export const alt = "Work | Ahrom Labs";
export const size = ogImageSize;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage({
    title: "The businesses we've built systems for.",
    description:
      "LS Technologies, Savistar & Saag, Shanti Boilers & Pressure Vessels — and what each system actually does.",
  });
}
