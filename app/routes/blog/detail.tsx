import type { Route } from "./+types/detail";
import type { StrapiPost, StrapiResponse } from "~/types";
import BlogDetailMain from "~/components/BlogDetailMain";
import { NavLink } from "react-router";
import MovieFooter from "~/components/MovieFooter";
import readingTime from "reading-time";
import AsideMeta from "~/components/AsideMeta";

export async function loader({ params }: Route.LoaderArgs) {
  const { id } = params;

  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/movies?filters[documentId][$eq]=${id}&populate=next_movie.movie&populate=availability&populate=genres&populate=img&populate=spotify_episodes`,
  );

  if (!res.ok) throw new Error("Failed to fetch blog deets data");

  const json: StrapiResponse<StrapiPost> = await res.json();

  if (!json.data.length) throw new Response("not found", { status: 404 });
  const item = json.data[0];

  console.log(item);

  const post = {
    id: item.id,
    documentId: item.documentId,
    title: item.title,
    rating: item.rating,
    year: item.year,
    date_reviewed: item.date_reviewed,
    meta_title: item.meta_title,
    body_blog: item.body_blog,
    excerpt: item.excerpt,
    director: item.director,
    would_recommend: item.would_recommend,
    would_rewatch: item.would_rewatch,
    review_provided: item.review_provided,
    letterboxd_uri: item.letterboxd_uri,
    image_description: item.image_description,
    img: item.img?.url && `${import.meta.env.VITE_STRAPI_URL}${item.img.formats?.medium?.url}`,
    rating_metric: item.rating_metric,
    quote: item.quote,
    run_time: item.run_time,
    next_movie: {
      reason: item.next_movie?.reason,
      movie: item.next_movie?.movie,
    },
     spotify_episodes:
      item.spotify_episodes?.map((ep) => ({
        title: ep.title,
        url: ep.url,
        podcastName: ep.podcastName
      })) || [],
    genres:
      item.genres?.map((genre) => ({
        id: genre.id,
        name: genre.name,
      })) || [],
    availability:
      item.availability?.map((vl) => ({
        source: vl.source,
        location: vl.location,
      })) || [],
  };

  const stats = readingTime(post.body_blog || "");
  return {
    post,
    stats,
  };
}

const BlogPostDetailsPage = ({ loaderData }: Route.ComponentProps) => {
  const { post, stats } = loaderData;

  console.log("post", post);
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
      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-10 py-4">
        <BlogDetailMain
          postMeta={post}
          markdown={post.body_blog}
          stats={stats}
        />
        <AsideMeta postMeta={post} />
      </div>
      <MovieFooter
        spotifyEpisodes={post.spotify_episodes}
        nextMovie={post.next_movie}
      />
    </>
  );
};

export default BlogPostDetailsPage;
