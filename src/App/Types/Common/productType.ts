import { BaseDataType } from "./commonType";

export interface ProductDataType extends BaseDataType {
  uuid: number;
  name: string;
  price: string | number;
  image: string;
  description: string;
  category: string;
}
