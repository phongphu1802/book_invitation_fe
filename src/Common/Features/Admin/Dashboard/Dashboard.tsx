import { useTranslation } from "react-i18next";

import { LayoutContentWrapper } from "../../../Layout";
import DashboardTopProduct from "./Components/DashboardTopProduct";
import { useDocumentTitle } from "../../../Hooks";
import DashboardTopUser from "./Components/DashboardTopUser";
import DashboardProfit from "./Components/DashboardProfit";
import DashboardUserRegister from "./Components/DashboardUserRegister";

const Dashboard = () => {
  const { t } = useTranslation("admin");

  useDocumentTitle(t("dashboard"));

  return (
    <LayoutContentWrapper title={<>{t("dashboard")}</>} id="adminSidebar">
      {/* <div className="flex items-center justify-center w-full text-3xl font-bold h-fit-table">Empty page</div> */}
      <div className="grid grid-cols-1 gap-4 px-6 overflow-y-auto h-fit-dashboard">
        <div className="grid grid-cols-2 gap-4">
          <DashboardTopProduct />
          <DashboardTopUser />
        </div>
        <DashboardProfit />
        <DashboardUserRegister />
      </div>
    </LayoutContentWrapper>
  );
};

export default Dashboard;
