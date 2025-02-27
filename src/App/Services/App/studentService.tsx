// eslint-disable-next-line import/no-cycle
import { axiosInstance } from "../../../Common/Utils";
import { STUDENT_API_PATH } from "../../Constants";
import { BaseListQueryType, ResponseDataType } from "../../Types/Common";
import { StudentDataType, StudentFormDataType } from "../../Types/Common/studentType";

const getStudents = async (params?: BaseListQueryType): Promise<ResponseDataType<StudentDataType[]>> => {
  const response = await axiosInstance.get(STUDENT_API_PATH.STUDENTS, { params });
  return {
    data: response.data.data,
    meta: response.data.meta,
  };
};

const getStudentById = async (id: number): Promise<StudentDataType> => {
  const response = await axiosInstance.get(STUDENT_API_PATH.STUDENT_ID(id));
  return response.data.data;
};

const createStudent = async (data: StudentFormDataType) => {
  await axiosInstance.post(STUDENT_API_PATH.STUDENT, data);
};
const editStudent = async (id: number, data: StudentFormDataType) => {
  await axiosInstance.put(STUDENT_API_PATH.STUDENT_ID(id), data);
};
const deleteStudent = async (id: number) => {
  await axiosInstance.delete(STUDENT_API_PATH.STUDENT_ID(id));
};

export { getStudents, getStudentById, createStudent, editStudent, deleteStudent };
