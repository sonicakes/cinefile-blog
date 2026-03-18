import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Post } from "~/types";

type Stat = {
  minutes: number;
  text: string;
  time: number;
  words: number;
};
import MovieInfo from "~/components/movie/MovieInfo";
import { NavLink } from "react-router";
import Reveal from "../ui/Reveal";

const injectQuoteAtMidpoint = (markdown: string, quote?: string): string => {
  if (!quote || !markdown) return markdown;
  const paragraphs = markdown.split(/\n\n+/);
  const mid = Math.floor(paragraphs.length / 2);
  return [
    ...paragraphs.slice(0, mid),
    `> ${quote}`,
    ...paragraphs.slice(mid),
  ].join("\n\n");
};

const MovieDetailMain = ({
  postMeta,
  markdown,
  stats,
}: {
  postMeta: Post;
  markdown: string;
  stats?: Stat;
}) => {
  const bodyWithQuote = injectQuoteAtMidpoint(markdown, postMeta.quote);
  return (
    <article className="main-content">
      <MovieInfo
        postDate={postMeta.date_reviewed}
        readTime={stats?.text}
        wordCount={stats?.words}
      />
      <h1 className="text-5xl wrap-break-word lg:text-[56px] font-brawler mt-4 mb-5 my-0 font-bold tracking-tight leading-12 lg:leading-15">
        {postMeta.meta_title ? postMeta.meta_title : postMeta.title}
      </h1>
      <Reveal>
      <img
        src={
          postMeta.img ? postMeta.img : "/images/gallery.jpg"
        }
        alt={postMeta.title}
        className="w-full max-h-120 object-cover"
      />
      </Reveal>
      <p className="font-caption italic text-gray-600 mb-7 pb-2 pt-1.5 border-b border-gray-300 text-sm">
        {postMeta.img
          ? postMeta.image_description &&
            postMeta.image_description + " Photo: Unsplash"
          : "Photo: Red Gallery, Hydro Majestic Hotel 2025. Photo by author."}
      </p>

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
                    alt={props.alt || "Dynamic Content"}
                  />
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
          >{bodyWithQuote}</ReactMarkdown>
        </div>
      </div>

      <NavLink
        to="/blog"
        className="inline-block text-dark hover:text-crimson transition duration-300 border-gray-600 hover:border-crimson border-t border-b border-dotted cursor-pointer tracking-wider font-gothic text-2xl hover:scale-110 mt-6"
      >
        back to all reviews
      </NavLink>
    </article>
  );
};

export default MovieDetailMain;
