import { flexRender, Header, Row, RowData } from "@tanstack/react-table";
import { includes } from "lodash";
import { ForwardedRef, forwardRef, Fragment, memo } from "react";
import { twMerge } from "tailwind-merge";

import { EndScrollDetectorRefType } from "../../Detector";
import { TableFooterInfinityProps, TableLoadingType } from "../interface";
import TableFooterInfinity from "../TableFooterInfinity/TableFooterInfinity";
import TableContentBodyColumnContent from "./TableContentBodyColumnContent";
import TableBodyEmpty from "./TableContentBodyEmpty";
import TableContentBodySkeleton from "./TableContentBodySkeleton";

interface TableContentProps<T = RowData>
  extends Pick<TableFooterInfinityProps, "pageIndex" | "tableBodyRef" | "onChangePageIndex"> {
  headers: Array<Header<T, unknown>>;
  isShowFooter: TableFooterInfinityProps["isShown"];
  hiddenColumnIds: string[];
  isLoading?: boolean;
  isHardRefetching?: boolean;
  loadingType?: TableLoadingType;
  rows: Array<Row<T>>;
  skeletons?: number;
  renderSubComponent?: ({ row }: { row: Row<T> }) => React.ReactElement;
}

const TableContentBody = (
  {
    rows,
    headers,
    hiddenColumnIds,
    isShowFooter,
    isLoading = false,
    isHardRefetching = false,
    loadingType,
    skeletons = 10,
    tableBodyRef,
    pageIndex,
    onChangePageIndex,
    renderSubComponent,
  }: TableContentProps,
  ref: ForwardedRef<EndScrollDetectorRefType>,
) => {
  return (
    <tbody>
      {rows.length === 0 && !isLoading && <TableBodyEmpty columns={headers.length} />}
      {rows.length > 0 &&
        rows.map((row) => (
          <Fragment key={row.id}>
            <tr>
              {row
                .getVisibleCells()
                .filter(({ column }) => !hiddenColumnIds.includes(column.id))
                .map((cell) => (
                  <td
                    key={cell.id}
                    className={twMerge(
                      "relative border-b border-gray-50 bg-white px-4 py-4 text-left",
                      cell.column.id === "actions" && "sticky right-0",
                      cell.column.columnDef.meta?.className,
                      cell.column.columnDef.meta?.bodyClassName,
                    )}
                  >
                    {((isLoading && loadingType !== "infinite") || isHardRefetching) && (
                      <div className="absolute inset-0 z-10 bg-white bg-opacity-50" />
                    )}
                    <TableContentBodyColumnContent
                      content={flexRender(cell.column.columnDef.cell, cell.getContext())}
                      className={twMerge(includes(cell.column.id, "at") && "whitespace-nowrap")}
                    />
                  </td>
                ))}
            </tr>
            {row.getIsExpanded() && (
              <tr>
                <td className="p-0" colSpan={row.getVisibleCells().length}>
                  {renderSubComponent?.({ row })}
                </td>
              </tr>
            )}
          </Fragment>
        ))}
      <TableFooterInfinity
        as="tr"
        isShown={isShowFooter}
        isTriggerEarly
        ref={ref}
        tableBodyRef={tableBodyRef}
        pageIndex={pageIndex}
        onChangePageIndex={onChangePageIndex}
      >
        {Array.from({ length: skeletons }).map((_, index) => (
          <TableContentBodySkeleton
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            headers={headers.filter((header) => !hiddenColumnIds.includes(header.id))}
          />
        ))}
      </TableFooterInfinity>
      {((rows.length === 0 && isLoading) || (isLoading && !!rows.length && loadingType === "infinite")) &&
        Array.from({ length: skeletons }).map((_, index) => (
          <TableContentBodySkeleton
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            headers={headers.filter((header) => !hiddenColumnIds.includes(header.id))}
          />
        ))}
    </tbody>
  );
};

export default memo(forwardRef(TableContentBody));
