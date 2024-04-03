import _ from "lodash";
import React, { FocusEvent, ForwardedRef, forwardRef, memo, useCallback, useEffect, useState } from "react";
import { RiInformationLine } from "react-icons/ri";
import { Tooltip } from "react-tooltip";
import { twMerge } from "tailwind-merge";

import { UncontrolledInputSkeletonProps } from "../interface";

const UncontrolledInputSkeleton = (
  {
    label,
    id,
    className,
    value,
    disabled = false,
    children,
    error,
    style,
    size = "normal",
    isDatePicker = false,
    inlineError = false,
    isShowLabelWhenFocusing = false,
    labelPostfix,
    tooltip,
    isRequired,
    isAvailableValue,
    readOnly,
    type,
    name,
    onFocus,
    onBlur,
    ...props
  }: UncontrolledInputSkeletonProps,
  ref: ForwardedRef<HTMLInputElement>,
) => {
  const [isFocusing, setIsFocusing] = useState(false);

  const handleFocus = useCallback(
    (e: FocusEvent<HTMLInputElement>) => {
      setIsFocusing(true);
      if (_.isFunction(onFocus)) onFocus(e);
    },
    [onFocus],
  );

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocusing(false);
    if (_.isFunction(onBlur)) onBlur(e);
  };

  let borderColor = Boolean(error) && "border-red-500 z-20";
  let textColor = Boolean(error) && "text-red-500";

  if (isFocusing) {
    borderColor = "border-blue-500 z-20";
  } else {
    borderColor = "border-gray-100";
  }

  if (isFocusing || isAvailableValue) {
    textColor = "text-blue-500";
  } else {
    textColor = "text-gray-500";
  }
  const sizeClassNames = {
    block: "",
    label: "",
    focusingLabel: "",
    focusingInput: "",
    input: "",
  };

  switch (size) {
    case "xs":
      sizeClassNames.block = "h-8 px-3";
      sizeClassNames.label = "text-sm px-2 left-1 top-1/2 -translate-y-1/2 bg-transparent";
      sizeClassNames.focusingLabel = "hidden";
      sizeClassNames.input = "text-sm translate-y-1";
      break;
    case "sm":
      sizeClassNames.block = "h-10 px-3";
      sizeClassNames.label = "px-2 left-1 text-base top-1/2 text-xs -translate-y-1/2 bg-transparent";
      sizeClassNames.focusingLabel = isShowLabelWhenFocusing ? "-translate-y-5.1 bg-inherit" : "hidden";
      sizeClassNames.input = "text-normal translate-y-1.5 text-base";
      break;
    default:
      sizeClassNames.block = "h-13 px-4";
      sizeClassNames.label = twMerge(
        "px-2 left-2 top-1/2 -translate-y-1/2",
        !disabled ? "bg-white" : "bg-transparent",
      );
      sizeClassNames.focusingLabel = "-translate-y-4 -mt-0.5 text-sm";
      sizeClassNames.input = "text-normal top-1/2 translate-y-1/2";
  }

  useEffect(() => {
    if (disabled) {
      setIsFocusing(false);
    }
  }, [disabled]);

  return (
    <>
      <label
        htmlFor={id}
        style={style}
        className={twMerge(
          "relative inline-block rounded-lg border-2 bg-white ring-inset transition-colors duration-100",
          sizeClassNames.block,
          disabled ? "cursor-default bg-gray-50 ring-gray-100" : "cursor-text",
          className,
          borderColor,
          Boolean(error) && "border-red-500 ring-red-500",
        )}
      >
        <div
          className={twMerge(
            "z-10 flex items-center transition-all",
            textColor,
            sizeClassNames.label,
            (isFocusing || isAvailableValue) &&
              twMerge(
                "top-1.5 justify-between text-sm font-semibold duration-100",
                sizeClassNames.focusingLabel,
              ),
            Boolean(error) && "text-red-500",
            "absolute",
            disabled && "text-gray-400",
          )}
        >
          {(isFocusing || isAvailableValue) && (
            <div
              className={twMerge(
                "absolute inset-y-0 left-0 top-1/2 -z-10 w-full -translate-y-0.5",
                disabled && "mt-0.5 h-1 bg-gray-50",
              )}
            />
          )}
          {label}
          {isRequired && <div>*</div>}
          {tooltip && (
            <>
              <RiInformationLine
                className="ml-2 cursor-pointer"
                data-tooltip-id={name}
                data-tooltip-content={tooltip}
                data-tooltip-place="top"
              />
              <Tooltip id={name} className="text-base font-normal" />
            </>
          )}
        </div>
        {labelPostfix !== null && (
          <div className="absolute bottom-0 right-0 top-0 z-20 flex flex-col items-center justify-center px-[inherit]">
            {labelPostfix}
          </div>
        )}
        <div
          className={twMerge(
            "relative flex items-center justify-start",
            isFocusing || isAvailableValue ? "opacity-100" : "opacity-0",
          )}
        >
          <div className={twMerge("w-full", sizeClassNames.input, "flex items-center")}>
            {/* {children} */}
            <input
              id={id}
              type={type}
              className={twMerge(
                "w-full flex-1 border-none bg-inherit outline-none transition-none",
                disabled && "text-gray-400",
              )}
              readOnly={readOnly}
              disabled={disabled}
              ref={ref}
              onFocus={handleFocus}
              onBlur={handleBlur}
              value={value}
              name={name}
              {...((!isDatePicker || (isDatePicker && readOnly)) && { value })}
              {...props}
            />
          </div>
        </div>
        {children}
      </label>
      {!inlineError && Boolean(error) && <div className="-mb-1.5 mt-1.5 text-sm text-red-500">{error}</div>}
    </>
  );
};

export default memo(forwardRef(UncontrolledInputSkeleton));
