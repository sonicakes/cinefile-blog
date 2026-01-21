import type { Route } from "./+types";
import type { PostMeta } from "~/types";
import MainPageHeader from "~/components/MainPageHeader";
import BlogCard from "~/components/BlogCard";

export async function loader({
  request,
}: Route.LoaderArgs): Promise<{ posts: PostMeta[] }> {
  const url = new URL("/movies.json", request.url);
  const res = await fetch(url.href);
  if (!res.ok) throw new Error("Failed to fetch data");
  const data = await res.json();

  return { posts: data };
}
const BlogPage = ({ loaderData }: Route.ComponentProps) => {
  const { posts } = loaderData;
  console.log(posts);

  return (
    <div className="archive-container">
      <MainPageHeader />

      <main className="blog-masonry">
        {posts.length === 0 ? (
          <p>not found any posts</p>
        ) : (
          posts.map((post: PostMeta) => (
            <BlogCard blog={post} key={post.slug} />
          ))
        )}
      </main>
    </div>
  );
};

export default BlogPage;
