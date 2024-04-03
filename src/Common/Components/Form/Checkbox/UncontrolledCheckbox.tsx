import { memo, useEffect, useState } from "react";
import { BsCheck } from "react-icons/bs";
import { HiMinusSm } from "react-icons/hi";
import { twMerge } from "tailwind-merge";

import { UncontrolledCheckboxProps } from "../interface";

const UncontrolledCheckbox = ({
  classNameContainer,
  checkboxClassName,
  className,
  name,
  id,
  checked,
  indeterminate = false,
  disabled = false,
  type = "checkbox",
  label,
  error,
  onChange,
  ...otherProps
}: UncontrolledCheckboxProps) => {
  const [isChecked, setIsChecked] = useState(false);

  const iconTouchedClassName = twMerge(
    !indeterminate && !isChecked && "text-white group-hover:text-primary-700",
    !indeterminate && isChecked && "text-white group-hover:text-white",
    indeterminate && "text-primary-700 group-hover:text-primary-700",
    disabled && isChecked && "text-white group-hover:text-white",
    disabled && !isChecked && "text-white group-hover:text-white",
  );

  const iconClassName = twMerge(
    "absolute top-1/2 left-1/2 z-0 mt-px -translate-x-1/2 -translate-y-1/2 text-white group-hover:text-primary-700",
    iconTouchedClassName,
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (checked === undefined || checked === null) {
      setIsChecked(e.target.checked);
    }
    onChange?.(e);
  };

  useEffect(() => {
    if (checked !== undefined && checked !== null) {
      setIsChecked(checked);
    }
  }, [checked]);

  return (
    <div className={twMerge("flex flex-col", classNameContainer)}>
      <label
        htmlFor={id ?? name}
        className={twMerge("inline-flex space-x-4", className, "group items-center justify-start space-x-4")}
      >
        <div
          className={twMerge(
            type === "radio" ? "rounded-full" : "rounded-md",
            "relative z-0 inline-block h-5 w-5 items-center bg-white",
          )}
        >
          <div
            className={twMerge(
              type === "radio" ? "rounded-full" : "rounded-md",
              "absolute inset-0 -z-10 h-5 w-5 cursor-pointer border-2 border-gray-200 group-hover:border-primary-700",
              error && "border-red-500",
              isChecked && !indeterminate && !disabled && "border-primary-700 bg-primary-700",
              indeterminate && !disabled && "border-primary-700",
              disabled && "cursor-not-allowed bg-white group-hover:border-gray-200",
              disabled && isChecked && "border-primary-700 bg-primary-700 group-hover:border-primary-700",
              checkboxClassName,
            )}
          />
          {indeterminate ? (
            <HiMinusSm size={20} className={iconClassName} />
          ) : (
            <BsCheck className={iconClassName} size={20} />
          )}
          <input
            type={type}
            name={name}
            id={id ?? name}
            className="relative h-full w-full cursor-pointer opacity-0"
            disabled={disabled}
            onChange={handleChange}
            checked={isChecked}
            {...otherProps}
          />
        </div>
        {label && <span>{label}</span>}
      </label>
      {error && <div className="mt-1 w-full text-sm text-red-500">{error}</div>}
    </div>
  );
};

export default memo(UncontrolledCheckbox);
