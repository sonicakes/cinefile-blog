import ReactMarkdown from "react-markdown";
import type { Route } from "./+types";
import type { PostMeta } from "~/types";
import { Link } from "react-router";
import Date from "~/components/Date";
import { MdOutlineWatchLater } from "react-icons/md";
import { MdCheck } from "react-icons/md";
import { MdComputer } from "react-icons/md";
import { MdOutlineStarHalf } from "react-icons/md";
import { MdFormatQuote } from "react-icons/md";

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
      <div className="grid grid-cols-[2fr_1fr] gap-10 py-4">
        <article className="main-content">
        <div className="flex justify-between border-y border-gray-300 items-center py-5">         
           <div className="font-brawler uppercase tracking-wide font-medium text-lg">
            <span>Film Reviews/</span>
            <span className="font-bold">{postMeta.title}</span>
          </div>
          </div>

                    <Date />

          <img
            src={postMeta.image ? postMeta.image : "/images/soni.jpg"}
            alt="Atmospheric Cinema"
            className="w-full grayscale"
          />
          <p className="font-caption italic text-gray-600 mb-7 pb-2 pt-1.5 border-b border-gray-300 text-sm">
            {postMeta.image
              ? postMeta.image_description &&
                postMeta.image_description + " Photo: Unsplash"
              : "Photo: Yours Truly, Hydro Majestic Hotel 2025."}
          </p>

    

          <div className="full-text drop-cap">
            <div className="max-w-none mb-12 prose">
              <ReactMarkdown>{markdown}</ReactMarkdown>
            </div>
          </div>

          <button className="inline-block text-dark hover:text-crimson transition duration-300 border-gray-600 hover:border-crimson border-t border-b border-dotted cursor-pointer tracking-wider font-gothic text-2xl hover:scale-110 mt-6">
            back to all reviews
          </button>
        </article>

        <aside className="related-sidebar">
               <div className="py-5 mb-5 border-t px-4 border-gray-300 bg-light">
               <div className="flex justify-between items-start">
                      <div className="">
                        <h2 className="text-xl font-brawler font-bold tracking-wide">
                          {postMeta.title} <span className="">({postMeta.year})</span>
                        </h2>
          
                        <p className="italic text-base py-2 text-gray-600 transition duration-300 group-hover:text-gray-100 flex gap-1">
                          Directed by
                          <strong className="capitalize">{postMeta.director}</strong>
                        </p>
                      </div>
                    </div>
          
                    <div className="text-xs uppercase pt-2 pb-4 flex gap-3 font-semibold">
                      <span className="bg-light transition duration-300 group-hover:bg-gray-600 group-hover:text-gray-100 px-2 py-1 border border-gray-600">
                        Drama
                      </span>{" "}
                      <span className="bg-light px-2 py-1 transition duration-300 group-hover:bg-gray-600 group-hover:text-gray-100 border border-gray-600">
                        Horror
                      </span>{" "}
                      <span className="bg-light px-2 py-1 transition duration-300 group-hover:bg-gray-600 group-hover:text-gray-100 border border-gray-600">
                        Romance
                      </span>
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
          
                    <div className="text-sm bt-1 border-gray-300  pb-4 leading-5">
                      <h3 className="font-brawler uppercase font-bold pb-1 text-base">
                        SYNOPSIS
                      </h3>
                      <p className="article-body">{postMeta.excerpt}</p>
                    </div>

                    <div className="text-sm bt-1 border-gray-300  pb-4 leading-5">
                      <h3 className="font-brawler uppercase font-bold pb-1 text-base">
                        RATING & VERDICT
                      </h3>
                      <p className="">10/10, would recommend</p>
                    </div>
<hr className="border-t-3 my-5 border-double border-gray-600"></hr>

         </div>
          <div>   <div className="flex justify-between mb-5 border-y border-gray-300 items-center py-5">         
           <h3 className="font-brawler tracking-wide uppercase">Related Blogs</h3>
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
          </div></div>


      
        </aside>
      </div>
    </>
  );
};

export default BlogPostDetailsPage;
