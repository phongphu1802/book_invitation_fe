import _ from "lodash";
import { FocusEvent, memo, useCallback, useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

import { UncontrolledTextareaProps } from "../interface";

const UncontrolledTextarea = ({
  label,
  id,
  className,
  value,
  disabled = false,
  children,
  error,
  style,
  size = "normal",
  inlineError = false,
  isShowLabelWhenFocusing = false,
  labelPostfix,
  inputClassName,
  isRequired,
  onFocus,
  onBlur,
  ...props
}: UncontrolledTextareaProps) => {
  const [isFocusing, setIsFocusing] = useState(false);
  const ref = useRef<HTMLTextAreaElement>(null);

  const handleFocus = useCallback(
    (e: FocusEvent<HTMLTextAreaElement>) => {
      setIsFocusing(true);
      if (_.isFunction(onFocus)) onFocus(e);
    },
    [onFocus],
  );

  const handleBlur = useCallback(
    (e: FocusEvent<HTMLTextAreaElement>) => {
      setIsFocusing(false);
      if (_.isFunction(onBlur)) onBlur(e);
    },
    [onBlur],
  );

  let borderColor = error && "border-red-500 z-20";
  let textColor = error && "text-red-500";

  if (isFocusing) {
    borderColor = "border-blue-500 z-20";
  } else {
    borderColor = "border-gray-100";
  }

  if (isFocusing || value) {
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
      sizeClassNames.block = "min-h-8 px-3";
      sizeClassNames.label = "text-sm px-2 left-1 top-1/2 -translate-y-1/2 bg-transparent";
      sizeClassNames.focusingLabel = "hidden";
      sizeClassNames.input = "text-sm py-[4px]";
      break;
    case "sm":
      sizeClassNames.block = "min-h-10 px-3";
      sizeClassNames.label = "px-2 left-1 text-base top-1/2 -translate-y-1/2 bg-transparent";
      sizeClassNames.focusingLabel = isShowLabelWhenFocusing ? "-translate-y-5 bg-inherit" : "hidden";
      sizeClassNames.input = "text-normal py-[6px] text-base";
      break;
    default:
      sizeClassNames.block = "min-h-13 px-4";
      sizeClassNames.label = twMerge(
        "px-2 left-2 top-1/2 -translate-y-1/2",
        !disabled ? "bg-white" : "bg-transparent",
      );
      sizeClassNames.focusingLabel = "-translate-y-4 -mt-0.5 text-sm";
      sizeClassNames.input = "text-normal py-[12px]";
  }

  useEffect(() => {
    if (ref && ref.current) {
      ref.current.style.height = "0px";
      const { scrollHeight } = ref.current;
      ref.current.style.height = `${scrollHeight}px`;
    }
  }, [value]);

  useEffect(() => {
    if (disabled) {
      setIsFocusing(false);
    }
  }, [disabled]);

  return (
    <div>
      <label
        htmlFor={id}
        style={style}
        className={twMerge(
          "relative inline-block h-max rounded-lg border-2 bg-white ring-inset transition-colors duration-100",
          sizeClassNames.block,
          disabled ? "cursor-default bg-gray-50 ring-gray-100" : "cursor-text",
          className,
          borderColor,
          Boolean(error) && "border-red-500 ring-red-500",
        )}
      >
        <div
          className={twMerge(
            "absolute z-10 flex items-center justify-between transition-all",
            textColor,
            sizeClassNames.label,
            (isFocusing || Boolean(value)) &&
              twMerge("top-1.5 text-sm font-semibold duration-100", sizeClassNames.focusingLabel),
            Boolean(error) && "text-red-500",
            disabled && "text-gray-400",
          )}
        >
          {(isFocusing || Boolean(value)) && (
            <div
              className={twMerge(
                "absolute inset-y-0 left-0 top-1/2 -z-10 w-full -translate-y-0.5",
                disabled && "mt-0.5 h-1 bg-gray-50",
              )}
            />
          )}
          {label}
          {isRequired && <div>*</div>}
        </div>
        {labelPostfix != null && (
          <div className="absolute bottom-0 right-0 top-0 z-20 flex flex-col items-center justify-center">
            {labelPostfix}
          </div>
        )}
        <div
          className={twMerge(
            "relative flex w-full items-center justify-start",
            isFocusing || value ? "opacity-100" : "opacity-0",
          )}
        >
          {children}
          <textarea
            id={id}
            className={twMerge(
              "w-full resize-none border-none bg-inherit outline-none transition-none",
              sizeClassNames.input,
              disabled && "text-gray-400",
            )}
            value={value || ""}
            disabled={disabled}
            ref={ref}
            onFocus={handleFocus}
            onBlur={handleBlur}
            {...props}
          />
        </div>
      </label>
      {!inlineError && error && <div className="-mb-1.5 mt-1.5 text-sm text-red-500">{error}</div>}
    </div>
  );
};

export default memo(UncontrolledTextarea);
