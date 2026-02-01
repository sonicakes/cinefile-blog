import { NavLink, Outlet } from "react-router";
import MainFooter from "~/components/MainFooter";

const DetailLayout = () => {
  return (
    <div className="newspaper-page">
      <header>
        <NavLink to="/" className="text-center tracking-tight block text-5xl lg:text-6xl font-gothic py-6">The Cinefile Blog</NavLink>
    </header>
      <Outlet />
      <MainFooter />
    </div>
  );
};

export default DetailLayout;
