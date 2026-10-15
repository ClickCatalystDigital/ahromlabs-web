import { renderOgImage, ogImageSize } from "@/lib/og-image";

export const alt = "Services | Ahrom Labs";
export const size = ogImageSize;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage({
    title: "From compliant ERP and CRM to analytics, RAG and knowledge graphs.",
    description:
      "Operations and accounting systems for Indian manufacturers, every layer built on one model of your business.",
  });
}
