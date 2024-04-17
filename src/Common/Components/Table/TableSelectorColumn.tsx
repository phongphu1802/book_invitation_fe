import { nanoid } from "@reduxjs/toolkit";
import { FormEventHandler, memo } from "react";

import { Checkbox } from "../Form";

export interface TableSelectorColumnProps {
  isSelected?: boolean;
  onToggle: FormEventHandler<HTMLInputElement>;
}

const TableSelectorColumn = ({ isSelected, onToggle }: TableSelectorColumnProps) => {
  return (
    <div className="flex items-center w-5 pt-1">
      <Checkbox name={`tableSelector${nanoid()}`} checked={isSelected} onChange={onToggle} />
    </div>
  );
};

export default memo(TableSelectorColumn);
