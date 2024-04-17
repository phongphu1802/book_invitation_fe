import { flexRender, Header } from "@tanstack/react-table";
import { memo, ReactNode, useMemo } from "react";

import LoadingSkeleton from "../../Loading/LoadingSkeleton";
import TableRowActionSkeleton from "../TableRowActionSkeleton";

interface TableContentBodySkeletonItemProps {
  header: Header<unknown, unknown>;
}

const TableContentBodySkeletonItem = ({ header }: TableContentBodySkeletonItemProps): JSX.Element => {
  const columnMeta = useMemo(() => header.column.columnDef.meta, [header.column.columnDef.meta]);

  if (header.id === "actions" && columnMeta?.skeleton == null) {
    return <TableRowActionSkeleton />;
  }

  if (columnMeta?.skeleton != null) {
    const element = flexRender(columnMeta.skeleton, header.getContext()) as ReactNode;
    return element as JSX.Element;
  }

  return <LoadingSkeleton className="h-4 w-full" />;
};

export default memo(TableContentBodySkeletonItem);
