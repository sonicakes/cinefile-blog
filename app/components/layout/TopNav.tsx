import { useState } from "react";
import { NavLink } from "react-router";

const TopNav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const baseClasses =
    "px-4 py-2 hover:bg-crimson hover:text-white font-brawler transition-colors duration-200 block font-semibold text-center tracking-wider";
  const activeClasses =
    "bg-neutral-600 text-white px-4 py-2 block font-brawler text-center font-bold tracking-wider";

  const menuTitles = [
    { path: "/", label: "Front Page" },
    { path: "/about", label: "The Masthead" },
    { path: "/blog", label: "Film Reviews" },
    { path: "/contact", label: "Correspondence" },
  ];

  const now = new Date();
  const vol = now.getFullYear() - 2026 + 1;
  const startOfYear = new Date(now.getFullYear(), 0, 1);
  const week = Math.ceil(((now.getTime() - startOfYear.getTime()) / 86400000 + startOfYear.getDay() + 1) / 7);

  return (
    <nav className="w-full bg-white text-dark border-t-4 border-dark py-1">
      <div className="grid grid-cols-[auto_1fr_auto] md:grid-cols-[1fr_3fr_1fr] items-center py-2 md:py-6 border-b-4 border-double border-dark">
        <NavLink className="flex justify-center px-2 md:px-0 border-r border-dark h-full group" to="/">
          <img
            src="/logo.svg"
            alt="The Cinefile Blog — home"
            className="h-12 md:h-20 w-auto self-center object-cover grayscale group-hover:duotone-crimson transition duration-700"
          />
        </NavLink>
        <h1 className="text-center py-4 font-gothic tracking-tight md:border-b border-dark text-4xl md:text-7xl">
          The Cinefile Blog
        </h1>
        <div className="border-l border-dark flex items-center justify-center px-4 py-2 md:pt-2 md:pb-5">
          {/* Hamburger button — mobile only */}
          <button
            onClick={() => setIsMenuOpen((o) => !o)}
            aria-expanded={isMenuOpen}
            aria-label="Toggle navigation menu"
            className="md:hidden font-brawler text-xl px-2 py-1 border border-dark hover:bg-crimson hover:text-white transition-colors duration-200"
          >
            {isMenuOpen ? "✕" : "☰"}
          </button>
          {/* Vol/issue badge — desktop only */}
          <div className="hidden md:flex">
            <div className="border border-dark px-3 py-2 text-center font-brawler uppercase text-neutral-600 flex flex-col gap-0.5">
              <span className="text-sm md:text-base font-bold tracking-widest leading-none">Vol. {vol}</span>
              <span className="text-[10px] md:text-xs tracking-widest leading-none">No. {week}</span>
              <hr className="border-neutral-400 my-0.5" />
              <span className="text-[9px] md:text-[11px] italic tracking-wide leading-tight">
                {now.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "2-digit" })}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`grid transition-all duration-300 ease-in-out md:block md:opacity-100 ${
          isMenuOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="grid md:grid-cols-4 border-y border-dark uppercase tracking-tight text-sm">
            {menuTitles.map((menuLink) => (
              <NavLink
                key={menuLink.label}
                className={({ isActive }) =>
                  `${isActive ? activeClasses : baseClasses} border-r last:border-r-0 border-dark`
                }
                onClick={() => setIsMenuOpen(false)}
                to={menuLink.path}
              >
                {menuLink.label}
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default TopNav;
