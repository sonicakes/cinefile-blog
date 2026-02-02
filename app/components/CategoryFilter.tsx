import { MdArrowLeft, MdArrowRight } from "react-icons/md";
import React, { useState } from "react";
import { categories } from "~/constants";

interface CategoryFilterProps {
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
}

const CategoryFilter = ({
  selectedCategory,
  onSelectCategory,
}: CategoryFilterProps) => {
  const [startIndex, setStartIndex] = useState(0);
  const visibleCount = 5;

  const nextSlide = () => {
    setStartIndex((prev) =>
      Math.min(prev + visibleCount, categories.length - visibleCount),
    );
  };

  const prevSlide = () => {
    setStartIndex((prev) => Math.max(prev - visibleCount, 0));
  };

  return (
    <div className="w-full py-3 lg:py-0 flex-col flex md:flex-row items-center gap-1 lg:gap-0 text-[10px] text-xs uppercase font-semibold select-none">
      <div className="flex items-center gap-1 justify-between">
        <button
          onClick={prevSlide}
          disabled={startIndex === 0}
          className="p-1 hover:bg-gray-100 disabled:opacity-20 transition cursor-pointer"
        >
          <MdArrowLeft size={25} />
        </button>

        <div className="flex flex-wrap md:flex-nowrap gap-2 lg:gap-3 justify-center">
          <div
            onClick={() => onSelectCategory(null)}
            className={`px-1.5 lg:px-3 py-1 leading-3.5  border transition cursor-pointer ${
              selectedCategory === null
                ? "bg-crimson text-white border-crimson"
                : "bg-light border-gray-600"
            }`}
          >
            All
          </div>

          {categories
            .slice(startIndex, startIndex + visibleCount)
            .map((category) => (
              <span
                key={category}
                onClick={() => onSelectCategory(category)}
                className={`px-1.5 lg:px-3 border py-1 leading-3.5 transition duration-300 cursor-pointer whitespace-nowrap ${
                  selectedCategory === category
                    ? "bg-crimson text-white border-crimson"
                    : "bg-light border-gray-600 hover:bg-crimson hover:text-gray-100"
                }`}
              >
                {category}
              </span>
            ))}
        </div>

        <button
          onClick={nextSlide}
          disabled={startIndex + visibleCount >= categories.length}
          className="p-1 hover:bg-gray-100 disabled:opacity-20 transition cursor-pointer"
        >
          <MdArrowRight size={25} />
        </button>
      </div>
    </div>
  );
};

export default CategoryFilter;
