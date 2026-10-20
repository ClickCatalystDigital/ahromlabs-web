import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { renderOgImage, ogImageSize } from "@/lib/og-image";

export const alt = "Services | Ahrom Labs";
export const size = ogImageSize;
export const contentType = "image/png";

export default async function Image() {
  const jpg = await readFile(join(process.cwd(), "src/assets/og-art/services.jpg"));
  return renderOgImage({
    art: `data:image/jpeg;base64,${jpg.toString("base64")}`,
    title: "From compliant ERP and CRM to analytics, RAG and knowledge graphs.",
    description:
      "Operations and accounting systems for Indian manufacturers, every layer built on one model of your business.",
  });
}
