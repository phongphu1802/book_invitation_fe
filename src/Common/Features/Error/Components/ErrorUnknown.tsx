import { memo, useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { PiSmileySad } from "react-icons/pi";

import ErrorContainer from "./ErrorContainer";
import ErrorUnknownDetail, { ErrorUnknownDetailProps } from "./ErrorUnknownDetail";
import { Button } from "../../../Components";

const ErrorUnknown = ({ error }: Partial<ErrorUnknownDetailProps>) => {
  const { t } = useTranslation("company");
  const isDevelopment = useMemo(() => process.env.NODE_ENV === "development", []);

  const handleClickTryAgain = useCallback(() => {
    window.location.reload();
  }, []);

  return (
    <ErrorContainer childrenClassName="flex-col space-y-6 lg:space-y-4 p-6">
      <div className="flex flex-col items-center justify-center py-4">
        <PiSmileySad size={64} className="mb-4 text-primary-700" />
        <div className="font-bold text-center lg:text-left">Ooops!</div>
        <div className="text-center lg:text-left">{t("somethingWentWrong")}</div>
      </div>
      <Button type="button" className="w-full lg:w-fit" onClick={handleClickTryAgain}>
        {t("tryAgain")}
      </Button>
      {isDevelopment && !!error && <ErrorUnknownDetail error={error} />}
    </ErrorContainer>
  );
};

export default memo(ErrorUnknown);
