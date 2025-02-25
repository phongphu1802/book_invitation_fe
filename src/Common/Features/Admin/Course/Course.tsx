import { useTranslation } from "react-i18next";
import { Key, useCallback, useEffect, useMemo, useState } from "react";

import { LayoutContentWrapper } from "../../../Layout";
import AdminCourseHeaderAction from "./Components/AdminCourseHeaderAction";
import AdminCourseTable from "./Components/AdminCourseTable";
import AdminCourseModificationModal from "./Components/AdminCourseModificationModal";
import { ConfirmationModal } from "../../../Components";
import { ResponseMetaType } from "../../../../App/Types/Common";
import {
  createCourse,
  deleteCourse,
  editCourse,
  getCourses,
} from "../../../../App/Services/App/courseService";
import { useDocumentTitle } from "../../../Hooks";
import useToast from "../../../Hooks/useToast";
import { CourseDataType } from "../../../../App/Types/Common/courseType";

const Course = () => {
  const { t } = useTranslation("admin");

  const [courseData, setCourseData] = useState<CourseDataType[]>([]);
  const [meta, setMeta] = useState<ResponseMetaType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isShowModificationModal, setIsShowModificationModal] = useState<boolean>(false);
  const [selectedCourseId, setSelectedCourseId] = useState<Key | null>(null);
  const [isShowDeleteModal, setIsShowDeleteModal] = useState<boolean>(false);
  const toast = useToast();

  const selectedProduct = useMemo(() => {
    return courseData.find((item) => item.uuid === selectedCourseId) ?? null;
  }, [selectedCourseId, courseData]);

  const handleClickAddButton = useCallback(() => {
    setIsShowModificationModal(true);
  }, []);

  const handleClickEditButton = useCallback((id?: Key) => {
    setSelectedCourseId(id ?? null);
    setIsShowModificationModal(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsShowModificationModal(false);
    setIsShowDeleteModal(false);
    setSelectedCourseId(null);
  }, []);

  const handleClickDeleteButton = useCallback((id?: Key) => {
    setSelectedCourseId(id ?? null);
    setIsShowDeleteModal(true);
  }, []);

  const fetchData = useCallback(async () => {
    try {
      const { data, meta: metaData } = await getCourses({
        expand: ["course__teacher_uuid"],
      });
      setCourseData(data);
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
      await deleteCourse(selectedCourseId as number);
      toast.success(t("deleteSuccessfully"));
    } finally {
      fetchData();
    }
  }, [selectedCourseId, toast, t, fetchData]);

  useDocumentTitle(t("courseManagement"));

  return (
    <LayoutContentWrapper
      title={<>{t("courseManagement")}</>}
      id="adminSidebar"
      action={<AdminCourseHeaderAction onClickAdd={handleClickAddButton} />}
    >
      <AdminCourseTable
        data={courseData}
        meta={meta}
        isLoading={isLoading}
        onClickEdit={handleClickEditButton}
        onClickDelete={handleClickDeleteButton}
      />
      <AdminCourseModificationModal
        isOpen={isShowModificationModal}
        course={selectedProduct}
        onCreate={createCourse}
        onCreated={fetchData}
        onEdit={editCourse}
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

export default Course;
