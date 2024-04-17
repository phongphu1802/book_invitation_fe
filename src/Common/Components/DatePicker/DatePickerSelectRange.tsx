import { memo, useCallback } from "react";

import { DatePickerRangeItemType } from "./interface";

export interface DatePickerSelectRangeProps {
  selectedItem: DatePickerRangeItemType;
  onSelected: (selectedItems: DatePickerRangeItemType) => void;
}

const DatePickerSelectRange = ({ selectedItem, onSelected }: DatePickerSelectRangeProps) => {
  const handleSelectedRangeDate = useCallback(() => {
    onSelected(selectedItem);
  }, [onSelected, selectedItem]);

  return (
    <div
      key={selectedItem.name}
      role="button"
      tabIndex={-1}
      className="px-4 py-1.5 hover:bg-gray-100"
      onClick={handleSelectedRangeDate}
    >
      {selectedItem.label}
    </div>
  );
};

export default memo(DatePickerSelectRange);
