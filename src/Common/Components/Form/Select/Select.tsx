import { get, omit } from "lodash";
import { memo, useCallback } from "react";
import { useController } from "react-hook-form";
import { ActionMeta } from "react-select";

import { SelectProps } from "../interface";
import UncontrolledSelect from "./UncontrolledSelect";

const Select = ({ control, name, ...props }: SelectProps) => {
  if (!control || !control.register) {
    return <UncontrolledSelect name={name} {...props} />;
  }

  const {
    field: { value, onChange, onBlur },
    formState: { errors },
  } = useController({
    name,
    control,
  });

  const handleChange = useCallback(
    (newValue: unknown, actionMeta: ActionMeta<unknown>) => {
      onChange(get(newValue, "value"), actionMeta);
    },
    [onChange],
  );

  return (
    <UncontrolledSelect
      name={name}
      error={errors[name]?.message as string}
      value={value}
      onChange={handleChange}
      onBlur={onBlur}
      {...omit(props, ["value", "onChange", "onBlur", "ariaLiveMessages"])}
    />
  );
};
export default memo(Select);
