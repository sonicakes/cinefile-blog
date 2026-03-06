import { useEffect, useState } from "react";
import { 
  MdLocalMovies, MdMovieFilter, MdTheaterComedy, MdVideocam,
  MdStars, MdMic, MdRecentActors, MdChair, MdSettingsSuggest, MdSpeakerGroup 
} from "react-icons/md";

const RenderWakeupMsg = () => {
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [secondsElapsed, setSecondsElapsed] = useState(0);

  const earlyPhrases = [
    { icon: MdLocalMovies, text: "Threading the 35mm film..." },
    { icon: MdMovieFilter, text: "Applying cinematic color grade..." },
    { icon: MdSettingsSuggest, text: "Calibrating the IMAX projection..." },
    { icon: MdMic, text: "Syncing the foley and sound effects..." },
    { icon: MdRecentActors, text: "Calling the lead actors to set..." },
  ];

  const latePhrases = [
    { icon: MdTheaterComedy, text: "The film critic lady is still waking up..." },
    { icon: MdChair, text: "Reserving the best seats in the house..." },
    { icon: MdSpeakerGroup, text: "Testing the Dolby Atmos surround sound..." },
    { icon: MdStars, text: "Polishing the Academy Awards..." },
    { icon: MdVideocam, text: "Retrieving found footage... almost there!" },
  ];

  const currentList = secondsElapsed < 10 ? earlyPhrases : latePhrases;
  const activeItem = currentList[quoteIndex % currentList.length];
  const IconComponent = activeItem.icon;

  useEffect(() => {
    const timer = setInterval(() => setSecondsElapsed(prev => prev + 1), 1000);
    const quoteTimer = setInterval(() => {
      setQuoteIndex(prev => prev + 1);
    }, 3500); 

    return () => {
      clearInterval(timer);
      clearInterval(quoteTimer);
    };
  }, []);

  return (
    <div className="bg-neutral-100 text-neutral-800 py-3 flex flex-col items-center border-b-2 border-crimson shadow-sm">
      <div 
        key={activeItem.text} 
        className="flex gap-3 items-center"
      >
        <span className="text-xl text-crimson animate-pulse">
          <IconComponent />
        </span>
        
        <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold overflow-hidden border-r-2 border-crimson whitespace-nowrap animate-typewriter">
          {activeItem.text}
        </span>
      </div>
    </div>
  );
};

export default RenderWakeupMsg;