import { UserRoleEnum } from "../../Enums";
import { Nullable } from "./commonType";

export interface UserRoleDataType {
  id: number;
  name: UserRoleEnum;
}

export interface UserDataType {
  id: number;
  name: string;
  email: string;
  username: string;
  role: UserRoleDataType;
}

export interface UserFormDataType extends Nullable<Partial<UserDataType>> {
  password?: string;
}
