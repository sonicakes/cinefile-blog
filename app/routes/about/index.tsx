import { useLoaderData } from "react-router";
import AboutPage from "~/pages/AboutPage";
import type { Route } from "./+types/index";

export async function loader() {
  return {
    apiUrl: import.meta.env.VITE_API_URL,
    strapiUrl: import.meta.env.VITE_STRAPI_URL,
  };
}

const MainLayout = () => {
  const { apiUrl, strapiUrl } = useLoaderData<typeof loader>();
  return (
    <>
      <section className="max-w-6xl mx-auto px-6 my-8">
        <AboutPage apiUrl={apiUrl} strapiUrl={strapiUrl} />
      </section>
    </>
  );
};

export default MainLayout;
