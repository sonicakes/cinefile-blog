import { Outlet } from "react-router";
const HomeLayout = () => {
  return (
    <>

      {/* <section className="max-w-6xl mx-auto px-6 my-8"> */}
        <div className="newspaper-page">
        <Outlet />
        </div>
      {/* </section> */}
    </>
  );
};

export default HomeLayout;
