import _ from "lodash";
import { memo, useCallback, useMemo, useRef, useState } from "react";
import ReactSelect, { ActionMeta, MultiValue, StylesConfig } from "react-select";
import { twMerge } from "tailwind-merge";

import { UncontrolledSelectProps } from "../interface";
import { DEFAULT_API_DEBOUNCE_TIME } from "../../../../App/Constants";

const UncontrolledSelect = ({
  error,
  placeholder,
  classNameError,
  classNameSelect,
  isDisabled = false,
  isRequired = false,
  isMulti,
  isLoading,
  value,
  options,
  noteContent,
  className,
  onInputChange: onSearchInputChange,
  onChange: onChangeSelect,
  onBlur,
  ...props
}: UncontrolledSelectProps) => {
  const [isFocusing, setIsFocusing] = useState(false);
  const borderColor = twMerge(isFocusing ? "border-blue-500 z-20" : "border-gray-100");

  const selectRef = useRef<HTMLDivElement>(null);
  const selectedOptions = useMemo(() => {
    if (!value) {
      return null;
    }

    if (isMulti) {
      return value;
    }

    return options?.find((option: unknown) => {
      if (option && typeof option === "object" && "value" in option) {
        return option.value === value;
      }

      return option === value;
    });
  }, [isMulti, options, value]);

  const customStyles: StylesConfig = {
    control: (base) => ({
      ...base,
      backgroundColor: isDisabled ? "border-gray-100" : "bg-white",
      border: "none",
      outline: "none",
      boxShadow: "none ",
      transform: "translateX(10px)",
    }),
    multiValue: (provided) => ({
      ...provided,
      background: "#f3f4f6",
      borderRadius: "8px",
      padding: 0,
      margin: 2,
    }),
  };

  const handleChangeInputValue = _.debounce((inputValue: string, actionMeta) => {
    onSearchInputChange?.(inputValue, actionMeta);
  }, DEFAULT_API_DEBOUNCE_TIME);

  const handleChangeOnFocus = useCallback(() => {
    if (!isDisabled) setIsFocusing(true);
  }, [isDisabled]);

  const handleBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      if (!isDisabled) setIsFocusing(false);
      if (_.isFunction(onBlur)) onBlur(e);
    },
    [isDisabled, onBlur],
  );

  const handleChange = useCallback(
    (newValue: unknown, actionMeta: ActionMeta<unknown>) => {
      onChangeSelect?.(newValue, actionMeta);
      if (actionMeta.action === "select-option" && !isMulti) setIsFocusing(false);
    },
    [isMulti, onChangeSelect],
  );

  return (
    <div className={twMerge("group", className)}>
      <div
        ref={selectRef}
        className={twMerge(
          borderColor,
          "relative min-h-13 w-full rounded-lg border-2 px-3.5 pb-0.5 pt-1 group-focus-within:border-blue-500",
          isDisabled && "bg-gray-100",
          error && "border-red-500",
          classNameSelect,
        )}
      >
        <div
          className={twMerge(
            "absolute left-2 top-1/2 z-20 flex -translate-y-1/2 items-center justify-between bg-white px-2 text-gray-500 transition-all duration-100 group-focus-within:text-blue-500",
            isFocusing && "-top-0.5 text-sm font-semibold text-blue-500",
            !isLoading && Boolean(value) && "-top-0.5 text-sm font-semibold text-blue-500",
            error && "text-red-500",
            isDisabled && "bg-transparent text-gray-400",
          )}
          role="button"
          tabIndex={-1}
          onFocus={handleChangeOnFocus}
          onBlur={handleBlur}
        >
          {placeholder}
          {isRequired && (
            <span className="absolute -right-2.5 w-3.5 bg-inherit text-lg font-normal text-red-500">*</span>
          )}
        </div>
        <ReactSelect
          value={selectedOptions as MultiValue<unknown> | NonNullable<unknown>}
          options={options}
          placeholder=""
          menuIsOpen={isFocusing}
          styles={customStyles}
          onMenuOpen={handleChangeOnFocus}
          onInputChange={handleChangeInputValue}
          isDisabled={isDisabled}
          onBlur={handleBlur}
          onChange={handleChange}
          isMulti={isMulti}
          className="react-select"
          classNamePrefix="react-select"
          {...props}
        />
      </div>
      {error && <div className={twMerge("-mb-1.5 mt-1.5 text-sm text-red-500", classNameError)}>{error}</div>}
    </div>
  );
};
export default memo(UncontrolledSelect);
