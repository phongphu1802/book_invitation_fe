import { useCallback, useMemo } from "react";
import { NavigateOptions as BaseNavigateOptions, createSearchParams } from "react-router-dom";

import useSelector from "./useSelector";

interface NavigateOptions extends BaseNavigateOptions {
  query: Record<string, string>;
}

const useUserPath = () => {
  const user = useSelector((state) => state.common.user);
  const userRoleSlug = useMemo(() => user?.role?.name, [user]);

  const userPath = useCallback(
    (path: string, options?: NavigateOptions) => {
      let navigateURL = `/${userRoleSlug}${path}`;

      if (path.startsWith(`/${userRoleSlug}`)) {
        navigateURL = path;
      }

      if (options?.query) {
        navigateURL += `?${createSearchParams(options.query)}`;
      }

      return navigateURL;
    },
    [userRoleSlug],
  );

  return userPath;
};

export default useUserPath;
