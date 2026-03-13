import { Outlet } from "react-router";
import MainFooter from "~/components/layout/MainFooter";
import BackToTop from "~/components/ui/BackToTop";

const HomeLayout = () => {
  return (
    <div className="newspaper-page">
      <Outlet />
      <MainFooter />
      <BackToTop />
    </div>
  );
};

export default HomeLayout;
