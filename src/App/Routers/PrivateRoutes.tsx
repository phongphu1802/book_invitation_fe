import { memo } from "react";
import { Route, Routes } from "react-router-dom";

import { userRoleSelector } from "../Selectors/commonSelector";
import { useSelector } from "../../Common/Hooks";
import AdminRouter from "../../Common/Features/Admin/Routers/AdminRouter";
import Login from "../../Common/Features/Auth/Login/Login";

const PrivateRoutes = () => {
  const { isAdmin } = useSelector(userRoleSelector);

  return (
    <Routes>
      {isAdmin && <Route path="admin/*" element={<AdminRouter />} />}
      <Route path="/" element={<Login />} />
    </Routes>
  );
};

export default memo(PrivateRoutes);
