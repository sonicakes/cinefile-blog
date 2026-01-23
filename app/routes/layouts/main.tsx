import { Outlet } from "react-router";
import TopNav from "~/components/TopNav";
const MainLayout = () => {
  return (
    <>
      {/* <section className="max-w-6xl mx-auto px-6 my-8"> */}
              <div className="newspaper-page">

            <header className="mainpage">
      <TopNav />
      <a href="#" className="masthead">
        The Cinefile Blog
      </a>

    </header>
        <Outlet />
        </div>
      {/* </section> */}
    </>
  );
};

export default MainLayout;
