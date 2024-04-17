import { memo } from "react";
import { useTranslation } from "react-i18next";
import { FiEye } from "react-icons/fi";

import { ButtonTableRowActionProps } from "../interface";
import TableRowAction from "./TableRowAction";

const TableRowActionView = <T extends unknown>({
  data,
  isDisabled,
  onClick,
}: Pick<ButtonTableRowActionProps<T>, "data" | "isDisabled" | "onClick">) => {
  const { t } = useTranslation();

  return (
    <TableRowAction data={data} title={t("view")} isDisabled={isDisabled} type="button" onClick={onClick}>
      <FiEye />
    </TableRowAction>
  );
};

export default memo(TableRowActionView);
