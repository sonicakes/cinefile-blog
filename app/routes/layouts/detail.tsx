import { NavLink, Outlet } from "react-router";
import MainFooter from "~/components/layout/MainFooter";

const DetailLayout = () => {
  return (
    <div className="newspaper-page">
      <Outlet />
      <MainFooter />
    </div>
  );
};

export default DetailLayout;
