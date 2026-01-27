import { MdArrowLeft, MdArrowRight } from "react-icons/md";
import React, { useState } from "react";

const CategoryFilter = () => {
  const categories = [
    "Drama", "Mystery", "Historical", "Horror", 
    "Comedy", "Classics", "Lynch", "Almodovar", "Hitchcock","Romance"
  ];

  const [startIndex, setStartIndex] = useState(0);
  const visibleCount = 3;

  const nextSlide = () => {
    setStartIndex((prev) => Math.min(prev + visibleCount, categories.length - visibleCount));
  };

  const prevSlide = () => {
    setStartIndex((prev) => Math.max(prev - visibleCount, 0));
  };

  return (
    <div className="flex items-center gap-1 text-xs uppercase font-semibold select-none">
      <span className="text-neutral-500">Filter by</span>

      <div className="flex items-center gap-1">
        {/* Prev Arrow */}
        <button 
          onClick={prevSlide} 
          disabled={startIndex === 0}
          className="p-1 hover:bg-gray-100 disabled:opacity-20 transition"
        >
          <MdArrowLeft size={30} />
        </button>

        {/* Categories Window */}
        <div className="flex gap-3  justify-center"> 
          {categories.slice(startIndex, startIndex + visibleCount).map((category) => (
            <span
              key={category}
              className="bg-light border border-gray-600 px-3 py-1 transition duration-300 hover:bg-crimson hover:text-gray-100 cursor-pointer whitespace-nowrap"
            >
              {category}
            </span>
          ))}
        </div>

        {/* Next Arrow */}
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