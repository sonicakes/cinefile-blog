import ReactMarkdown from "react-markdown";
import type { PostMeta, Stat } from "~/types";
import Info from "~/components/Info";
import { NavLink } from "react-router";
import { FaImdb, FaWikipediaW } from "react-icons/fa6";


const resources=[
          {
            label: "IMDb",
            url: "https://www.imdb.com/title/tt0166924/",
            icon: <FaImdb />,
          },
          {
            label: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Mulholland_Drive_(film)",
            icon: <FaWikipediaW />,
          },
        ];
        
const BlogDetailMain = ({
  postMeta,
  markdown,
  stats
}: {
  postMeta: PostMeta;
  markdown: string;
  stats: Stat
}) => {
  return (
    <>
    <article className="main-content">
      <Info 
        postDate={postMeta.date_reviewed} 
        readTime={stats.text}
        wordCount={stats.words}
      />
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

        <div className="px-6 py-4 flex flex-wrap items-center gap-x-10 gap-y-2 border-b border-black">
        <span className=" text-[10px]  uppercase tracking-[.3em] text-neutral-400">Sources:</span>
        {resources.map((res, i) => (
          <a key={i} href={res.url} className="text-[11px] font-bold uppercase hover:text-crimson hover:underline flex items-center gap-2">
            {res.icon} {res.label}
          </a>
        ))}
      </div>

    </article>
    
    </>
  );
};

export default BlogDetailMain;
