import { HTMLAttributes, memo } from "react";
import { useTranslation } from "react-i18next";
import { BsFolder2Open } from "react-icons/bs";
import { twMerge } from "tailwind-merge";

const TableContentBodyEmptyItem = ({ className }: HTMLAttributes<HTMLElement>) => {
  const { t } = useTranslation();

  return (
    <div
      className={twMerge(
        "flex flex-col items-center justify-center pb-20 pt-24 text-center text-gray-500",
        className,
      )}
    >
      <BsFolder2Open size={40} className="text-gray-200" />
      <div className="mt-2 text-gray-300">{t("nothingHere")}</div>
    </div>
  );
};

export default memo(TableContentBodyEmptyItem);
