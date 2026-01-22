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
      <main className=" 
    grid md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 grid-flow-dense">
        {posts.length === 0 ? (
          <p>not found any posts</p>
        ) : (
          posts.map((post: PostMeta, index: number) => 
            (
            
            <BlogCard blog={post} key={post.slug} classExtra={index % 3 === 0 ? 'md:col-span-2' : 'md:col-span-1'}/>
          ))
        )}
      </main>
    </div>
  );
};

export default BlogPage;
