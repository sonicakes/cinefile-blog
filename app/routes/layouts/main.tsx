import { NavLink, Outlet } from "react-router";
import MainFooter from "~/components/layout/MainFooter";
import TopNav from "~/components/layout/TopNav";
import BackToTop from "~/components/ui/BackToTop";

const MainLayout = () => {
  return (
    <div className="max-w-275 my-5 mx-auto bg-white p-6 shadow-md">
      <header className="border-b-5 border-dark">
        <TopNav />
      </header>
      <main>
        <Outlet />
      </main>
      <MainFooter />
      <BackToTop />
    </div>
  );
};

export default MainLayout;
