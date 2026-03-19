import type { SortOption } from "~/types";

interface SortSelectorProps {
  currentSort: SortOption;
  onSortChange: (sort: SortOption) => void;
}

const SortSelector = ({ currentSort, onSortChange }: SortSelectorProps) => {
  return (
    <div className="relative w-full">
      <select 
        value={currentSort}
        onChange={(e) => onSortChange(e.target.value as SortOption)}
        className="w-full py-2.5 px-4 text-sm text-dark bg-neutral-200 border-neutral-600 focus:outline-none focus:ring-2 focus:ring-gray-600"
      >
        <option value="newest">Sort By: Newest Reviews First</option>
        <option value="oldest">Sort By: Oldest Reviews First</option>
        <option value="rating-high">Sort By: Highest Rated</option>
        <option value="rating-low">Sort By: Lowest Rated</option>
        <option value="year-newest">Sort By: Film Year (Newest)</option>
        <option value="year-oldest">Sort By: Film Year (Oldest)</option>
        <option value="alphabetical">Sort By: A - Z</option>
      </select>
    </div>
  );
};

export default SortSelector;
