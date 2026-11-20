import { questions, questionAnchor, DEMO_URL, ASSISTANT, type System } from "@/lib/ai-assistant";
import { episodesFor, LEVEL_LABEL, youtubeUrl } from "@/lib/episodes";
import { jsonLd, videoDate } from "@/lib/schema";
import { DemoLink } from "@/components/GuidePage";

// One assistant's short-video series, on its guide page: each episode's hook, the question it asks (linked into the
// library), what kind of question it is, and a link to ask it on the demo. Published episodes play in a plain
// YouTube embed (loading="lazy", nothing fetched until scrolled near) and carry VideoObject markup.
export function EpisodeList({ system }: { system: System }) {
  const list = episodesFor(system);
  const a = ASSISTANT[system];
  const videos = list.filter((x) => x.youtube);
  return (
    <section>
      <ol className="mt-6 divide-y divide-line border-y border-line">
        {list.map((x) => {
          const q = questions.find((y) => y.id === x.question)!;
          return (
            <li key={x.n} className="py-5">
              <p className="text-sm text-foreground-secondary">
                Episode {x.n} · {LEVEL_LABEL[x.level]}
              </p>
              <p className="mt-1 text-lg font-medium">{x.hook}</p>
              <p className="mt-1 leading-relaxed text-foreground-secondary">
                Asks: <a className="text-link focus-ring" href={`/ai-assistant/questions#${questionAnchor(q.id)}`}>{q.question}</a>
              </p>
              {x.youtube && (
                <div className="mt-4 aspect-[9/16] max-w-xs overflow-hidden rounded-lg border border-line">
                  <iframe
                    className="size-full"
                    src={`https://www.youtube-nocookie.com/embed/${x.youtube}`}
                    title={`${a.name}, episode ${x.n}: ${x.hook}`}
                    loading="lazy"
                    allow="encrypted-media; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              )}
            </li>
          );
        })}
      </ol>
      <p className="mt-4 leading-relaxed text-foreground-secondary">
        Ask any of these yourself on the <DemoLink href={DEMO_URL[system]}>public demo</DemoLink>: {a.demo}. The data is
        a made-up company.
      </p>
      {videos.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: jsonLd({
              "@context": "https://schema.org",
              "@graph": videos.map((x) => ({
                "@type": "VideoObject",
                name: `${a.name}: ${x.hook}`,
                description: `${a.name} answers "${questions.find((y) => y.id === x.question)!.question}" on the public demo, from a made-up company's records.`,
                thumbnailUrl: `https://i.ytimg.com/vi/${x.youtube}/hqdefault.jpg`,
                uploadDate: videoDate(x.published),
                contentUrl: youtubeUrl(x.youtube!),
                embedUrl: `https://www.youtube.com/embed/${x.youtube}`,
                publisher: { "@id": "https://ahromlabs.com/#organization" },
              })),
            }),
          }}
        />
      )}
    </section>
  );
}
