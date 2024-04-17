import { memo } from "react";
import { Route, Routes } from "react-router-dom";

import { LayoutContainer } from "../../../Layout";
import AdminSidebar from "../AdminSidebar";
import Dashboard from "../Components/Dashboard";
import Category from "../Category/Category";

const AdminRouter = () => {
  return (
    <LayoutContainer sidebar={<AdminSidebar />} sidebarIds={[]}>
      <Routes>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="category" element={<Category />} />
      </Routes>
    </LayoutContainer>
  );
};

export default memo(AdminRouter);
