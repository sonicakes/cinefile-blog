import { useEffect, useState } from "react";
import { useLoaderData } from "react-router";
import Header from "~/components/layout/Header";
import type { Route } from "./+types/index";
import HeadlineBlock from "~/components/home/HeadlineBlock";
import SidebarItem from "~/components/home/SidebarItem";
import type { RawPost } from "~/types";
import Reveal from "~/components/ui/Reveal";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "cinefile-welcome" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export async function loader() {
  return {
    apiUrl: import.meta.env.VITE_API_URL,
    strapiUrl: import.meta.env.VITE_STRAPI_URL,
  };
}

type HomepageData = {
  headline: string;
  byline: string;
  body_paragraph_1: string;
  body_paragraph_2: string;
  front_page_image: { url: string } | null;
  front_page_caption: string;
  sidebar_movies: RawPost[];
};

export default function Home() {
  const { apiUrl } = useLoaderData<typeof loader>();
  const [homepage, setHomepage] = useState<HomepageData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchHomepage() {
      try {
        const res = await fetch(
          `${apiUrl}/homepage?populate[sidebar_movies][populate]=img&populate[front_page_image]=true`
        );
        if (!res.ok) return;
        const json = await res.json();
        setHomepage(json.data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchHomepage();
  }, [apiUrl]);

  return (
    <>
      <Header />
      <main className="main-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[3fr_1.5fr_3.5fr] gap-6 mt-5">
        {isLoading ? (
          <section className="headline-block">
            <div className="h-20 bg-neutral-200 animate-pulse mb-4 w-3/4" />
            <div className="h-4 bg-neutral-200 animate-pulse mb-6 w-1/2" />
            <div className="space-y-2">
              <div className="h-3 bg-neutral-200 animate-pulse w-full" />
              <div className="h-3 bg-neutral-200 animate-pulse w-full" />
              <div className="h-3 bg-neutral-200 animate-pulse w-5/6" />
            </div>
          </section>
        ) : (
          <HeadlineBlock
            headline={homepage?.headline}
            byline={homepage?.byline}
            body_paragraph_1={homepage?.body_paragraph_1}
            body_paragraph_2={homepage?.body_paragraph_2}
          />
        )}
        <aside className="opinion-sidebar">
          {isLoading ? (
            <>
              <div className="h-50 w-full bg-neutral-200 animate-pulse mb-5" />
              <div className="h-50 w-full bg-neutral-200 animate-pulse mb-5" />
            </>
          ) : (
            homepage?.sidebar_movies?.map((post) => (
              <SidebarItem
                key={post.documentId}
                text={post.meta_title || post.title}
                imgPath={post.img?.url ?? "./images/gallery.jpg"}
                caption={post.director}
                url={`/blog/${post.documentId}`}
              />
            ))
          )}
        </aside>
        <section>
          {isLoading ? (
            <div className="w-full aspect-video bg-neutral-200 animate-pulse" />
          ) : (
            <Reveal>
              <img
                src={homepage?.front_page_image?.url ?? "./images/front-page.jpg"}
                alt="News Image"
                className="w-full"
              />
            </Reveal>
          )}
          {homepage?.front_page_caption && (
            <p className="custom-caption">{homepage.front_page_caption}</p>
          )}
        </section>
      </main>
    </>
  );
}
