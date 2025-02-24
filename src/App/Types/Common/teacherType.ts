import { SexTypeEnum } from "../../Enums";
import { BaseDataType, Nullable } from "./commonType";

export interface TeacherDataType extends BaseDataType {
  uuid: number;
  name: string;
  birthday: string;
  proper: string;
  sex?: SexTypeEnum;
}

export interface TeacherFormDataType extends Nullable<Partial<TeacherDataType>> {}
