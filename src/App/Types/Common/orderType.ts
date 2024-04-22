import { BaseDataType, Nullable } from "./commonType";
import { ProductDataType } from "./productType";
import { UserDataType } from "./userType";

export interface OrderDataType extends BaseDataType {
  uuid: number;
  user_uuid: number;
  total_amount: number;
  order_date: Date;
  products: ProductDataType[];
  user: UserDataType;
}

export interface OrderFormDataType extends Nullable<Partial<OrderDataType>> {}
