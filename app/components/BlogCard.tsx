import type { PostMeta } from "~/types";
import {
  MdOutlineWatchLater,
  MdCheck,
  MdComputer,
  MdOutlineStarHalf,
  MdFormatQuote,
} from "react-icons/md";
import { Link } from "react-router";

const BlogCard = ({
  blog,
  classExtra,
}: {
  blog: PostMeta;
  classExtra: string;
}) => {
  const {
    review_provided,
    slug,
    title,
    image,
    year,
    director,
    run_time,
    rating,
    watched_previously,
    location,
    excerpt,
    quote,
    genres,
  } = blog;

  // 1. Dynamic Wrapper: Wraps content in a Link only if a review exists
  const Wrapper = ({ children }: { children: React.ReactNode }) =>
    review_provided ? (
      <Link to={slug} className={classExtra}>
        {children}
      </Link>
    ) : (
      <div className={classExtra}>{children}</div>
    );

  return (
    <Wrapper>
      <article
        className={`item border-2 border-dark relative z-10 transition duration-700 group ${
          review_provided
            ? "cursor-pointer pointer-events-auto"
            : "cursor-default"
        }`}
      >
        {/* Image Section */}
        <div className="relative overflow-hidden">
          {" "}
          {/* overflow-hidden is key for the slide effect */}
          <img
            className="w-full aspect-video object-cover grayscale group-hover:grayscale-0 transition duration-700"
            src={image || "./images/front.jpg"}
            alt={title}
          />
          {review_provided ? (
            /* Star Rating if review exists */
            <div className="text-white bg-linear-to-l from-black px-4 py-1.5 absolute top-0 right-0 flex gap-1 justify-end font-bold font-brawler text-base">
              <MdOutlineStarHalf size="20" />
              <MdOutlineStarHalf size="20" />
              <span>{rating && rating}</span>
            </div>
          ) : (
            /* "Review Pending" Slide-in if review is missing */
            <div className="absolute top-0 right-0 translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out bg-crimson text-white px-4 py-1.5 font-bold font-brawler uppercase tracking-widest text-sm shadow-lg">
              Review Pending
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="p-6 bg-white group-hover:bg-dark group-hover:text-light duration-700 transition">
          <header>
            <h2 className="text-3xl uppercase group-hover:text-crimson transition duration-700 font-brawler font-bold tracking-wide">
              {title} <span>({year})</span>
            </h2>
            <p className="italic text-base py-2 text-gray-600 transition duration-700 group-hover:text-gray-100 flex gap-1">
              Directed by <strong className="capitalize">{director}</strong>
            </p>
          </header>

          {/* Genres */}
          <div className="text-xs uppercase pt-2 pb-4 flex gap-2 font-semibold flex-wrap">
            {genres?.map((genre) => (
              <span
                key={genre}
                className="bg-light transition duration-700 group-hover:bg-gray-600 group-hover:text-gray-100 px-2 py-1 border border-gray-600"
              >
                {genre}
              </span>
            ))}
          </div>

          {/* Metadata Grid */}
          <div className="font-bold tracking-wide font-brawler flex gap-x-4 gap-y-1 text-xs z-100 flex-wrap items-center text-gray-600 group-hover:text-gray-100 transition duration-700">
            <MetaItem Icon={MdOutlineWatchLater} text={run_time || "1hr 15m"} />
            <MetaItem Icon={MdCheck} text={`Seen - ${watched_previously}`} />
            <MetaItem Icon={MdComputer} text={location} fullWidth />
          </div>

          <hr className="border-t-3 my-5 border-double border-gray-600" />

          {/* Synopsis */}
          {excerpt && (
            <div className="text-sm pb-4 leading-5">
              <h3 className="font-brawler uppercase font-bold pb-1 text-base">
                Synopsis
              </h3>
              <p className="article-body">{excerpt}</p>
            </div>
          )}

          {/* Quote */}
          {quote && (
            <blockquote className="my-6 border-l-4 bg-light border-crimson px-6 italic">
              <p className="flex flex-col text-xl font-caption font-medium text-gray-900 leading-relaxed py-2">
                <MdFormatQuote />
                <span className="self-center px-8">{quote}</span>
                <MdFormatQuote className="self-end" />
              </p>
            </blockquote>
          )}

          {/* CTA */}
          {review_provided && (
            <span className="inline-block text-dark group-hover:text-crimson transition duration-700 border-gray-600 group-hover:border-crimson border-t border-b border-dotted tracking-wider font-gothic text-2xl hover:scale-110 mt-6">
              read full review
            </span>
          )}
        </div>
      </article>
    </Wrapper>
  );
};

// Helper component for metadata items to keep the main JSX clean
const MetaItem = ({
  Icon,
  text,
  fullWidth,
}: {
  Icon: any;
  text: string;
  fullWidth?: boolean;
}) => (
  <div className={`flex gap-1 items-center ${fullWidth ? "w-full" : ""}`}>
    <Icon color="crimson" size="20" /> {text}
  </div>
);

export default BlogCard;
