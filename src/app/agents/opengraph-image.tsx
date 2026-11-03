import { renderOgImage, ogImageSize } from "@/lib/og-image";

export const alt = "MCP server and files for AI agents | Ahrom Labs";
export const size = ogImageSize;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage({
    title: "MCP server and files for AI agents",
    description:
      "A read-only MCP search server, llms.txt, every page as Markdown, and a knowledge graph in JSON.",
  });
}
