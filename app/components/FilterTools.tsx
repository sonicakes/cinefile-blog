import CategoryFilter from "./CategoryFilter";

const FilterTools = () => {
  return (
    <section className="py-5 border-b border-gray-300">
      <div className="flex justify-between font-brawler uppercase tracking-wider text-xs">
        <input
          className="bg-gray-300 py-2"
          type="text"
          placeholder="search movie name"
        ></input>
          <CategoryFilter />
        <select className="bg-gray-300 py-2">
          <option>Sort By</option>
          <option>Sort By</option>
          <option>Sort By</option>
        </select>
      </div>
      {/* <div className="text-xs uppercase flex gap-3 font-semibold">
        <span className="px-2 py-1">Filter by</span>{" "}
        <span className="bg-light transition duration-300 hover:bg-gray-600 hover:text-gray-100 px-2 py-1 border border-gray-600">
          Drama
        </span>
        <span className="bg-light transition duration-300 hover:bg-gray-600 hover:text-gray-100 px-2 py-1 border border-gray-600">
          Mystery
        </span>
        <span className="bg-light transition duration-300 group-hover:bg-gray-600 group-hover:text-gray-100 px-2 py-1 border border-gray-600">
          Historical
        </span>
        <span className="bg-light px-2 py-1 transition duration-300 group-hover:bg-gray-600 group-hover:text-gray-100 border border-gray-600">
          Horror
        </span>
        <span className="bg-light px-2 py-1 transition duration-300 group-hover:bg-gray-600 group-hover:text-gray-100 border border-gray-600">
          Comedy
        </span>
        <span className="bg-light px-2 py-1 transition duration-300 group-hover:bg-gray-600 group-hover:text-gray-100 border border-gray-600">
          Classics
        </span>
        <span className="bg-light px-2 py-1 transition duration-300 group-hover:bg-gray-600 group-hover:text-gray-100 border border-gray-600">
          David Lynch
        </span>
        <span className="bg-light px-2 py-1 transition duration-300 group-hover:bg-gray-600 group-hover:text-gray-100 border border-gray-600">
          Pedro Almodovar
        </span>
        <span className="bg-light px-2 py-1 transition duration-300 group-hover:bg-gray-600 group-hover:text-gray-100 border border-gray-600">
          Romance
        </span>
      </div> */}
    
    </section>
  );
};

export default FilterTools;
