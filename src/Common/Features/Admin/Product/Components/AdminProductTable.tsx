import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { memo, useMemo } from "react";
import { useTranslation } from "react-i18next";

import AdminProductTableRowAction, { AdminProductTableRowActionProps } from "./AdminProductTableRowAction";
import { ProductDataType } from "../../../../../App/Types/Common/productType";
import { Table, TableProps } from "../../../../Components";
import TableImageColumn from "../../../../Components/Table/TableImageColumn";
import { TableImageColumnTypeEnum } from "../../../../../App/Enums";
import TableRowActionSkeleton from "../../../../Components/Table/TableRowActionSkeleton";

interface AdminProductTableProps
  extends Omit<TableProps, "columns">,
    Omit<AdminProductTableRowActionProps, "id"> {
  data: ProductDataType[];
  isLoading: boolean;
}

const AdminProductTable = ({ data, meta, isLoading, onClickEdit, onClickDelete }: AdminProductTableProps) => {
  const { t } = useTranslation("admin");

  const columnHelper = useMemo(() => createColumnHelper<ProductDataType>(), []);

  const columns: Array<ColumnDef<ProductDataType, string>> = useMemo(
    () => [
      columnHelper.accessor((row) => String(row.uuid), {
        id: "uuid",
        header: t("id"),
      }),
      columnHelper.display({
        id: "img",
        header: t("img"),
        cell: (props) => (
          <TableImageColumn
            className="h-40 rounded-md w-28"
            src={props.row.original.image}
            alt={props.row.original.name}
            type={TableImageColumnTypeEnum.BOX}
          />
        ),
        meta: {
          skeleton: <TableImageColumn skeleton type={TableImageColumnTypeEnum.BOX} />,
        },
      }),
      columnHelper.accessor((row) => row?.name, {
        id: "name",
        header: t("name"),
      }),
      columnHelper.accessor((row) => row?.price, {
        id: "price",
        header: t("price"),
      }),
      columnHelper.accessor((row) => row?.description, {
        id: "description",
        header: t("description"),
      }),
      columnHelper.accessor((row) => row?.category?.name, {
        id: "category.name",
        header: t("category"),
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
      columns={columns as Array<ColumnDef<ProductDataType>>}
      isLoading={isLoading}
    />
  );
};

export default memo(AdminProductTable);
