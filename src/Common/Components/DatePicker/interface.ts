import { RefObject } from "react";
import { ReactDatePickerProps } from "react-datepicker";

export interface DatePickerProps extends Omit<ReactDatePickerProps, "onChange"> {
  name: string;
  selectedRangeDate: Date | Date[] | null;
  type: DatePickerTypeEnum;
  onChange: (selectedItems: Date | Date[]) => void;
}

export interface DatePickerDropdownProps extends Omit<DatePickerProps, "onChange"> {
  containerRef: RefObject<HTMLDivElement>;
  className?: string;
  isForceShowEntireDatePicker?: boolean;
  isShowClearSelected?: boolean;
  onClearSelectedRangeDate?: VoidFunction;
  onChangeRangeDate: (selectedItems: Date | Date[]) => void;
  onHide: VoidFunction;
}

export interface DatePickerRangeItemType {
  name: DatePickerRangeNameEnum;
  label: string;
}

export enum DatePickerRangeNameEnum {
  TODAY = "today",
  YESTERDAY = "yesterday",
  LAST_7_DAYS = "last_7_days",
  LAST_30_DAYS = "last_30_days",
  THIS_MONTH = "this_month",
  LAST_MONTH = "last_month",
  CUSTOM_RANGE = "custom_range",
}

export enum DatePickerTypeEnum {
  SINGLE = "single",
  RANGE = "range",
}
