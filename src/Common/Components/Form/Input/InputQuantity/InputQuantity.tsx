import { omit } from "lodash";
import { ForwardedRef, forwardRef, memo } from "react";
import { useController } from "react-hook-form";

import UncontrolledInputQuantity from "./UncontrolledInputQuantity";
import { InputQuantityProps } from "../../interface";

const InputQuantity = (
  { name, control, ...props }: InputQuantityProps,
  ref: ForwardedRef<HTMLInputElement>,
) => {
  if (!control?.register) {
    return <UncontrolledInputQuantity name={name} ref={ref} {...props} />;
  }

  const {
    field: { value = 0, onChange, onBlur },
    formState: { errors },
  } = useController({
    name,
    control,
  });

  return (
    <UncontrolledInputQuantity
      value={value ?? 0}
      error={errors[name]?.message as string}
      onChange={onChange}
      onBlur={onBlur}
      {...omit(props, ["value", "onChange", "onBlur"])}
    />
  );
};

export default memo(forwardRef(InputQuantity));
