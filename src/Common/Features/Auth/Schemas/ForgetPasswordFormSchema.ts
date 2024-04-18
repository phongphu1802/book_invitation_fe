import { TFunction } from "i18next";
import { object, string } from "yup";

const forgetPasswordFormSchema = (t: TFunction) =>
  object().shape({
    email: string()
      .email(t("emailInvalid") ?? "")
      .required(t("emailRequired") ?? ""),
  });

export { forgetPasswordFormSchema };
