import { NavLink } from "react-router";

const TopNav = () => {
  const baseClasses = "px-3.5 hover:text-crimson hover:underline transition";
  const activeClasses = "text-crimson px-3.5";
  const menuTitles = [
    {
      path: "/",
      label: 'Home - "the front page"',
    },

    {
      path: "/about",
      label: "About Cinefile Blog",
    },

    {
      path: "/blog",
      label: "See all film reviews",
    },

    {
      path: "/contact",
      label: "Contact Chief Editor (moi)",
    },
  ];

  return (
    <div className="text-center hidden lg:grid capitalize grid-cols-1 md:grid-cols-2 lg:grid-cols-4 font-brawler font-bold text-base py-4 border-b-2 border-dark divide-x divide-[#ccc]">
      {menuTitles.map((menuLink) => (
        <NavLink
          key={menuLink.label}
          className={({ isActive }) => (isActive ? activeClasses : baseClasses)}
          to={menuLink.path}
        >
          {menuLink.label}
        </NavLink>
      ))}
    </div>
  );
};

export default TopNav;
