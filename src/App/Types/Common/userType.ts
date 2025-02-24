import { UserRoleEnum } from "../../Enums";
import { BaseDataType, Nullable } from "./commonType";

export interface UserRoleDataType extends BaseDataType {
  uuid: number;
  name: UserRoleEnum;
}

export interface UserRoleFormDataType extends Nullable<Partial<UserRoleDataType>> {}

export interface UserDataType extends BaseDataType {
  uuid: number;
  name: string;
  username: string;
  role: UserRoleDataType;
}

export interface UserFormDataType extends Nullable<Partial<UserDataType>> {
  password?: string;
  role_uuid?: number | null;
}
