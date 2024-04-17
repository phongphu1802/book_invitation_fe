import dayjs from "dayjs";
import { first } from "lodash";
import { ReactNode, memo, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { twMerge } from "tailwind-merge";

import { TableFilterOptionItemType, TableFilterTypeEnum } from "../interface";

interface TableHeaderFilterLabelProps {
  label: string | number | boolean | ReactNode | null;
  options: TableFilterOptionItemType[];
  selected: Array<string | Date>;
  filterType?: TableFilterTypeEnum;
}

const TableHeaderFilterLabel = ({ label, options, selected, filterType }: TableHeaderFilterLabelProps) => {
  const { t } = useTranslation();

  const firstSelectedOptionLabel = useMemo(() => {
    const firstSelectedValue = first(selected);

    if (firstSelectedValue === null || firstSelectedValue === undefined) {
      return null;
    }

    if (filterType === TableFilterTypeEnum.DATE_RANGE) {
      const secondSelectedValue = selected[1];

      if (!secondSelectedValue) {
        return null;
      }

      return `${dayjs(firstSelectedValue).format(t("dateFormat"))} - ${dayjs(secondSelectedValue).format(
        t("dateFormat"),
      )}`;
    }

    const firstSelectedOption = options.find((option) => option.value === firstSelectedValue);

    if (!firstSelectedOption) {
      return null;
    }

    return firstSelectedOption.label;
  }, [options, selected, filterType, t]);

  return (
    <div className="flex">
      <span className="line-clamp-1">
        <span className={twMerge(firstSelectedOptionLabel && "mr-1 font-semibold")}>
          {label}
          {firstSelectedOptionLabel && ":"}
        </span>
      </span>

      {firstSelectedOptionLabel && (
        <span>
          {firstSelectedOptionLabel}
          {selected.length > 1 && filterType !== TableFilterTypeEnum.DATE_RANGE && (
            <span className="ml-2 inline-flex items-center justify-center rounded-xl bg-gray-300 px-2 pt-0.5 text-sm font-semibold">
              +{selected.length - 1}
            </span>
          )}
        </span>
      )}
    </div>
  );
};

export default memo(TableHeaderFilterLabel);
