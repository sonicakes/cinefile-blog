import Header from "~/components/Header";
import type { Route } from "../+types/home";
import HeadlineBlock from "~/components/HeadlineBlock";
import FeaturedReviews from "~/components/FeaturedReviews";
import SidebarItem from "~/components/SidebarItem";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "cinefile-welcome" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return (
    <>
      <Header />
      <main className="main-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-[3fr_1.5fr_3.5fr] gap-6 mt-5">
        <HeadlineBlock />
        <aside className="opinion-sidebar">
          <SidebarItem
            text="Royal Blood is Flowing Through Me"
            imgPath="./images/royalty.jpg"
            caption="FILM LADY"
            url="/about"
          />
          <SidebarItem
            text="Tips to Time-Travel on a Modest Budget"
            imgPath="./images/gallery.jpg"
            caption="SAME LADY"
            url="/blog"
          />
        </aside>
        <section>
          <img
            src="./images/front-page.jpg"
            alt="News Image"
            className="grayscale hover:grayscale-0 transition duration-700"
          />
          <p className="custom-caption">
            Frightening Femme Fatale: No one asked, but I will answer. Source:
            said femme at Hydro Majestic Hotel in 2025.
          </p>
        </section>
      </main>
      <FeaturedReviews />
    </>
  );
}
