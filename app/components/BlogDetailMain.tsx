import ReactMarkdown from "react-markdown";
import type { PostMeta } from "~/types";
import Date from "~/components/Date";
import { NavLink } from "react-router";

const BlogDetailMain = ({
  postMeta,
  markdown,
}: {
  postMeta: PostMeta;
  markdown: string;
}) => {
  return (
    <article className="main-content">
      {/* <div className="flex justify-between border-y border-gray-300 items-center py-5">
            <div className="font-brawler uppercase tracking-wide font-medium text-lg">
              <span>Film Reviews/</span>
              <span className="font-bold">{postMeta.title}</span>
            </div>
          </div> */}
      <Date />
      <h1 className="text-[56px] font-brawler mt-4 mb-5 my-0 font-bold tracking-tight leading-15">
        {postMeta.meta_title ? postMeta.meta_title : postMeta.title}
      </h1>
      <img
        src={postMeta.image ? postMeta.image : "/images/soni.jpg"}
        alt={postMeta.title}
        className="w-full grayscale contrast-75 brightness-90
         hover:grayscale-0 hover:contrast-110 hover:brightness-105
         transition-all duration-700"
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

      <NavLink to="/blog" className="inline-block text-dark hover:text-crimson transition duration-300 border-gray-600 hover:border-crimson border-t border-b border-dotted cursor-pointer tracking-wider font-gothic text-2xl hover:scale-110 mt-6">
        back to all reviews
      </NavLink>
    </article>
  );
};

export default BlogDetailMain;
