import { useTranslation } from "react-i18next";

import { LayoutContentWrapper } from "../../../Layout";
import AdminCategoryHeaderAction from "./Components/AdminCategoryHeaderAction";

const Category = () => {
  const { t } = useTranslation("admin");

  const handleClickAddButton = () => {};

  return (
    <LayoutContentWrapper
      title={<>{t("categoryManagement")}</>}
      action={<AdminCategoryHeaderAction onClickAdd={handleClickAddButton} />}
      id="adminSidebar"
    >
      <div>dde</div>
    </LayoutContentWrapper>
  );
};

export default Category;
