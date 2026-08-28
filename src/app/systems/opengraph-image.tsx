import { renderOgImage, ogImageSize } from "@/lib/og-image";

export const alt = "Systems | Ahrom Labs";
export const size = ogImageSize;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage({
    title: "The vocabulary Ahrom uses to model a business.",
    description: "Entities, relationships, workflows, evidence, and the terms that connect them.",
  });
}
