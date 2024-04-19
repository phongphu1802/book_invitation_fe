import { memo } from "react";
import { useTranslation } from "react-i18next";
import { FiAlertTriangle } from "react-icons/fi";
import { twMerge } from "tailwind-merge";

import { ComponentStatusType } from "../interface";

interface ConfirmationModalWarningProps {
  message?: string | null;
  status: ComponentStatusType;
}

const ConfirmationModalWarning = ({ message, status }: ConfirmationModalWarningProps) => {
  const { t } = useTranslation();

  return (
    <div
      className={twMerge(
        "mt-6 w-full rounded-md border-l-8 border-orange-300 bg-orange-100 py-4 pl-4 pr-4",
        status === "danger" && "border-red-300 bg-red-100",
      )}
    >
      <div className="flex">
        <div className="flex-shrink-0 mr-4 text-lg">
          <FiAlertTriangle
            size={24}
            className={twMerge("text-orange-500", status === "danger" && "text-red-500")}
          />
        </div>
        <div>
          {status === "danger" && <div className="font-bold text-red-500">{t("error")}</div>}
          {status !== "danger" && <div className="font-bold text-orange-500">{t("warning")}</div>}
          <div
            className={twMerge(
              "mb-0.5 mt-1.5 w-full text-sm font-medium text-orange-500",
              status === "danger" && "text-red-500",
            )}
          >
            {message}
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(ConfirmationModalWarning);
