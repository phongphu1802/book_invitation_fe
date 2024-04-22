// eslint-disable-next-line import/no-cycle
import { axiosInstance } from "../../../Common/Utils";
import { PRODUCT_API_PATH } from "../../Constants";
import { BaseListQueryType, ResponseDataType } from "../../Types/Common";
import { ProductDataType, ProductFormDataType } from "../../Types/Common/productType";

const getProducts = async (params?: BaseListQueryType): Promise<ResponseDataType<ProductDataType[]>> => {
  const response = await axiosInstance.get(PRODUCT_API_PATH.PRODUCTS, { params });
  return {
    data: response.data.data,
    meta: response.data.meta,
  };
};

const getProductById = async (id: number): Promise<ProductDataType> => {
  const response = await axiosInstance.get(PRODUCT_API_PATH.PRODUCT_ID(id));
  return response.data.data;
};

const createProduct = async (data: ProductFormDataType) => {
  await axiosInstance.post(PRODUCT_API_PATH.PRODUCT, data);
};
const editProduct = async (id: number, data: ProductFormDataType) => {
  await axiosInstance.put(PRODUCT_API_PATH.PRODUCT_ID(id), data);
};
const deleteProduct = async (id: number) => {
  await axiosInstance.delete(PRODUCT_API_PATH.PRODUCT_ID(id));
};

export { getProducts, getProductById, createProduct, editProduct, deleteProduct };
