import { useTranslation } from "react-i18next";

import { LayoutContentWrapper } from "../../../Layout";
import AdminCategoryHeaderAction from "./Components/AdminCategoryHeaderAction";
import { useDocumentTitle } from "../../../Hooks";

const Category = () => {
  const { t } = useTranslation("admin");

  const handleClickAddButton = () => {};

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
