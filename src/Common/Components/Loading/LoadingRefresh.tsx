import { memo } from "react";
import { twMerge } from "tailwind-merge";

interface LoadingRefreshProps {
  className?: string;
}

const LoadingRefresh = ({ className }: LoadingRefreshProps) => {
  return (
    <div
      className={twMerge(
        "border-3 relative h-5 w-5 animate-spin rounded-full border-primary-700",
        className,
        "border-t-transparent",
        "before:border-y-5 before:border-l-5 before:absolute before:-top-1 before:left-0 before:block before:h-0 before:w-0 before:-rotate-45 before:border-y-transparent before:border-l-primary-700",
      )}
    />
  );
};

export default memo(LoadingRefresh);
