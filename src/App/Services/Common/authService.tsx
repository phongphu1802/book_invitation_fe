import { UserRoleEnum } from "../../Enums";
import { AUTH_API_PATH } from "../../Constants";
import {
  AuthLoginFormDataType,
  AuthRegisterFormDataType,
  AuthResetPasswordFormDataType,
  AuthTokenType,
  UserDataType,
} from "../../Types/Common";
// eslint-disable-next-line import/no-cycle
import { Axios, axiosInstance } from "../../../Common/Utils";

const fakeUserData: UserDataType = {
  id: 0,
  email: "encacap_0@gmail.com",
  name: "Trần Văn E",
  username: "",
  role: {
    id: 1,
    name: UserRoleEnum.USER,
  },
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getMe = async (isRedirectWhenError?: boolean): Promise<UserDataType> => {
  // eslint-disable-next-line no-console
  // console.log("getMe", isRedirectWhenError);

  // const response = await Axios.instance.get(AUTH_API_PATH.ME, {
  //   params: {
  //     expand: ["role", "city", "country"],
  //   },
  //   redirectWhenError: isRedirectWhenError,
  // });

  // return response.data.data;

  return Promise.resolve(fakeUserData);
};

const loginWithEmailAndPassword = async (data: AuthLoginFormDataType) => {
  const response = await axiosInstance.post(AUTH_API_PATH.LOGIN, data);
  return response.data.data;
};

const register = async (data: AuthRegisterFormDataType) =>
  new Promise<UserDataType>((resolve) => {
    setTimeout(
      () =>
        resolve({
          ...data,
          id: 1,
          name: data.name,
          role: {
            id: 2,
            name: UserRoleEnum.USER,
          },
        }),
      1000,
    );
  });

const forgetPassword = async (email: string) =>
  new Promise((resolve) => {
    setTimeout(() => resolve(email), 1000);
  });

const resetPassword = async (email: string, data: AuthResetPasswordFormDataType) =>
  new Promise((resolve) => {
    setTimeout(
      () =>
        resolve({
          email,
          ...data,
        }),
      1000,
    );
  });

const logOut = async () =>
  new Promise((resolve) => {
    setTimeout(() => resolve({}), 1000);
  });

const getAuthToken = (): AuthTokenType | null => {
  const authToken = localStorage.getItem("authToken");

  if (!authToken) {
    return null;
  }

  return JSON.parse(authToken);
};

const setAuthToken = (authToken: AuthTokenType) => {
  localStorage.setItem("authToken", JSON.stringify(authToken));
};

const removeAuthToken = () => {
  localStorage.removeItem("authToken");
};

const getAccessToken = () => {
  const authToken = getAuthToken();

  if (!authToken) {
    return null;
  }

  return authToken.token;
};

const getRefreshToken = () => {
  const authToken = getAuthToken();

  if (!authToken) {
    return null;
  }

  return authToken.refreshToken;
};

const refreshAccessToken = async (refreshToken: string) => {
  const response = await Axios.instance.post(
    AUTH_API_PATH.REFRESH_TOKEN,
    {
      refreshToken,
    },
    {
      autoRefreshToken: false,
    },
  );

  return response.data.data;
};

const setAccessToken = (accessToken: string) => {
  localStorage.setItem("access_token", accessToken);
};

export {
  forgetPassword,
  getAccessToken,
  getAuthToken,
  getMe,
  getRefreshToken,
  logOut,
  loginWithEmailAndPassword,
  refreshAccessToken,
  register,
  removeAuthToken,
  resetPassword,
  setAccessToken,
  setAuthToken,
};
