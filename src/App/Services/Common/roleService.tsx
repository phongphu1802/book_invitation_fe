import { axiosInstance } from "../../../Common/Utils";
import { ROLE_API_PATH } from "../../Constants";
import {
  BaseListQueryType,
  ResponseDataType,
  UserRoleDataType,
  UserRoleFormDataType,
} from "../../Types/Common";

const getRoles = async (params?: BaseListQueryType): Promise<ResponseDataType<UserRoleDataType[]>> => {
  const response = await axiosInstance.get(ROLE_API_PATH.ROLES, { params });
  return {
    data: response.data.data,
    meta: response.data.meta,
  };
};

const createRole = async (data: UserRoleFormDataType) => {
  await axiosInstance.post(ROLE_API_PATH.ROLE, data);
};

const editRole = async (id: number, data: UserRoleFormDataType) => {
  await axiosInstance.put(ROLE_API_PATH.ROLE_ID(id), data);
};

const deleteRole = async (id: number) => {
  await axiosInstance.delete(ROLE_API_PATH.ROLE_ID(id));
};

export { getRoles, createRole, deleteRole, editRole };
