import { memo } from "react";
import { Route, Routes } from "react-router-dom";

import { LayoutContainer } from "../../../Layout";
import AdminSidebar from "../AdminSidebar";
import Category from "../Category/Category";
import Dashboard from "../Dashboard/Dashboard";
import Order from "../Order/Order";
import Product from "../Product/Product";
import User from "../User/User";

const AdminRouter = () => {
  return (
    <LayoutContainer sidebar={<AdminSidebar />} sidebarIds={[]}>
      <Routes>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="category" element={<Category />} />
        <Route path="order" element={<Order />} />
        <Route path="product" element={<Product />} />
        <Route path="user" element={<User />} />
      </Routes>
    </LayoutContainer>
  );
};

export default memo(AdminRouter);
