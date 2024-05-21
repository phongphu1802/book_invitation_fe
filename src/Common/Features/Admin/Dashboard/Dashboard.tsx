import { useTranslation } from "react-i18next";

import { LayoutContentWrapper } from "../../../Layout";
import DashboardTopProduct from "./Components/DashboardTopProduct";

const Dashboard = () => {
  const { t } = useTranslation("admin");

  return (
    <LayoutContentWrapper title={<>{t("dashboard")}</>} id="adminSidebar">
      {/* <div className="flex items-center justify-center w-full text-3xl font-bold h-fit-table">Empty page</div> */}
      <div className="px-6 overflow-y-auto h-fit-dashboard">
        <div className="grid grid-cols-2 gap-4">
          <DashboardTopProduct />
          <div> </div>
        </div>
      </div>
    </LayoutContentWrapper>
  );
};

export default Dashboard;
