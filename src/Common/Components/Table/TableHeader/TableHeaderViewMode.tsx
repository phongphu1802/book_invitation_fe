import { memo } from "react";
import { HiOutlineViewGrid } from "react-icons/hi";
import { TbListDetails } from "react-icons/tb";

import { TableViewModeEnum } from "../constant";
import TableHeaderViewModeItem, { TableHeaderViewModeItemProps } from "./TableHeaderViewModeItem";

export type TableHeaderViewModeProps = Pick<TableHeaderViewModeItemProps, "viewMode" | "onChangeViewMode">;

const TableHeaderViewMode = ({ viewMode, onChangeViewMode }: TableHeaderViewModeProps) => {
  return (
    <div className="flex h-10 items-center justify-center space-x-2 rounded-lg border-2 border-gray-100 bg-gray-50 px-2">
      <TableHeaderViewModeItem
        icon={<TbListDetails />}
        mode={TableViewModeEnum.LIST}
        viewMode={viewMode}
        onChangeViewMode={onChangeViewMode}
      />
      <TableHeaderViewModeItem
        icon={<HiOutlineViewGrid />}
        mode={TableViewModeEnum.GRID}
        viewMode={viewMode}
        onChangeViewMode={onChangeViewMode}
      />
    </div>
  );
};

export default memo(TableHeaderViewMode);
