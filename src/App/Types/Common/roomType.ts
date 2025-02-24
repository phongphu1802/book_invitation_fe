import { BaseDataType, Nullable } from "./commonType";

export interface RoomDataType extends BaseDataType {
  uuid: number;
  name: string;
}

export interface RoomFormDataType extends Nullable<Partial<RoomDataType>> {}
