import { memo } from "react";

import LoadingSkeleton from "../Loading/LoadingSkeleton";

export interface TableRowActionSkeletonProps {
  numberOfActions?: number;
}

const TableRowActionSkeleton = ({ numberOfActions = 2 }: TableRowActionSkeletonProps) => {
  return (
    <div className="flex items-center justify-end space-x-2">
      {Array.from({ length: numberOfActions || 1 }).map((_, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <LoadingSkeleton key={index} className="w-8 h-8" />
      ))}
    </div>
  );
};

export default memo(TableRowActionSkeleton);
