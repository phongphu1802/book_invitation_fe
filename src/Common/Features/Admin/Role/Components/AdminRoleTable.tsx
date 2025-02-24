import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { memo, useMemo } from "react";
import { useTranslation } from "react-i18next";

import AdminRoleTableRowAction, { AdminRoleTableRowActionProps } from "./AdminRoleTableRowAction";
import { Table, TableProps } from "../../../../Components";
import TableRowActionSkeleton from "../../../../Components/Table/TableRowActionSkeleton";
import { UserRoleDataType } from "../../../../../App/Types/Common";

interface AdminRoleTableProps extends Omit<TableProps, "columns">, Omit<AdminRoleTableRowActionProps, "id"> {
  data: UserRoleDataType[];
  isLoading: boolean;
}

const AdminRoleTable = ({ data, meta, isLoading, onClickEdit, onClickDelete }: AdminRoleTableProps) => {
  const { t } = useTranslation("admin");

  const columnHelper = useMemo(() => createColumnHelper<UserRoleDataType>(), []);

  const columns: Array<ColumnDef<UserRoleDataType, string>> = useMemo(
    () => [
      columnHelper.accessor((row) => String(row.uuid), {
        id: "uuid",
        header: t("id"),
      }),
      columnHelper.accessor((row) => String(row?.name), {
        id: "name",
        header: t("name"),
      }),
      columnHelper.display({
        id: "actions",
        cell: (props) => (
          <AdminRoleTableRowAction
            id={props.row.original.uuid}
            onClickEdit={onClickEdit}
            onClickDelete={onClickDelete}
          />
        ),
        meta: {
          skeleton: <TableRowActionSkeleton numberOfActions={2} />,
        },
      }),
    ],
    [columnHelper, onClickDelete, onClickEdit, t],
  );

  return (
    <Table
      data={data}
      meta={meta}
      columns={columns as Array<ColumnDef<UserRoleDataType>>}
      isLoading={isLoading}
    />
  );
};

export default memo(AdminRoleTable);
