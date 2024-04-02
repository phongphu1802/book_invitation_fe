import { memo } from "react";
import { Route, Routes } from "react-router-dom";

import ErrorNotFound from "../Components/ErrorNotFound";
import ErrorUnknown from "../Components/ErrorUnknown";

const ErrorRoutes = () => {
  return (
    <Routes>
      <Route path="404" element={<ErrorNotFound />} />
      <Route path="*" element={<ErrorUnknown />} />
    </Routes>
  );
};

export default memo(ErrorRoutes);
