import { useCallback, useMemo } from "react";
import { NavigateOptions as BaseNavigateOptions, createSearchParams, useNavigate } from "react-router-dom";

import useSelector from "./useSelector";

interface NavigateOptions extends BaseNavigateOptions {
  query: Record<string, string>;
}

/**
 * useUserNavigate
 * @description Custom `useNavigate` hook for user, add `userRoleSlug` to the path before navigate.
 */
const useUserNavigate = () => {
  const user = useSelector((state) => state.common.user);
  const userRoleSlug = useMemo(() => user?.role?.name, [user]);

  const navigate = useNavigate();

  const userNavigate = useCallback(
    (path: string, options?: NavigateOptions) => {
      let navigateURL = `/${userRoleSlug}${path}`;

      if (options?.query) {
        navigateURL += `?${createSearchParams(options.query)}`;
      }

      navigate(navigateURL, options);
    },
    [navigate, userRoleSlug],
  );

  return userNavigate;
};

export default useUserNavigate;
