import { Header, RowData } from "@tanstack/react-table";
import { memo } from "react";
import { twMerge } from "tailwind-merge";

import TableContentBodySkeletonItem from "./TableContentBodySkeletonItem";

interface TableContentBodySkeletonProps<T = RowData> {
  headers: Array<Header<T, RowData>>;
}

const TableContentBodySkeleton = ({ headers }: TableContentBodySkeletonProps) => {
  return (
    <tr>
      {headers.map((header, index) => (
        <td
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          className={twMerge(
            "border-b border-gray-50 p-4",
            header.column.columnDef.meta?.bodySkeletonClassName,
          )}
        >
          <TableContentBodySkeletonItem header={header} />
        </td>
      ))}
    </tr>
  );
};

export default memo(TableContentBodySkeleton);
