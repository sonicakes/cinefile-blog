import ReactMarkdown from "react-markdown";
import type { PostMeta, Stat } from "~/types";
import Info from "~/components/Info";
import { NavLink } from "react-router";

const BlogDetailMain = ({
  postMeta,
  markdown,
  stats,
}: {
  postMeta: PostMeta;
  markdown: string;
  stats?: Stat;
}) => {
  return (
    <article className="main-content">
      <Info
        postDate={postMeta.date_reviewed}
        readTime={stats?.text}
        wordCount={stats?.words}
      />
      <h1 className="text-5xl wrap-break-word lg:text-[56px] font-brawler mt-4 mb-5 my-0 font-bold tracking-tight leading-12 lg:leading-15">
        {postMeta.meta_title ? postMeta.meta_title : postMeta.title}
      </h1>
      <img
        src={
          postMeta.img ? postMeta.img : "/images/gallery.jpg"
        }
        alt={postMeta.title}
        className="w-full grayscale contrast-75 brightness-90
         hover:grayscale-0 hover:contrast-110 hover:brightness-105
         transition-all duration-700"
      />
      <p className="font-caption italic text-gray-600 mb-7 pb-2 pt-1.5 border-b border-gray-300 text-sm">
        {postMeta.img
          ? postMeta.image_description &&
            postMeta.image_description + " Photo: Unsplash"
          : "Photo: Red Gallery, Hydro Majestic Hotel 2025. Photo by author."}
      </p>

      <div className="full-text drop-cap">
        <div className="max-w-none mb-12 prose">
          <ReactMarkdown>{markdown}</ReactMarkdown>
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

export default BlogDetailMain;
