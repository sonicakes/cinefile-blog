import { Link } from "react-router";

const SidebarItem = ({
  imgPath,
  caption,
  text,
  url,
}: {
  imgPath: string;
  caption: string;
  text: string;
  url: string;
}) => {
  return (
    <Link to={url}>
      <div className="sidebar-item mb-5 border-b border-neutral-300 pb-4 group cursor-pointer">
        <img
          src={imgPath}
          className="h-50 grayscale object-cover group-hover:grayscale-0 transition duration-700"
        />
        <h4 className="group-hover:text-crimson transition duration-700 pt-1 font-semibold text-lg leading-tight font-brawler tracking-tight">
          {text}
        </h4>
        <small className="text-neutral-500 text-xs">{caption}</small>
      </div>
    </Link>
  );
};

export default SidebarItem;
