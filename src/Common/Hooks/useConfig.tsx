import _ from "lodash";
import { useCallback } from "react";

import useSelector from "./useSelector";
import { ConfigKeyEnum } from "../../App/Enums";

const useConfig = () => {
  const configs = useSelector((state) => state.common.configs);
  const getConfig = useCallback(
    (configKey: ConfigKeyEnum) => {
      if (!_.isArray(configs)) {
        return undefined;
      }
      const config = configs.find((item) => item.key === configKey);
      if (config) {
        return config.value;
      }
      return undefined;
    },
    [configs],
  );

  return getConfig;
};

export default useConfig;
