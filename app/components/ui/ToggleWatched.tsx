interface ToggleWatchedProps {
  showWatched: boolean;
  onToggle: (value: boolean) => void;
}

const ToggleWatched = ({ showWatched, onToggle }: ToggleWatchedProps) => {
  return (
    <div className="flex items-center gap-2 select-none w-full justify-center md:justify-end">
      <span className={`transition-colors ${!showWatched ? 'text-neutral-700 font-bold' : 'text-neutral-400'}`}>
        to watch
      </span>
      <button
        onClick={() => onToggle(!showWatched)}
        className="relative w-10 h-5 bg-neutral-300 cursor-pointer rounded-full p-1 transition-colors duration-200 focus:outline-none"
        style={{ backgroundColor: showWatched ? 'crimson' : '#d1d5db' }}
      >
        <div
          className={`bg-white w-3 h-3 rounded-full shadow-md transform transition-transform duration-200 ${
            showWatched ? 'translate-x-5' : 'translate-x-0'
          }`}
        />
      </button>
      <span className={`transition-colors ${showWatched ? 'text-neutral-700 font-bold' : 'text-neutral-400'}`}>
         watched
      </span>
    </div>
  );
};

export default ToggleWatched;