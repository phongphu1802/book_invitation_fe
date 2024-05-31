import { axiosInstance } from "../../../Common/Utils";
import { DASHBOARD_API_PATH } from "../../Constants";
import { ResponseDataType } from "../../Types/Common";
import {
  DashboardDataType,
  DashboardType,
  TopProductType,
  TopUserType,
} from "../../Types/Common/dashboardType";

const getTopProduct = async (data: DashboardDataType): Promise<ResponseDataType<TopProductType[]>> => {
  const response = await axiosInstance.get(DASHBOARD_API_PATH.PRODUCT, {
    params: {
      from_date: data.form_date,
      to_date: data.to_date,
      expand: ["dashboard__product_uuid"],
      page: null,
    },
  });

  return {
    data: response?.data?.data,
    meta: response?.data?.meta,
  };
};

const getTopUser = async (data: DashboardDataType): Promise<ResponseDataType<TopUserType[]>> => {
  const response = await axiosInstance.get(DASHBOARD_API_PATH.TOP_USER, {
    params: {
      from_date: data.form_date,
      to_date: data.to_date,
      expand: ["dashboard__user_uuid"],
    },
  });
  return {
    data: response?.data?.data,
    meta: response?.data?.meta,
  };
};

const getProfitStatistic = async (data: DashboardDataType): Promise<ResponseDataType<DashboardType[]>> => {
  const response = await axiosInstance.get(DASHBOARD_API_PATH.PROFIT, {
    params: {
      from_date: data.form_date,
      to_date: data.to_date,
      type: data.type,
    },
  });
  return {
    data: response?.data?.data,
    meta: response?.data?.meta,
  };
};

const getUserRegisterStatistic = async (data: DashboardDataType) => {
  const response = await axiosInstance.get(DASHBOARD_API_PATH.USER_REGISTER, {
    data,
  });
  return {
    data: response.data.data,
  };
};

export { getTopProduct, getTopUser, getProfitStatistic, getUserRegisterStatistic };
