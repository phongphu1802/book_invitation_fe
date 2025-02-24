import { useTranslation } from "react-i18next";
import { Key, useCallback, useEffect, useMemo, useState } from "react";

import { LayoutContentWrapper } from "../../../Layout";
import AdminRoomHeaderAction from "./Components/AdminRoomHeaderAction";
import AdminRoomTable from "./Components/AdminRoomTable";
import AdminRoomModificationModal from "./Components/AdminRoomModificationModal";
import { ConfirmationModal } from "../../../Components";
import { RoomDataType } from "../../../../App/Types/Common/roomType";
import { ResponseMetaType } from "../../../../App/Types/Common";
import { createRoom, deleteRoom, editRoom, getRooms } from "../../../../App/Services/App/roomService";
import { useDocumentTitle } from "../../../Hooks";
import useToast from "../../../Hooks/useToast";

const Room = () => {
  const { t } = useTranslation("admin");

  const [roomData, setRoomData] = useState<RoomDataType[]>([]);
  const [meta, setMeta] = useState<ResponseMetaType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isShowModificationModal, setIsShowModificationModal] = useState<boolean>(false);
  const [selectedProductId, setSelectedProductId] = useState<Key | null>(null);
  const [isShowDeleteModal, setIsShowDeleteModal] = useState<boolean>(false);
  const toast = useToast();

  const selectedProduct = useMemo(() => {
    return roomData.find((item) => item.uuid === selectedProductId) ?? null;
  }, [selectedProductId, roomData]);

  const handleClickAddButton = useCallback(() => {
    setIsShowModificationModal(true);
  }, []);

  const handleClickEditButton = useCallback((id?: Key) => {
    setSelectedProductId(id ?? null);
    setIsShowModificationModal(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsShowModificationModal(false);
    setIsShowDeleteModal(false);
    setSelectedProductId(null);
  }, []);

  const handleClickDeleteButton = useCallback((id?: Key) => {
    setSelectedProductId(id ?? null);
    setIsShowDeleteModal(true);
  }, []);

  const fetchData = useCallback(async () => {
    try {
      const { data, meta: metaData } = await getRooms();
      setRoomData(data);
      setMeta(metaData);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleDelete = useCallback(async () => {
    try {
      await deleteRoom(selectedProductId as number);
      toast.success(t("deleteSuccessfully"));
    } finally {
      fetchData();
    }
  }, [selectedProductId, toast, t, fetchData]);

  useDocumentTitle(t("roomManagement"));

  return (
    <LayoutContentWrapper
      title={<>{t("roomManagement")}</>}
      id="adminSidebar"
      action={<AdminRoomHeaderAction onClickAdd={handleClickAddButton} />}
    >
      <AdminRoomTable
        data={roomData}
        meta={meta}
        isLoading={isLoading}
        onClickEdit={handleClickEditButton}
        onClickDelete={handleClickDeleteButton}
      />
      <AdminRoomModificationModal
        isOpen={isShowModificationModal}
        room={selectedProduct}
        onCreate={createRoom}
        onCreated={fetchData}
        onEdit={editRoom}
        onEdited={fetchData}
        onClose={handleCloseModal}
      />
      <ConfirmationModal
        title={t("deleteProduct")}
        message={t("deleteMessage")}
        isOpen={isShowDeleteModal}
        status="danger"
        onClose={handleCloseModal}
        onConfirm={handleDelete}
      />
    </LayoutContentWrapper>
  );
};

export default Room;
