import type { PostMeta } from "~/types";

const BlogCard = ({ blog }: { blog: PostMeta }) => {
  return (
    <article className="blog-card">
      <div className="thumbnail-wrapper">
        <img src={blog.image} alt={blog.title} />
      </div>
      <div>      <span className="category">{blog.director} | {blog.year}</span>
</div>
      <h3 className="uppercase">{blog.title}</h3>
      <p>{blog.excerpt}</p>
    </article>
  );
};

export default BlogCard;
