import { renderOgImage, ogImageSize } from "@/lib/og-image";

export const alt = "Services | Ahrom Labs";
export const size = ogImageSize;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage({
    title: "ERP, CRM, TallyPrime integration and AI document extraction.",
    description:
      "Custom operational systems for Indian businesses, modeled as one connected system.",
  });
}
