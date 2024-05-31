import { DashboardTypeEnum } from "../../Enums";
import { ProductDataType } from "./productType";
import { UserDataType } from "./userType";

export interface DashboardDataType {
  form_date: Date;
  to_date: Date;
  type?: DashboardTypeEnum;
}

export interface TopProductType {
  product_uuid: number;
  total_product: string;
  product?: ProductDataType;
}

export interface TopUserType {
  user_uuid: number;
  total_price: string;
  user?: UserDataType;
}

export interface DashboardType {
  name: string;
  value: number;
}
