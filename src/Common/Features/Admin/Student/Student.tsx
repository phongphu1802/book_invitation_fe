import { useTranslation } from "react-i18next";
import { Key, useCallback, useEffect, useMemo, useState } from "react";

import { LayoutContentWrapper } from "../../../Layout";
import AdminStudentHeaderAction from "./Components/AdminStudentHeaderAction";
import AdminStudentTable from "./Components/AdminStudentTable";
import AdminStudentModificationModal from "./Components/AdminStudentModificationModal";
import { ConfirmationModal } from "../../../Components";
import { ResponseMetaType } from "../../../../App/Types/Common";
import {
  createStudent,
  deleteStudent,
  editStudent,
  getStudents,
} from "../../../../App/Services/App/studentService";
import { useDocumentTitle } from "../../../Hooks";
import useToast from "../../../Hooks/useToast";
import { StudentDataType } from "../../../../App/Types/Common/studentType";

const Student = () => {
  const { t } = useTranslation("admin");

  const [studentData, setStudentData] = useState<StudentDataType[]>([]);
  const [meta, setMeta] = useState<ResponseMetaType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isShowModificationModal, setIsShowModificationModal] = useState<boolean>(false);
  const [selectedStudentId, setSelectedStudentId] = useState<Key | null>(null);
  const [isShowDeleteModal, setIsShowDeleteModal] = useState<boolean>(false);
  const toast = useToast();

  const selectedProduct = useMemo(() => {
    return studentData.find((item) => item.uuid === selectedStudentId) ?? null;
  }, [selectedStudentId, studentData]);

  const handleClickAddButton = useCallback(() => {
    setIsShowModificationModal(true);
  }, []);

  const handleClickEditButton = useCallback((id?: Key) => {
    setSelectedStudentId(id ?? null);
    setIsShowModificationModal(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsShowModificationModal(false);
    setIsShowDeleteModal(false);
    setSelectedStudentId(null);
  }, []);

  const handleClickDeleteButton = useCallback((id?: Key) => {
    setSelectedStudentId(id ?? null);
    setIsShowDeleteModal(true);
  }, []);

  const fetchData = useCallback(async () => {
    try {
      const { data, meta: metaData } = await getStudents({
        expand: ["student__course_uuid"],
      });
      setStudentData(data);
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
      await deleteStudent(selectedStudentId as number);
      toast.success(t("deleteSuccessfully"));
    } finally {
      fetchData();
    }
  }, [selectedStudentId, toast, t, fetchData]);

  useDocumentTitle(t("studentManagement"));

  return (
    <LayoutContentWrapper
      title={<>{t("studentManagement")}</>}
      id="adminSidebar"
      action={<AdminStudentHeaderAction onClickAdd={handleClickAddButton} />}
    >
      <AdminStudentTable
        data={studentData}
        meta={meta}
        isLoading={isLoading}
        onClickEdit={handleClickEditButton}
        onClickDelete={handleClickDeleteButton}
      />
      <AdminStudentModificationModal
        isOpen={isShowModificationModal}
        student={selectedProduct}
        onCreate={createStudent}
        onCreated={fetchData}
        onEdit={editStudent}
        onEdited={fetchData}
        onClose={handleCloseModal}
      />
      <ConfirmationModal
        title={t("deleteStudent")}
        message={t("deleteMessage")}
        isOpen={isShowDeleteModal}
        status="danger"
        onClose={handleCloseModal}
        onConfirm={handleDelete}
      />
    </LayoutContentWrapper>
  );
};

export default Student;
