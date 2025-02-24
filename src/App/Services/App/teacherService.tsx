// eslint-disable-next-line import/no-cycle
import { axiosInstance } from "../../../Common/Utils";
import { TEACHER_API_PATH } from "../../Constants";
import { BaseListQueryType, ResponseDataType } from "../../Types/Common";
import { TeacherDataType, TeacherFormDataType } from "../../Types/Common/teacherType";

const getTeachers = async (params?: BaseListQueryType): Promise<ResponseDataType<TeacherDataType[]>> => {
  const response = await axiosInstance.get(TEACHER_API_PATH.TEACHERS, { params });
  return {
    data: response.data.data,
    meta: response.data.meta,
  };
};

const getTeacherById = async (id: number): Promise<TeacherDataType> => {
  const response = await axiosInstance.get(TEACHER_API_PATH.TEACHER_ID(id));
  return response.data.data;
};

const createTeacher = async (data: TeacherFormDataType) => {
  await axiosInstance.post(TEACHER_API_PATH.TEACHER, data);
};
const editTeacher = async (id: number, data: TeacherFormDataType) => {
  await axiosInstance.put(TEACHER_API_PATH.TEACHER_ID(id), data);
};
const deleteTeacher = async (id: number) => {
  await axiosInstance.delete(TEACHER_API_PATH.TEACHER_ID(id));
};

export { getTeachers, getTeacherById, createTeacher, editTeacher, deleteTeacher };
