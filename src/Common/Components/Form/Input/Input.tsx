import { omit } from "lodash";
import { ForwardedRef, forwardRef, memo } from "react";
import { useController } from "react-hook-form";

import { InputProps } from "../interface";
import UncontrolledInput from "./UncontrolledInput";

const Input = ({ name, control, ...props }: InputProps, ref: ForwardedRef<HTMLInputElement>) => {
  if (!control?.register) {
    return <UncontrolledInput name={name} ref={ref} {...props} />;
  }

  const {
    field: { value = "", onChange, onBlur },
    formState: { errors },
  } = useController({
    name,
    control,
  });

  return (
    <UncontrolledInput
      value={value ?? null}
      error={errors[name]?.message as string}
      onChange={onChange}
      onBlur={onBlur}
      {...omit(props, ["value", "onChange", "onBlur"])}
    />
  );
};

export default memo(forwardRef(Input));
