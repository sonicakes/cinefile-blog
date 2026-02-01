import Header from "~/components/Header";
import type { Route } from "../+types/home";
import HeadlineBlock from "~/components/HeadlineBlock";
import FeaturedReviews from "~/components/FeaturedReviews";

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

        <main className="main-grid">
          <HeadlineBlock />
          <aside className="opinion-sidebar">
            <div className="sidebar-item">
              <img src="./images/art.jpg" className="h-50" />
              <h4 className="hover:text-red-400">
                I am a descendant of Russian Royal family
              </h4>
              <small>FILM LADY</small>
            </div>
            <div className="sidebar-item">
              <img src="./images/lobby.jpg" className="h-50" />

              <h4>
                Is this decade right for me? Tips for time travel on a budget.
              </h4>
              <small>SAME LADY</small>
            </div>
          </aside>

          <section className="hero-image-container">
            <img src="./images/front.jpg" alt="News Image" />
            <p className="custom-caption">
              Frightening Femme Fatale: No one asked, but I will
              answer. Source: said femme at Hydro Majestic Hotel in 2025.
            </p>
          </section>
        </main>
        <FeaturedReviews />
    </>
  );
}
