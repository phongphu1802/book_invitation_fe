import { memo } from "react";
import { useTranslation } from "react-i18next";

import ErrorContainer from "./ErrorContainer";

const ErrorNotFound = () => {
  const { t } = useTranslation("company");

  return (
    <ErrorContainer>
      <div>404</div>
      <div className="mx-4 h-6 w-px bg-gray-200" />
      <div>{t("pageNotFound")}</div>
    </ErrorContainer>
  );
};

export default memo(ErrorNotFound);
