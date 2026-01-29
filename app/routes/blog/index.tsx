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
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredPosts = posts.filter((post) => {
    const query = searchQuery.toLowerCase();

    // 1. Search Logic
    const matchesSearch =
      post.title.toLowerCase().includes(query) ||
      post.excerpt.toLowerCase().includes(query);

    // 2. Watched Status
    const matchesWatchedStatus = post.watched === showWatched;

    // 3. Category Logic (Array check)
    // If no category is selected, return true.
    // Otherwise, check if the selected string exists in the post.genres array.
    const matchesCategory =
      !selectedCategory || post.genres?.includes(selectedCategory);

    return matchesSearch && matchesWatchedStatus && matchesCategory;
  });

  // 3. Sort Logic (Applied to the filtered results)
  const sortedPosts = [...filteredPosts].sort((a, b) => {
    const dateA = a.date_reviewed ? new Date(a.date_reviewed).getTime() : 0;
    const dateB = b.date_reviewed ? new Date(b.date_reviewed).getTime() : 0;

    if (sortOrder === "newest") return dateB - dateA;
    if (sortOrder === "oldest") return dateA - dateB;
    if (sortOrder === "alphabetical") {
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
          <CategoryFilter
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
          <div className="w-full text-neutral-500 flex items-center gap-1 justify-end font-brawler lowercase tracking-wide">
            <span className="text-neutral-600">
              showing{" "}
              {searchQuery ? "results for " + '"' + searchQuery + ':"' : ""}
            </span>
            <span className="text-base text-crimson font-bold">
              
              {filteredPosts.length} </span>

              <span className="text-base font-semibold">
                / {posts.length}
              
              </span>
              
              <span>{selectedCategory ? selectedCategory : ""} movie{filteredPosts.length > 1 ? "s" : ""}
            </span>

            <span>{`${showWatched ? "Watched" : "To watch"} `}</span>
          </div>
        </div>
      </section>

      <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 py-6 md:p-4 grid-flow-dense">
        {sortedPosts.length > 0 ? (
          sortedPosts.map((post: PostMeta, index: number) => (
            <BlogCard
              blog={post}
              key={post.slug}
              classExtra={index % 3 === 0 ? "md:col-span-2" : "md:col-span-1"}
            />
          ))
        ) : (
          <div className="col-span-full py-20 text-center flex flex-col items-center gap-2">
            <p className="text-xl font-brawler font-semibold text-dark">
              {searchQuery
                ? `No results found for "${searchQuery}"`
                : "No blogs found"}
            </p>

            {selectedCategory && (
              <p className="text-sm text-neutral-400">
                Try looking in a different category than
                <span className="italic text-neutral-600 font-semibold">
                  "{selectedCategory}"
                </span>
              </p>
            )}

            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory(null);
              }}
              className="mt-4 cursor-pointer text-xs uppercase underline tracking-widest hover:text-crimson transition"
            >
              Clear all filters
            </button>

          </div>
        )}
      </section>
    </>
  );
};

export default BlogPage;
