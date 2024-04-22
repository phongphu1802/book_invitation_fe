import { useTranslation } from "react-i18next";
import { Key, useCallback, useEffect, useMemo, useState } from "react";

import { LayoutContentWrapper } from "../../../Layout";
import AdminCategoryHeaderAction from "./Components/AdminCategoryHeaderAction";
import { useDocumentTitle } from "../../../Hooks";
import AdminCategoryTable from "./Components/AdminCategoryTable";
import AdminCategoryModificationModal from "./Components/AdminCategoryModificationModal";
import { ConfirmationModal } from "../../../Components";
import { ResponseMetaType } from "../../../../App/Types/Common";
import { CategoryDataType } from "../../../../App/Types/Common/categoryType";
import {
  createCategory,
  deleteCategory,
  editCategory,
  getCaterories,
} from "../../../../App/Services/App/categoryService";

const Category = () => {
  const { t } = useTranslation("admin");
  const [categoryData, setCategoryData] = useState<CategoryDataType[]>([]);
  const [meta, setMeta] = useState<ResponseMetaType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isShowModificationModal, setIsShowModificationModal] = useState<boolean>(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<Key | null>(null);
  const [isShowDeleteModal, setIsShowDeleteModal] = useState<boolean>(false);

  const selectedCategory = useMemo(() => {
    return categoryData.find((item) => item.uuid === selectedCategoryId) ?? null;
  }, [selectedCategoryId, categoryData]);

  const handleClickAddButton = useCallback(() => {
    setIsShowModificationModal(true);
  }, []);

  const handleClickEditButton = useCallback((id?: Key) => {
    setSelectedCategoryId(id ?? null);
    setIsShowModificationModal(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsShowModificationModal(false);
    setIsShowDeleteModal(false);
    setSelectedCategoryId(null);
  }, []);

  const handleClickDeleteButton = useCallback((id?: Key) => {
    setSelectedCategoryId(id ?? null);
    setIsShowDeleteModal(true);
  }, []);

  const fetchData = useCallback(async () => {
    try {
      const { data, meta: metaData } = await getCaterories();
      setCategoryData(data);
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
      await deleteCategory(selectedCategoryId as number);
    } finally {
      fetchData();
    }
  }, [selectedCategoryId, fetchData]);

  useDocumentTitle(t("categoryManagement"));

  return (
    <LayoutContentWrapper
      title={<>{t("categoryManagement")}</>}
      action={<AdminCategoryHeaderAction onClickAdd={handleClickAddButton} />}
      id="adminSidebar"
    >
      <AdminCategoryTable
        data={categoryData}
        meta={meta}
        isLoading={isLoading}
        onClickEdit={handleClickEditButton}
        onClickDelete={handleClickDeleteButton}
      />
      <AdminCategoryModificationModal
        isOpen={isShowModificationModal}
        category={selectedCategory}
        onCreate={createCategory}
        onCreated={fetchData}
        onEdit={editCategory}
        onEdited={fetchData}
        onClose={handleCloseModal}
      />
      <ConfirmationModal
        title={t("deleteCategory")}
        message={t("deleteMessage")}
        isOpen={isShowDeleteModal}
        status="danger"
        onClose={handleCloseModal}
        onConfirm={handleDelete}
      />
    </LayoutContentWrapper>
  );
};

export default Category;
