import type { SearchInputProps } from "~/types";
import { MdOutlineSearch } from "react-icons/md";
import { MdClose } from "react-icons/md";

const SearchInput = ({
  searchQuery,
  onSearchChange,
  onClearChange,
}: SearchInputProps) => {
  return (
    <div className="relative w-full md:w-1/4">
      <input
        type="text"
        placeholder="search movie..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full py-2.5 pr-4 pl-9 text-sm text-dark bg-neutral-200 border-neutral-600 focus:outline-none focus:ring-2 focus:ring-gray-600"
      />
      <MdOutlineSearch
        size={22}
        className="absolute top-1/2 left-2 -translate-y-1/2 text-neutral-dark"
      />
      {searchQuery != "" && (
        <MdClose
          size={22}
          className="absolute cursor-pointer hover:text-crimson transition top-1/2 right-2 -translate-y-1/2 text-neutral-500"
          onClick={onClearChange}
        />
      )}
    </div>
  );
};

export default SearchInput;
