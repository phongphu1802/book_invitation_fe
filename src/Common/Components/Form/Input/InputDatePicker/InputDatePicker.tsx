import { omit } from "lodash";
import { ForwardedRef, forwardRef, memo, useCallback, useMemo } from "react";
import { useController } from "react-hook-form";

import { DatePickerTypeEnum } from "../../../DatePicker";
import { InputDatePickerProps } from "../../interface";
import UncontrolledInputDatePicker from "./UncontrolledInputDatePicker";

const InputDatePicker = (
  { name, type, control, ...props }: InputDatePickerProps,
  ref: ForwardedRef<HTMLInputElement>,
) => {
  if (!control || !control.register) {
    return <UncontrolledInputDatePicker name={name} type={type} ref={ref} {...props} />;
  }

  const defaultValue = useMemo(() => (type === DatePickerTypeEnum.RANGE ? [] : ""), [type]);

  const {
    field: { value = defaultValue, onChange },
    formState: { errors },
  } = useController({
    name,
    control,
  });

  const handleOnChange = useCallback(
    (rangeDate: Date | Date[] | null) => {
      onChange(rangeDate);
    },
    [onChange],
  );

  return (
    <UncontrolledInputDatePicker
      name={name}
      value={value ?? defaultValue}
      type={type}
      error={errors[name]?.message as string}
      onChange={handleOnChange}
      {...omit(props, ["value", "onChange", "type"])}
    />
  );
};

export default memo(forwardRef(InputDatePicker));
