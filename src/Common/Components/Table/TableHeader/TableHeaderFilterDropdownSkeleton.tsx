import { memo } from "react";
import { twMerge } from "tailwind-merge";

import LoadingSkeleton from "../../Loading/LoadingSkeleton";

export interface TableHeaderFilterDropdownSkeletonProps {
  maxSelection: boolean;
}

const TableHeaderFilterDropdownSkeleton = ({ maxSelection }: TableHeaderFilterDropdownSkeletonProps) => {
  return (
    <div className="">
      <div className="flex w-full items-center justify-start space-x-3.5 py-1.5">
        <LoadingSkeleton
          className={twMerge(maxSelection ? "rounded-full" : "rounded-md", "h-5 w-5 flex-shrink-0")}
        />
        <LoadingSkeleton className="h-4 w-full" />
      </div>
      <div className="flex w-full items-center justify-start space-x-3.5 py-1.5">
        <LoadingSkeleton
          className={twMerge(maxSelection ? "rounded-full" : "rounded-md", "h-5 w-5 flex-shrink-0")}
        />
        <LoadingSkeleton className="h-4 w-full" />
      </div>
      <div className="flex w-full items-center justify-start space-x-3.5 py-1.5">
        <LoadingSkeleton
          className={twMerge(maxSelection ? "rounded-full" : "rounded-md", "h-5 w-5 flex-shrink-0")}
        />
        <LoadingSkeleton className="h-4 w-full" />
      </div>
      <div className="flex w-full items-center justify-start space-x-3.5 py-1.5">
        <LoadingSkeleton
          className={twMerge(maxSelection ? "rounded-full" : "rounded-md", "h-5 w-5 flex-shrink-0")}
        />
        <LoadingSkeleton className="h-4 w-full" />
      </div>
    </div>
  );
};

export default memo(TableHeaderFilterDropdownSkeleton);
