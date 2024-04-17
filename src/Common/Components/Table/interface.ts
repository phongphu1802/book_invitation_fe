import { ColumnDef, PaginationState, Row, RowSelectionState, TableState } from "@tanstack/react-table";
import { MouseEventHandler, MutableRefObject, ReactElement, ReactNode } from "react";

import { ContainerProps } from "../Container";
import { EndScrollDetectorProps } from "../Detector";
import { TableViewModeEnum } from "./constant";
import { BaseListQueryType, ResponseMetaType, TableOnclickFunctionType } from "../../../App/Types/Common";
import { ComponentStatusType } from "../interface";

export enum TableFilterTypeEnum {
  DATE_RANGE = "date_range",
  ENUM = "enum",
  UNDEFINE = "undefine",
}

export type TableLoadingType = "pagination" | "infinite";

export interface TableProps<TData = TableDataGenericType> {
  id?: string; // use when you want to filter without adding url (child table)
  columns: Array<ColumnDef<TData, unknown>>;
  columnVisibility?: TableState["columnVisibility"];
  children?: ReactElement;
  data: TData[];
  isLoading?: boolean;
  isHardRefetching?: boolean;
  isShowHeader?: boolean;
  isShowFooter?: boolean;
  isShowViewToggle?: boolean;
  headerFilterClassName?: string;
  footerClassName?: string;
  loadingType?: TableLoadingType;
  searchGroup?: TableSearchGroupType[];
  skeletons?: number;
  meta: ResponseMetaType | null;
  pageSizes?: number[];
  enableMultiRowSelection?: boolean;
  viewMode?: TableViewModeEnum;
  renderSubComponent?: ({ row }: { row: Row<TData> }) => React.ReactElement;
  getRowCanExpand?: (row: Row<TData>) => boolean;
  onChangeState?: (state: BaseListQueryType) => void;
  onChangeRowSelection?: (rowSelection: RowSelectionState) => void;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TableDataGenericType = any;

export interface TableFilterOptionItemType extends Record<string, string> {
  id: string;
  label: string;
  value: string;
}

export interface TableSearchGroupType {
  key: string;
  label: string;
  field: Record<string, string>;
}

export interface TablePaginationType extends Omit<PaginationState, "pageIndex" | "pageSize"> {
  pageIndex: number;
  pageSize: number;
  totalRows?: number;
  totalPages?: number;
}

export interface TableRowActionDropdownItemType extends Record<string, unknown> {
  key: string;
  label: string;
  icon?: JSX.Element;
  className?: string;
  isDisabled?: boolean;
  onClick: TableOnclickFunctionType;
}

export interface TableFooterInfinityProps
  extends Pick<ContainerProps, "as">,
    Pick<EndScrollDetectorProps, "isTriggerEarly"> {
  children?: ReactElement | ReactElement[];
  isShown: boolean;
  tableBodyRef: MutableRefObject<HTMLDivElement | null>;
  pageIndex: number;
  onChangePageIndex: (page: number) => void;
}

interface BaseTableRowActionProps {
  children: ReactNode;
  isDisabled?: boolean;
  status?: ComponentStatusType;
  title?: string;
  type?: "button" | "div";
}

export interface ButtonTableRowActionProps<T = unknown> extends BaseTableRowActionProps {
  data: T;
  type: "button";
  onClick: TableOnclickFunctionType<T>;
}

export interface DivTableRowActionProps extends BaseTableRowActionProps {
  data?: never;
  type: "div";
  onClick?: MouseEventHandler<HTMLDivElement>;
}

export type TableRowActionProps<T = unknown> = ButtonTableRowActionProps<T> | DivTableRowActionProps;

interface IBaseTableRowActionDropdownMenuItem {
  type?: "button" | "divider";
  key: string;
}

interface IButtonTableRowActionDropdownMenuItem<T = unknown> extends IBaseTableRowActionDropdownMenuItem {
  className?: string;
  type?: "button";
  icon?: ReactElement;
  label: string;
  onClick: TableOnclickFunctionType<T>;
}

interface IDividerTableRowActionDropdownMenuItem extends IBaseTableRowActionDropdownMenuItem {
  type: "divider";
}

export type ITableRowActionDropdownMenuItem<T = unknown> =
  | IButtonTableRowActionDropdownMenuItem<T>
  | IDividerTableRowActionDropdownMenuItem;
