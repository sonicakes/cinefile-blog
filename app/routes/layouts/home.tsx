import { Outlet } from "react-router";
import MainFooter from "~/components/layout/MainFooter";
import BackToTop from "~/components/ui/BackToTop";

const HomeLayout = () => {
  return (
    <div className="max-w-275 my-5 mx-auto bg-white p-6 shadow-md">
      <Outlet />
      <MainFooter />
      <BackToTop />
    </div>
  );
};

export default HomeLayout;
