import { SexTypeEnum, StatusEnum } from "../../Enums";
import { BaseDataType, Nullable } from "./commonType";
import { CourseDataType } from "./courseType";

export interface StudentDataType extends BaseDataType {
  uuid: number;
  name: string;
  status: StatusEnum | null;
  sex: SexTypeEnum;
  course_uuid: number;
  course?: CourseDataType;
}

export interface StudentFormDataType extends Nullable<Partial<StudentDataType>> {}
