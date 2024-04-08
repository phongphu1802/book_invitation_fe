import { memo } from "react";
import { Route, Routes } from "react-router-dom";

import { LayoutContainer } from "../../../Layout";

const AdminRouter = () => {
  return (
    <LayoutContainer sidebar={<div>Sidebar</div>} sidebarIds={[]}>
      <Routes>
        <Route path="dashboard" element={<>Dashboard</>} />
      </Routes>
    </LayoutContainer>
  );
};

export default memo(AdminRouter);
