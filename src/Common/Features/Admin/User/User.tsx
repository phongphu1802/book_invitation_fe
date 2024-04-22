import { useTranslation } from "react-i18next";
import { Key, useCallback, useEffect, useMemo, useState } from "react";

import { LayoutContentWrapper } from "../../../Layout";
import AdminUserHeaderAction from "./Components/AdminUserHeaderAction";
import AdminUserTable from "./Components/AdminUserTable";
import { ConfirmationModal } from "../../../Components";
import AdminUserModificationModal from "./Components/AdminUserModificationModal";
import { ResponseMetaType, UserDataType } from "../../../../App/Types/Common";
import { createUser, deleteUser, editUser, getUsers } from "../../../../App/Services/Admin/userService";
import { useDocumentTitle } from "../../../Hooks";
import useToast from "../../../Hooks/useToast";

const User = () => {
  const { t } = useTranslation("admin");
  const [meta, setMeta] = useState<ResponseMetaType | null>(null);
  const [userData, setUserData] = useState<UserDataType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
  const [isShowModificationModal, setIsShowModificationModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<Key | null>(null);
  const toast = useToast();

  const selectedUser = useMemo(() => {
    return userData.find((item) => item.uuid === selectedUserId) ?? null;
  }, [selectedUserId, userData]);

  const handleClickAddButton = useCallback(() => {
    setIsShowModificationModal(true);
  }, []);

  const handleClickEditButton = useCallback((id?: Key) => {
    setSelectedUserId(id ?? null);
    setIsShowModificationModal(true);
  }, []);

  const handleClickDeleteButton = useCallback((id?: Key) => {
    setSelectedUserId(id ?? null);
    setIsShowDeleteModal(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsShowModificationModal(false);
    setIsShowDeleteModal(false);
    setSelectedUserId(null);
  }, []);

  const fetchData = useCallback(async () => {
    try {
      const { data, meta: metaData } = await getUsers();
      setUserData(data);
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
      await deleteUser(selectedUserId as number);
      toast.success(t("deleteSuccessfully"));
    } finally {
      fetchData();
    }
  }, [selectedUserId, toast, t, fetchData]);

  useDocumentTitle(t("userManagement"));

  return (
    <LayoutContentWrapper
      title={<>{t("userManagement")}</>}
      id="adminSidebar"
      action={<AdminUserHeaderAction onClickAdd={handleClickAddButton} />}
    >
      <AdminUserTable
        data={userData}
        meta={meta}
        isLoading={isLoading}
        onClickEdit={handleClickEditButton}
        onClickDelete={handleClickDeleteButton}
      />
      <ConfirmationModal
        title={t("deleteUser", { name: selectedUser?.name })}
        message={t("deleteMessage")}
        isOpen={isShowDeleteModal}
        status="danger"
        onClose={handleCloseModal}
        onConfirm={handleDelete}
      />
      <AdminUserModificationModal
        isOpen={isShowModificationModal}
        user={selectedUser}
        onCreate={createUser}
        onCreated={fetchData}
        onEdit={editUser}
        onEdited={fetchData}
        onClose={handleCloseModal}
      />
    </LayoutContentWrapper>
  );
};

export default User;
