import { DashboardTypeEnum } from "../../../App/Enums";
import UncontrolledSelect from "../Form/Select/UncontrolledSelect";
import { ChartContainerSelectTypeProps } from "./interface";

const ChartContainerSelectType = ({ valueType, onChangeType }: ChartContainerSelectTypeProps) => {
  const handleOnChangeType = (value: any) => {
    onChangeType(value?.value || value);
  };

  const optionSelecType = [
    { label: "Day", value: DashboardTypeEnum.DAY },
    { label: "Month", value: DashboardTypeEnum.MONTH },
    { label: "Year", value: DashboardTypeEnum.YEAR },
  ];

  return (
    <UncontrolledSelect
      name="selectType"
      value={valueType}
      onChange={handleOnChangeType}
      options={optionSelecType}
      className="bg-white rounded-lg"
    />
  );
};
export default ChartContainerSelectType;
