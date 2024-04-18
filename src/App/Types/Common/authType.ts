export interface AuthTokenType {
  token: string;
  refreshToken: string;
}

export interface AuthLoginFormDataType {
  email: string;
  password: string;
}

export interface AuthRegisterFormDataType {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  username: string;
}

export interface AuthForgetPasswordFormDataType {
  email: string;
}

export interface AuthResetPasswordFormDataType {
  password: string;
  passwordConfirmation: string;
  otp: string;
}

export interface AuthFormGeneralError {
  code: string;
  message: string;
}
