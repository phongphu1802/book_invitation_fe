import { AxiosError, isAxiosError } from "axios";
import { camelCase, capitalize, keys, lowerCase } from "lodash";
import { FieldPath, FieldValues, UseFormSetError, UseFormSetFocus } from "react-hook-form";

import { ToastShowFunction } from "../../Hooks/useToast";

type FormatMessageFunction = (key: string, message: string) => string;
interface SetFormErrorParam<T extends FieldValues> {
  error: unknown;
  setError: UseFormSetError<T>;
  formatMessage?: FormatMessageFunction | null;
  otherwise?: () => void;
  setFocus?: UseFormSetFocus<T>;
  getKey?: (key: string) => string;
}

const showToastError = (error: unknown, showError: ToastShowFunction, otherwise?: string) => {
  if (error instanceof AxiosError) {
    const { response } = error;

    if (response?.data?.message) {
      showError(String(error.response?.data?.message));
      return;
    }
  }

  if (error instanceof Error) {
    showError(error.message);
    return;
  }

  showError(otherwise ?? "Something went wrong while performing this action. Please try again later.");
};

const setFormError = <T extends FieldValues>(
  error: unknown,
  setError: UseFormSetError<T>,
  formatMessage?: FormatMessageFunction | null,
  otherwise?: () => void,
  setFocus?: UseFormSetFocus<T>,
) => {
  if (!isAxiosError(error)) {
    otherwise?.();
    return;
  }

  const { response } = error;

  if (!response) {
    otherwise?.();
    return;
  }

  const { errors } = response.data;

  let firstKey = "";

  keys(errors).forEach((key) => {
    const value = errors[key][0];

    if (!firstKey) {
      firstKey = key;
    }

    setError(key as FieldPath<T>, {
      message: formatMessage
        ? formatMessage(camelCase(lowerCase(key)), camelCase(lowerCase(value)))
        : capitalize(value),
    });
  });

  setFocus?.(firstKey as FieldPath<T>);
};

const setFormErrorV2 = <T extends FieldValues>({
  error,
  setError,
  formatMessage,
  otherwise,
  setFocus,
  getKey,
}: SetFormErrorParam<T>) => {
  if (!isAxiosError(error)) {
    otherwise?.();
    return;
  }

  const { response } = error;

  if (!response) {
    otherwise?.();
    return;
  }

  const { errors } = response.data;

  let firstKey = "";

  keys(errors).forEach((key) => {
    const value = errors[key][0];

    if (!firstKey) {
      firstKey = key;
    }

    const formattedKey = getKey ? getKey(key) : key;

    setError(formattedKey as FieldPath<T>, {
      message: formatMessage
        ? formatMessage(camelCase(lowerCase(key)), camelCase(lowerCase(value)))
        : capitalize(value),
    });
  });

  setFocus?.(firstKey as FieldPath<T>);
};

export { setFormError, setFormErrorV2, showToastError };
