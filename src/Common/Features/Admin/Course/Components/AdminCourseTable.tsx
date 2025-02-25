import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { memo, useMemo } from "react";
import { useTranslation } from "react-i18next";

import AdminProductTableRowAction, { AdminCourseTableRowActionProps } from "./AdminCourseTableRowAction";
import { Table, TableProps } from "../../../../Components";
import TableRowActionSkeleton from "../../../../Components/Table/TableRowActionSkeleton";
import { CourseDataType } from "../../../../../App/Types/Common/courseType";

interface AdminCourseTableProps
  extends Omit<TableProps, "columns">,
    Omit<AdminCourseTableRowActionProps, "id"> {
  data: CourseDataType[];
  isLoading: boolean;
}

const AdminCourseTable = ({ data, meta, isLoading, onClickEdit, onClickDelete }: AdminCourseTableProps) => {
  const { t } = useTranslation("admin");

  const columnHelper = useMemo(() => createColumnHelper<CourseDataType>(), []);

  const columns: Array<ColumnDef<CourseDataType, string>> = useMemo(
    () => [
      columnHelper.accessor((row) => String(row.uuid), {
        id: "uuid",
        header: t("id"),
      }),
      columnHelper.accessor((row) => row?.name, {
        id: "name",
        header: t("name"),
      }),
      columnHelper.accessor((row) => row?.teacher?.name, {
        id: "price",
        header: t("price"),
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
      columns={columns as Array<ColumnDef<CourseDataType>>}
      isLoading={isLoading}
    />
  );
};

export default memo(AdminCourseTable);
