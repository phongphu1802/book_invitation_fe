import { memo, useEffect, useMemo } from "react";
import { Route, Routes, matchPath, useNavigate } from "react-router-dom";

import { userRoleSelector } from "../Selectors/commonSelector";
import { useSelector } from "../../Common/Hooks";
import AdminRouter from "../../Common/Features/Admin/Routers/AdminRouter";
import Login from "../../Common/Features/Auth/Login/Login";
import { urlRedirect } from "../../Common/Utils/Helpers/commonHelper";

const PrivateRoutes = () => {
  const { isAdmin } = useSelector(userRoleSelector);
  const { pathname } = window.location;
  const user = useSelector((state) => state.common.user);
  const navigate = useNavigate();
  const excludeRedirectPaths = useMemo(() => ["/"], []);

  useEffect(() => {
    if (user && excludeRedirectPaths.some((path) => matchPath(path, pathname))) {
      navigate(urlRedirect(user));
    }
  }, [excludeRedirectPaths, navigate, pathname, user]);

  return (
    <Routes>
      {isAdmin && <Route path="admin/*" element={<AdminRouter />} />}
      <Route path="/" element={<Login />} />
    </Routes>
  );
};

export default memo(PrivateRoutes);
