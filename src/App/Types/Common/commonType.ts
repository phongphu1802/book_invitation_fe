import { ColumnSort } from "@tanstack/react-table";
import { AxiosError, AxiosResponse } from "axios";
import { Key } from "react";
import { AnySchema } from "yup";

export interface TableFilterStateType {
  filterBy: string;
  values: Array<string | number | Date>;
}

export interface BaseListQueryType extends Record<string, unknown> {
  pageIndex?: number;
  pageSize?: number;
  filterParams?: TableFilterStateType[];
  sortParams?: ColumnSort[];
}

export interface ResponseMetaType {
  total: number;
}

export interface ResponseDataType<T = unknown> extends Partial<AxiosResponse> {
  data: T;
  meta: ResponseMetaType;
}

export interface AxiosErrorResponseMessageType {
  [key: string]: string[];
}

export interface AxiosErrorResponseType {
  statusCode: number;
  message: string;
  data: {
    errors: AxiosErrorResponseMessageType;
  };
  code: string;
}

export type AxiosErrorType = AxiosError<AxiosErrorResponseType>;

export interface AxiosResponseType<T> extends AxiosResponse {
  statusCode: number;
  message: string;
  meta: ResponseMetaType;
  data: {
    data: T;
  };
}

export type ServiceGetManyFunctionType<T> = (query?: BaseListQueryType) => Promise<ResponseDataType<T[]>>;
export type ServiceGetAllFunctionType<T> = (query?: BaseListQueryType) => Promise<T[]>;
export type ServiceAddFunctionType<T> = (data: T) => Promise<unknown>;
export type ServiceUpdateFunctionType<T> = (id: Key, data: T) => Promise<unknown>;
export type ServiceDeleteFunctionType = (id: Key) => Promise<unknown>;

export type TableOnclickFunctionType<T = unknown> = (data: T) => void;

export interface ImageDataType extends Partial<File> {
  url: string;
  name?: string;
  type?: string;
  size?: number;
}

export interface SelectOptionType {
  value?: string | number;
  label?: string;
}

export type FormValidationSchemaShapeType<T> = {
  [P in keyof T]: AnySchema;
};

export type Nullable<T> = {
  [P in keyof T]: T[P] | null;
};

export type ArrayElement<T> = T extends (infer U)[] ? U : never;

export interface BaseDataType {
  updated_at?: Date;
  created_at?: Date;
}
