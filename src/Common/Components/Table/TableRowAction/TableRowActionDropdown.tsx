import { memo, useCallback } from "react";
import { TbMenu2 } from "react-icons/tb";

import TableRowAction from "./TableRowAction";
import TableRowActionDropdownMenu, { TableRowActionDropdownMenuProps } from "./TableRowActionDropdownMenu";
import { TableOnclickFunctionType } from "../../../../App/Types/Common";
import { Dropdown } from "../../Dropdown";

interface TableRowActionDropdownProps<T = unknown> extends Pick<TableRowActionDropdownMenuProps<T>, "items"> {
  data: T;
}

const TableRowActionDropdown = <T extends unknown>({ data, items }: TableRowActionDropdownProps<T>) => {
  const handleClickMenu = useCallback(
    (callback: TableOnclickFunctionType<T>) => {
      callback(data);
    },
    [data],
  );

  return (
    <Dropdown
      menu={<TableRowActionDropdownMenu<T> items={items} onClick={handleClickMenu} />}
      menuClassName="px-0 py-0"
    >
      <TableRowAction type="div">
        <TbMenu2 />
      </TableRowAction>
    </Dropdown>
  );
};

export default memo(TableRowActionDropdown) as typeof TableRowActionDropdown;
