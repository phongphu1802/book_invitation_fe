import { TFunction } from "i18next";
import { object, string } from "yup";

const registerFormSchema = (t: TFunction) =>
  object().shape({
    name: string().required(t("nameRequired") ?? ""),
    username: string().required(t("usernameRequired") ?? ""),
    email: string()
      .email(t("emailInvalid") ?? "")
      .required(t("emailRequired") ?? ""),
    password: string().required(t("passwordRequired") ?? ""),
  });

export { registerFormSchema };
