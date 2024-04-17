import { useMemo } from "react";

import { ITableRowActionDropdownMenuItem } from "../interface";
import TableRowActionDropdownMenuItem, {
  TableRowActionDropdownMenuItemProps,
} from "./TableRowActionDropdownMenuItem";

export interface TableRowActionDropdownMenuProps<T>
  extends Pick<TableRowActionDropdownMenuItemProps<T>, "onClick"> {
  items: Array<ITableRowActionDropdownMenuItem<T> | boolean | null | undefined>;
}

const TableRowActionDropdownMenu = <T extends unknown>({
  items,
  onClick,
}: TableRowActionDropdownMenuProps<T>) => {
  const filteredItems = useMemo(() => items.filter(Boolean) as ITableRowActionDropdownMenuItem<T>[], [items]);

  return (
    <div className="flex flex-col space-y-0 py-2">
      {filteredItems.filter(Boolean).map((item) => (
        <TableRowActionDropdownMenuItem<T> key={item.key} data={item} onClick={onClick} />
      ))}
    </div>
  );
};

export default TableRowActionDropdownMenu;
