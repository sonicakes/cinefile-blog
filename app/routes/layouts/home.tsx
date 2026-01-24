import { Outlet } from "react-router";
const HomeLayout = () => {
  return (


        <div className="newspaper-page">
        <Outlet />
        </div>
    
  );
};

export default HomeLayout;
