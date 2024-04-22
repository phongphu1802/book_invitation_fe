import { BaseListQueryType, ResponseDataType } from "../../Types/Common/commonType";
// eslint-disable-next-line import/no-cycle
import { axiosInstance } from "../../../Common/Utils";
import { ORDER_API_PATH } from "../../Constants";
import { OrderDataType, OrderFormDataType } from "../../Types/Common";

const getOrders = async (params?: BaseListQueryType): Promise<ResponseDataType<OrderDataType[]>> => {
  const response = await axiosInstance.get(ORDER_API_PATH.ORDERS, { params });
  return {
    data: response.data.data,
    meta: response.data.meta,
  };
};
const createOrder = async (data: OrderFormDataType) => {
  await axiosInstance.post(ORDER_API_PATH.ORDER, data);
};
const editOrder = async (id: number, data: OrderFormDataType) => {
  await axiosInstance.put(ORDER_API_PATH.ORDER_ID(id), data);
};
const deleteOrder = async (id: number) => {
  await axiosInstance.delete(ORDER_API_PATH.ORDER_ID(id));
};

export { getOrders, createOrder, editOrder, deleteOrder };
