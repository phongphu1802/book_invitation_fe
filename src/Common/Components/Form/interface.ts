import {
  ForwardedRef,
  HTMLAttributes,
  InputHTMLAttributes,
  Key,
  ReactNode,
  TextareaHTMLAttributes,
} from "react";
import { Control } from "react-hook-form";
import { GroupBase, Props as ReactSelectProps, SelectInstance } from "react-select";
import { AsyncProps as ReactSelectAsyncProps } from "react-select/async";

import { DatePickerTypeEnum } from "../DatePicker";

export interface UncontrolledInputSkeletonProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  children?: ReactNode;
  classNameLabel?: string;
  name?: string;
  size?: InputSizeType;
  label?: string;
  labelPostfix?: JSX.Element;
  error?: string;
  inlineError?: boolean;
  isRequired?: boolean;
  isShowLabelWhenFocusing?: boolean;
  isAvailableValue?: boolean;
  isDatePicker?: boolean;
  tooltip?: ReactNode;
}

export interface UncontrolledInputProps extends UncontrolledInputSkeletonProps {}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type FormControlType = Control<any>;

export interface UncontrolledInputQuantityProps extends UncontrolledInputSkeletonProps {}

export interface UncontrolledInputDatePickerProps
  extends Omit<UncontrolledInputSkeletonProps, "onChange" | "value" | "type" | "name"> {
  name: string;
  value?: string | string[];
  type?: DatePickerTypeEnum;
  onChange?: (rangeDate: Date | Date[] | null) => void;
  minDate?: Date;
  maxDate?: Date;
}

export interface InputProps extends UncontrolledInputProps {
  name: string;
  control?: FormControlType;
}

export type InputSizeType = "xs" | "sm" | "normal" | "xl";

export interface InputOTPProps extends UncontrolledInputOTPProps {
  name: string;
  quantity: number;
  control?: FormControlType;
}

export interface UncontrolledInputOTPProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange" | "size"> {
  quantity: number;
  size?: InputSizeType;
  error?: string;
  inlineError?: boolean;
  onChange?: (inputOTP: string) => void;
  onComplete?: (inputOTP: string) => void;
}

export interface InputDatePickerProps extends UncontrolledInputDatePickerProps {
  name: string;
  control?: FormControlType;
}

export interface InputQuantityProps extends UncontrolledInputQuantityProps {
  name: string;
  control?: FormControlType;
}

export interface UncontrolledSelectProps extends ReactSelectProps {
  error?: string;
  classNameError?: string;
  className?: string;
  classNameSelect?: string;
  name: string;
  noteContent?: ReactNode;
  isRequired?: boolean;
}

export interface SelectProps extends UncontrolledSelectProps {
  control?: FormControlType;
}

export interface UncontrolledTextareaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "size"> {
  size?: InputSizeType;
  label?: string;
  labelPostfix?: JSX.Element;
  error?: string;
  inlineError?: boolean;
  isShowLabelWhenFocusing?: boolean;
  isRequired?: boolean;
  inputClassName?: string;
}

export interface TextareaProps extends UncontrolledTextareaProps {
  name: string;
  control?: FormControlType;
}

export interface UncontrolledToggleProps {
  className?: string;
  isOn?: boolean;
  isSelfControlled?: boolean;
  size?: InputSizeType;
  label?: string;
  disabled?: boolean;
  error?: string;
  onChange?: (value: boolean) => void;
}

export interface ToggleProps extends UncontrolledToggleProps {
  control?: FormControlType;
  name?: string;
  isSelfControlled?: boolean;
}

export interface UncontrolledCheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  classNameContainer?: string;
  checkboxClassName?: string;
  indeterminate?: boolean;
  label?: ReactNode;
  name: string;
  error?: string;
  type?: string;
}

export interface CheckboxProps extends UncontrolledCheckboxProps {
  control?: FormControlType;
}

interface BaseInputFileDataType {
  id: Key;
}

interface NotUploadedInputFileDataType extends BaseInputFileDataType {
  name?: never;
  file_location?: never;
  file: File;
}

interface UploadedFileDataType extends BaseInputFileDataType {
  name: string;
  file_location: string;
  file?: never;
}

export type InputFileDataType = NotUploadedInputFileDataType | UploadedFileDataType;

export interface UncontrolledInputFileProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  error?: string;
  label?: string;
  name: string;
  files: InputFileDataType[];
  onChange: (files: InputFileDataType[]) => void;
}

export interface InputFileProps
  extends Omit<UncontrolledInputFileProps, "files" | "onChange">,
    Pick<Partial<UncontrolledInputFileProps>, "files" | "onChange"> {
  control?: FormControlType;
}

export interface UncontrolledSelectV2Props<
  TOption,
  TIsMulti extends boolean,
  TGroup extends GroupBase<TOption>,
> extends Omit<ReactSelectAsyncProps<TOption, TIsMulti, TGroup>, "placeholder"> {
  label?: string;
  name: string;
  ref?: ForwardedRef<SelectInstance<TOption, TIsMulti, TGroup>>;
  size?: InputSizeType;
  error?: string;
  getDynamicOptionLabelAttributes?: (option: TOption) => HTMLAttributes<HTMLElement>;
}

export interface SelectV2Props<TOption, TIsMulti extends boolean, TGroup extends GroupBase<TOption>>
  extends Omit<UncontrolledSelectV2Props<TOption, TIsMulti, TGroup>, "classNames"> {
  name: string;
  control?: FormControlType;
}
