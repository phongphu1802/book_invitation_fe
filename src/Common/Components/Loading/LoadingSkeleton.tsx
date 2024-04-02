import { memo } from "react";
import { twMerge } from "tailwind-merge";

export interface LoadingSkeletonProps {
  className?: string;
}

const LoadingSkeleton = ({ className }: LoadingSkeletonProps) => {
  return <div className={twMerge("background-gray-100 animate-pulse rounded-lg bg-gray-100", className)} />;
};

export default memo(LoadingSkeleton);
