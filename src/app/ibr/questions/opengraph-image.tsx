import { renderOgImage, ogImageSize } from "@/lib/og-image";

export const alt = "Ahrom Labs";
export const size = ogImageSize;
export const contentType = "image/png";

export default async function Image() {
  return renderOgImage({ title: "IBR 2026 questions, answered", description: "Short answers on the Indian Boiler Regulations, 2026: every form, registration, inspection and records." });
}
