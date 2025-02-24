import { memo } from "react";
import { Route, Routes } from "react-router-dom";

import { LayoutContainer } from "../../../Layout";
import AdminSidebar from "../AdminSidebar";
import Dashboard from "../Dashboard/Dashboard";
import User from "../User/User";
import Teacher from "../Teacher/Teacher";
import Room from "../Room/Room";
import Role from "../Role/Role";

const AdminRouter = () => {
  return (
    <LayoutContainer sidebar={<AdminSidebar />} sidebarIds={[]}>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="user" element={<User />} />
        <Route path="teacher" element={<Teacher />} />
        <Route path="room" element={<Room />} />
        <Route path="role" element={<Role />} />
      </Routes>
    </LayoutContainer>
  );
};

export default memo(AdminRouter);
