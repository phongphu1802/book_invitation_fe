import { ReactNode, memo } from "react";
import { CalendarContainer } from "react-datepicker";

export interface DatePickerContainerProps {
  children: ReactNode;
}

const DatePickerContainer = ({ children }: DatePickerContainerProps) => {
  return (
    <CalendarContainer className="relative flex px-4 bg-white border-l-2 border-gray-100">
      {children}
    </CalendarContainer>
  );
};

export default memo(DatePickerContainer);
