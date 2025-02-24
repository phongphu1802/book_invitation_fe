import { memo } from "react";

import { TableRowActionDelete, TableRowActionEdit } from "../../../../Components";
import { TableOnclickFunctionType } from "../../../../../App/Types/Common";

export interface AdminRoleTableRowActionProps {
  id: number;
  onClickEdit: TableOnclickFunctionType<number>;
  onClickDelete: TableOnclickFunctionType<number>;
}

const AdminRoleTableRowAction = ({ id, onClickEdit, onClickDelete }: AdminRoleTableRowActionProps) => {
  return (
    <div className="flex items-center justify-end space-x-2">
      <TableRowActionEdit data={id} onClick={onClickEdit} />
      <TableRowActionDelete data={id} onClick={onClickDelete} />
    </div>
  );
};

export default memo(AdminRoleTableRowAction);
