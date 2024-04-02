import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";

const useWatchParam = (paramName: string) => {
  const [searchParam, setSearchParam] = useSearchParams();

  const searchParamValue = useMemo(() => searchParam.get(paramName), [searchParam, paramName]);

  const handleSetParamValue = useCallback(
    (value: string | null) => {
      if (value === null) {
        searchParam.delete(paramName);
      } else {
        searchParam.set(paramName, value);
      }

      setSearchParam(searchParam);
    },
    [setSearchParam, searchParam, paramName],
  );

  return [searchParamValue, handleSetParamValue] as const;
};

export default useWatchParam;
