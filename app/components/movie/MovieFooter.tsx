import { FaSpotify, FaArrowRight } from "react-icons/fa";
import { FaGamepad } from "react-icons/fa6";
import { MdMenuBook } from "react-icons/md";
import type { RawMovie } from "~/types";
import MovieWrapper from "./MovieWrapper";

type ReviewFooterProps = {
  spotifyEpisodes?: { title: string; podcastName: string; url: string }[];
  furtherReading?: { title: string; author?: string; url?: string }[];
  simsScenarios?: { scenarioName: string; description?: string; url?: string }[];
  nextMovie?: {
    movie?: RawMovie;
  };
};

const MovieFooter = ({
  spotifyEpisodes = [],
  furtherReading = [],
  simsScenarios = [],
  nextMovie,
}: ReviewFooterProps) => {
  const hasNextMovie = !!nextMovie?.movie;
  const hasFurtherReading = furtherReading.length > 0;
  const hasSimsScenarios = simsScenarios.length > 0;

  return (
    <div className="w-full mt-4 border-t-[6px] border-dark pt-1 text-dark">

      {/* Watch Next — full-width feature banner */}
      {hasNextMovie && (
        <section className="border-b-2 border-dark">
          <div className="px-6 py-5 flex items-center gap-4">
            <h4 className="font-sans text-xs font-black uppercase tracking-[0.3em]">
              Watch Next
            </h4>
            <div className="flex-1 border-t border-dark" />
          </div>
          <MovieWrapper
            isReviewed={!!nextMovie!.movie!.review_provided}
            href={`/blog/${nextMovie!.movie!.slug}`}
            className="flex flex-col sm:flex-row gap-8 p-4 md:p-8 group hover:bg-neutral-50 transition-colors"
          >
            {nextMovie!.movie?.img && (
              <div className="relative w-40 h-40 shrink-0 border-2 border-black overflow-hidden grayscale contrast-125 group-hover:grayscale-0 group-hover:contrast-100 transition-all duration-500">
                <img
                  src={
                    nextMovie!.movie.img.formats?.medium?.url ||
                    nextMovie!.movie.img.url
                  }
                  alt={nextMovie!.movie.title}
                  className="object-cover w-full h-full scale-105 group-hover:scale-100 transition-transform duration-500"
                />
                <div className="absolute inset-0 border-8 border-transparent group-hover:border-black/10 pointer-events-none" />
              </div>
            )}
            <div className="flex flex-col justify-center">
              {nextMovie!.movie?.genres && (
                <div className="flex gap-0.5 mb-1">
                  {nextMovie!.movie.genres.map((genre, index) => (
                    <span
                      key={index}
                      className="text-xs uppercase leading-tight text-neutral-400"
                    >
                      {index !== 0 && " / "}
                      {genre.name}
                    </span>
                  ))}
                </div>
              )}
              <h5 className="text-3xl font-brawler capitalize font-bold leading-none tracking-tighter group-hover:text-crimson transition-colors">
                {nextMovie!.movie?.title}
                {nextMovie!.movie?.year && (
                  <span className="font-normal opacity-50 pl-2 text-2xl">
                    ({nextMovie!.movie.year})
                  </span>
                )}
              </h5>
              {nextMovie!.movie?.excerpt && (
                <p className="mt-3 text-sm line-clamp-2 leading-snug text-neutral-600 max-w-2xl">
                  {nextMovie!.movie.excerpt}
                </p>
              )}
              <div className={`mt-4 font-medium flex items-center text-xs uppercase tracking-widest transition-transform duration-300 origin-bottom-left ${nextMovie!.movie!.review_provided ? "text-gray-600 group-hover:scale-x-110" : "text-neutral-400 cursor-default"}`}>
                {nextMovie!.movie!.review_provided ? (<>Read Review <FaArrowRight className="ml-2 text-[8px]" /></>) : "Review Pending"}
              </div>
            </div>
          </MovieWrapper>
        </section>
      )}

      {/* Spotify podcasts row */}
      {spotifyEpisodes.length > 0 && (
        <section className="border-b-2 border-dark">
          <div className="px-6 py-5 flex items-center gap-4">
            <FaSpotify className="text-base shrink-0" />
            <h4 className="font-sans text-xs font-black uppercase tracking-[0.3em]">
              Recommended Podcasts about this movie
            </h4>
            <div className="flex-1 border-t border-dark" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-black border-x border-black">
            {spotifyEpisodes.map((ep, i) => (
              <a
                key={i}
                href={ep.url}
                target="_blank"
                rel="noreferrer"
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
                  Listen Now <FaArrowRight className="ml-2 text-[8px]" aria-hidden="true" />
                  <span className="sr-only">(opens in new tab)</span>
                </div>
              </a>
            ))}
          </div>
        </section>
      )}

      {/* Further Reading row */}
      {hasFurtherReading && (
        <section className="border-b-2 border-dark">
          <div className="px-6 py-5 flex items-center gap-4">
            <MdMenuBook className="text-base shrink-0" />
            <h4 className="font-sans text-xs font-black uppercase tracking-[0.3em]">
              Further Reading
            </h4>
            <div className="flex-1 border-t border-dark" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-black border-x border-black">
            {furtherReading.map((book, i) =>
              book.url ? (
                <a
                  key={i}
                  href={book.url}
                  target="_blank"
                  rel="noreferrer"
                  className="p-6 hover:bg-neutral-100 transition-colors group flex flex-col justify-between"
                >
                  <div>
                    {book.author && (
                      <span className="block text-xs uppercase text-neutral-500 tracking-wide font-semibold mb-1 leading-none">
                        {book.author}
                      </span>
                    )}
                    <h5 className="text-xl font-brawler font-bold leading-tight group-hover:underline group-hover:text-crimson decoration-2">
                      {book.title}
                    </h5>
                  </div>
                  <div className="mt-4 text-gray-600 font-medium flex items-center text-xs uppercase tracking-widest transition-transform duration-300 origin-bottom-left group-hover:scale-x-110">
                    View Book <FaArrowRight className="ml-2 text-[8px]" aria-hidden="true" />
                    <span className="sr-only">(opens in new tab)</span>
                  </div>
                </a>
              ) : (
                <div key={i} className="p-6 flex flex-col">
                  {book.author && (
                    <span className="block text-xs uppercase text-neutral-500 tracking-wide font-semibold mb-1 leading-none">
                      {book.author}
                    </span>
                  )}
                  <h5 className="text-xl font-brawler font-bold leading-tight">
                    {book.title}
                  </h5>
                </div>
              )
            )}
          </div>
        </section>
      )}

      {/* Sims 4 Scenario row */}
      {hasSimsScenarios && (
        <section className="border-b-2 border-dark">
          <div className="px-6 py-5 flex items-center gap-4">
            <FaGamepad className="text-base shrink-0" />
            <h4 className="font-sans text-xs font-black uppercase tracking-[0.3em]">
              Sims 4 Scenario
            </h4>
            <div className="flex-1 border-t border-dark" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-black border-x border-black">
            {simsScenarios.map((scenario, i) =>
              scenario.url ? (
                <a
                  key={i}
                  href={scenario.url}
                  target="_blank"
                  rel="noreferrer"
                  className="p-6 hover:bg-neutral-100 transition-colors group flex flex-col justify-between"
                >
                  <div>
                    <h5 className="text-xl font-brawler font-bold leading-tight group-hover:underline group-hover:text-crimson decoration-2">
                      {scenario.scenarioName}
                    </h5>
                    {scenario.description && (
                      <p className="mt-2 text-sm leading-snug text-neutral-600">
                        {scenario.description}
                      </p>
                    )}
                  </div>
                  <div className="mt-4 text-gray-600 font-medium flex items-center text-xs uppercase tracking-widest transition-transform duration-300 origin-bottom-left group-hover:scale-x-110">
                    Play Scenario <FaArrowRight className="ml-2 text-[8px]" aria-hidden="true" />
                    <span className="sr-only">(opens in new tab)</span>
                  </div>
                </a>
              ) : (
                <div key={i} className="p-6 flex flex-col">
                  <h5 className="text-xl font-brawler font-bold leading-tight">
                    {scenario.scenarioName}
                  </h5>
                  {scenario.description && (
                    <p className="mt-2 text-sm leading-snug text-neutral-600">
                      {scenario.description}
                    </p>
                  )}
                </div>
              )
            )}
          </div>
        </section>
      )}

    </div>
  );
};

export default MovieFooter;
