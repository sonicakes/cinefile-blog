import type { Route } from "./+types";
import type { PostMeta } from "~/types";
import { MdOutlineWatchLater } from "react-icons/md";
import { MdCheck } from "react-icons/md";
import { MdComputer } from "react-icons/md";
import BlogDetailMain from "~/components/BlogDetailMain";
import { MdOutlineStarHalf } from "react-icons/md";
import { MdFormatQuote } from "react-icons/md";
import { Link, NavLink } from "react-router";

export async function loader({ request, params }: Route.LoaderArgs) {
  const { slug } = params;
  const url = new URL("/movies.json", request.url);
  const res = await fetch(url.href);

  if (!res.ok) throw new Error("Failed to fetch data");

  const index = await res.json();
  const postMeta = index.find((post: PostMeta) => post.slug === slug);

  if (!postMeta) throw new Response("not found", { status: 404 });

  //dynamically import the raw markdown
  //the name of posts md file should match the slug names exactly
  const markdown = await import(`/posts/${slug}.md?raw`);

  return {
    postMeta,
    markdown: markdown.default,
  };
}

type BlogPostDetailsPageProps = {
  loaderData: {
    postMeta: PostMeta;
    markdown: string;
  };
};

const BlogPostDetailsPage = ({ loaderData }: BlogPostDetailsPageProps) => {
  const { postMeta, markdown } = loaderData;
  return (
    <>
      {/* breadcrumb */}
      <div className="border-b-5 border-dark text-center font-brawler uppercase text-xs tracking-widest py-2.5 bt-dark border-t">
      <NavLink className="hover:underline hover:text-crimson transition" to="/blog">Film Reviews</NavLink>  / <b>{postMeta.title}</b>
      </div>
      {/* end breadcrumb */}
      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-10 py-4">
        <BlogDetailMain postMeta={postMeta} markdown={markdown} />

        <aside className="related-sidebar">
          <div className="py-4 mb-5 border-t px-4 border-gray-300 bg-light">
            <div className="flex gap-1 pb-5 justify-end items-center">
              {Array.from({ length: Math.floor(postMeta.rating || 0) }).map(
                (_, index) => (
                  <MdOutlineStarHalf
                    key={index}
                    size="20"
                    className="text-crimson"
                  />
                ),
              )}
              <span className="text-crimson font-semibold">
                ({postMeta.rating && postMeta.rating}/10)
              </span>
            </div>

            <div className="flex justify-between items-start">
              <div className="">
                <h2 className="text-xl font-brawler font-bold tracking-wide capitalize">
                  {postMeta.title} <span className="">({postMeta.year})</span>
                </h2>

                <p className="italic text-base py-2 text-gray-600 transition duration-300 group-hover:text-gray-100 flex gap-1">
                  Directed by
                  <strong className="capitalize">{postMeta.director}</strong>
                </p>
              </div>
            </div>

            {/* Genres */}
            <div className="text-[10px] uppercase pt-2 pb-4 flex gap-1.5 font-semibold flex-wrap">
              {postMeta.genres?.map((genre) => (
                <span
                  key={genre}
                  className="bg-light transition duration-300 group-hover:bg-gray-600 group-hover:text-gray-100 px-1.5 py-0.5 border border-gray-600"
                >
                  {genre}
                </span>
              ))}
            </div>

            <div className="font-bold tracking-wide font-brawler flex gap-1 text-xs z-100 flex-wrap items-center text-gray-600 group-hover:text-gray-100 transition duration-300">
              <div className="flex gap-1 items-center">
                <MdOutlineWatchLater color="crimson" size="20" />{" "}
                {postMeta.run_time ? postMeta.run_time : "1hr 15m"}
              </div>

              <div className="flex gap-1 items-center ">
                <MdCheck color="crimson" size="20" /> Seen-
                {postMeta.watched_previously}
              </div>
              <div className="flex gap-1 items-center w-full">
                <MdComputer color="crimson" size="20" /> {postMeta.location}
              </div>
            </div>
            <hr className="border-t-3 my-5 border-double border-gray-600" />

            <div className="text-sm bt-1 border-gray-300 leading-5">
              <h3 className="font-brawler uppercase font-bold pb-1 text-base">
                SYNOPSIS
              </h3>
              <p className="columns-1 lg:columns-2 gap-5 text-justify hyphens-auto text-[15px]">{postMeta.excerpt}</p>
            </div>
            <hr className="border-t-3 my-5 border-double border-gray-600"></hr>

            <div className="text-sm bt-1 border-gray-300 pb-2 leading-5">
              <h3 className="font-brawler uppercase font-bold pb-1 text-base">
                VERDICT
              </h3>
              <p className="text-[0.95rem] flex gap-1 text-justify pb-2">
                <span className="text-crimson font-brawler font-semibold">
                  {postMeta.rating && postMeta.rating}/10
                </span>
                <span>{postMeta.rating_metric && postMeta.rating_metric}</span>
              </p>
            </div>
            <div className="text-sm items-center leading-5 pb-2 flex gap-2 justify-between">
              <span className="font-brawler text-xs text-gray-600 italic font-semibold">
                Would recommend it to others?
              </span>
              <span className="font-semibold uppercase">
                {postMeta.would_recommend ? "yes" : "no"}
              </span>
            </div>
            <div className="text-sm flex gap-2 items-center font-semibold pb-2 justify-between leading-5">
              <span className="text-xs italic font-brawler text-gray-600">
                Would you watch it again?
              </span>
              <span className="font-semibold uppercase">
                {postMeta.would_rewatch ? "yes" : "no"}
              </span>
            </div>
          </div>
          <div>
            {" "}
            <div className="flex justify-between mb-5 border-y border-gray-300 items-center py-5">
              <h3 className="font-brawler tracking-wide uppercase">
                Related Blogs
              </h3>
            </div>
            <div className="mini-card">
              <img src="/images/soni.jpg" alt="Review" />
              <h4>Beyond the front page: The Hydro Majestic</h4>
              <p>
                <small>The history of the Overlook's cousin...</small>
              </p>
            </div>
            <div className="mini-card">
              <img src="/images/front.jpg" alt="Review" />
              <h4>Wednesday Woes</h4>
              <p>
                <small>Why mid-week cinema is dying...</small>
              </p>
            </div>
            <div className="mini-card">
              <img src="/images/piano.jpg" alt="Review" />
              <h4>The Cost of Oz-Sploitation</h4>
              <p>
                <small>Revisiting the classNameics of the outback...</small>
              </p>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
};

export default BlogPostDetailsPage;
