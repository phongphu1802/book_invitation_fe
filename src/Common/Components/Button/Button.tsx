import { ForwardedRef, forwardRef, memo } from "react";
import { twMerge } from "tailwind-merge";

import { ButtonProps } from "./interface";

const Button = (
  {
    isLoading,
    children,
    className,
    disabled,
    color = "primary",
    size = "normal",
    ...anotherProps
  }: ButtonProps,
  ref: ForwardedRef<HTMLButtonElement>,
) => {
  let colorClassNames = "";
  let sizeClassNames = "";
  let spinnerColorClassNames = "";

  switch (color) {
    case "light":
      colorClassNames +=
        "bg-white hover:bg-gray-200 disabled:bg-gray-100 text-black disabled:text-gray-400 ring-gray-200 disabled:ring-gray-200";
      spinnerColorClassNames += "border-gray-400";
      break;
    case "blue":
      colorClassNames += "bg-sky-700  hover:bg-sky-800  text-white  ring-gray-200 disabled:ring-gray-200";
      spinnerColorClassNames += "border-gray-400";
      break;
    case "orange":
      colorClassNames +=
        "bg-orange-600  hover:bg-orange-700  text-white ring-gray-200 disabled:ring-gray-200";
      spinnerColorClassNames += "border-gray-400";
      break;
    case "gray":
      colorClassNames += "bg-gray-700  hover:bg-gray-800  text-white ring-gray-200 disabled:ring-gray-200";
      spinnerColorClassNames += "border-gray-400";
      break;
    default:
      colorClassNames += `bg-primary-700 hover:bg-primary-800 text-white ring-primary-700 disabled:ring-gray-300 disabled:bg-gray-300 disabled:hover:bg-gray-300`;
      spinnerColorClassNames += disabled === true ? "border-white" : "border-gray-400";
  }

  switch (size) {
    case "xs":
      sizeClassNames += "px-2 py-1";
      break;

    case "sm":
      sizeClassNames += "px-4 py-2 rounded-md shadow-none drop-shadow-none";
      break;

    default:
      sizeClassNames += "px-4 lg:text-base text-sm lg:px-8 pt-1.5 pb-1 lg:py-2.5";
  }

  return (
    <button
      type="button"
      className={twMerge(
        "rounded-sm lg:rounded-primary",
        sizeClassNames,
        "duration-100s space-x-3 font-semibold outline-none ring-2 transition-colors",
        "flex",
        colorClassNames,
        "items-center justify-center",
        className,
      )}
      disabled={disabled}
      ref={ref}
      {...anotherProps}
    >
      {isLoading === true && (
        <div
          className={twMerge(
            "h-4 w-4 flex-shrink-0 border-2",
            spinnerColorClassNames,
            "mr-3 animate-spin rounded-full border-t-transparent",
          )}
        />
      )}
      {children}
    </button>
  );
};

export default memo(forwardRef(Button));
