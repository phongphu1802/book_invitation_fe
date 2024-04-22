import _ from "lodash";
import { lazy, memo, useCallback, useEffect, useLayoutEffect, useMemo, useState } from "react";
import { Route, Routes, matchPath, useNavigate } from "react-router-dom";

import { LoadingOverlay } from "../../Common/Components";
import { AUTH_PATH } from "../Constants";
import { authService, configService } from "../Services";
import { setConfig, setUser } from "../Slices/commonSlice";
import { ErrorRoutes } from "../../Common/Features";
import { useDispatch, useSelector } from "../../Common/Hooks";
import AuthRoutes from "../../Common/Features/Auth/Routers/AuthRoutes";
import { urlRedirect } from "../../Common/Utils/Helpers/commonHelper";

const PrivateRoutes = lazy(() => import("./PrivateRoutes"));

const CommonRoutes = () => {
  const [isLoading, setIsLoading] = useState(true);

  const user = useSelector((state) => state.common.user);
  const { pathname } = window.location;
  const excludeRedirectPaths = useMemo(() => ["/", "error/*", "docs/*"], []);
  const excludeNotLoginPaths = useMemo(() => ["/", "admin/*", "my/*", "system/*"], []);
  const excludeNotRedirecPaths = useMemo(() => ["admin/*", "my/*", "system/*"], []);
  const excludeGetUserPaths = useMemo(() => [], []);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getPublicConfigs = useCallback(async () => {
    const data = await configService.getPublicConfigs();
    dispatch(setConfig(data));
  }, [dispatch]);

  useEffect(() => {
    if (!authService.getAccessToken()) setIsLoading(false);
    if (!authService.getAccessToken() && excludeNotLoginPaths.some((path) => matchPath(path, pathname))) {
      const from = pathname;
      navigate(`${AUTH_PATH.LOGIN}?redirect=${encodeURIComponent(from)}`);
    }
  }, [excludeNotLoginPaths, navigate, pathname]);

  useLayoutEffect(() => {
    if (user?.uuid) {
      setIsLoading(false);
      return;
    }

    const isMatchedExcludeRedirectPath = excludeRedirectPaths.some((path) => matchPath(path, pathname));
    const isMatchedGetUserExcludePath = excludeGetUserPaths.some((path) => matchPath(path, pathname));

    if (isMatchedGetUserExcludePath) {
      setIsLoading(false);
      return;
    }

    if (_.isEmpty(user) && authService.getAccessToken()) {
      authService
        .getMe(false)
        .then((data) => {
          if (!excludeNotRedirecPaths.some((path) => matchPath(path, pathname))) navigate(urlRedirect(data));
          return dispatch(setUser(data));
        })
        .catch(() => {
          if (isMatchedExcludeRedirectPath) {
            return;
          }

          const from = pathname;
          navigate(`${AUTH_PATH.LOGIN}?redirect=${encodeURIComponent(from)}`);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [dispatch, navigate, excludeGetUserPaths, excludeRedirectPaths, user, pathname, excludeNotRedirecPaths]);

  useLayoutEffect(() => {
    getPublicConfigs();
  }, [getPublicConfigs]);

  if (isLoading) {
    return <LoadingOverlay />;
  }

  return (
    <Routes>
      <Route path="*" element={<PrivateRoutes />} />
      <Route path="auth/*" element={<AuthRoutes />} />
      <Route path="error/*" element={<ErrorRoutes />} />
    </Routes>
  );
};

export default memo(CommonRoutes);
