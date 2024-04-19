import axios from "axios";
import { set } from "lodash";

import { normalizeQuery } from "../Helpers/requestHelper";
// eslint-disable-next-line import/no-cycle
import errorHandler from "./errorHandler";
import { getPageLanguage } from "../../../App/Services/Common/languageService";
import { authService } from "../../../App/Services";

declare module "axios" {
  export interface AxiosRequestConfig {
    redirectWhenError?: boolean;
    autoRefreshToken?: boolean;
  }
}

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  timeout: 30000,
  responseEncoding: "utf8",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "Accept-Language": getPageLanguage(),
  },
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (request) => {
    if (authService.getAccessToken())
      set(request, "headers.Authorization", `Bearer ${authService.getAccessToken()}`);

    const { params, url } = request;

    if (!params || !url) {
      return request;
    }

    request.params = normalizeQuery(params);

    return request;
  },
  async (error) => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => errorHandler(error, axiosInstance),
);

export default axiosInstance;
