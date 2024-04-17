import { memo } from "react";
import { useTranslation } from "react-i18next";
import { FiTrash2 } from "react-icons/fi";

import { ButtonTableRowActionProps } from "../interface";
import TableRowAction from "./TableRowAction";

const TableRowActionDelete = <T extends unknown>({
  data,
  isDisabled,
  onClick,
}: Pick<ButtonTableRowActionProps<T>, "data" | "isDisabled" | "onClick">) => {
  const { t } = useTranslation();

  return (
    <TableRowAction
      data={data}
      title={t("delete")}
      isDisabled={isDisabled}
      status="danger"
      type="button"
      onClick={onClick}
    >
      <FiTrash2 />
    </TableRowAction>
  );
};

export default memo(TableRowActionDelete) as typeof TableRowActionDelete;
