import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";

const BackToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-3 py-2 border border-dark bg-light text-dark text-xs uppercase tracking-widest font-bold transition duration-300 hover:bg-crimson hover:text-light hover:border-crimson cursor-pointer"
    >
      <FaArrowUp className="text-[10px]" />
      Top
    </button>
  );
};

export default BackToTop;
