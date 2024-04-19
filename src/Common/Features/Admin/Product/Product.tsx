import { useTranslation } from "react-i18next";

import { LayoutContentWrapper } from "../../../Layout";

const Product = () => {
  const { t } = useTranslation("admin");

  return (
    <LayoutContentWrapper title={<>{t("productManagement")}</>} id="adminSidebar">
      <div>dde</div>
    </LayoutContentWrapper>
  );
};

export default Product;
