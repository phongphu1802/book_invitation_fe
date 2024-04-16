import { memo } from "react";
import { Route, Routes } from "react-router-dom";

import { LayoutContainer } from "../../../Layout";
import AdminSidebar from "../AdminSidebar";

const AdminRouter = () => {
  return (
    <LayoutContainer sidebar={<AdminSidebar />} sidebarIds={[]}>
      <Routes>
        <Route path="dashboard" element={<>Dashboard</>} />
      </Routes>
    </LayoutContainer>
  );
};

export default memo(AdminRouter);
