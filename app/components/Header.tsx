import TopNav from "./TopNav";
const Header = () => {
  return (
    <header>
      <TopNav />
      <h1 className="text-center py-8 font-gothic tracking-tight border-b border-dark text-6xl md:text-8xl">The Cinefile Blog</h1>
    </header>
  );
};

export default Header;
