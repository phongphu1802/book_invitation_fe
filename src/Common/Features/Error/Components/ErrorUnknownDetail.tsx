import { memo } from "react";
import { useTranslation } from "react-i18next";

export interface ErrorUnknownDetailProps {
  error: unknown;
}

const ErrorUnknownDetail = ({ error }: ErrorUnknownDetailProps) => {
  const { t } = useTranslation("company");

  return (
    <code className="px-6 py-4 break-all rounded-lg bg-gray-50">
      {error instanceof Error && (
        <div className="flex flex-col space-y-1">
          <div className="font-semibold text-red-500">
            <span className="mr-1">{error.name}:</span>
            <span>{error.message}</span>
          </div>
          <div className="whitespace-pre-line line-clamp-6">{error.stack}</div>
          <div>{t("checkConsoleForMoreDetails")}</div>
        </div>
      )}
    </code>
  );
};

export default memo(ErrorUnknownDetail);
