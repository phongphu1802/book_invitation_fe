import { memo, useMemo, useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import { twMerge } from "tailwind-merge";

import { TablePaginationType } from "../interface";
import TableFooterPageSizeSelectorMenu from "./TableFooterPageSizeSelectorMenu";
import { Dropdown } from "../../Dropdown";

export interface TableFooterPageSizeSelectorProps {
  sizes?: number[];
  pageSize: TablePaginationType["pageSize"];
  onChangePageSize: (pageSize: number) => void;
}

const TableFooterPageSizeSelector = ({
  sizes,
  pageSize,
  onChangePageSize,
}: TableFooterPageSizeSelectorProps) => {
  const [isShowingMenu, setIsShowingMenu] = useState(false);

  const pageSizeOptions = useMemo(() => sizes ?? [10, 25, 50, 100], [sizes]);

  return (
    <Dropdown
      menu={
        <TableFooterPageSizeSelectorMenu
          sizes={pageSizeOptions}
          selected={pageSize}
          onChange={onChangePageSize}
        />
      }
      menuClassName="w-20 px-0 py-3"
      position="left"
      onToggle={setIsShowingMenu}
    >
      <div
        className={twMerge(
          "flex cursor-pointer items-center space-x-1 rounded-lg bg-gray-100 py-2 pl-4 pr-3 text-sm font-semibold duration-100 hover:bg-gray-200",
          isShowingMenu && "bg-gray-200",
        )}
      >
        <span>{pageSize}</span>
        <BiChevronDown size={18} />
      </div>
    </Dropdown>
  );
};

export default memo(TableFooterPageSizeSelector);
