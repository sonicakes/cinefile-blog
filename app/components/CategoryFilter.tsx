import { MdArrowLeft, MdArrowRight } from "react-icons/md";
import React, { useState } from "react";

const CategoryFilter = () => {
  const categories = [
    "Drama",
    "Mystery",
    "Historical",
    "Horror",
    "Comedy",
    "Classics",
    "Lynch",
    "Almodovar",
    "Hitchcock",
    "Romance",
  ];

  const [startIndex, setStartIndex] = useState(0);
  const visibleCount = 3;

  const nextSlide = () => {
    setStartIndex((prev) =>
      Math.min(prev + visibleCount, categories.length - visibleCount),
    );
  };

  const prevSlide = () => {
    setStartIndex((prev) => Math.max(prev - visibleCount, 0));
  };

  return (
    <div className="w-auto py-1 md:py-0 flex-col flex md:flex-row justify-center md:justify-start items-center gap-1 md:gap-0 text-[10px] md:text-xs uppercase font-semibold select-none">
      <span className="text-neutral-500 w-full lg:w-auto text-center lg:text-left block lg:inline">Filter by</span>

      <div className="flex items-center gap-1 justify-between">
        <button
          onClick={prevSlide}
          disabled={startIndex === 0}
          className="p-1 hover:bg-gray-100 disabled:opacity-20 transition"
        >
          <MdArrowLeft size={30} />
        </button>

        <div
          className="flex gap-2 lg:gap-3 
        justify-center"
        >
          {categories
            .slice(startIndex, startIndex + visibleCount)
            .map((category) => (
              <span
                key={category}
                className="bg-light border border-gray-600 px-1.5 lg:px-3 py-0.5 lg:py-1 transition duration-300 hover:bg-crimson hover:text-gray-100 cursor-pointer whitespace-nowrap"
              >
                {category}
              </span>
            ))}
        </div>

        <button
          onClick={nextSlide}
          disabled={startIndex + visibleCount >= categories.length}
          className="p-1 hover:bg-gray-100 disabled:opacity-20 transition"
        >
          <MdArrowRight size={30} />
        </button>
      </div>
    </div>
  );
};

export default CategoryFilter;
