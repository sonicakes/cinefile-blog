import type { PostMeta } from "~/types";
import {
  MdOutlineRecommend,
  MdOutlineStarHalf,
  MdOutlineWatchLater,
  MdOutlineRepeat,
} from "react-icons/md";
import MetaItem from "~/components/MetaItem";
import { getIconByMedium } from "~/helpers";
import RelatedBlogs from "./RelatedBlogs";

const AsideMeta = ({ postMeta }: { postMeta: PostMeta }) => {
  return (
    <aside className="related-sidebar">
      <div className="py-4 mb-5 border-t px-4 border-gray-300 bg-light">
        <div className="flex gap-1 pb-5 justify-end items-center">
          {Array.from({ length: Math.floor(postMeta.rating || 0) }).map(
            (_, index) => (
              <MdOutlineStarHalf
                key={index}
                size="20"
                className="text-crimson"
              />
            ),
          )}
          <span className="text-crimson font-semibold">
            ({postMeta.rating && postMeta.rating}/10)
          </span>
        </div>
        <div className="flex justify-between items-start">
          <div className="">
            <h2 className="text-xl font-brawler font-bold tracking-wide capitalize">
              {postMeta.title} <span className="">({postMeta.year})</span>
            </h2>

            <p className="italic text-base py-2 text-gray-600 transition duration-300 group-hover:text-gray-100 flex gap-1">
              Directed by
              <strong className="capitalize">{postMeta.director}</strong>
            </p>
          </div>
        </div>
        <div className="text-[10px] uppercase pt-2 pb-4 flex gap-1.5 font-semibold flex-wrap">
          {postMeta.genres.map((genre) => (
            <span
              key={genre.id}
              className="bg-gray-200 px-2 py-1 rounded text-xs"
            >
              {genre.name}
            </span>
          ))}
        </div>
        {/* TODO: add date watched/date reviewed */}
        <div className="font-bold tracking-wide font-brawler flex gap-1 text-xs z-100 flex-wrap items-center text-gray-600 group-hover:text-gray-100 transition duration-300">
          <div className="flex gap-1 items-center">
            <MdOutlineWatchLater color="crimson" size="20" />
            {postMeta.run_time ? postMeta.run_time : "1hr 15m"}
          </div>
          <div className="flex gap-1 items-center">
            <MdOutlineRecommend color="crimson" size="20" /> recommend
            {postMeta.would_recommend}
          </div>
          <div className="flex gap-1 items-center">
            <MdOutlineRepeat color="crimson" size="20" /> rewatchable
            {postMeta.would_rewatch}
          </div>
          <div className="flex gap-1 items-center w-full">
            {postMeta.availability &&
              postMeta.availability.map((item, index) => (
                <a
                  href={item.location}
                  className="hover:underline transition"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MetaItem
                    key={index}
                    Icon={getIconByMedium(item.medium)}
                    text={item.medium}
                  />
                </a>
              ))}
          </div>
        </div>
        <hr className="border-t-3 my-5 border-double border-gray-600" />
        <div className="text-sm bt-1 border-gray-300 leading-5">
          <h3 className="font-brawler uppercase font-bold pb-1 text-base">
            SYNOPSIS
          </h3>
          <p className="columns-1 lg:columns-2 gap-5 text-justify hyphens-auto text-[15px]">
            {postMeta.excerpt}
          </p>
        </div>
        <hr className="border-t-3 my-5 border-double border-gray-600"></hr>
        <div className="text-sm bt-1 border-gray-300 pb-2 leading-5">
          <h3 className="font-brawler uppercase font-bold pb-1 text-base">
            VERDICT
          </h3>
          <p className="text-[0.95rem] flex gap-1 text-justify pb-2">
            <span className="text-crimson font-brawler font-semibold">
              {postMeta.rating && postMeta.rating}/10
            </span>
            <span>{postMeta.rating_metric && postMeta.rating_metric}</span>
          </p>
        </div>
      </div>
      <RelatedBlogs />
    </aside>
  );
};

export default AsideMeta;
