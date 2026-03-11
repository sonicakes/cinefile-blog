import React, { useEffect, useRef, useState, type ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  threshold?: number;
  className?: string;
  groupHover?: boolean;
}

const Reveal: React.FC<RevealProps> = ({
  children,
  threshold = 0.2,
  className = "",
  groupHover = false,
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
    overflow-hidden transition-all duration-700 ease-in-out transform-gpu
    ${groupHover ? "group-hover:grayscale-0" : "hover:grayscale-0"}
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
