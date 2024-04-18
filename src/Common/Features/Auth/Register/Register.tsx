import { Link, useSearchParams } from "react-router-dom";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FormProvider, useForm } from "react-hook-form";
import { UNPROCESSABLE_ENTITY } from "http-status";
import { yupResolver } from "@hookform/resolvers/yup";

import { AUTH_CODE, AUTH_PATH } from "../../../../App/Constants";
import { Alert, Button, Input } from "../../../Components";
import AuthFormContainer from "../Components/AuthFormContainer";
import { useDocumentTitle } from "../../../Hooks";
import { authService } from "../../../../App/Services";
import { AuthFormGeneralError, AuthRegisterFormDataType } from "../../../../App/Types/Common";
import { registerFormSchema } from "../Schemas/RegisterFormSchema";
import { setAuthToken } from "../../../../App/Services/Common/authService";
import RegisterFormHeader from "./Components/RegisterFormHeader";
import RegisterFormFooter from "./Components/RegisterFormFooter";

const Register = () => {
  const { t } = useTranslation("auth");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [generalError, setGeneralError] = useState<AuthFormGeneralError | null>(null);
  const [searchParams] = useSearchParams();

  const {
    control,
    handleSubmit: useFormSubmit,
    watch,
    ...methods
  } = useForm<AuthRegisterFormDataType>({
    resolver: yupResolver(registerFormSchema(t)),
  });

  const email = watch("email", "");

  const handleSubmit = useFormSubmit((formData) => {
    setIsSubmitting(true);

    authService
      .register(formData)
      .then((userData) => {
        const { token } = userData.data;
        // const redirectURL = generateAuthRedirectURL([userData.role.name], searchParams.get("redirect"));
        setAuthToken(token);
      })
      .catch((err) => {
        const { status } = err.response.data;

        if (status === UNPROCESSABLE_ENTITY) {
          setGeneralError({
            code: AUTH_CODE.ACCOUNT_EXISTS,
            message: t("emailAlreadyExists", { email: formData.email }),
          });
          return;
        }
        setGeneralError({ ...err });
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  });

  useDocumentTitle(t("register"));

  return (
    <AuthFormContainer>
      <FormProvider control={control} handleSubmit={useFormSubmit} watch={watch} {...methods}>
        <form className="grid grid-cols-1 gap-6" onSubmit={handleSubmit}>
          <RegisterFormHeader />
          {generalError && (
            <Alert title={t("registerError")} message={generalError.message} type="danger" className="mb-2">
              {generalError.code === AUTH_CODE.ACCOUNT_EXISTS && (
                <Link
                  to={`${AUTH_PATH.LOGIN}?email=${encodeURIComponent(
                    email ?? "",
                  )}&redirect=${encodeURIComponent(searchParams.get("redirect") ?? "")}`}
                >
                  {t("loginNow")}
                </Link>
              )}
            </Alert>
          )}
          <Input
            type="text"
            label={t("name")}
            name="name"
            className="block text-white bg-white/10"
            classNameLabel="text-white"
            size="sm"
            disabled={isSubmitting}
            control={control}
          />
          <Input
            type="text"
            label={t("email")}
            name="email"
            disabled={isSubmitting}
            className="block text-white bg-white/10"
            classNameLabel="text-white"
            size="sm"
            control={control}
          />
          <Input
            type="text"
            label={t("username")}
            name="username"
            disabled={isSubmitting}
            className="block text-white bg-white/10"
            classNameLabel="text-white"
            size="sm"
            control={control}
          />
          <Input
            type="password"
            label={t("password")}
            name="password"
            className="block text-white bg-white/10"
            classNameLabel="text-white"
            size="sm"
            disabled={isSubmitting}
            control={control}
          />
          <Button type="submit" disabled={isSubmitting} isLoading={isSubmitting}>
            {t("register")}
          </Button>
          <RegisterFormFooter />
        </form>
      </FormProvider>
    </AuthFormContainer>
  );
};

export default Register;
