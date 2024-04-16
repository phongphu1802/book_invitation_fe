import { memo } from "react";
import { Route, Routes } from "react-router-dom";

// import { userRoleSelector } from "../Selectors/commonSelector";
// import { useSelector } from "../../Common/Hooks";
import HomeRouter from "../../Common/Features/Home/Routers/HomeRouter";
import AdminRouter from "../../Common/Features/Admin/Routers/AdminRouter";

const PrivateRoutes = () => {
  // const { isAdmin } = useSelector(userRoleSelector);

  return (
    <Routes>
      {/* {isAdmin && <Route path="admin/*" element={<AdminRouter />} />} */}
      <Route path="admin/*" element={<AdminRouter />} />
      <Route path="/*" element={<HomeRouter />} />
    </Routes>
  );
};

export default memo(PrivateRoutes);
