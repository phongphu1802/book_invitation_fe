import { SortDirection } from "@tanstack/react-table";
import { memo } from "react";
import { TbArrowNarrowDown, TbArrowNarrowUp } from "react-icons/tb";
import { twMerge } from "tailwind-merge";

interface TableContentHeaderSortIconProps {
  isSorted: boolean | SortDirection;
  className?: string;
}

const TableContentHeaderSortIcon = ({ isSorted, className }: TableContentHeaderSortIconProps) => {
  return (
    <div
      className={twMerge(
        "flex flex-col items-center justify-center",
        className,
        isSorted === false ? "text-gray-300" : "opacity-100",
      )}
    >
      {isSorted === "asc" || isSorted === undefined || isSorted === false ? (
        <TbArrowNarrowUp size={18} />
      ) : (
        <TbArrowNarrowDown size={18} />
      )}
    </div>
  );
};

export default memo(TableContentHeaderSortIcon);
