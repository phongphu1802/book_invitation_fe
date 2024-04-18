import { useTranslation } from "react-i18next";

const RegisterFormHeader = () => {
  const { t } = useTranslation("auth");
  return <div className="w-full pb-2 text-6xl font-bold text-center text-gray-50">{t("register")}</div>;
};

export default RegisterFormHeader;
