import { useEffect, useState } from "react";
import { useLoaderData, NavLink, useNavigate } from "react-router";
import type { Route } from "./+types/detail";
import type { RawPost, Post } from "~/types";
import PostDetailMain from "~/components/post/PostDetailMain";
import PostDetailSkeleton from "~/components/post/PostDetailSkeleton";
import { calculateReadingTime } from "~/helpers";

type StrapiResponse<T> = { data: T[] };

export async function loader({ params }: Route.LoaderArgs) {
  return {
    id: params.id,
    apiUrl: import.meta.env.VITE_API_URL,
    strapiUrl: import.meta.env.VITE_STRAPI_URL,
  };
}

const mapDetailData = (item: RawPost): Post => ({
  id: item.id,
  documentId: item.documentId,
  slug: item.slug,
  title: item.title,
  date: item.date,
  meta_title: item.meta_title,
  excerpt: item.excerpt,
  body_blog: item.body_blog,
  image_description: item.image_description,
  img: item.img?.formats?.medium?.url || item.img?.url || "",
  further_reading: item.further_reading || [],
  spotify_episodes: item.spotify_episodes || [],
});

const PostDetailPage = ({}: Route.ComponentProps) => {
  const { id, apiUrl } = useLoaderData<typeof loader>();
  const navigate = useNavigate();
  const [data, setData] = useState<{ post: Post; stats: ReturnType<typeof calculateReadingTime> } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const populateParams = "populate=img&populate=further_reading&populate=spotify_episodes";

  useEffect(() => {
    let isMounted = true;

    async function getDetail() {
      try {
        const res = await fetch(
          `${apiUrl}/posts?filters[slug][$eq]=${id}&${populateParams}`,
        );

        if (!res.ok) throw new Error("Failed to fetch");

        const json: StrapiResponse<RawPost> = await res.json();

        if (!json.data || !json.data.length) {
          // Param may be a legacy documentId — try fallback and redirect to slug URL
          const fallback = await fetch(
            `${apiUrl}/posts?filters[documentId][$eq]=${id}&${populateParams}`,
          );
          if (!fallback.ok) throw new Error("Failed to fetch");
          const fallbackJson: StrapiResponse<RawPost> = await fallback.json();
          if (!fallbackJson.data || !fallbackJson.data.length) {
            if (isMounted) setError("404");
            return;
          }
          if (isMounted) navigate(`/posts/${fallbackJson.data[0].slug}`, { replace: true });
          return;
        }

        const post = mapDetailData(json.data[0]);
        const stats = calculateReadingTime(post.body_blog || "");

        if (isMounted) {
          setData({ post, stats });
          setError(null);
        }
      } catch (err) {
        console.error("Fetch Error:", err);
        if (isMounted) setError("timeout");
      }
    }

    setData(null);
    setError(null);
    getDetail();

    return () => {
      isMounted = false;
    };
  }, [id, apiUrl]);

  if (error === "404") {
    return (
      <div className="py-20 text-center font-brawler">Post not found.</div>
    );
  }

  if (error) {
    return (
      <div className="py-20 text-center font-brawler flex flex-col items-center gap-4">
        <p>Server is sleeping or connection failed. Please refresh.</p>
        <button
          onClick={() => window.location.reload()}
          className="text-xs uppercase underline tracking-widest hover:text-crimson transition"
        >
          Reload Page
        </button>
      </div>
    );
  }

  if (!data) return <PostDetailSkeleton />;

  return (
    <>
      <div className="border-b-5 border-dark text-center font-brawler uppercase text-xs tracking-widest py-2.5 bt-dark border-t">
        <NavLink className="hover:underline hover:text-crimson transition" to="/">
          Front Page
        </NavLink>
        / <b>{data.post.title}</b>
      </div>
      <PostDetailMain post={data.post} stats={data.stats} />
    </>
  );
};

export default PostDetailPage;
