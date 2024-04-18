import { useTranslation } from "react-i18next";

const LoginFormHeader = () => {
  const { t } = useTranslation("auth");

  return <div className="w-full pb-2 text-6xl font-bold text-center text-gray-50">{t("login")}</div>;
};

export default LoginFormHeader;
