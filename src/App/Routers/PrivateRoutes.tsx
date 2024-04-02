import { memo } from "react";
import { Route, Routes } from "react-router-dom";

import { userRoleSelector } from "../Selectors/commonSelector";
import { useSelector } from "../../Common/Hooks";

const PrivateRoutes = () => {
  const { isAdmin } = useSelector(userRoleSelector);

  return (
    <Routes>
      {isAdmin && <Route path="admin/*" element={<>AdminRoutes</>} />}
      <Route path="/*" element={<>HomeRoutes</>} />
    </Routes>
  );
};

export default memo(PrivateRoutes);
