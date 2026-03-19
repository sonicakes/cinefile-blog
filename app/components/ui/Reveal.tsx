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
    overflow-hidden transition-all duration-1200 ease-in-out delay-1200 transform-gpu
    ${
      isVisible
        ? "scale-100"
        : "grayscale scale-95"
    }
    ${className}
  `}
    >
      {children}
    </div>
  );
};

export default Reveal;
