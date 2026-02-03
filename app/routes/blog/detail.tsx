import type { Route } from "./+types";
import type { PostMeta, Stat } from "~/types";
import BlogDetailMain from "~/components/BlogDetailMain";
import { NavLink } from "react-router";
import MovieFooter from "~/components/MovieFooter";
import readingTime from "reading-time";
import AsideMeta from "~/components/AsideMeta";

export async function loader({ request, params }: Route.LoaderArgs) {
  const { slug } = params;
  const url = new URL("/movies.json", request.url);
  const res = await fetch(url.href);

  if (!res.ok) throw new Error("Failed to fetch data");

  const index = await res.json();
  const postMeta = index.find((post: PostMeta) => post.slug === slug);

  if (!postMeta) throw new Response("not found", { status: 404 });

  const modules = import.meta.glob("/posts/*.md", {
    query: "?raw",
    import: "default",
  });
  const path = `/posts/${slug}.md`;
  if (!(path in modules)) {
    throw new Response("Post not found", { status: 404 });
  }

  const markdown = await modules[path]();
  const stats = readingTime(markdown);
  return {
    postMeta,
    markdown: markdown,
    stats,
  };
}

type BlogPostDetailsPageProps = {
  loaderData: {
    postMeta: PostMeta;
    markdown: string;
    stats: Stat;
  };
};

const BlogPostDetailsPage = ({ loaderData }: BlogPostDetailsPageProps) => {
  const { postMeta, markdown, stats } = loaderData;

  return (
    <>
      <div className="border-b-5 border-dark text-center font-brawler uppercase text-xs tracking-widest py-2.5 bt-dark border-t">
        <NavLink
          className="hover:underline hover:text-crimson transition"
          to="/blog"
        >
          Film Reviews
        </NavLink>{" "}
        / <b>{postMeta.title}</b>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-10 py-4">
        <BlogDetailMain postMeta={postMeta} markdown={markdown} stats={stats} />
        <AsideMeta postMeta={postMeta} />
      </div>
      <MovieFooter
        spotifyEpisodes={postMeta.spotify_episodes}
        nextMovie={postMeta.next_movie}
      />
    </>
  );
};

export default BlogPostDetailsPage;
