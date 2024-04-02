import { memo } from "react";
import { twMerge } from "tailwind-merge";

interface LoadingSpinnerProps {
  className?: string;
}

const LoadingSpinner = ({ className }: LoadingSpinnerProps) => {
  return (
    <div
      className={twMerge(
        "h-12 w-12 animate-spin rounded-full border-4 border-primary-500",
        className,
        "border-t-transparent",
      )}
    />
  );
};

export default memo(LoadingSpinner);
