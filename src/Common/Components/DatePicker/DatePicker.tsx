import { memo, useCallback, useMemo, useState } from "react";
import ReactDatePicker from "react-datepicker";

import DatePickerContainer from "./DatePickerContainer";
import { DatePickerProps, DatePickerTypeEnum } from "./interface";

const DatePicker = ({
  name,
  type,
  selectedRangeDate,
  minDate,
  maxDate,
  monthsShown,
  onChange,
}: DatePickerProps) => {
  const [rangeDate, setRangeDate] = useState(selectedRangeDate);

  const selectedDate = useMemo(() => {
    if (!rangeDate) {
      return null;
    }
    if (rangeDate instanceof Date) {
      return rangeDate;
    }
    return rangeDate[0];
  }, [rangeDate]);

  const handleOnChange = useCallback(
    (range: Date | [Date | null, Date | null]) => {
      setRangeDate(range as Date | Date[]);
      if (range instanceof Date) {
        onChange(range);
        return;
      }
      if (!range[0] || !range[1]) {
        return;
      }

      onChange(range as Date[]);
    },
    [onChange],
  );

  return (
    <ReactDatePicker
      name={name}
      selected={selectedDate}
      calendarContainer={DatePickerContainer}
      onChange={handleOnChange}
      {...(type === DatePickerTypeEnum.RANGE && {
        startDate: (rangeDate as Date[])?.[0],
        endDate: (rangeDate as Date[])?.[1],
        selectsRange: true,
        monthsShown,
      })}
      minDate={minDate}
      maxDate={maxDate}
      inline
      disabledKeyboardNavigation
    />
  );
};

export default memo(DatePicker);
