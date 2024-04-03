import { memo } from "react";
import { useController } from "react-hook-form";

import { ToggleProps } from "../interface";
import UncontrolledToggle from "./UncontrolledToggle";

const Toggle = ({ control, name = "", isSelfControlled, ...props }: ToggleProps) => {
  if (!control?.register) {
    return <UncontrolledToggle isSelfControlled={isSelfControlled} {...props} />;
  }

  const {
    field: { value = false, onChange },
    formState: { errors },
  } = useController({
    name,
    control,
  });

  return (
    <UncontrolledToggle
      isOn={value}
      isSelfControlled={isSelfControlled}
      error={errors[name]?.message as string}
      onChange={onChange}
      {...props}
    />
  );
};
export default memo(Toggle);
