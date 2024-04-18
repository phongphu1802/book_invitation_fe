import { memo } from "react";
import { useTranslation } from "react-i18next";
import { Link, useSearchParams } from "react-router-dom";

import { AUTH_PATH } from "../../../../../App/Constants";

const RegisterFormFooter = () => {
  const { t } = useTranslation("auth");

  const [searchParams] = useSearchParams();

  return (
    <div className="text-center text-white">
      {t("doHaveAccount")}
      <Link
        to={`${AUTH_PATH.LOGIN}?redirect=${encodeURIComponent(searchParams.get("redirect") ?? "")}`}
        className="block ml-1 font-semibold underline hover:text-primary-700 sm:inline-block"
      >
        {t("loginNow")}
      </Link>
    </div>
  );
};

export default memo(RegisterFormFooter);
