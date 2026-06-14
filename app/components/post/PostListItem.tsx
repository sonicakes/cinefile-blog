import { Link } from "react-router";
import type { RawPost } from "~/types";

const PostListItem = ({ post }: { post: RawPost }) => {
  const imgUrl = post.img?.formats?.small?.url ?? post.img?.url;
  const date = post.date
    ? new Date(post.date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  return (
    <Link to={`/posts/${post.slug}`} className="group">
      <div className="flex gap-5 py-5 border-b border-[#ddd]">
        {imgUrl && (
          <img
            src={imgUrl}
            alt={post.title}
            className="w-32 h-24 object-cover flex-shrink-0"
          />
        )}
        <div className="flex flex-col justify-center gap-1">
          {date && (
            <span className="text-xs uppercase tracking-widest text-neutral-400 font-brawler">
              {date}
            </span>
          )}
          <h2 className="font-brawler text-xl leading-tight group-hover:text-crimson transition-colors duration-300">
            {post.title}
          </h2>
          {post.excerpt && (
            <p className="text-neutral-500 text-sm leading-snug line-clamp-2">
              {post.excerpt}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
};

export default PostListItem;
