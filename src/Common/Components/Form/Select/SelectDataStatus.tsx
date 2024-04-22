import { values } from "lodash";
import { memo, useMemo } from "react";
import { useTranslation } from "react-i18next";

import { SelectProps } from "../interface";
import Select from "./Select";
import { DataStatusEnum } from "../../../../App/Enums";

interface SelectDataStatusProps extends Omit<SelectProps, "options" | "placeholder"> {}

const SelectDataStatus = (props: SelectDataStatusProps) => {
  const { t } = useTranslation();

  const statusOptions = useMemo(
    () => values(DataStatusEnum).map((status) => ({ label: t(status), value: status })),
    [t],
  );

  return <Select options={statusOptions} placeholder={t("status")} {...props} />;
};

export default memo(SelectDataStatus);
