import { memo } from "react";
import { useTranslation } from "react-i18next";
import { FiEdit2 } from "react-icons/fi";

import { ButtonTableRowActionProps } from "../interface";
import TableRowAction from "./TableRowAction";

const TableRowActionEdit = <T extends unknown>({
  data,
  isDisabled,
  onClick,
}: Pick<ButtonTableRowActionProps<T>, "data" | "isDisabled" | "onClick">) => {
  const { t } = useTranslation();

  return (
    <TableRowAction data={data} isDisabled={isDisabled} title={t("edit")} type="button" onClick={onClick}>
      <FiEdit2 size={17} />
    </TableRowAction>
  );
};

export default memo(TableRowActionEdit) as typeof TableRowActionEdit;
