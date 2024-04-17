import { memo, useCallback } from "react";
import { twMerge } from "tailwind-merge";

import { DropdownItem } from "../../Dropdown";

interface TableFooterPageSizeSelectorMenuItemProps {
  isSelected?: boolean;
  size: number;
  onChange: (size: number) => void;
}

const TableFooterPageSizeSelectorMenuItem = ({
  isSelected,
  size,
  onChange,
}: TableFooterPageSizeSelectorMenuItemProps) => {
  const handleChange = useCallback(() => {
    if (isSelected) return;

    onChange(size);
  }, [isSelected, onChange, size]);

  return (
    <DropdownItem
      text={String(size)}
      className={twMerge("justify-center", isSelected && "bg-gray-100")}
      onClick={handleChange}
    />
  );
};

export default memo(TableFooterPageSizeSelectorMenuItem);
