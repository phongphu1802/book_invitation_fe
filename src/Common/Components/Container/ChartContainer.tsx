import { twMerge } from "tailwind-merge";
import _ from "lodash";
import dayjs from "dayjs";

import { ContainerChartProps } from "./interface";
import { DatePickerTypeEnum } from "../DatePicker";
import UncontrolledInputDatePicker from "../Form/Input/InputDatePicker/UncontrolledInputDatePicker";
import ChartContainerSelectType from "./ChartContainerSelectType";
import { DashboardTypeEnum } from "../../../App/Enums";

const ChartContainer = ({
  title,
  children,
  classNameContainer,
  classNameTitle,
  valueRange,
  valueType,
  onChangeType,
  onChangeRange,
}: ContainerChartProps) => {
  const handleChangeRange = (data: Date | Date[] | null) => {
    if (_.isFunction(onChangeRange) && _.isArray(data)) {
      const temp = data.map((value) => dayjs(value).format("YYYY-MM-DD"));
      onChangeRange(temp);
    }
  };

  const handleChangeType = (value: DashboardTypeEnum) => {
    if (_.isFunction(onChangeType)) onChangeType(value);
  };

  return (
    <div className={twMerge("p-5 bg-white/30 rounded-xl", classNameContainer)}>
      <div className="grid grid-cols-2 mb-2">
        <div className={twMerge("font-bold text-xl line-clamp-1", classNameTitle)}>{title}</div>
        <div className="grid justify-items-end">
          <div className="flex gap-2">
            {_.isFunction(onChangeType) && (
              <ChartContainerSelectType valueType={valueType} onChangeType={handleChangeType} />
            )}
            {_.isFunction(onChangeRange) && (
              <UncontrolledInputDatePicker
                name="datepicker"
                type={DatePickerTypeEnum.RANGE}
                value={valueRange}
                onChange={handleChangeRange}
              />
            )}
          </div>
        </div>
      </div>
      {children}
    </div>
  );
};
export default ChartContainer;
