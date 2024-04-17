import { ReactNode, memo, useCallback, useMemo } from "react";
import { twMerge } from "tailwind-merge";

import { TableViewModeEnum } from "../constant";

export interface TableHeaderViewModeItemProps {
  icon: ReactNode;
  mode: TableViewModeEnum;
  viewMode: TableViewModeEnum;
  onChangeViewMode: (mode: TableViewModeEnum) => void;
}

const TableHeaderViewModeItem = ({
  icon,
  mode,
  viewMode,
  onChangeViewMode,
}: TableHeaderViewModeItemProps) => {
  const isSelected = useMemo(() => viewMode === mode, [viewMode, mode]);

  const handleChangeViewMode = useCallback(() => {
    if (!isSelected) {
      onChangeViewMode(mode);
    }
  }, [onChangeViewMode, isSelected, mode]);

  return (
    <div
      className={twMerge(
        "flex h-6 w-6 items-center justify-center rounded duration-100 hover:bg-gray-200",
        isSelected && "bg-white hover:bg-white",
      )}
      role="button"
      tabIndex={0}
      onClick={handleChangeViewMode}
    >
      {icon}
    </div>
  );
};

export default memo(TableHeaderViewModeItem);
