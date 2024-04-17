import { memo, useCallback, useMemo } from "react";

import { Checkbox } from "../../Form";
import { TableFilterOptionItemType } from "../interface";

interface TableHeaderFilterDropdownOptionItemProps {
  option: TableFilterOptionItemType;
  filterBy: string;
  maxSelection: boolean;
  selectedFilters: string[];
  onChange: (value: string, checked: boolean) => void;
}

const TableHeaderFilterDropdownOptionItem = ({
  option,
  filterBy,
  maxSelection,
  selectedFilters,
  onChange,
}: TableHeaderFilterDropdownOptionItemProps) => {
  const value = useMemo(() => option.value, [option]);
  const id = useMemo(() => option.id, [option]);

  const handleChangeCheckbox = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const isChecked = e.target.checked;
      onChange(value, isChecked);
    },
    [onChange, value],
  );

  return (
    <label htmlFor={id} className="group flex items-center justify-start space-x-3 py-1">
      <Checkbox
        id={id}
        name={filterBy}
        type={maxSelection ? "radio" : "checkbox"}
        checked={selectedFilters.includes(value)}
        className="h-5 w-5 rounded-full"
        onChange={handleChangeCheckbox}
      />
      <span className="max-w-[180px] truncate">{option.label}</span>
    </label>
  );
};

export default memo(TableHeaderFilterDropdownOptionItem);
