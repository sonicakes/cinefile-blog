import { FaLetterboxd, FaEnvelope } from "react-icons/fa6";
import { FaSpotify, FaArrowRight } from "react-icons/fa";

// type Resource = {
//   label: string;
//   url: string;
//   icon?: React.ReactNode;
// };

type ReviewFooterProps = {
  spotifyEpisodes?: { title: string; podcastName: string; url: string }[];
  nextMovie?: {
    title?: string;
    year?: number;
    reason?: string;
    url?: string;
    thumbnail_url?: string;
  };
};

const MovieFooter = ({
  spotifyEpisodes = [],

  nextMovie,
}: ReviewFooterProps) => {
  return (
    <footer className="w-full mt-20 border-t-[6px] border-dark pt-1  text-dark">
      {spotifyEpisodes.length > 0 && (
        <section className="border-b-2 border-dark">
          <div className="px-6 py-4 bg-dark text-white flex items-center justify-between">
            <h4 className="font-sans text-xs font-black uppercase tracking-[0.3em] flex items-center gap-3">
              <FaSpotify className=" text-lg" />
              Recommended Podcasts about this movie
            </h4>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-black border-x border-black">
            {spotifyEpisodes.length ? (
              spotifyEpisodes.map((ep, i) => (
                <a
                  key={i}
                  href={ep.url}
                  className="p-6 hover:bg-neutral-100 transition-colors group flex flex-col justify-between"
                >
                  <div>
                    <span className="block text-xs uppercase text-neutral-500 tracking-wide font-semibold mb-1 leading-none">
                      {ep.podcastName}
                    </span>
                    <h5 className="text-xl font-brawler font-bold leading-tight group-hover:underline group-hover:text-crimson decoration-2">
                      {ep.title}
                    </h5>
                  </div>
                  <div className="mt-4 text-gray-600 font-medium flex items-center text-xs uppercase tracking-widest transition-transform duration-300 origin-bottom-left group-hover:scale-x-110">
                    Listen Now <FaArrowRight className="ml-2 text-[8px]" />
                  </div>
                </a>
              ))
            ) : (
              <p className="p-6 italic text-neutral-500">
                No recent audio dispatches found.
              </p>
            )}
          </div>
        </section>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 bg-light">
        <section className="p-8 border-b bg-neutral-50 md:border-b-0 md:border-r border-black">
          <h4 className="mb-8 text-xs uppercase tracking-[0.2em] border-b border-black pb-2 inline-block">
            Correspondence
          </h4>
          <div className="space-y-6">
            <p className="text-lg leading-snug italic text-gray-600 max-w-sm">
              Direct your inquiries, praise, or cinematic rebuttals to our desk
              via the following channels.
            </p>
            <nav className="flex flex-col gap-4  text-sm font-bold uppercase tracking-tight">
              <a
                href="https://letterboxd.com/sonicakes/"
                className="flex items-center gap-3 group"
              >
                <div className="p-2 border border-dark group-hover:bg-crimson group-hover:text-white transition-all">
                  <FaLetterboxd className="text-xl" />
                </div>
                <span className="border-b border-black group-hover:border-b-2 group-hover:border-crimson">
                  Follow me on Letterboxd
                </span>
              </a>
              <a href="/contact" className="flex items-center gap-3 group">
                <div className="p-2 border border-black group-hover:bg-black group-hover:text-white transition-all">
                  <FaEnvelope className="text-xl" />
                </div>
                <span className="border-b border-black group-hover:border-b-2 group-hover:border-crimson">
                  Contact the Critic
                </span>
              </a>
            </nav>
          </div>
        </section>

        <section className="p-8">
          <h4 className="mb-8 text-xs uppercase tracking-[0.2em] border-b border-black pb-2 inline-block ">
            watch next
          </h4>
          <a
            href={nextMovie && nextMovie.url}
            className="flex flex-col sm:flex-row gap-6 group"
          >
            {nextMovie && nextMovie.thumbnail_url && (
              <div className="relative w-32 h-32 shrink-0 border-2 border-black overflow-hidden grayscale contrast-125 group-hover:grayscale-0 transition-all duration-500">
                <img
                  src={nextMovie && nextMovie.thumbnail_url}
                  alt={nextMovie && nextMovie.title}
                  className="object-cover w-full h-full scale-105 group-hover:scale-100 transition-transform"
                />
                <div className="absolute inset-0 border-8 border-transparent group-hover:border-black/10 pointer-events-none"></div>
              </div>
            )}
            <div className="flex flex-col justify-center">
              <h5 className="text-2xl font-brawler capitalize font-bold leading-none tracking-tighter group-hover:text-crimson">
                {nextMovie && nextMovie.title}{" "}
                {nextMovie && nextMovie.year && (
                  <span className="font-normal opacity-60">
                    ({nextMovie.year})
                  </span>
                )}
              </h5>
              {nextMovie && nextMovie.reason && (
                <p className="mt-3 text-sm leading-tight text-gray-600 font-medium">
                  {nextMovie && nextMovie.reason}
                </p>
              )}
            </div>
          </a>
        </section>
      </div>
    </footer>
  );
};

export default MovieFooter;
