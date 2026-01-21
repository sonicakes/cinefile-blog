import TopNav from "./TopNav";

const MainPageHeader = () => {
  return (
    <header className="mainpage">
      <TopNav />
      <a href="#" className="masthead">
        The Cinefile Blog
      </a>
      <div className="breadcrumb">
        Film Reviews / Long Read / Edition: Jan 2024
      </div>
    </header>
  );
};

export default MainPageHeader;
