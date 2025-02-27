import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { memo, useMemo } from "react";
import { useTranslation } from "react-i18next";

import AdminStudentTableRowAction, { AdminStudentTableRowActionProps } from "./AdminStudentTableRowAction";
import { ProductDataType } from "../../../../../App/Types/Common/productType";
import { Table, TableProps } from "../../../../Components";
import TableRowActionSkeleton from "../../../../Components/Table/TableRowActionSkeleton";
import { StudentDataType } from "../../../../../App/Types/Common/studentType";

interface AdminStudentTableProps
  extends Omit<TableProps, "columns">,
    Omit<AdminStudentTableRowActionProps, "id"> {
  data: StudentDataType[];
  isLoading: boolean;
}

const AdminStudentTable = ({ data, meta, isLoading, onClickEdit, onClickDelete }: AdminStudentTableProps) => {
  const { t } = useTranslation("admin");
  const columnHelper = useMemo(() => createColumnHelper<StudentDataType>(), []);

  const columns: Array<ColumnDef<StudentDataType, string>> = useMemo(
    () => [
      columnHelper.accessor((row) => String(row.uuid), {
        id: "uuid",
        header: t("id"),
      }),
      columnHelper.accessor((row) => row?.name, {
        id: "name",
        header: t("name"),
      }),
      columnHelper.accessor((row) => row?.course?.name, {
        id: "course.name",
        header: t("course"),
      }),
      columnHelper.accessor((row) => String(row?.sex), {
        id: "sex",
        header: t("sex"),
      }),
      columnHelper.accessor((row) => String(row?.status), {
        id: "status",
        header: t("status"),
      }),
      columnHelper.display({
        id: "actions",
        cell: (props) => (
          <AdminStudentTableRowAction
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

export default memo(AdminStudentTable);
