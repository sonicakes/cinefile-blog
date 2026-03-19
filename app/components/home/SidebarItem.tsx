import { Link } from "react-router";
import Reveal from "~/components/ui/Reveal";

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
        <Reveal>
          <img src={imgPath} className="h-50 object-cover w-full" alt={text} />
        </Reveal>
        <h4 className="group-hover:text-crimson transition duration-700 py-1 font-semibold text-lg leading-tight font-brawler tracking-tight">
          {text}
        </h4>
        <small className="text-neutral-500 text-xs inline-block leading-snug">{caption}</small>
      </div>
    </Link>
  );
};

export default SidebarItem;
