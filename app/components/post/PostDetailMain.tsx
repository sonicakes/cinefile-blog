import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { FaSpotify, FaArrowRight } from "react-icons/fa";
import { MdMenuBook } from "react-icons/md";
import type { Post } from "~/types";
import Reveal from "~/components/ui/Reveal";
import MovieInfo from "~/components/movie/MovieInfo";

type Stat = { minutes: number; text: string; words?: number };

const PostDetailMain = ({ post, stats }: { post: Post; stats?: Stat }) => {
  const hasFurtherReading = (post.further_reading?.length ?? 0) > 0;
  const hasSpotify = (post.spotify_episodes?.length ?? 0) > 0;

  return (
    <article className="main-content max-w-3xl mx-auto py-6">
      <MovieInfo postDate={post.date} readTime={stats?.text} wordCount={stats?.words} />

      {post.img && (
        <>
          <Reveal>
            <img
              src={post.img}
              alt={post.title}
              className="w-full max-h-230 object-cover"
            />
          </Reveal>
          {post.image_description && (
            <p className="font-caption italic text-gray-600 mb-7 pb-2 pt-1.5 border-b border-gray-300 text-sm">
              {post.image_description}
            </p>
          )}
        </>
      )}

      <h1 className="text-5xl wrap-break-word lg:text-[56px] font-brawler mt-3 mb-5 font-bold tracking-tight leading-12 lg:leading-15 capitalize">
        {post.meta_title ?? post.title}
      </h1>

      {post.excerpt && (
        <p className="italic text-lg text-gray-600 mb-6 border-b border-gray-300 pb-4 leading-relaxed first-letter:uppercase">
          {post.excerpt}
        </p>
      )}

      {post.body_blog && (
        <div className="full-text drop-cap">
          <div className="max-w-none mb-12 prose">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                a: ({ node, ...props }) => (
                  <a {...props} target="_blank" rel="noopener noreferrer" />
                ),
                img: ({ node, ...props }) => (
                  <Reveal>
                    <img
                      {...props}
                      className=""
                      loading="lazy"
                      alt={props.alt || "Post image"}
                    />
                  </Reveal>
                ),
                p: ({ node, children, ...props }) => {
                  const hasImage = node?.children?.some(
                    (child: any) => child.tagName === "img",
                  );
                  if (hasImage) return <div>{children}</div>;
                  return <p {...props}>{children}</p>;
                },
              }}
            >
              {post.body_blog}
            </ReactMarkdown>
          </div>
        </div>
      )}

      {hasSpotify && (
        <section className="border-t-2 border-dark mt-8">
          <div className="py-5 flex items-center gap-4">
            <FaSpotify className="text-base shrink-0" />
            <h4 className="font-sans text-xs font-black uppercase tracking-[0.3em]">
              Recommended Podcasts
            </h4>
            <div className="flex-1 border-t border-dark" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-black border border-black">
            {post.spotify_episodes!.map((ep, i) => (
              <a
                key={i}
                href={ep.url}
                target="_blank"
                rel="noreferrer"
                className="p-6 hover:bg-neutral-100 transition-colors group flex flex-col justify-between"
              >
                <div>
                  <span className="block text-xs uppercase text-neutral-500 tracking-wide font-semibold mb-1 leading-none">
                    {ep.podcastName}
                  </span>
                  <h5 className="text-xl font-brawler font-bold leading-tight group-hover:underline group-hover:text-crimson decoration-2">
                    {ep.title}
                  </h5>
                </div>
                <div className="mt-4 text-gray-600 font-medium flex items-center text-xs uppercase tracking-widest transition-transform duration-300 origin-bottom-left group-hover:scale-x-110">
                  Listen Now <FaArrowRight className="ml-2 text-[8px]" aria-hidden="true" />
                  <span className="sr-only">(opens in new tab)</span>
                </div>
              </a>
            ))}
          </div>
        </section>
      )}

      {hasFurtherReading && (
        <section className="border-t-2 border-dark mt-8">
          <div className="py-5 flex items-center gap-4">
            <MdMenuBook className="text-base shrink-0" />
            <h4 className="font-sans text-xs font-black uppercase tracking-[0.3em]">
              Further Reading
            </h4>
            <div className="flex-1 border-t border-dark" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-black border border-black">
            {post.further_reading!.map((book, i) =>
              book.url ? (
                <a
                  key={i}
                  href={book.url}
                  target="_blank"
                  rel="noreferrer"
                  className="p-6 hover:bg-neutral-100 transition-colors group flex flex-col justify-between"
                >
                  <div>
                    {book.author && (
                      <span className="block text-xs uppercase text-neutral-500 tracking-wide font-semibold mb-1 leading-none">
                        {book.author}
                      </span>
                    )}
                    <h5 className="text-xl font-brawler font-bold leading-tight group-hover:underline group-hover:text-crimson decoration-2">
                      {book.title}
                    </h5>
                  </div>
                  <div className="mt-4 text-gray-600 font-medium flex items-center text-xs uppercase tracking-widest transition-transform duration-300 origin-bottom-left group-hover:scale-x-110">
                    View Book <FaArrowRight className="ml-2 text-[8px]" aria-hidden="true" />
                    <span className="sr-only">(opens in new tab)</span>
                  </div>
                </a>
              ) : (
                <div key={i} className="p-6 flex flex-col">
                  {book.author && (
                    <span className="block text-xs uppercase text-neutral-500 tracking-wide font-semibold mb-1 leading-none">
                      {book.author}
                    </span>
                  )}
                  <h5 className="text-xl font-brawler font-bold leading-tight">
                    {book.title}
                  </h5>
                </div>
              ),
            )}
          </div>
        </section>
      )}
    </article>
  );
};

export default PostDetailMain;
