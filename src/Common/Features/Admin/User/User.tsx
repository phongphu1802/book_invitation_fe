import { useTranslation } from "react-i18next";

import { LayoutContentWrapper } from "../../../Layout";

const User = () => {
  const { t } = useTranslation("admin");

  return (
    <LayoutContentWrapper title={<>{t("userManagement")}</>} id="adminSidebar">
      <div>dde</div>
    </LayoutContentWrapper>
  );
};

export default User;
