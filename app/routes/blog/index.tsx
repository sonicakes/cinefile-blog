import { useEffect, useState } from "react";
import { useLoaderData } from "react-router";
import { mapStrapiToPosts } from "~/helpers";
import BlogListContent from "~/components/BlogListContent";
import BlogPageSkeleton from "~/components/BlogPageSkeleton";

export async function loader() {
  return {
    apiUrl: import.meta.env.VITE_API_URL,
  };
}

const BlogPage = () => {
  const { apiUrl } = useLoaderData<typeof loader>();
  const [data, setData] = useState<{
    posts: any[];
    categories: string[];
  } | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const [moviesRes, genresRes] = await Promise.all([
          fetch(`${apiUrl}/movies?populate=*`),
          fetch(`${apiUrl}/genres`),
        ]);

        if (!moviesRes.ok || !genresRes.ok) throw new Error("API Offline");

        const [moviesJson, genresJson] = await Promise.all([
          moviesRes.json(),
          genresRes.json(),
        ]);

        setData({
          posts: mapStrapiToPosts(moviesJson),
          categories: genresJson.data.map((g: any) => g.name),
        });
      } catch (err) {
        console.error(err);
        setError(true);
      }
    }

    fetchData();
  }, [apiUrl]);

  if (error) {
    return (
      <div className="py-20 text-center">
        <p className="text-red-500 font-bold">
          The server is taking too long to respond.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="underline mt-2"
        >
          Try Refreshing
        </button>
      </div>
    );
  }

  if (!data) {
    return (
        <BlogPageSkeleton />
    );
  }

  return <BlogListContent posts={data.posts} categories={data.categories} />;
};

export default BlogPage;
