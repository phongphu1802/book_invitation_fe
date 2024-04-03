import { ForwardedRef, forwardRef, memo, useCallback, useEffect, useState } from "react";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";

import { UncontrolledInputQuantityProps } from "../../interface";
import UncontrolledInputSkeleton from "../UncontrolledInputSkeleton";

const UncontrolledInputQuantity = (
  {
    value: valueProps,
    error,
    style,
    min,
    max,
    inlineError,
    isShowLabelWhenFocusing,
    isRequired,
    ...props
  }: UncontrolledInputQuantityProps,
  ref: ForwardedRef<HTMLInputElement>,
) => {
  const [value, setValue] = useState(0);

  const validateValue = useCallback(
    (number: number) => {
      if (number < Number(min)) {
        return Number(min);
      }
      if (number > Number(max)) {
        return Number(max);
      }
      return number;
    },
    [max, min],
  );

  const handleIncrease = useCallback(() => {
    if (value >= Number(max)) {
      return;
    }
    setValue((prev) => prev + 1);
  }, [max, value]);

  const handleDecrease = useCallback(() => {
    if (value <= Number(min)) {
      return;
    }
    setValue((prev) => prev - 1);
  }, [min, value]);

  useEffect(() => {
    setValue(validateValue(Number(valueProps)));
  }, [valueProps, validateValue]);

  return (
    <div className="group relative z-0">
      <UncontrolledInputSkeleton
        value={value ?? 0}
        type="number"
        error={error}
        style={style}
        inlineError={inlineError}
        isShowLabelWhenFocusing={isShowLabelWhenFocusing}
        isRequired={isRequired}
        isAvailableValue={Boolean(value || value === 0)}
        ref={ref}
        {...props}
      >
        <div className="absolute bottom-0 right-0 top-0 z-20 flex select-none">
          <div className="flex h-full flex-col justify-center divide-y-2 border-l-2 border-gray-100">
            <div
              className="flex h-1/2 items-center justify-center text-gray-300 duration-100 hover:text-blue-500"
              role="button"
              tabIndex={0}
              onClick={handleIncrease}
            >
              <BiChevronUp size={20} className="mt-0.5" />
            </div>
            <div
              className="flex h-1/2 flex-shrink-0 items-center justify-center text-gray-300 duration-100 hover:text-blue-500"
              role="button"
              tabIndex={0}
              onClick={handleDecrease}
            >
              <BiChevronDown size={20} className="mt-0" />
            </div>
          </div>
        </div>
      </UncontrolledInputSkeleton>
    </div>
  );
};

export default memo(forwardRef(UncontrolledInputQuantity));
