import type { Route } from "./+types";
import type { PostMeta } from "~/types";
import BlogCard from "~/components/BlogCard";
import { useState } from "react";
import SearchInput from "~/components/SearchInput";
import CategoryFilter from "~/components/CategoryFilter";

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
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = posts.filter((post) => {
    const query = searchQuery.toLowerCase();
    return (
      post.title.toLowerCase().includes(query) ||
      post.excerpt.toLowerCase().includes(query)
    );
  });
  return (
    <>
      <section className="py-5 border-b border-gray-300 p-4">
        <div className="flex justify-between items-center font-brawler uppercase tracking-wider text-xs">
          <SearchInput
            searchQuery={searchQuery}
            onSearchChange={(query) => {
              setSearchQuery(query);
            }}
              onClearChange={() => {
              setSearchQuery('');
            }}
          />
          <CategoryFilter />
          <select className="bg-neutral-200 py-2 w-1/5">
            <option>Sort By</option>
            <option>Sort By</option>
            <option>Sort By</option>
          </select>
        </div>
      </section>

      <section
        className=" 
    grid md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 grid-flow-dense"
      >
        {posts.length === 0 ? (
          <p>not found any posts</p>
        ) : (
          filteredPosts.map((post: PostMeta, index: number) => (
            <BlogCard
              blog={post}
              key={post.slug}
              classExtra={index % 3 === 0 ? "md:col-span-2" : "md:col-span-1"}
            />
          ))
        )}
      </section>
    </>
  );
};

export default BlogPage;
