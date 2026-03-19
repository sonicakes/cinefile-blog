import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { mapStrapiToPosts } from "~/helpers";
import type { Post } from "~/types";

const ScoreboardSection = ({ apiUrl, strapiUrl }: { apiUrl: string; strapiUrl: string }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeGenre, setActiveGenre] = useState<string>("All");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch(
          `${apiUrl}/movies?filters[review_provided][$eq]=true&populate[img]=true&populate[genres]=true&sort=rating:desc&pagination[limit]=100`
        );
        if (!res.ok) return;
        const json = await res.json();
        setPosts(mapStrapiToPosts(json));
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchPosts();
  }, [apiUrl]);

  const genres = [
    "All",
    ...Array.from(
      new Set(posts.flatMap((p) => p.genres.map((g) => g.name)))
    ).sort(),
  ];

  const filtered =
    activeGenre === "All"
      ? posts
      : posts.filter((p) => p.genres.some((g) => g.name === activeGenre));

  function thumbUrl(img: string | undefined) {
    if (!img) return null;
    return img.startsWith("http") ? img : `${strapiUrl}${img}`;
  }

  return (
    <section className="mt-10 border-t-4 border-double border-dark pt-6">
      <div className="flex items-baseline justify-between mb-3">
        <h2 className="font-brawler font-bold text-2xl uppercase tracking-tight">
          The Ratings Ledger
        </h2>
        <Link
          to="/blog"
          className="inline-block text-dark hover:text-crimson transition duration-700 border-gray-600 hover:border-crimson border-t border-b border-dotted tracking-wider font-gothic text-xl hover:scale-110"
        >
          all reviews
        </Link>
      </div>

      {/* Genre filter band */}
      <div className="flex flex-wrap gap-2 border-y border-dark py-3 mb-0 font-brawler text-[10px] uppercase font-semibold select-none">
        {isLoading
          ? Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-5 w-14 bg-neutral-200 animate-pulse" />
            ))
          : genres.map((g) => (
              <button
                key={g}
                onClick={() => setActiveGenre(g)}
                aria-pressed={activeGenre === g}
                className={`uppercase px-1.5 lg:px-3 py-1 leading-3.5 border transition duration-300 cursor-pointer whitespace-nowrap ${
                  activeGenre === g
                    ? "bg-crimson text-white border-crimson"
                    : "bg-light border-gray-600 hover:bg-crimson hover:text-gray-100"
                }`}
              >
                {g}
              </button>
            ))}
      </div>

      {/* Scoreboard table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm font-source">
          <thead>
            <tr className="border-b-2 border-dark text-[10px] uppercase tracking-widest text-neutral-500">
              <th className="text-left py-2 pr-3 font-semibold w-8 hidden sm:table-cell" />
              <th className="text-left py-2 pr-4 font-semibold w-32 md:w-40">Title</th>
              <th className="text-left py-2 pr-4 font-semibold w-28 hidden sm:table-cell">Director</th>
              <th className="text-left py-2 pr-4 font-semibold w-12 hidden md:table-cell">Year</th>
              <th className="text-left py-2 pr-4 font-semibold hidden lg:table-cell">Genre</th>
              <th className="text-left py-2 pr-4 font-semibold hidden xl:table-cell">Quote</th>
              <th className="text-center py-2 font-semibold w-16">Rating</th>
            </tr>
          </thead>
          <tbody>
            {isLoading
              ? Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className="border-b border-neutral-200">
                    <td className="py-2 pr-3 hidden sm:table-cell">
                      <div className="w-8 h-10 bg-neutral-200 animate-pulse" />
                    </td>
                    <td className="py-2 pr-4"><div className="h-3 bg-neutral-200 animate-pulse w-28 rounded" /></td>
                    <td className="py-2 pr-4 hidden sm:table-cell"><div className="h-3 bg-neutral-200 animate-pulse w-20 rounded" /></td>
                    <td className="py-2 pr-4 hidden md:table-cell"><div className="h-3 bg-neutral-200 animate-pulse w-10 rounded" /></td>
                    <td className="py-2 pr-4 hidden lg:table-cell"><div className="h-3 bg-neutral-200 animate-pulse w-16 rounded" /></td>
                    <td className="py-2 pr-4 hidden xl:table-cell"><div className="h-3 bg-neutral-200 animate-pulse w-48 rounded" /></td>
                    <td className="py-2"><div className="h-3 bg-neutral-200 animate-pulse w-8 rounded mx-auto" /></td>
                  </tr>
                ))
              : filtered.map((post) => {
                  const thumb = thumbUrl(post.img);
                  return (
                    <tr
                      key={post.documentId}
                      onClick={() => navigate(`/blog/${post.documentId}`)}
                      className="border-b border-neutral-200 hover:bg-neutral-50 transition-colors group cursor-pointer"
                    >
                      <td className="py-1.5 pr-3 hidden sm:table-cell">
                        {thumb ? (
                          <img
                            src={thumb}
                            alt={post.title}
                            className="w-8 h-10 object-cover grayscale transition duration-500"
                          />
                        ) : (
                          <div className="w-8 h-10 bg-neutral-100 border border-neutral-200" />
                        )}
                      </td>
                      <td className="py-2 pr-4 font-semibold font-brawler group-hover:text-crimson transition-colors duration-300 max-w-32 md:max-w-50 truncate capitalize">
                        {post.title}
                      </td>
                      <td className="py-2 pr-4 text-neutral-500 hidden sm:table-cell max-w-40 truncate capitalize">{post.director}</td>
                      <td className="py-2 pr-4 text-neutral-500 hidden md:table-cell">{post.year}</td>
                      <td className="py-2 pr-4 hidden lg:table-cell">
                        {post.genres.slice(0, 2).map((g) => (
                          <span
                            key={g.id}
                            className="inline-block text-[10px] border border-neutral-400 px-1 mr-1 text-neutral-500 uppercase tracking-wide"
                          >
                            {g.name}
                          </span>
                        ))}
                      </td>
                      <td className="py-2 pr-4 hidden xl:table-cell text-neutral-600 italic max-w-xs font-caption">
                        {post.quote ? (
                          <span className="line-clamp-1">"{post.quote}"</span>
                        ) : (
                          <span className="text-neutral-300" aria-hidden="true">—</span>
                        )}
                      </td>
                      <td className="py-2 text-center font-bold tabular-nums font-brawler">
                        {post.rating}
                      </td>
                    </tr>
                  );
                })}
          </tbody>
        </table>
        {!isLoading && filtered.length === 0 && (
          <p className="text-center text-sm text-neutral-400 py-8 font-source uppercase tracking-widest">
            No reviews filed under this genre.
          </p>
        )}
      </div>
    </section>
  );
};

export default ScoreboardSection;
