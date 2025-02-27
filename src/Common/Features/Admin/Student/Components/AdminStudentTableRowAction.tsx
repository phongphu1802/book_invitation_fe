import { memo } from "react";

import { TableRowActionDelete, TableRowActionEdit } from "../../../../Components";
import { TableOnclickFunctionType } from "../../../../../App/Types/Common";

export interface AdminStudentTableRowActionProps {
  id: number;
  onClickEdit: TableOnclickFunctionType<number>;
  onClickDelete: TableOnclickFunctionType<number>;
}

const AdminStudentTableRowAction = ({ id, onClickEdit, onClickDelete }: AdminStudentTableRowActionProps) => {
  return (
    <div className="flex items-center justify-end space-x-2">
      <TableRowActionEdit data={id} onClick={onClickEdit} />
      <TableRowActionDelete data={id} onClick={onClickDelete} />
    </div>
  );
};

export default memo(AdminStudentTableRowAction);
