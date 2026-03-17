import { useState } from "react";
import type { Post, SortOption } from "~/types";
import MovieCard from "~/components/movie/MovieCard";
import SearchInput from "~/components/ui/SearchInput";
import CategoryFilter from "~/components/ui/CategoryFilter";
import SortSelector from "~/components/ui/SortSelector";
import Pagination from "~/components/ui/Pagination";

const MovieListContent = ({ posts, categories }: { posts: Post[], categories: string[] }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState<SortOption>("newest");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;

  const filteredPosts = posts.filter((post: Post) => {
    const query = searchQuery.toLowerCase();

    const matchesSearch =
      post.title.toLowerCase().includes(query) ||
      (post.excerpt && post.excerpt.toLowerCase().includes(query));
    const matchesCategory =
      selectedCategories.length === 0 ||
      post.genres?.some((genre) => selectedCategories.includes(genre.name));

    return matchesSearch && matchesCategory;
  });

  const sortedPosts = [...filteredPosts].sort((a, b) => {
    if (a.review_provided !== b.review_provided) {
      return a.review_provided ? -1 : 1;
    }

    const dateReviewedA = a.date_reviewed ? new Date(a.date_reviewed).getTime() : 0;
    const dateReviewedB = b.date_reviewed ? new Date(b.date_reviewed).getTime() : 0;
    const yearA = parseInt(a.year) || 0;
    const yearB = parseInt(b.year) || 0;

    if (sortOrder === "newest") return dateReviewedB - dateReviewedA;
    if (sortOrder === "oldest") return dateReviewedA - dateReviewedB;
    if (sortOrder === "rating-high") return b.rating - a.rating;
    if (sortOrder === "rating-low") return a.rating - b.rating;
    if (sortOrder === "year-newest") return yearB - yearA;
    if (sortOrder === "year-oldest") return yearA - yearB;
    if (sortOrder === "alphabetical") return (a.title || "").localeCompare(b.title || "");
    return 0;
  });

  const totalPages = Math.ceil(sortedPosts.length / postsPerPage);
  const indexOfLast = currentPage * postsPerPage;
  const indexOfFirst = indexOfLast - postsPerPage;
  const currentPosts = sortedPosts.slice(indexOfFirst, indexOfLast);

  return (
    <>
      <section className="py-4 md:px-4 md:pb-2 border-b border-neutral-300 flex flex-col gap-2">
        <div className="border-b border-neutral-300 pb-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr_1fr] gap-5 justify-between items-center font-brawler uppercase tracking-wider text-xs">
          <SearchInput
            searchQuery={searchQuery}
            onSearchChange={(query) => {
              setSearchQuery(query);
              setCurrentPage(1);
            }}
            onClearChange={() => {
              setSearchQuery("");
              setCurrentPage(1);
            }}
          />

          <SortSelector
            currentSort={sortOrder}
            onSortChange={(order) => {
              setSortOrder(order);
              setCurrentPage(1);
            }}
          />
        </div>
        <div className="flex flex-wrap lg:flex-nowrap gap-0.5 justify-between items-center font-brawler uppercase tracking-wider text-xs">
          <CategoryFilter
            categories={categories}
            selectedCategories={selectedCategories}
            onToggleCategory={(c) => {
              setSelectedCategories((prev) =>
                c === null
                  ? []
                  : prev.includes(c)
                  ? prev.filter((x) => x !== c)
                  : [...prev, c]
              );
              setCurrentPage(1);
            }}
          />

          <div className="w-full text-neutral-500 flex items-center gap-1 justify-center md:justify-end font-brawler lowercase tracking-wide">
            <span className="text-neutral-600">
              showing
              {searchQuery ? "results for " + '"' + searchQuery + ':"' : ""}
            </span>
            <span className="text-sm lg:text-base text-crimson font-bold">
              {filteredPosts.length}
            </span>

            <span className="text-sm lg:text-base font-semibold">
              / {posts.length}
            </span>
          </div>
        </div>
      </section>

      <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 py-6 md:p-4 grid-flow-dense">
        {currentPosts.length > 0 ? (
          currentPosts.map((post: Post, index: number) => (
            <MovieCard
              blog={post}
              key={post.documentId}
              classExtra={index % 3 === 0 ? "md:col-span-2" : "md:col-span-1"}
            />
          ))
        ) : (
          <div className="col-span-full py-20 text-center flex flex-col items-center gap-2">
            <p className="text-xl font-brawler font-semibold text-dark">
              {searchQuery
                ? `No results found for "${searchQuery}"`
                : "No movies found"}
            </p>

            {selectedCategories.length > 0 && (
              <p className="text-sm text-neutral-400">
                Try looking in a different category than
                <span className="italic text-neutral-600 font-semibold">
                  "{selectedCategories.join(", ")}"
                </span>
              </p>
            )}

            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategories([]);
              }}
              className="mt-4 cursor-pointer text-xs uppercase underline tracking-widest hover:text-crimson transition"
            >
              Clear all filters
            </button>
          </div>
        )}
      </section>

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page: number) => {
            setCurrentPage(page);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        />
      )}
    </>
  );

};


export default MovieListContent;
