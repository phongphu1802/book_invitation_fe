import { memo } from "react";
import { twMerge } from "tailwind-merge";

interface LoadingSpinnerSVGProps {
  className?: string;
}

const LoadingSpinnerSVG = ({ className }: LoadingSpinnerSVGProps) => {
  return (
    <svg className={twMerge(className, "spinner")} viewBox="0 0 50 50">
      <circle className="path" cx="25" cy="25" r="20" fill="none" strokeWidth="5" strokeLinecap="round" />
    </svg>
  );
};

export default memo(LoadingSpinnerSVG);
