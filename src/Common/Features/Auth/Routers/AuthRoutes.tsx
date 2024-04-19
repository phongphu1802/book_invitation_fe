import { memo, useEffect, useMemo } from "react";
import { Route, Routes, matchPath, useNavigate } from "react-router-dom";

import Login from "../Login/Login";
import Register from "../Register/Register";
import { useSelector } from "../../../Hooks";
import { urlRedirect } from "../../../Utils/Helpers/commonHelper";

const AuthRoutes = () => {
  const user = useSelector((state) => state.common.user);
  const { pathname } = window.location;
  const navigate = useNavigate();
  const excludeRedirectPaths = useMemo(() => ["/", "error/*", "docs/*"], []);

  useEffect(() => {
    if (user && excludeRedirectPaths.some((path) => matchPath(path, pathname))) {
      navigate(urlRedirect(user));
    }
  }, [excludeRedirectPaths, navigate, pathname, user]);

  return (
    <Routes>
      <Route path="/*" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forget-password" element={<>ForgetPassword</>} />
      <Route path="/reset-password" element={<>ResetPassword </>} />
    </Routes>
  );
};

export default memo(AuthRoutes);
