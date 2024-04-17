import {
  ColumnSort,
  ExpandedState,
  getCoreRowModel,
  getExpandedRowModel,
  RowSelectionState,
  useReactTable,
} from "@tanstack/react-table";
import { first, isEmpty } from "lodash";
import {
  cloneElement,
  ForwardedRef,
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";

import { EndScrollDetectorRefType } from "../Detector";
import { TableViewModeEnum } from "./constant";
import { TablePaginationType, TableProps } from "./interface";
import { selectorColumn } from "./TableColumn/SelectorColumn";
import TableContentBody from "./TableContentBody/TableContentBody";
import TableContentHeader from "./TableContentHeader/TableContentHeader";
import TableFooter from "./TableFooter";
import TableFooterInfinity from "./TableFooterInfinity/TableFooterInfinity";
import TableHeader from "./TableHeader/TableHeader";
import { useConfig, useWatchParam } from "../../Hooks";
import { ConfigKeyEnum } from "../../../App/Enums";
import { TableFilterStateType } from "../../../App/Types/Common";
import { normalizeTableColumns } from "../../Utils/Helpers/tableHelper";

interface PaginationRefType {
  onChangePageIndex: (page: number) => void;
}

const Table = (
  {
    id,
    columns: columnsProp,
    columnVisibility,
    children,
    data,
    enableMultiRowSelection = true,
    footerClassName,
    headerFilterClassName,
    isLoading = false,
    isHardRefetching = false,
    isShowFooter = true,
    isShowViewToggle: isShowViewToggleProp = true,
    isShowHeader,
    loadingType = "pagination",
    searchGroup,
    skeletons,
    meta,
    pageSizes,
    viewMode: viewModeProp = TableViewModeEnum.GRID,
    renderSubComponent,
    getRowCanExpand,
    onChangeState,
    onChangeRowSelection,
  }: TableProps,
  ref: ForwardedRef<unknown>,
) => {
  const config = useConfig();

  const paginationRef = useRef<PaginationRefType | null>(null);
  const tableBodyRef = useRef<HTMLDivElement>(null);
  const defaultPageSize = useMemo(() => config(ConfigKeyEnum.PAGINATION_PAGE_SIZE), [config]);
  const totalRows = useMemo(() => meta?.total ?? 0, [meta]);

  const infinityFooterRef = useRef<EndScrollDetectorRefType>(null);

  // Find the largest pageSize value from `Number(defaultPageSize)` value that can be divided by all divisors of `first(pageSizes)`.
  // If not found, return the first value of `pageSizes`.
  const pageSizeValue = useMemo(() => {
    if (!pageSizes || !pageSizes.length) {
      return Number(defaultPageSize);
    }

    const pageSize = Number(defaultPageSize);
    const firstPageSizeOption = first(pageSizes)!;
    const firstPageSizeOptionDivisors = Array.from({ length: firstPageSizeOption + 1 }, (_, i) => i).filter(
      (i) => firstPageSizeOption % i === 0,
    );
    let value = pageSize;

    while (value > firstPageSizeOption) {
      // eslint-disable-next-line @typescript-eslint/no-loop-func
      const isDividedByAllDivisors = firstPageSizeOptionDivisors.every((divisor) => value % divisor === 0);

      if (isDividedByAllDivisors) {
        return value;
      }

      value -= 1;
    }

    return value;
  }, [defaultPageSize, pageSizes]);

  const [totalPages, setTotalPages] = useState(1);
  const [pagination, setPagination] = useState<TablePaginationType>({
    pageIndex: 0,
    pageSize: pageSizeValue,
  });

  const [columnSorting, setColumnSorting] = useState<ColumnSort[]>([]);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [columnFilter, setColumnFilter] = useState<TableFilterStateType[]>([]);
  const [expanded, setExpanded] = useState<ExpandedState>({});
  const [viewMode, setViewMode] = useState<TableViewModeEnum>(viewModeProp);
  const [filterParam] = useWatchParam("filter");

  const columns = useMemo(() => [selectorColumn, ...columnsProp], [columnsProp]);
  const isGridView = useMemo(() => !!children && viewMode === TableViewModeEnum.GRID, [children, viewMode]);
  const isShowViewToggle = useMemo(
    () => isShowViewToggleProp && !!children,
    [isShowViewToggleProp, children],
  );

  const table = useReactTable({
    columns: normalizeTableColumns(columns),
    data,
    manualSorting: true,
    manualPagination: true,
    state: {
      pagination,
      sorting: columnSorting,
      rowSelection,
      columnVisibility,
      expanded,
    },
    pageCount: totalPages,
    enableMultiRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getRowId: (row) => row.id || row.code || row.key || row.name || 0,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setColumnSorting,
    onPaginationChange: setPagination,
    onExpandedChange: setExpanded,
    getRowCanExpand,
    getExpandedRowModel: getExpandedRowModel(),
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const tableRows = useMemo(() => table.getRowModel().rows, [table, data]);
  const tableHeaderGroup = useMemo(() => table.getHeaderGroups(), [table]);

  const handleChangeViewMode = useCallback(
    (mode: TableViewModeEnum) => {
      setViewMode(mode);
    },
    [setViewMode],
  );

  const handleChangePageSize = useCallback(
    (pageSize: number) => {
      table.setPagination({
        pageSize,
        pageIndex: 0,
      });
    },
    [table],
  );

  const hiddenColumnIds = useMemo(() => {
    return tableHeaderGroup[0].headers
      .filter(
        ({
          column: {
            columnDef: { meta: columnDefMeta },
          },
        }) => columnDefMeta?.isHiddenColumn,
      )
      .map((header) => header.id);
  }, [tableHeaderGroup]);

  const handleChangePageIndex = useCallback(
    (page: number) => {
      paginationRef.current?.onChangePageIndex(page);
      table.setPageIndex(page);
    },
    [table],
  );

  const handleResetPageIndex = useCallback(() => {
    handleChangePageIndex?.(0);
  }, [handleChangePageIndex]);

  const handleChangeFilter = useCallback(
    (filter: TableFilterStateType[]) => {
      setColumnFilter?.(filter);
      handleResetPageIndex();
    },
    [handleResetPageIndex],
  );

  useEffect(() => {
    const paginationOptions = pagination;
    const newTotalPages = Math.ceil(totalRows / paginationOptions.pageSize) || 1;

    setTotalPages(newTotalPages);
  }, [pagination, totalRows]);

  useEffect(() => {
    if (filterParam && isEmpty(columnFilter) && !id) {
      return;
    }

    onChangeState?.({
      filterParams: columnFilter,
      sortParams: columnSorting,
      pageIndex: pagination.pageIndex,
      pageSize: pagination.pageSize,
      loadingType,
    });
  }, [columnFilter, columnSorting, filterParam, loadingType, pagination, onChangeState, id]);

  useEffect(() => {
    onChangeRowSelection?.(rowSelection);
  }, [rowSelection, onChangeRowSelection]);

  useEffect(() => {
    infinityFooterRef.current?.calculatePosition();
  }, [tableRows]);

  useImperativeHandle(
    ref,
    () => ({
      onResetPageIndex: handleResetPageIndex,
    }),
    [handleResetPageIndex],
  );

  return (
    <div>
      {isShowHeader !== false && (
        <TableHeader
          id={id}
          isShowViewToggle={isShowViewToggle}
          filterClassName={headerFilterClassName}
          columnFilter={columnFilter}
          headerGroups={tableHeaderGroup}
          searchGroup={searchGroup}
          viewMode={viewMode}
          onChangeViewMode={handleChangeViewMode}
          onChangeFilter={handleChangeFilter}
        />
      )}
      <div ref={tableBodyRef}>
        {isGridView &&
          cloneElement(children!, {
            ...children!.props,
            rows: tableRows,
            rowSelection,
            data,
            isLoading,
            isHardRefetching,
            loadingType,
          })}
        {!isGridView && (
          <div className="overflow-auto">
            <table className="relative min-w-full">
              <TableContentHeader headerGroups={tableHeaderGroup} hiddenColumnIds={hiddenColumnIds} />
              <TableContentBody
                rows={tableRows}
                headers={tableHeaderGroup[0].headers}
                isLoading={isLoading}
                isHardRefetching={isHardRefetching}
                isShowFooter={
                  !!tableRows.length && !isLoading && isShowFooter && pagination.pageIndex + 1 < totalPages
                }
                loadingType={loadingType}
                hiddenColumnIds={hiddenColumnIds}
                renderSubComponent={renderSubComponent}
                skeletons={skeletons ?? pageSizes?.[0]}
                pageIndex={pagination.pageIndex}
                tableBodyRef={tableBodyRef}
                onChangePageIndex={handleChangePageIndex}
              />
            </table>
          </div>
        )}
      </div>
      {(!!tableRows.length || isLoading) && isShowFooter && loadingType === "pagination" && (
        <TableFooter
          className={footerClassName}
          dataLength={tableRows.length}
          isLoading={isLoading}
          ref={paginationRef}
          sizes={pageSizes}
          totalRows={totalRows ?? 0}
          totalPages={totalPages}
          pageIndex={pagination.pageIndex}
          pageSize={table.getState().pagination.pageSize}
          onChangePageIndex={table.setPageIndex}
          onChangePageSize={handleChangePageSize}
        />
      )}
      {isGridView && loadingType === "infinite" && (
        <TableFooterInfinity
          as="div"
          isShown={!!tableRows.length && !isLoading && isShowFooter}
          isTriggerEarly
          ref={infinityFooterRef}
          tableBodyRef={tableBodyRef}
          pageIndex={pagination.pageIndex}
          onChangePageIndex={table.setPageIndex}
        />
      )}
    </div>
  );
};

export default memo(forwardRef(Table));
