import { useTranslation } from "react-i18next";
import { Key, useCallback, useEffect, useMemo, useState } from "react";

import { LayoutContentWrapper } from "../../../Layout";
import AdminRoleHeaderAction from "./Components/AdminRoleHeaderAction";
import AdminRoleTable from "./Components/AdminRoleTable";
import AdminRoleModificationModal from "./Components/AdminRoleModificationModal";
import { ConfirmationModal } from "../../../Components";
import { ResponseMetaType, UserRoleDataType } from "../../../../App/Types/Common";
import { useDocumentTitle } from "../../../Hooks";
import useToast from "../../../Hooks/useToast";
import { createRole, deleteRole, editRole, getRoles } from "../../../../App/Services/Common/roleService";

const Role = () => {
  const { t } = useTranslation("admin");

  const [roleData, setRoleData] = useState<UserRoleDataType[]>([]);
  const [meta, setMeta] = useState<ResponseMetaType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isShowModificationModal, setIsShowModificationModal] = useState<boolean>(false);
  const [selectedRoleId, setSelectedRoleId] = useState<Key | null>(null);
  const [isShowDeleteModal, setIsShowDeleteModal] = useState<boolean>(false);
  const toast = useToast();

  const selectedProduct = useMemo(() => {
    return roleData.find((item) => item.uuid === selectedRoleId) ?? null;
  }, [selectedRoleId, roleData]);

  const handleClickAddButton = useCallback(() => {
    setIsShowModificationModal(true);
  }, []);

  const handleClickEditButton = useCallback((id?: Key) => {
    setSelectedRoleId(id ?? null);
    setIsShowModificationModal(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsShowModificationModal(false);
    setIsShowDeleteModal(false);
    setSelectedRoleId(null);
  }, []);

  const handleClickDeleteButton = useCallback((id?: Key) => {
    setSelectedRoleId(id ?? null);
    setIsShowDeleteModal(true);
  }, []);

  const fetchData = useCallback(async () => {
    try {
      const { data, meta: metaData } = await getRoles();
      setRoleData(data);
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
      await deleteRole(selectedRoleId as number);
      toast.success(t("deleteSuccessfully"));
    } finally {
      fetchData();
    }
  }, [selectedRoleId, toast, t, fetchData]);

  useDocumentTitle(t("roleManagement"));

  return (
    <LayoutContentWrapper
      title={<>{t("roleManagement")}</>}
      id="adminSidebar"
      action={<AdminRoleHeaderAction onClickAdd={handleClickAddButton} />}
    >
      <AdminRoleTable
        data={roleData}
        meta={meta}
        isLoading={isLoading}
        onClickEdit={handleClickEditButton}
        onClickDelete={handleClickDeleteButton}
      />
      <AdminRoleModificationModal
        isOpen={isShowModificationModal}
        userRole={selectedProduct}
        onCreate={createRole}
        onCreated={fetchData}
        onEdit={editRole}
        onEdited={fetchData}
        onClose={handleCloseModal}
      />
      <ConfirmationModal
        title={t("deleteRole")}
        message={t("deleteMessage")}
        isOpen={isShowDeleteModal}
        status="danger"
        onClose={handleCloseModal}
        onConfirm={handleDelete}
      />
    </LayoutContentWrapper>
  );
};

export default Role;
