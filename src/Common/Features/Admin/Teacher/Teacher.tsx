import { useTranslation } from "react-i18next";
import { Key, useCallback, useEffect, useMemo, useState } from "react";

import { LayoutContentWrapper } from "../../../Layout";
import AdminTeacherHeaderAction from "./Components/AdminTeacherHeaderAction";
import AdminTeacherTable from "./Components/AdminTeacherTable";
import AdminTeacherModificationModal from "./Components/AdminTeacherModificationModal";
import { ConfirmationModal } from "../../../Components";
import { TeacherDataType } from "../../../../App/Types/Common/teacherType";
import { ResponseMetaType } from "../../../../App/Types/Common";
import {
  createTeacher,
  deleteTeacher,
  editTeacher,
  getTeachers,
} from "../../../../App/Services/App/teacherService";
import { useDocumentTitle } from "../../../Hooks";
import useToast from "../../../Hooks/useToast";

const Teacher = () => {
  const { t } = useTranslation("admin");

  const [teacherData, setTeacherData] = useState<TeacherDataType[]>([]);
  const [meta, setMeta] = useState<ResponseMetaType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isShowModificationModal, setIsShowModificationModal] = useState<boolean>(false);
  const [selectedTeacherId, setSelectedTeacherId] = useState<Key | null>(null);
  const [isShowDeleteModal, setIsShowDeleteModal] = useState<boolean>(false);
  const toast = useToast();

  const selectedProduct = useMemo(() => {
    return teacherData.find((item) => item.uuid === selectedTeacherId) ?? null;
  }, [selectedTeacherId, teacherData]);

  const handleClickAddButton = useCallback(() => {
    setIsShowModificationModal(true);
  }, []);

  const handleClickEditButton = useCallback((id?: Key) => {
    setSelectedTeacherId(id ?? null);
    setIsShowModificationModal(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsShowModificationModal(false);
    setIsShowDeleteModal(false);
    setSelectedTeacherId(null);
  }, []);

  const handleClickDeleteButton = useCallback((id?: Key) => {
    setSelectedTeacherId(id ?? null);
    setIsShowDeleteModal(true);
  }, []);

  const fetchData = useCallback(async () => {
    try {
      const { data, meta: metaData } = await getTeachers({
        expand: ["product__category_uuid"],
      });
      setTeacherData(data);
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
      await deleteTeacher(selectedTeacherId as number);
      toast.success(t("deleteSuccessfully"));
    } finally {
      fetchData();
    }
  }, [selectedTeacherId, toast, t, fetchData]);

  useDocumentTitle(t("teacherManagement"));

  return (
    <LayoutContentWrapper
      title={<>{t("teacherManagement")}</>}
      id="adminSidebar"
      action={<AdminTeacherHeaderAction onClickAdd={handleClickAddButton} />}
    >
      <AdminTeacherTable
        data={teacherData}
        meta={meta}
        isLoading={isLoading}
        onClickEdit={handleClickEditButton}
        onClickDelete={handleClickDeleteButton}
      />
      <AdminTeacherModificationModal
        isOpen={isShowModificationModal}
        teacher={selectedProduct}
        onCreate={createTeacher}
        onCreated={fetchData}
        onEdit={editTeacher}
        onEdited={fetchData}
        onClose={handleCloseModal}
      />
      <ConfirmationModal
        title={t("deleteTeacher")}
        message={t("deleteMessage")}
        isOpen={isShowDeleteModal}
        status="danger"
        onClose={handleCloseModal}
        onConfirm={handleDelete}
      />
    </LayoutContentWrapper>
  );
};

export default Teacher;
