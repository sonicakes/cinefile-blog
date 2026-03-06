import type { ReactNode } from "react";

interface MovieWrapperProps {
  isReviewed: boolean;
  href: string;
  className?: string;
  children: ReactNode;
}

const MovieWrapper = ({ 
  isReviewed, 
  href, 
  className, 
  children 
}: MovieWrapperProps) => {
  // Common props shared by both tags
  const commonProps = { className };

  if (isReviewed) {
    return (
      <a href={href} {...commonProps}>
        {children}
      </a>
    );
  }

  return (
    <div {...commonProps}>
      {children}
    </div>
  );
};

export default MovieWrapper;