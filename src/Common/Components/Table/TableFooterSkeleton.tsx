import { memo } from "react";

import LoadingSkeleton from "../Loading/LoadingSkeleton";

const TableFooterSkeleton = () => {
  return (
    <div className="flex w-full items-center justify-between">
      <div className="flex items-center justify-center space-x-4">
        <LoadingSkeleton className="h-9 w-16" />
        <LoadingSkeleton className="h-4 w-56" />
      </div>
      <LoadingSkeleton className="h-9 w-48" />
    </div>
  );
};

export default memo(TableFooterSkeleton);
