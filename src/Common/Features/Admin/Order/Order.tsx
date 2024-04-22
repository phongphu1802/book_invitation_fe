import { useTranslation } from "react-i18next";
import { Key, useCallback, useEffect, useState } from "react";

import { LayoutContentWrapper } from "../../../Layout";
import AdminOrderTable from "./Components/AdminOrderTable";
import { OrderDataType, ResponseMetaType } from "../../../../App/Types/Common";
import { deleteOrder, getOrders } from "../../../../App/Services/App/orderService";
import { useDocumentTitle } from "../../../Hooks";
import { ConfirmationModal } from "../../../Components";
import useToast from "../../../Hooks/useToast";

const Order = () => {
  const { t } = useTranslation("admin");
  const [orderData, setorderData] = useState<OrderDataType[]>([]);
  const [meta, setMeta] = useState<ResponseMetaType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategoryId, setSelectedCategoryId] = useState<Key | null>(null);
  const [isShowDeleteModal, setIsShowDeleteModal] = useState<boolean>(false);
  const toast = useToast();
  const handleClickViewButton = () => {};

  const handleClickDeleteButton = useCallback((id?: Key) => {
    setSelectedCategoryId(id ?? null);
    setIsShowDeleteModal(true);
  }, []);

  const fetchData = useCallback(async () => {
    try {
      const { data, meta: metaData } = await getOrders({
        expand: ["order__product", "order_detail__product", "order__user_uuid"],
      });
      setorderData(data);
      setMeta(metaData);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsShowDeleteModal(false);
    setSelectedCategoryId(null);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleDelete = useCallback(async () => {
    try {
      await deleteOrder(selectedCategoryId as number);
      toast.success(t("deleteSuccessfully"));
    } finally {
      fetchData();
    }
  }, [selectedCategoryId, toast, t, fetchData]);

  useDocumentTitle(t("orderManagement"));

  return (
    <LayoutContentWrapper title={<>{t("orderManagement")}</>} id="adminSidebar">
      <AdminOrderTable
        data={orderData}
        meta={meta}
        isLoading={isLoading}
        onClickView={handleClickViewButton}
        onClickDelete={handleClickDeleteButton}
      />
      <ConfirmationModal
        title={t("deleteOrder")}
        message={t("deleteMessage")}
        isOpen={isShowDeleteModal}
        status="danger"
        onClose={handleCloseModal}
        onConfirm={handleDelete}
      />
    </LayoutContentWrapper>
  );
};

export default Order;
