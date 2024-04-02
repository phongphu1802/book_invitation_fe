import { ConfigStatusEnum, ConfigTypeEnum } from "../../Enums";
import { BaseDataType, Nullable } from "./commonType";

export interface ConfigStatusDataType {
  code: ConfigStatusEnum;
  name: string;
}

export interface ConfigGroupDataType extends BaseDataType {
  id: number;
  name: string;
}

export interface ConfigDataType extends BaseDataType {
  id: number;
  key: string;
  value: string;
  type: ConfigTypeEnum;
  status: ConfigStatusEnum;
  group_id: number;
  group?: ConfigGroupDataType;
}

export interface ConfigFormDataType extends Partial<Nullable<Omit<ConfigDataType, "group" | "updated_at">>> {}

export interface ConfigGroupFormDataType extends Nullable<Omit<ConfigGroupDataType, "updated_at" | "id">> {}
