import { omit } from "lodash";
import { memo } from "react";
import { useController } from "react-hook-form";

import { TextareaProps } from "../interface";
import UncontrolledTextarea from "./UncontrolledTextarea";

const Textarea = ({ name, control, ...props }: TextareaProps) => {
  if (!control?.register) {
    return <UncontrolledTextarea name={name} {...props} />;
  }

  const {
    field: { value = "", onChange, onBlur },
    formState: { errors },
  } = useController({
    name,
    control,
  });

  return (
    <UncontrolledTextarea
      value={value ?? null}
      error={errors[name]?.message as string}
      onChange={onChange}
      onBlur={onBlur}
      {...omit(props, ["value", "onChange", "onBlur"])}
    />
  );
};

export default memo(Textarea);
