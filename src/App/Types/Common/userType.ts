import { UserRoleEnum } from "../../Enums";
import { Nullable } from "./commonType";

export interface UserRoleDataType {
  uuid: number;
  name: UserRoleEnum;
}

export interface UserRoleFormDataType extends Nullable<Partial<UserDataType>> {}

export interface UserDataType {
  uuid: number;
  name: string;
  email: string;
  username: string;
  role: UserRoleDataType;
}

export interface UserFormDataType extends Nullable<Partial<UserDataType>> {
  password?: string;
  role_uuid?: number | null;
}
