import { memo } from "react";

import TableFooterPageSizeSelectorMenuItem from "./TableFooterPageSizeSelectorMenuItem";

interface TableFooterPageSizeSelectorMenuProps {
  sizes: number[];
  selected: number;
  onChange: (size: number) => void;
}

const TableFooterPageSizeSelectorMenu = ({
  sizes,
  selected,
  onChange,
}: TableFooterPageSizeSelectorMenuProps) => {
  return (
    <div>
      {sizes.map((size) => (
        <TableFooterPageSizeSelectorMenuItem
          key={size}
          isSelected={selected === size}
          size={size}
          onChange={onChange}
        />
      ))}
    </div>
  );
};

export default memo(TableFooterPageSizeSelectorMenu);
