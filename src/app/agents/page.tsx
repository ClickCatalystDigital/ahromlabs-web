import type { Metadata } from "next";
import Link from "next/link";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { MCP_URL, MCP_REPO_URL } from "@/lib/ai-search";
import { metaDescription } from "@/lib/seo";

// One HTML page for agents and the people wiring them up: the site's MCP server and its machine-readable
// files, so a browsing tool that reads only HTML still finds them. Lists only what exists (see
// src/app/.well-known/api-catalog/route.ts).

const title = "MCP server and files for AI agents";
const description = metaDescription("Connect an AI agent to Ahrom Labs' published content: a read-only MCP search server, llms.txt, every page as Markdown, and a knowledge graph in JSON.");

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/agents" },
  openGraph: { type: "website", url: "https://ahromlabs.com/agents", siteName: "Ahrom Labs", title: `${title} | Ahrom Labs`, description },
};

const config = JSON.stringify({ mcpServers: { "ahromlabs-search": { command: "npx", args: ["-y", "github:Ahrom-Labs/ahromlabs-mcp"] } } }, null, 2);

const FILES = [
  { href: "/llms.txt", name: "llms.txt", what: "A summary of the site for language models: every page, tool and guide with one line on each." },
  { href: "/llms-full.txt", name: "llms-full.txt", what: "Every page as Markdown, in one file, for an agent that wants the whole site in one fetch." },
  { href: "/knowledge.json", name: "knowledge.json", what: "The knowledge graph: notes, patterns, services, clients, IBR forms, BOQ items, ERP requirements and AI assistant questions, with typed links between them." },
  { href: "/.well-known/mcp/server-card.json", name: "MCP server card", what: "The MCP server's description, also at /.well-known/mcp.json." },
  { href: "/.well-known/api-catalog", name: "API catalog", what: "All of the above, listed in one place (RFC 9727)." },
];

export default function AgentsPage() {
  return (
    <>
      <SiteNav />
      <main className="flex-1">
        <article className="rail pt-16 pb-24 md:pt-24">
          <h1 className="display text-5xl text-foreground sm:text-6xl">{title}</h1>
          <div className="prose-measure">
            <p className="mt-6 text-lg leading-relaxed text-foreground-secondary sm:text-xl">
              Everything Ahrom Labs publishes can be read by an AI agent: searched through an MCP server, or fetched as plain
              files. All of it is read-only and public; any page can also be requested as Markdown by sending{" "}
              <code className="font-mono text-base">Accept: text/markdown</code>.
            </p>

            <h2 className="mt-12 text-2xl text-foreground">MCP server</h2>
            <p className="mt-4 text-lg leading-relaxed text-foreground-secondary">
              A search over the site&apos;s notes, patterns, guides, services and pricing answers. Each result is a passage
              with the URL of the page it came from. No sign-in.
            </p>
            <p className="mt-4 text-sm text-foreground-secondary">Endpoint (streamable HTTP):</p>
            <pre className="mt-2 overflow-x-auto border border-line p-4 font-mono text-sm text-foreground"><code>{MCP_URL}</code></pre>
            <p className="mt-4 text-sm text-foreground-secondary">
              For Claude Desktop or any client that takes a local command, the open-source{" "}
              <a href={MCP_REPO_URL} className="text-link focus-ring">ahromlabs-mcp</a> server (MIT) connects to it for you:
            </p>
            <pre className="mt-2 overflow-x-auto border border-line p-4 font-mono text-sm text-foreground"><code>{config}</code></pre>

            <h2 className="mt-12 text-2xl text-foreground">Files</h2>
            <ul className="mt-4 divide-y divide-line border-y border-line">
              {FILES.map((f) => (
                <li key={f.href} className="py-4">
                  <a href={f.href} className="text-link focus-ring font-medium">{f.name}</a>
                  <p className="mt-1 leading-relaxed text-foreground-secondary">{f.what}</p>
                </li>
              ))}
            </ul>

            <h2 className="mt-12 text-2xl text-foreground">Datasets</h2>
            <p className="mt-4 text-lg leading-relaxed text-foreground-secondary">
              Free to reuse under CC BY 4.0, with credit to Ahrom Labs:{" "}
              <Link href="/erp/requirements" className="text-link focus-ring">ERP requirements</Link>,{" "}
              <Link href="/boq/items" className="text-link focus-ring">interior BOQ items</Link> and the{" "}
              <Link href="/ai-assistant/questions" className="text-link focus-ring">AI assistant question library</Link>, each with a
              download (JSON, CSV or Excel) on its page.
            </p>
          </div>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
