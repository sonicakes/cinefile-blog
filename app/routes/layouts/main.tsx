import { NavLink, Outlet } from "react-router";
import TopNav from "~/components/TopNav";
const MainLayout = () => {
  return (
    <div className="newspaper-page">
      <header className="border-b-5 border-dark">
        <TopNav />
        <NavLink
          to="/"
          className="text-center tracking-tight block text-5xl lg:text-6xl font-gothic py-6"
        >
          The Cinefile Blog
        </NavLink>
      </header>
      <main>
      <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
