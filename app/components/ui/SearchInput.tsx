import { MdOutlineSearch } from "react-icons/md";

type SearchInputProps = {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onClearChange: () => void;
};
import { MdClose } from "react-icons/md";

const SearchInput = ({
  searchQuery,
  onSearchChange,
  onClearChange,
}: SearchInputProps) => {
  return (
    <div className="relative w-full">
      <input
        type="text"
        placeholder="search movie..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full py-2.5 pr-4 pl-9 text-sm text-dark bg-neutral-200 border-neutral-600 focus:outline-none focus:ring-2 focus:ring-gray-600"
      />
      <MdOutlineSearch
        size={22}
        aria-hidden="true"
        className="absolute top-1/2 left-2 -translate-y-1/2 text-neutral-dark"
      />
      {searchQuery != "" && (
        <button
          onClick={onClearChange}
          aria-label="Clear search"
          className="absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer hover:text-crimson transition text-neutral-500"
        >
          <MdClose size={22} aria-hidden="true" />
        </button>
      )}
    </div>
  );
};

export default SearchInput;
