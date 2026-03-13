import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import AsideMeta from "~/components/movie/AsideMeta";
import { Link } from "react-router";
import Reveal from "~/components/ui/Reveal";

type AboutData = {
  page_title: string;
  byline: string;
  bio: string;
  portrait: { url: string } | null;
  portrait_caption: string;
  favourite_movies: { id: number; title: string; year: string }[];
  favourite_podcasts: { id: number; name: string; link: string }[];
  title: string;
  year: string;
  director: string;
  run_time: string;
  excerpt: string;
  rating: number;
  rating_metric: string;
  would_recommend: boolean;
  would_rewatch: boolean;
  genres: { id: string; documentId: string; name: string }[];
  availability: { source: string; location: string }[];
};

const AboutPage = ({ apiUrl, strapiUrl }: { apiUrl: string; strapiUrl: string }) => {
  const [about, setAbout] = useState<AboutData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchAbout() {
      try {
        const res = await fetch(
          `${apiUrl}/about?populate[genres]=true&populate[portrait]=true&populate[favourite_movies]=true&populate[favourite_podcasts]=true&populate[availability]=true`
        );
        if (!res.ok) return;
        const json = await res.json();
        setAbout(json.data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchAbout();
  }, [apiUrl]);

  const portraitUrl = about?.portrait?.url
    ? about.portrait.url.startsWith("http")
      ? about.portrait.url
      : `${strapiUrl}${about.portrait.url}`
    : "./images/wannabe-actress.jpg";

  const asidePostMeta = about
    ? {
        id: "about",
        documentId: "about",
        title: about.title,
        year: about.year,
        director: about.director,
        run_time: about.run_time,
        excerpt: about.excerpt,
        rating: about.rating,
        rating_metric: about.rating_metric,
        would_recommend: about.would_recommend,
        would_rewatch: about.would_rewatch,
        review_provided: false,
        genres: about.genres?.map((g) => ({ id: String(g.id ?? g.documentId), name: g.name })) ?? [],
        availability: about.availability ?? [],
      }
    : null;

  return (
    <main className="grid grid-cols-1 lg:grid-cols-3 gap-12 mt-8">
      <div className="lg:col-span-2">
        <h2 className="text-5xl font-bold font-brawler mb-2 capitalize">
          {isLoading ? (
            <div className="h-12 bg-neutral-200 animate-pulse w-3/4 rounded" />
          ) : (
            about?.page_title ?? "Who is this film lady?"
          )}
        </h2>
        <div className="text-sm text-neutral-500 font-semibold border-b border-neutral-300 mb-6 pb-1 uppercase">
          {!isLoading && (about?.byline ?? "BY ME, MYSELF & I | CHIEF FILM CRITIC")}
        </div>

        {isLoading ? (
          <div className="space-y-4">
            <div className="w-72 aspect-square bg-neutral-200 animate-pulse rounded" />
            <div className="space-y-2 mt-4">
              <div className="h-4 bg-neutral-200 animate-pulse w-full rounded" />
              <div className="h-4 bg-neutral-200 animate-pulse w-full rounded" />
              <div className="h-4 bg-neutral-200 animate-pulse w-5/6 rounded" />
            </div>
          </div>
        ) : (
          <div className="prose group max-w-none leading-relaxed text-lg drop-cap">
            <div className="md:float-left w-full md:mr-6 md:w-72 relative">
              <Reveal>
                <img
                  src={portraitUrl}
                  style={{ margin: 0 }}
                  alt="Author Portrait"
                  className="w-full aspect-square object-cover"
                />
              </Reveal>
              {about?.portrait_caption && (
                <p className="text-sm mt-2 custom-caption italic leading-tight">
                  {about.portrait_caption}
                </p>
              )}
            </div>
            {about?.bio && (
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  a: ({ node, ...props }) => (
                    <a {...props} target="_blank" rel="noopener noreferrer" />
                  ),
                  img: ({ node, ...props }) => (
                    <Reveal groupHover>
                      <img {...props} loading="lazy" alt={props.alt || ""} />
                    </Reveal>
                  ),
                  p: ({ node, children, ...props }) => {
                    const hasImage = node?.children?.some(
                      (child: any) => child.tagName === "img"
                    );
                    if (hasImage) return <div>{children}</div>;
                    return <p {...props}>{children}</p>;
                  },
                }}
              >{about.bio}</ReactMarkdown>
            )}
            <Link to="/blog" className="inline-block text-dark hover:text-crimson transition duration-700 border-gray-600 hover:border-crimson border-t border-b border-dotted tracking-wider font-gothic text-2xl hover:scale-110 mt-6">
              see all reviews
            </Link>
          </div>
        )}

        <section className="mt-12 border-t-4 border-double border-dark pt-8">
          {isLoading ? (
            <div className="h-9 bg-neutral-200 animate-pulse w-64 mb-6 rounded" />
          ) : (
            <h2 className="text-3xl font-brawler font-bold uppercase mb-6 tracking-tighter bg-dark text-white inline-block px-2">
              The Editorial & Classifieds
            </h2>
          )}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="h-40 bg-neutral-200 animate-pulse rounded" />
              <div className="h-40 bg-neutral-200 animate-pulse rounded" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-sm uppercase">
              <div className="border border-dark p-4 bg-[#fdfdfd]">
                <h4 className="font-bold border-b border-dark mb-2">My All Time Fave Movies</h4>
                <ul className="list-inside list-disc space-y-1">
                  {about?.favourite_movies?.map((m) => (
                    <li key={m.id}>{m.title} ({m.year})</li>
                  ))}
                </ul>
              </div>
              <div className="border border-dark p-4 border-l-4">
                <h4 className="font-bold border-b border-dark mb-2">Podcast Faves</h4>
                <ul className="list-inside list-disc space-y-1">
                  {about?.favourite_podcasts?.map((p) => (
                    <li key={p.id}>
                      {p.link ? (
                        <a href={p.link} target="_blank" rel="noopener noreferrer" className="hover:underline">
                          {p.name}
                        </a>
                      ) : (
                        p.name
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </section>
      </div>

      <aside>
        {isLoading || !asidePostMeta ? (
          <div className="space-y-4 animate-pulse pt-4 border-t border-gray-300">
            <div className="h-6 bg-neutral-200 rounded w-3/4" />
            <div className="h-4 bg-neutral-200 rounded w-1/2" />
            <div className="h-24 bg-neutral-200 rounded" />
          </div>
        ) : (
          <AsideMeta postMeta={asidePostMeta} relatedMode="latest" />
        )}
      </aside>
    </main>
  );
};

export default AboutPage;
