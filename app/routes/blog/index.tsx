import type { Route } from "./+types";
import type { PostMeta, SortOption, StrapiPost, StrapiResponse } from "~/types";
import BlogCard from "~/components/BlogCard";
import { useState } from "react";
import SearchInput from "~/components/SearchInput";
import CategoryFilter from "~/components/CategoryFilter";
import SortSelector from "~/components/SortSelector";
import Pagination from "~/components/Pagination";

export async function loader({ request }: Route.LoaderArgs) {
  const apiUrl = import.meta.env.VITE_API_URL;

  const [moviesRes, genresRes] = await Promise.all([
    fetch(`${apiUrl}/movies?populate=*`),
    fetch(`${apiUrl}/genres`),
  ]);

  if (!moviesRes.ok || !genresRes.ok) {
    throw new Error("Failed to fetch data from API");
  }

  const [moviesJson, genresJson] = await Promise.all([
    moviesRes.json(),
    genresRes.json(),
  ]);

  console.log('movies json', moviesJson)

  const posts = moviesJson.data.map((item: StrapiPost) => ({
    id: item.id,
    documentId: item.documentId,
    title: item.title,
    rating: item.rating,
    year: item.year,
    date_reviewed: item.date_reviewed,
    date_watched: item.date_watched,
    meta_title: item.meta_title,
    body_blog: item.body_blog,
    excerpt: item.excerpt,
    director: item.director,
    would_recommend: item.would_recommend,
    would_rewatch: item.would_rewatch,
    review_provided: item.review_provided,
    letterboxd_uri: item.letterboxd_uri,
    image_description: item.image_description,
    img: item.img?.url && item.img.formats?.medium?.url,
    rating_metric: item.rating_metric,
    quote: item.quote,
    run_time: item.run_time,
    availability:
      item.availability?.map((vl) => ({
        source: vl.source,
        location: vl.location,
      })) || [],
    genres:
      item.genres?.map((genre) => ({
        id: genre.id,
        name: genre.name,
      })) || [],
  }));
  return {
    posts,
    categories: genresJson.data.map((g: any) => g.name),
  };
}
const BlogPage = ({ loaderData }: Route.ComponentProps) => {
  const { posts, categories } = loaderData;
  console.log('posts', posts)
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState<SortOption>("newest");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;

  const filteredPosts = posts.filter((post:StrapiPost) => {
    const query = searchQuery.toLowerCase();

    const matchesSearch =
      post.title.toLowerCase().includes(query) ||
      (post.excerpt && post.excerpt.toLowerCase().includes(query));
    const matchesCategory =
      !selectedCategory ||
      post.genres?.some((genre) => genre.name === selectedCategory);

    return matchesSearch && matchesCategory;
  });

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

  const totalPages = Math.ceil(sortedPosts.length / postsPerPage);
  const indexOfLast = currentPage * postsPerPage;
  const indexOfFirst = indexOfLast - postsPerPage;
  const currentPosts = sortedPosts.slice(indexOfFirst, indexOfLast);

  return (
    <>
      <section className="py-4 md:px-4 md:pb-2 border-b border-neutral-300 flex flex-col gap-2">
        <div className=" border-b border-neutral-300 pb-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr_1fr] gap-5 justify-between items-center font-brawler uppercase tracking-wider text-xs">
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
        <div className="flex flex-wrap md:flex-nowrap gap-0.5 justify-between items-center font-brawler uppercase tracking-wider text-xs">
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={(c) => {
              setSelectedCategory(c);
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
          currentPosts.map((post: PostMeta, index: number) => (
            <BlogCard
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

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page: number) => setCurrentPage(page)}
        />
      )}
    </>
  );
};

export default BlogPage;
