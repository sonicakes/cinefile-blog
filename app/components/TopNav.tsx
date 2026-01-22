import { NavLink } from "react-router";

const TopNav = () => {
  return (
    <div className="top-nav">
      <NavLink to="/about"  className={({ isActive }) => (isActive ? 'text-crimson' : '')}>What is Cinefile Blog?</NavLink>
      <NavLink to="/blog" className={({ isActive }) => (isActive ? 'text-crimson' : '')}>Read All Movie Reviews</NavLink>
      <NavLink to="/contact" className={({ isActive }) => (isActive ? 'text-crimson' : '')}>Contact Chief Editor (aka moi)</NavLink>
    </div>
  );
};

export default TopNav;
