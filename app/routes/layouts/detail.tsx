import { NavLink, Outlet } from "react-router";
import TopNav from "~/components/TopNav";
const DetailLayout = () => {
  return (
    <div className="newspaper-page">
      {/* <header className="border-b-5 border-dark">
        <TopNav />
        <NavLink to="/" className="">
          The Cinefile Blog
        </NavLink>
      </header> */}

      <header>
        <NavLink to="/" className="text-center tracking-tight block text-6xl font-gothic py-6">The Cinefile Blog</NavLink>
    </header>
      <Outlet />
    </div>
  );
};

export default DetailLayout;
