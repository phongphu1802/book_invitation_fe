import axios, { AxiosError, AxiosInstance, AxiosRequestHeaders } from "axios";
import { assign, isEmpty, set } from "lodash";

import { requestHelper } from "../Helpers";
// eslint-disable-next-line import/no-cycle
import errorHandler from "./errorHandler";
import { authService } from "../../../App/Services";

type AxiosUnknownErrorHandler = (error: AxiosError) => void;

/**
 * @file axiosInstanceSingleton.jsx
 * @description This file contains the axios instance, following the singleton pattern.
 */

export default class Axios {
  static instance: AxiosInstance;

  static createInstance(unknownErrorHandler: AxiosUnknownErrorHandler) {
    Axios.instance = axios.create({
      baseURL: process.env.REACT_APP_API_BASE_URL,
      timeout: 30000,
      responseEncoding: "utf8",
      withCredentials: true,
    });

    Axios.instance.interceptors.request.use((request) => {
      const { params, url, headers: headerOptions } = request;
      const headers: Partial<AxiosRequestHeaders> = {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${authService.getAccessToken()}`,
      };

      assign(headers, headerOptions);
      set(request, "headers", headers);

      if (!params || !url) {
        return request;
      }

      set(request, "params", requestHelper.normalizeQuery(params));

      return request;
    });

    Axios.instance.interceptors.response.use(
      (response) => response,
      (error) => {
        const { response } = error;

        if (!isEmpty(response)) {
          return errorHandler(error, Axios.instance!);
        }

        return unknownErrorHandler(error);
      },
    );
  }
}
