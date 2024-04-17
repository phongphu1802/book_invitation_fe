import { FormEventHandler, memo } from "react";

import { Checkbox } from "../Form";

export interface TableSelectorColumnHeaderProps {
  isSelectedAll: boolean;
  isSelectedSome: boolean;
  onChange: FormEventHandler<HTMLInputElement>;
}

const TableSelectorColumnHeader = ({
  isSelectedAll,
  isSelectedSome,
  onChange,
}: TableSelectorColumnHeaderProps) => {
  return (
    <div className="flex items-center justify-start pt-1">
      <Checkbox
        name="tableSelectorHeader"
        checked={isSelectedAll}
        indeterminate={isSelectedSome}
        onChange={onChange}
      />
    </div>
  );
};

export default memo(TableSelectorColumnHeader);
