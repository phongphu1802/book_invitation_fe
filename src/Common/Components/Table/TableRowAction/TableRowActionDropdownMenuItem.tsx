import { memo, useCallback } from "react";
import { twMerge } from "tailwind-merge";

import { ITableRowActionDropdownMenuItem } from "../interface";
import { TableOnclickFunctionType } from "../../../../App/Types/Common";

export interface TableRowActionDropdownMenuItemProps<T> {
  data: ITableRowActionDropdownMenuItem<T>;
  onClick: (callback: TableOnclickFunctionType<T>) => void;
}

const TableRowActionDropdownMenuItem = <T extends unknown>({
  data,
  onClick,
}: TableRowActionDropdownMenuItemProps<T>) => {
  const handleClick = useCallback(() => {
    if (data.type === "divider") return;

    onClick(data.onClick);
  }, [data, onClick]);

  if (data.type === "divider")
    return (
      <div className="px-5 py-2">
        <div className="border-b-2 border-gray-100" />
      </div>
    );

  return (
    <button
      className={twMerge("flex w-full items-center space-x-4 px-4 py-1.5 hover:bg-gray-100", data.className)}
      type="button"
      onClick={handleClick}
    >
      <div className="flex items-center justify-center w-6 h-6">{data.icon}</div>
      <div>{data.label}</div>
    </button>
  );
};

export default memo(TableRowActionDropdownMenuItem) as typeof TableRowActionDropdownMenuItem;
