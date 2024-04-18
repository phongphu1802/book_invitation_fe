import { TFunction } from "i18next";
import { object, string } from "yup";

const loginFormSchema = (t: TFunction) =>
  object().shape({
    email: string()
      .email(t("emailInvalid") ?? "")
      .required(t("emailRequired") ?? ""),
    password: string().required(t("passwordRequired") ?? ""),
  });

export { loginFormSchema };
