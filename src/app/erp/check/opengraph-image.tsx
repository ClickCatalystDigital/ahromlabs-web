import { renderOgImage, ogImageSize } from "@/lib/og-image";

export const alt = "ERP requirements builder · Ahrom Labs";
export const size = ogImageSize;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage({ title: "ERP requirements builder", description: "Five answers about your business, and the requirements that apply to it, ready to send to vendors." });
}
