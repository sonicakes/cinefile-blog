import { NavLink, Outlet } from "react-router";
import MainFooter from "~/components/layout/MainFooter";

const DetailLayout = () => {
  return (
    <div className="max-w-275 my-5 mx-auto bg-white p-6 shadow-md">
      <Outlet />
      <MainFooter />
    </div>
  );
};

export default DetailLayout;
