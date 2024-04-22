import { omit } from "lodash";
import { memo } from "react";
import { Control, useController } from "react-hook-form";

import UncontrolledUploadInput, { UncontrolledUploadInputProps } from "./UncontrolledUploadInput";

export interface UploadInputProps extends UncontrolledUploadInputProps {
  name: string;
  control?: Control<any, any>;
  rules?: Record<string, any>;
  containerClassName?: string;
}

const UploadInput = ({ name, control, rules, multiple, containerClassName, ...props }: UploadInputProps) => {
  if (!control || !control.register) {
    return <UncontrolledUploadInput name={name} multiple={multiple} {...props} />;
  }

  const {
    field: { value = null, onChange, onBlur },
    formState: { errors },
  } = useController({
    name,
    control,
    rules,
  });

  return (
    <UncontrolledUploadInput
      value={value ?? null}
      error={errors[name]?.message as string}
      multiple={multiple}
      onChange={onChange}
      onBlur={onBlur}
      containerClassName={containerClassName}
      {...omit(props, ["value", "onChange", "onBlur"])}
    />
  );
};

export default memo(UploadInput);
