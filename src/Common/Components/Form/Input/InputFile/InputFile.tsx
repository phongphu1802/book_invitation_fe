import { omit } from "lodash";
import { memo } from "react";
import { useController } from "react-hook-form";

import UncontrolledInputFile from "./UncontrolledInputFile";
import { InputFileProps } from "../../interface";

const InputFile = ({ name, control, ...props }: InputFileProps) => {
  if (!control?.register && name) {
    return <UncontrolledInputFile name={name} {...(props as Required<Omit<InputFileProps, "name">>)} />;
  }

  const {
    field: { value = [], onChange },
    formState: { errors },
  } = useController({
    name,
    control,
  });

  return (
    <UncontrolledInputFile
      error={errors[name]?.message as string}
      files={value}
      name={name}
      onChange={onChange}
      {...omit(props, "files", "onChange")}
    />
  );
};

export default memo(InputFile);
