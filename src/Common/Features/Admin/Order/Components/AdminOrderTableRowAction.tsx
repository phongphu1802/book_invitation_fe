import { memo } from "react";

import { TableRowActionDelete } from "../../../../Components";
import { TableOnclickFunctionType } from "../../../../../App/Types/Common";
import TableRowActionView from "../../../../Components/Table/TableRowAction/TableRowActionView";

export interface AdminOrderTableRowActionProps {
  id: number;
  onClickDelete: TableOnclickFunctionType<number>;
  onClickView: TableOnclickFunctionType<number>;
}

const AdminOrderTableRowAction = ({ id, onClickDelete, onClickView }: AdminOrderTableRowActionProps) => {
  return (
    <div className="flex items-center justify-end space-x-2">
      <TableRowActionView data={id} onClick={onClickView} />
      <TableRowActionDelete data={id} onClick={onClickDelete} />
    </div>
  );
};

export default memo(AdminOrderTableRowAction);
