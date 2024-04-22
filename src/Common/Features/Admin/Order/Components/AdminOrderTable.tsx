import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { memo, useMemo } from "react";
import { useTranslation } from "react-i18next";

import AdminOrderTableRowAction, { AdminOrderTableRowActionProps } from "./AdminOrderTableRowAction";
import { Table, TableProps } from "../../../../Components";
import TableRowActionSkeleton from "../../../../Components/Table/TableRowActionSkeleton";
import { OrderDataType } from "../../../../../App/Types/Common";

interface AdminOrderTableProps
  extends Omit<TableProps, "columns">,
    Omit<AdminOrderTableRowActionProps, "id"> {
  data: OrderDataType[];
  isLoading: boolean;
}

const AdminOrderTable = ({ data, meta, isLoading, onClickView, onClickDelete }: AdminOrderTableProps) => {
  const { t } = useTranslation("admin");

  const columnHelper = useMemo(() => createColumnHelper<OrderDataType>(), []);

  const columns: Array<ColumnDef<OrderDataType, string>> = useMemo(
    () => [
      columnHelper.accessor((row) => String(row.uuid), {
        id: "uuid",
        header: t("id"),
      }),
      columnHelper.accessor((row) => String(row.user.email), {
        id: "user.email",
        header: t("email"),
      }),
      columnHelper.accessor((row) => String(row.total_amount), {
        id: "total_amount",
        header: t("totalAmount"),
      }),
      columnHelper.display({
        id: "actions",
        cell: (props) => (
          <AdminOrderTableRowAction
            id={props.row.original.uuid}
            onClickView={onClickView}
            onClickDelete={onClickDelete}
          />
        ),
        meta: {
          skeleton: <TableRowActionSkeleton numberOfActions={2} />,
        },
      }),
    ],
    [columnHelper, onClickDelete, onClickView, t],
  );

  return (
    <Table
      data={data}
      meta={meta}
      columns={columns as Array<ColumnDef<OrderDataType>>}
      isLoading={isLoading}
    />
  );
};

export default memo(AdminOrderTable);
