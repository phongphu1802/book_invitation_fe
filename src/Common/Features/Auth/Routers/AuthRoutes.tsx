import { memo } from "react";
import { Route, Routes } from "react-router-dom";

import Login from "../Login/Login";
import Register from "../Register/Register";

const AuthRoutes = () => {
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
