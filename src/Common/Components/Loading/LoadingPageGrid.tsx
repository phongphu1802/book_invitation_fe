import { memo } from "react";
import { twMerge } from "tailwind-merge";

import LoadingSkeleton from "./LoadingSkeleton";

interface LoadingPageGridProps {
  className?: string;
  length?: number;
}

const LoadingPageGrid = ({ className, length = 12 }: LoadingPageGridProps) => {
  return (
    <div
      className={twMerge(
        "grid gap-4 md:grid-cols-2 lg:mt-0 lg:grid-cols-3 lg:gap-6 xl:grid-cols-4",
        className,
      )}
    >
      {Array.from({ length }).map((_, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <LoadingSkeleton className="h-64" key={index} />
      ))}
    </div>
  );
};

export default memo(LoadingPageGrid);
