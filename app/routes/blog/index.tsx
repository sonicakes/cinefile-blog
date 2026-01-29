import type { Route } from "./+types";
import type { PostMeta, SortOption } from "~/types";
import BlogCard from "~/components/BlogCard";
import { useState } from "react";
import SearchInput from "~/components/SearchInput";
import CategoryFilter from "~/components/CategoryFilter";
import SortSelector from "~/components/SortSelector";
import ToggleWatched from "~/components/ToggleWatched";

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
  const [sortOrder, setSortOrder] = useState<SortOption>("newest");
  const [showWatched, setShowWatched] = useState(true);

  const filteredPosts = posts.filter((post) => {
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      post.title.toLowerCase().includes(query) ||
      post.excerpt.toLowerCase().includes(query);

    const matchesWatchedStatus = post.watched === showWatched;

    return matchesSearch && matchesWatchedStatus;
  });

  // Sort Logic
  const sortedPosts = [...filteredPosts].sort((a, b) => {
    // Convert strings to timestamps, defaulting to 0 if the date is missing
    const dateA = a.date_reviewed ? new Date(a.date_reviewed).getTime() : 0;
    const dateB = b.date_reviewed ? new Date(b.date_reviewed).getTime() : 0;

    if (sortOrder === "newest") {
      return dateB - dateA;
    }
    if (sortOrder === "oldest") {
      return dateA - dateB;
    }
    if (sortOrder === "alphabetical") {
      // localeCompare handles strings safely
      return (a.title || "").localeCompare(b.title || "");
    }
    return 0;
  });

  return (
    <>
      <section className="py-4 md:px-4 md:pb-2 border-b border-neutral-300 flex flex-col gap-2">
        <div className=" border-b border-neutral-300 pb-4 grid grid-cols-[2fr_1fr_1fr] gap-5 justify-between items-center font-brawler uppercase tracking-wider text-xs">
          <SearchInput
            searchQuery={searchQuery}
            onSearchChange={(query) => {
              setSearchQuery(query);
            }}
            onClearChange={() => {
              setSearchQuery("");
            }}
          />

       
             <SortSelector
            currentSort={sortOrder}
            onSortChange={(order) => setSortOrder(order)}
          />

                              <ToggleWatched showWatched={showWatched} onToggle={setShowWatched} />

        </div>
        <div className="flex gap-0.5 justify-between items-center font-brawler uppercase tracking-wider text-xs">
          <CategoryFilter />
        </div>
      </section>

      <section
        className=" 
    grid md:grid-cols-2 lg:grid-cols-3 gap-4 py-6 md:p-4 grid-flow-dense"
      >
        {posts.length === 0 ? (
          <p>not found any posts</p>
        ) : (
          sortedPosts.map((post: PostMeta, index: number) => (
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
