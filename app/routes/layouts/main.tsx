import { NavLink, Outlet } from "react-router";
import MainFooter from "~/components/MainFooter";
import TopNav from "~/components/TopNav";

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
