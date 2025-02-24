import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { memo, useMemo } from "react";
import { useTranslation } from "react-i18next";

import AdminTeacherTableRowAction, { AdminTeacherTableRowActionProps } from "./AdminTeacherTableRowAction";
import { ProductDataType } from "../../../../../App/Types/Common/productType";
import { Table, TableProps } from "../../../../Components";
import TableRowActionSkeleton from "../../../../Components/Table/TableRowActionSkeleton";
import { TeacherDataType } from "../../../../../App/Types/Common/teacherType";

interface AdminTeacherTableProps
  extends Omit<TableProps, "columns">,
    Omit<AdminTeacherTableRowActionProps, "id"> {
  data: TeacherDataType[];
  isLoading: boolean;
}

const AdminTeacherTable = ({ data, meta, isLoading, onClickEdit, onClickDelete }: AdminTeacherTableProps) => {
  const { t } = useTranslation("admin");

  const columnHelper = useMemo(() => createColumnHelper<TeacherDataType>(), []);

  const columns: Array<ColumnDef<TeacherDataType, string>> = useMemo(
    () => [
      columnHelper.accessor((row) => String(row.uuid), {
        id: "uuid",
        header: t("id"),
      }),
      columnHelper.accessor((row) => row?.name, {
        id: "name",
        header: t("name"),
      }),
      columnHelper.accessor((row) => row?.proper, {
        id: "proper",
        header: t("proper"),
      }),
      columnHelper.accessor((row) => String(row?.sex), {
        id: "sex",
        header: t("sex"),
      }),
      columnHelper.accessor((row) => row?.birthday, {
        id: "birthday",
        header: t("birthday"),
      }),
      columnHelper.display({
        id: "actions",
        cell: (props) => (
          <AdminTeacherTableRowAction
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
      columns={columns as Array<ColumnDef<ProductDataType>>}
      isLoading={isLoading}
    />
  );
};

export default memo(AdminTeacherTable);
