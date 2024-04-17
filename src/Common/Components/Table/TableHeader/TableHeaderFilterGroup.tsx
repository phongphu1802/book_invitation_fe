import { Header } from "@tanstack/react-table";
import { MutableRefObject, memo } from "react";

import { TableDataGenericType } from "../interface";
import TableHeaderFilter from "./TableHeaderFilter";

export interface TableRefType {
  onClickClearAll: () => void;
}

export interface TableHeaderFilterGroupProps<TData = TableDataGenericType> {
  id?: string;
  tableFilterRef: MutableRefObject<MutableRefObject<TableRefType | null>[]>;
  filterClassName?: string;
  headers: Header<TData, unknown>[];
  onChangeFilters?: (filterBy: string | string[], filterValues: string[] | Date[]) => void;
}

const TableHeaderFilterGroup = ({
  id,
  tableFilterRef,
  filterClassName,
  headers,
  onChangeFilters,
}: TableHeaderFilterGroupProps) => {
  return (
    <>
      {headers.map((header, index) => (
        <TableHeaderFilter
          id={id}
          key={header.id}
          className={filterClassName}
          header={header}
          onChangeFilters={onChangeFilters}
          ref={tableFilterRef.current[index]}
        />
      ))}
    </>
  );
};

export default memo(TableHeaderFilterGroup);
