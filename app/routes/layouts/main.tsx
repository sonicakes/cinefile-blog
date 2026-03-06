import { NavLink, Outlet } from "react-router";
import MainFooter from "~/components/layout/MainFooter";
import TopNav from "~/components/layout/TopNav";

const MainLayout = () => {
  return (
    <div className="newspaper-page">
      <header className="border-b-5 border-dark">
        <TopNav />
      </header>
      <main>
        <Outlet />
      </main>
      <MainFooter />
    </div>
  );
};

export default MainLayout;
