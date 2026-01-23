import type { PostMeta } from "~/types";
import { MdOutlineWatchLater } from "react-icons/md";
import { MdCheck } from "react-icons/md";
import { MdComputer } from "react-icons/md";
import { MdOutlineStarHalf } from "react-icons/md";
import { MdFormatQuote } from "react-icons/md";
import { Link } from "react-router";

const BlogCard = ({
  blog,
  classExtra,
}: {
  blog: PostMeta;
  classExtra: string;
}) => {
  return (
      <Link to={blog.slug} className={classExtra}>
    <article
      className={`item border-2 border-dark  cursor-pointer transition  duration-300 group relative z-10`}
    >
      <div className="relative">
        <img
          className="w-full aspect-video object-cover grayscale group-hover:grayscale-0 transition duration-300   relative"
          src={blog.image}
          alt={blog.title}
        />

        <div className="text-white bg-linear-to-l from-black px-4 py-1.5 absolute top-0 right-0 flex gap-1 justify-end font-bold font-brawler text-base">
          <MdOutlineStarHalf size="20" className="" />
          <MdOutlineStarHalf size="20" className="" />
          <span>8.9/10</span>
        </div>
      </div>

      <div className="p-6 bg-white group-hover:bg-dark group-hover:text-light duration-300 transition">
        <div className="flex justify-between items-start">
          <div className="">
            <h2 className="text-3xl uppercase group-hover:text-crimson transition duration-300 font-brawler font-bold ">
              {blog.title} <span className="">({blog.year})</span>
            </h2>

            <p className="italic text-base py-2 text-gray-600 transition duration-300 group-hover:text-gray-100 flex gap-1">
              Directed by
              <strong className="capitalize">{blog.director}</strong>
            </p>
          </div>
        </div>

        <div className="text-xs uppercase pt-2 pb-4 flex gap-3 font-semibold">
          <span className="bg-light transition duration-300 group-hover:bg-gray-600 group-hover:text-gray-100 px-2 py-1 border border-gray-600">
            Drama
          </span>{" "}
          <span className="bg-light px-2 py-1 transition duration-300 group-hover:bg-gray-600 group-hover:text-gray-100 border border-gray-600">
            Horror
          </span>{" "}
          <span className="bg-light px-2 py-1 transition duration-300 group-hover:bg-gray-600 group-hover:text-gray-100 border border-gray-600">
            Romance
          </span>
        </div>
        <div className="font-bold font-brawler flex gap-1 text-xs z-100 flex-wrap items-center text-gray-600 group-hover:text-gray-100 transition duration-300">
          <div className="flex gap-1 items-center">
            <MdOutlineWatchLater color="crimson" size="20" />{" "}
            {blog.run_time ? blog.run_time : "1hr 15m"}
          </div>

          <div className="flex gap-1 items-center ">
            <MdCheck color="crimson" size="20" /> Seen-
            {blog.watched_previously}
          </div>
          <div className="flex gap-1 items-center w-full">
            <MdComputer color="crimson" size="20" /> {blog.location}
          </div>
        </div>
        <hr className="border-t-3 my-5 border-double border-gray-600" />

        <div className="text-sm bt-1 border-gray-300  pb-4 leading-5">
          <h3 className="font-brawler uppercase font-bold pb-1 text-base">
            SYNOPSIS
          </h3>
          <p>{blog.excerpt}</p>
        </div>

        {blog.quote && (
          <blockquote className="my-6 border-l-4 bg-light border-crimson px-6 italic ">
            <p className="flex flex-col text-xl font-caption font-medium text-gray-900 leading-relaxed  py-2">
              <MdFormatQuote />{" "}
              <span className="self-center px-8">{blog.quote} </span>{" "}
              <MdFormatQuote className=" self-end" />
            </p>
          </blockquote>
        )}

        <button className="inline-block text-dark group-hover:text-crimson transition duration-300 border-gray-600 group-hover:border-crimson border-t border-b border-dotted cursor-pointer tracking-wider font-gothic text-2xl hover:scale-110 mt-6">read full review</button>
      </div>
    </article>
         </Link>
  );
};

export default BlogCard;
