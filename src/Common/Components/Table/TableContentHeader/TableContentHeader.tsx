import { flexRender, HeaderGroup } from "@tanstack/react-table";
import { memo } from "react";

import { TableDataGenericType } from "../interface";
import TableContentHeaderColumn from "./TableContentHeaderColumn";

export interface TableContentHeaderProps<TData = TableDataGenericType> {
  headerGroups: Array<HeaderGroup<TData>>;
  hiddenColumnIds: string[];
}

const TableContentHeader = <T extends object>({
  headerGroups,
  hiddenColumnIds,
}: TableContentHeaderProps<T>) => {
  return (
    <thead className="overflow-hidden">
      {headerGroups.map((headerGroup) => (
        <tr key={headerGroup.id} className="relative">
          {headerGroup.headers
            .filter((header) => !hiddenColumnIds.includes(header.id))
            .map((header) => {
              if (header.column.columnDef.meta?.isHiddenTableHeader) {
                return null;
              }
              return (
                <TableContentHeaderColumn
                  key={header.id}
                  id={header.id}
                  className={header.column.columnDef.meta?.className}
                  headerClassName={header.column.columnDef.meta?.headerClassName}
                  isSorted={header.column.getIsSorted()}
                  isSortable={header.column.getCanSort()}
                  toggleSorting={header.column.toggleSorting}
                >
                  <div>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </div>
                </TableContentHeaderColumn>
              );
            })}
        </tr>
      ))}
    </thead>
  );
};

export default memo(TableContentHeader);
