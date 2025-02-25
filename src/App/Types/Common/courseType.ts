import { BaseDataType, Nullable } from "./commonType";
import { TeacherDataType } from "./teacherType";

export interface CourseDataType extends BaseDataType {
  uuid: number;
  name: string;
  teacher_uuid: number;
  teacher?: TeacherDataType;
}

export interface CourseFormDataType extends Nullable<Partial<CourseDataType>> {}
