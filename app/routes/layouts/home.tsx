import { Outlet } from "react-router";
import MainFooter from "~/components/MainFooter";

const HomeLayout = () => {
  return (
    <div className="newspaper-page">
      <Outlet />
      <MainFooter />
    </div>
  );
};

export default HomeLayout;
