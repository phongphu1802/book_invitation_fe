import { TFunction } from "i18next";
import { object, string } from "yup";

const loginFormSchema = (t: TFunction) =>
  object().shape({
    username: string().required(t("emailRequired") ?? ""),
    password: string().required(t("passwordRequired") ?? ""),
  });

export { loginFormSchema };
