import { memo } from "react";
import { twMerge } from "tailwind-merge";

interface LoadingDotProps {
  className?: string;
  firstClassName?: string;
  secondClassName?: string;
  thirdClassName?: string;
}

const LoadingDot = ({ firstClassName, secondClassName, className, thirdClassName }: LoadingDotProps) => {
  return (
    <div className="inline-flex items-center justify-center space-x-1">
      <div
        className={twMerge(
          "animate-super-bounce animation-delay-100 h-4 w-4 rounded-full bg-primary-700",
          firstClassName,
          className,
        )}
      />
      <div
        className={twMerge(
          "animate-super-bounce animation-delay-200 h-4 w-4 rounded-full bg-primary-700",
          secondClassName,
          className,
        )}
      />
      <div
        className={twMerge(
          "animate-super-bounce animation-delay-300 h-4 w-4 rounded-full bg-primary-700",
          thirdClassName,
          className,
        )}
      />
    </div>
  );
};

export default memo(LoadingDot);
