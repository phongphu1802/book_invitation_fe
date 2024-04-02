import { yupResolver } from "@hookform/resolvers/yup";
import { get, isArray, isObject, snakeCase } from "lodash";
import { ReactNode, isValidElement } from "react";
import { FieldValues, Resolver } from "react-hook-form";
import defaultConfig from "tailwindcss/defaultConfig";
import tailwindDefaultTheme from "tailwindcss/defaultTheme";
import resolveConfig from "tailwindcss/resolveConfig";
import { object } from "yup";

import { FormValidationSchemaShapeType } from "../../../App/Types/Common";

/* eslint-disable no-param-reassign */
const snakelikeNestedObjectKey = (obj: Record<string, unknown>) => {
  const result: Record<string, unknown> = {};

  Object.keys(obj).forEach((key) => {
    const newKey = snakeCase(key);
    const value = obj[key];

    if (isObject(value) && !isArray(value)) {
      result[newKey as string] = snakelikeNestedObjectKey(value as Record<string, unknown>);
      return;
    }

    result[newKey] = value;
  });

  return result;
};
/* eslint-enable no-param-reassign */

const generateFormSchema = <T>(shape: FormValidationSchemaShapeType<T>) =>
  yupResolver(object().shape(shape)) as unknown as Resolver<T extends FieldValues ? T : FieldValues>;

const getTwScreenWidth = (size: keyof typeof tailwindDefaultTheme.screens) => {
  return Number(tailwindDefaultTheme.screens[size].replace("px", ""));
};

const getTwThemeConfig = (path?: string) => {
  const config = resolveConfig(defaultConfig);

  if (!path) {
    return config.theme;
  }

  const value = get(config.theme, path);

  if (!value) {
    return null;
  }

  if (typeof value !== "string") {
    return value;
  }

  const relativeValue = value;

  if (value.includes("rem")) {
    return Number(relativeValue.replace("rem", "")) * 16;
  }

  if (value.includes("px")) {
    return Number(relativeValue.replace("px", ""));
  }

  return relativeValue;
};

const beautifyNumber = (number: number, separator = ".") => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator);
};

const getLocalStorageByKey = (key: string, defaultValue?: unknown) => {
  const value = localStorage.getItem(key);

  if (!value) {
    return defaultValue || null;
  }

  return JSON.parse(value);
};

const setLocalStorageByKey = (key: string, value: unknown) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const checkEmptyObject = (input: Object): input is {} => {
  return Object.keys(input).length === 0 && input.constructor === Object;
};

const checkFormComponent = (child: ReactNode) => {
  const formComponents = ["input", "select", "textarea"];
  return isValidElement(child) && formComponents.includes(child.type as string);
};

const beautifyFileSize = (size: number) => {
  const i = Math.floor(Math.log(size) / Math.log(1024));
  return `${(size / 1024 ** i).toFixed(2)} ${["B", "kB", "MB", "GB", "TB"][i]}`;
};

export {
  beautifyFileSize,
  beautifyNumber,
  checkEmptyObject,
  checkFormComponent,
  generateFormSchema,
  getLocalStorageByKey,
  getTwScreenWidth,
  getTwThemeConfig,
  setLocalStorageByKey,
  snakelikeNestedObjectKey,
};
