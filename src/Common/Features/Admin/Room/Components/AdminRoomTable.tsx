import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { memo, useMemo } from "react";
import { useTranslation } from "react-i18next";

import AdminProductTableRowAction, { AdminRoomTableRowActionProps } from "./AdminRoomTableRowAction";
import { Table, TableProps } from "../../../../Components";
import TableRowActionSkeleton from "../../../../Components/Table/TableRowActionSkeleton";
import { RoomDataType } from "../../../../../App/Types/Common/roomType";

interface AdminProductTableProps
  extends Omit<TableProps, "columns">,
    Omit<AdminRoomTableRowActionProps, "id"> {
  data: RoomDataType[];
  isLoading: boolean;
}

const AdminRoomTable = ({ data, meta, isLoading, onClickEdit, onClickDelete }: AdminProductTableProps) => {
  const { t } = useTranslation("admin");

  const columnHelper = useMemo(() => createColumnHelper<RoomDataType>(), []);

  const columns: Array<ColumnDef<RoomDataType, string>> = useMemo(
    () => [
      columnHelper.accessor((row) => String(row.uuid), {
        id: "uuid",
        header: t("id"),
      }),
      columnHelper.accessor((row) => row?.name, {
        id: "name",
        header: t("name"),
      }),
      columnHelper.display({
        id: "actions",
        cell: (props) => (
          <AdminProductTableRowAction
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
      columns={columns as Array<ColumnDef<RoomDataType>>}
      isLoading={isLoading}
    />
  );
};

export default memo(AdminRoomTable);
