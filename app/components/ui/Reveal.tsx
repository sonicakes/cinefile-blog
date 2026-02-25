import React, { useEffect, useRef, useState, type ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  threshold?: number;
  className?: string;
}

const Reveal: React.FC<RevealProps> = ({
  children,
  threshold = 0.2,
  className = "",
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          } else {
            setIsVisible(false); 
          }
        });
      },
      { threshold },
    );

    const currentRef = domRef.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [threshold]);

  return (
    <div
      ref={domRef}
      className={`
    transition-all duration-700 ease-in-out transform-gpu
    ${
      isVisible
        ? "grayscale-0 opacity-100 scale-100"
        : "grayscale opacity-70 scale-95"
    }
    ${className}
  `}
    >
      {children}
    </div>
  );
};

export default Reveal;
