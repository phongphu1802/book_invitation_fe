import { useTranslation } from "react-i18next";

import { LayoutContentWrapper } from "../../../Layout";

const Dashboard = () => {
  const { t } = useTranslation("admin");

  return (
    <LayoutContentWrapper title={<>{t("dashboard")}</>} id="adminSidebar">
      <div>dde</div>
    </LayoutContentWrapper>
  );
};

export default Dashboard;
