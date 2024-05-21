import { DashboardTypeEnum } from "../../Enums";
import { ProductDataType } from "./productType";

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
