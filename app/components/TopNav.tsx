import { NavLink } from "react-router";

const TopNav = () => {
  const baseClasses =
    "px-4 py-2 hover:bg-crimson hover:text-white font-brawler transition-colors duration-200 block font-semibold text-center tracking-wider";
  const activeClasses =
    "bg-neutral-600 text-white px-4 py-2 block font-brawler text-center font-bold tracking-wider";

  const menuTitles = [
    { path: "/", label: "Front Page" },
    { path: "/about", label: "The Masthead" },
    { path: "/blog", label: "Film Reviews" },
    { path: "/contact", label: "Letter to the Editor" },
  ];

  return (
    <nav className="w-full bg-white text-dark border-t-4 border-b border-dark py-1">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr_1fr] items-center py-2 md:py-6 border-b-4 border-double border-dark">
        <NavLink className="flex justify-center border-r border-dark h-full group" to="/">
          <img
            src="/images/clapperboard.png"
            className=" h-12 md:h-20 w-auto self-center object-cover grayscale group-hover:grayscale-0 transition duration-700"
          />
        </NavLink>
        <h1 className="text-center py-4 font-gothic tracking-tight border-b border-dark text-4xl md:text-7xl">
          The Cinefile Blog
        </h1>
        <div className="border-l text-neutral-600 text-[10px] md:text-xs px-4 uppercase leading-tight flex items-center font-brawler pt-2 pb-5 border-dark">
          "even the blog name is misspelled..."
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-y border-dark uppercase tracking-tight text-sm">
        {menuTitles.map((menuLink) => (
          <NavLink
            key={menuLink.label}
            className={({ isActive }) =>
              `${isActive ? activeClasses : baseClasses} border-r last:border-r-0 border-dark`
            }
            to={menuLink.path}
          >
            {menuLink.label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default TopNav;
