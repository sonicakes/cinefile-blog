import { Outlet } from "react-router";
import AboutPage from "~/pages/AboutPage";
const MainLayout = () => {
  return (
    <>
      <section className="max-w-6xl mx-auto px-6 my-8">
        <AboutPage />
      </section>
    </>
  );
};

export default MainLayout;
