import { SiLetterboxd, SiBluesky, SiGithub } from "react-icons/si";

const SOCIAL_LINKS = [
  { href: "https://letterboxd.com/sonicakes/", label: "Letterboxd", Icon: SiLetterboxd },
  { href: "https://bsky.app/profile/sonicakes.bsky.social", label: "BlueSky", Icon: SiBluesky },
  { href: "https://github.com/sonicakes", label: "GitHub", Icon: SiGithub },
];

const MainFooter = () => {
    return (
    <div className="pb-2 pt-8 mt-8 w-full uppercase text-neutral-500 tracking-wide font-semibold border-t-4 border-double border-dark">
        <div className="flex gap-4 mb-4">
          {SOCIAL_LINKS.map(({ href, label, Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="flex items-center gap-1.5 text-xs hover:text-crimson transition-colors duration-300"
            >
              <Icon size={16} />
              {label}
            </a>
          ))}
        </div>
        <p className="text-xs leading-tight">
          <span className="italic font-bold text-neutral-600">The Cinefile Blog {new Date().getFullYear()}</span> — designed, developed & deployed by the film lady.
          All critique is a personal opinion.
          Metadata from <a className="italic hover:underline text-crimson" href="https://www.themoviedb.org/" target="_blank" rel="noopener noreferrer">TMDB</a>,{" "}
          <a className="italic hover:underline text-crimson" href="https://letterboxd.com/" target="_blank" rel="noopener noreferrer">Letterboxd</a> &{" "}
          <a className="italic hover:underline text-crimson" href="https://gemini.google.com/app" target="_blank" rel="noopener noreferrer">Gemini</a>.
          Imagery from <a className="italic hover:underline text-crimson" href="https://unsplash.com/" target="_blank" rel="noopener noreferrer">Unsplash</a> & the film lady herself.
        </p>
      </div> );
}
 
export default MainFooter ;  
  
