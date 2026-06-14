import { useEffect, useState } from "react";
import { useLoaderData } from "react-router";
import type { Route } from "./+types/index";
import type { RawPost } from "~/types";
import PostListItem from "~/components/post/PostListItem";

export async function loader() {
  return {
    apiUrl: import.meta.env.VITE_API_URL,
  };
}

const PostListSkeleton = () => (
  <div className="divide-y divide-[#ddd]">
    {Array.from({ length: 5 }).map((_, i) => (
      <div key={i} className="flex gap-5 py-5">
        <div className="w-32 h-24 bg-neutral-200 animate-pulse flex-shrink-0" />
        <div className="flex flex-col justify-center gap-2 flex-1">
          <div className="h-3 bg-neutral-200 animate-pulse w-24" />
          <div className="h-5 bg-neutral-200 animate-pulse w-3/4" />
          <div className="h-3 bg-neutral-200 animate-pulse w-full" />
          <div className="h-3 bg-neutral-200 animate-pulse w-5/6" />
        </div>
      </div>
    ))}
  </div>
);

const PostsPage = ({}: Route.ComponentProps) => {
  const { apiUrl } = useLoaderData<typeof loader>();
  const [posts, setPosts] = useState<RawPost[] | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch(
          `${apiUrl}/posts?populate=img&sort=date:desc`
        );
        if (!res.ok) throw new Error("API error");
        const json = await res.json();
        setPosts(json.data);
      } catch (err) {
        console.error(err);
        setError(true);
      }
    }
    fetchPosts();
  }, [apiUrl]);

  return (
    <>
      <div className="border-b-5 border-dark pt-4 pb-2">
        <h1 className="font-brawler text-4xl font-bold tracking-tight">Posts</h1>
      </div>

      {error ? (
        <div className="py-20 text-center font-brawler flex flex-col items-center gap-4">
          <p>Server is sleeping or connection failed. Please refresh.</p>
          <button
            onClick={() => window.location.reload()}
            className="text-xs uppercase underline tracking-widest hover:text-crimson transition"
          >
            Reload Page
          </button>
        </div>
      ) : posts === null ? (
        <PostListSkeleton />
      ) : posts.length === 0 ? (
        <p className="py-20 text-center font-brawler text-neutral-400">No posts yet.</p>
      ) : (
        <div>
          {posts.map((post) => (
            <PostListItem key={post.documentId} post={post} />
          ))}
        </div>
      )}
    </>
  );
};

export default PostsPage;
