import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { isEmpty } from "lodash";

import { Alert, Button, Input } from "../../../Components";
import { AuthFormGeneralError, AuthLoginFormDataType } from "../../../../App/Types/Common";
import { setAuthToken } from "../../../../App/Services/Common/authService";
import { useDocumentTitle } from "../../../Hooks";
import { AUTH_CODE, AUTH_PATH } from "../../../../App/Constants";
import { loginFormSchema } from "../Schemas/LoginFormSchema";
import { authService } from "../../../../App/Services";
import LoginFormHeader from "./Components/LoginFormHeader";
import LoginFormFooter from "./Components/LoginFormFooter";
import AuthFormContainer from "../Components/AuthFormContainer";

const Login = () => {
  const { t } = useTranslation("auth");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [generalError, setGeneralError] = useState<AuthFormGeneralError | null>(null);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const {
    control,
    handleSubmit: useFormSubmit,
    watch,
    ...methods
  } = useForm<AuthLoginFormDataType>({
    resolver: yupResolver(loginFormSchema(t)),
  });

  const email = watch("email");

  // const urlRedirect = useCallback((user: UserDataType) => {
  //   if (user?.role?.name === UserRoleEnum.USER) return "/my";
  //   return `/${user?.role?.name}`;
  // }, []);

  const handleSubmit = useFormSubmit(async (formData) => {
    setIsSubmitting(true);
    try {
      const userData = await authService.loginWithEmailAndPassword(formData);
      setAuthToken({ token: userData.token, refreshToken: userData.refresh_token });
      navigate("/");
    } catch (error) {
      if (!isEmpty(error)) {
        setGeneralError(error as AuthFormGeneralError);
      }
    } finally {
      setIsSubmitting(false);
    }
  });

  useDocumentTitle(t("login"));

  return (
    <AuthFormContainer>
      <FormProvider control={control} handleSubmit={useFormSubmit} watch={watch} {...methods}>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
          <LoginFormHeader />
          {generalError && (
            <Alert title={t("loginError")} message={generalError.message} type="danger" className="mb-2">
              {generalError.code === AUTH_CODE.ACCOUNT_NOT_EXISTS && (
                <Link
                  to={`${AUTH_PATH.REGISTER}?email=${encodeURIComponent(
                    email || "",
                  )}&redirect=${encodeURIComponent(searchParams.get("redirect") ?? "")}`}
                >
                  {t("createWithEmail")}
                </Link>
              )}
            </Alert>
          )}
          <Input
            name="email"
            label={t("email")}
            className="block text-white bg-white/10"
            classNameLabel="text-white"
            control={control}
            size="sm"
            disabled={isSubmitting}
          />
          <Input
            type="password"
            label={t("password")}
            name="password"
            className="block text-white bg-white/10"
            classNameLabel="text-white"
            size="sm"
            control={control}
            disabled={isSubmitting}
          />
          <div className="-mb-1.5 -mt-2 flex justify-end">
            <Link
              to={AUTH_PATH.FORGET_PASSWORD}
              className="text-sm font-semibold text-center text-white hover:underline"
              role="link"
              tabIndex={-1}
            >
              {t("forgetYourPassword")}
            </Link>
          </div>
          <Button type="submit" disabled={isSubmitting} isLoading={isSubmitting}>
            {t("login")}
          </Button>
          <LoginFormFooter />
        </form>
      </FormProvider>
    </AuthFormContainer>
  );
};

export default Login;
