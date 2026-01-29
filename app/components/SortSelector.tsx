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
        <option value="newest">Sort By: Newest First</option>
        <option value="oldest">Sort By: Oldest First</option>
        <option value="alphabetical">Sort By: A - Z</option>
      </select>
    </div>
  );
};

export default SortSelector;
