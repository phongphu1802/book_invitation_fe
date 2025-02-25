// eslint-disable-next-line import/no-cycle
import { axiosInstance } from "../../../Common/Utils";
import { COURSE_API_PATH } from "../../Constants";
import { BaseListQueryType, ResponseDataType } from "../../Types/Common";
import { CourseDataType, CourseFormDataType } from "../../Types/Common/courseType";

const getCourses = async (params?: BaseListQueryType): Promise<ResponseDataType<CourseDataType[]>> => {
  const response = await axiosInstance.get(COURSE_API_PATH.COURSES, { params });
  return {
    data: response.data.data,
    meta: response.data.meta,
  };
};

const getCourseById = async (id: number): Promise<CourseDataType> => {
  const response = await axiosInstance.get(COURSE_API_PATH.COURSE_ID(id));
  return response.data.data;
};

const createCourse = async (data: CourseFormDataType) => {
  await axiosInstance.post(COURSE_API_PATH.COURSE, data);
};
const editCourse = async (id: number, data: CourseFormDataType) => {
  await axiosInstance.put(COURSE_API_PATH.COURSE_ID(id), data);
};
const deleteCourse = async (id: number) => {
  await axiosInstance.delete(COURSE_API_PATH.COURSE_ID(id));
};

export { getCourses, getCourseById, createCourse, editCourse, deleteCourse };
