import { omit } from "lodash";
import { memo, useCallback } from "react";
import { useController } from "react-hook-form";

import { InputOTPProps } from "../../interface";
import UncontrolledInputOTP from "./UncontrolledInputOTP";

const InputOTP = ({ name, quantity, control, ...props }: InputOTPProps) => {
  if (!control?.register) {
    return <UncontrolledInputOTP name={name} quantity={quantity} {...props} />;
  }

  const {
    field: { value = "", onChange },
    formState: { errors },
  } = useController({
    name,
    control,
  });

  const handleOnChange = useCallback(
    (inputOTP: string) => {
      onChange(inputOTP);
    },
    [onChange],
  );

  return (
    <UncontrolledInputOTP
      quantity={quantity}
      value={value ?? null}
      error={errors[name]?.message as string}
      onChange={handleOnChange}
      {...omit(props, ["value", "onChange"])}
    />
  );
};

export default memo(InputOTP);
