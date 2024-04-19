import { useTranslation } from "react-i18next";

import { LayoutContentWrapper } from "../../../Layout";

const Order = () => {
  const { t } = useTranslation("admin");

  return (
    <LayoutContentWrapper title={<>{t("orderManagement")}</>} id="adminSidebar">
      <div>dde</div>
    </LayoutContentWrapper>
  );
};

export default Order;
