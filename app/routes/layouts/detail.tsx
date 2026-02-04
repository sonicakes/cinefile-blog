import { NavLink, Outlet } from "react-router";
import MainFooter from "~/components/MainFooter";

const DetailLayout = () => {
  return (
    <div className="newspaper-page">
      <Outlet />
      <MainFooter />
    </div>
  );
};

export default DetailLayout;
