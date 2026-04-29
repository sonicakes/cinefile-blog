import { useEffect, useState } from "react";
import { useLoaderData, NavLink, useNavigate } from "react-router";
import type { Route } from "./+types/detail";
import type { RawMovie } from "~/types";

type StrapiResponse<T> = { data: T[] };
import MovieDetailMain from "~/components/movie/MovieDetailMain";
import MovieFooter from "~/components/movie/MovieFooter";
import AsideMeta from "~/components/movie/AsideMeta";
import MovieDetailSkeleton from "~/components/movie/MovieDetailSkeleton";
import { calculateReadingTime } from "~/helpers";

// 1. Loader only returns identifiers
export async function loader({ params }: Route.LoaderArgs) {
  return {
    id: params.id,
    apiUrl: import.meta.env.VITE_API_URL,
  };
}

// 2. Helper to clean up the detail data defensively
const mapDetailData = (item: any) => {
  if (!item) return null;
  return {
    ...item,
    // Defensive check for images: tries medium format, then main url, then empty string
    img: item.img?.formats?.medium?.url || item.img?.url || "",
    next_movie: {
      movie: item.next_movie?.movie || null,
    },
    spotify_episodes: item.spotify_episodes || [],
    further_reading: item.further_reading || [],
    sims_scenario: item.sims_scenario || [],
    genres: item.genres?.map((g: any) => ({ id: g.id, name: g.name })) || [],
    availability: item.availability || [],
  };
};

const BlogPostDetailsPage = ({ loaderData }: Route.ComponentProps) => {
  const { id, apiUrl } = useLoaderData<typeof loader>();
  const navigate = useNavigate();
  const [data, setData] = useState<{ post: any; stats: any } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const populateParams =
    "populate=next_movie.movie&populate=next_movie.movie.img&populate=next_movie.movie.genres&populate=availability&populate=genres&populate=img&populate=spotify_episodes&populate=further_reading&populate=sims_scenario";

  useEffect(() => {
    let isMounted = true;

    async function getDetail() {
      try {
        const res = await fetch(
          `${apiUrl}/movies?filters[slug][$eq]=${id}&${populateParams}`,
        );

        if (!res.ok) throw new Error("Failed to fetch");

        const json: StrapiResponse<RawMovie> = await res.json();

        if (!json.data || !json.data.length) {
          // Param may be a legacy documentId — try fallback and redirect to slug URL
          const fallback = await fetch(
            `${apiUrl}/movies?filters[documentId][$eq]=${id}&${populateParams}`,
          );
          if (!fallback.ok) throw new Error("Failed to fetch");
          const fallbackJson: StrapiResponse<RawMovie> = await fallback.json();
          if (!fallbackJson.data || !fallbackJson.data.length) {
            if (isMounted) setError("404");
            return;
          }
          if (isMounted) navigate(`/blog/${fallbackJson.data[0].slug}`, { replace: true });
          return;
        }

        const cleanedPost = mapDetailData(json.data[0]);
        const stats = calculateReadingTime(cleanedPost.body_blog || "");

        if (isMounted) {
          setData({ post: cleanedPost, stats });
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
      <div className="py-20 text-center font-brawler">Review not found.</div>
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

  if (!data) return <MovieDetailSkeleton />;

  const { post, stats } = data;

  return (
    <>
      <div className="border-b-5 border-dark text-center font-brawler uppercase text-xs tracking-widest py-2.5 bt-dark border-t">
        <NavLink
          className="hover:underline hover:text-crimson transition"
          to="/blog"
        >
          Film Reviews
        </NavLink>
        / <b>{post.title}</b>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-10 py-4">
        <MovieDetailMain
          postMeta={post}
          markdown={post.body_blog}
          stats={stats}
        />
        <AsideMeta postMeta={post} />
      </div>

      <MovieFooter
        spotifyEpisodes={post.spotify_episodes}
        furtherReading={post.further_reading}
        simsScenarios={post.sims_scenario}
        nextMovie={post.next_movie}
      />
    </>
  );
};

export default BlogPostDetailsPage;
