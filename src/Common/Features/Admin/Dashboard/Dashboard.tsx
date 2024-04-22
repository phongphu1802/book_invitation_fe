import { useTranslation } from "react-i18next";

import { LayoutContentWrapper } from "../../../Layout";

const Dashboard = () => {
  const { t } = useTranslation("admin");

  return (
    <LayoutContentWrapper title={<>{t("dashboard")}</>} id="adminSidebar">
      <div className="flex items-center justify-center w-full text-3xl font-bold h-fit-table">Empty page</div>
    </LayoutContentWrapper>
  );
};

export default Dashboard;
