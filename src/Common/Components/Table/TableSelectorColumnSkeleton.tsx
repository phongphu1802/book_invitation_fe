import { memo } from "react";

import LoadingSkeleton from "../Loading/LoadingSkeleton";

const TableSelectorColumnSkeleton = () => {
  return <LoadingSkeleton className="h-5 w-5 rounded-md" />;
};

export default memo(TableSelectorColumnSkeleton);
