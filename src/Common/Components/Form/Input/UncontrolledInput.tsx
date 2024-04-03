import { ForwardedRef, forwardRef, memo } from "react";

import { UncontrolledInputProps } from "../interface";
import UncontrolledInputSkeleton from "./UncontrolledInputSkeleton";

const UncontrolledInput = (
  {
    value,
    error,
    style,
    inlineError = false,
    isShowLabelWhenFocusing = false,
    isRequired,
    ...props
  }: UncontrolledInputProps,
  ref: ForwardedRef<HTMLInputElement>,
) => {
  return (
    <div>
      <UncontrolledInputSkeleton
        {...(value === null || value === undefined || value === "" ? { value: "" } : { value })}
        error={error}
        style={style}
        inlineError={inlineError}
        isShowLabelWhenFocusing={isShowLabelWhenFocusing}
        isRequired={isRequired}
        isAvailableValue={Boolean(value)}
        ref={ref}
        {...props}
      />
    </div>
  );
};

export default memo(forwardRef(UncontrolledInput));
