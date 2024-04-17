import dayjs from "dayjs";
import { isArray, isNaN } from "lodash";
import { useEffect, useMemo, useState } from "react";
import { useIsFirstRender } from "usehooks-ts";

import useWatchParam from "./useWatchParam";
// eslint-disable-next-line import/no-cycle
import { TableFilterTypeEnum } from "../Components";

const useTableFilterParam = (field: string, type?: TableFilterTypeEnum): [Array<string | Date>, unknown] => {
  const [fieldValue, setFieldValue] = useState<Array<string | Date>>([]);
  const [filterParam] = useWatchParam("filter");

  const isFirstRender = useIsFirstRender();

  const filterValueParam = useMemo(() => {
    if (!filterParam) return null;

    if (!filterParam.includes(field)) return null;

    const decoded = decodeURIComponent(filterParam);
    const filterStrings = decoded.split(";");

    const filter =
      type === TableFilterTypeEnum.DATE_RANGE
        ? filterStrings.filter((param) => param.includes(`${field}.from=`) || param.includes(`${field}.to=`))
        : filterStrings.find((param) => param.includes(`${field}=`));

    if (!filter) return null;

    if (isArray(filter)) {
      const filterDate = filter.map((item) => {
        const [, value] = item.split("=");
        if (!dayjs(value).isValid()) return null;
        return dayjs(value).toDate();
      });
      if (filterDate.some((item) => item === null)) return null;
      return filterDate as Date[];
    }

    const [, value] = filter.split("=");

    if (!value) return null;

    return value
      .split(",")
      .map((item) => item.replace(/\+/g, " "))
      .map((item) => {
        if (!isNaN(Number(item))) return Number(item) as unknown as string;

        return item;
      });
  }, [filterParam, field, type]);

  useEffect(() => {
    if (!isFirstRender || !filterValueParam) return;

    setFieldValue(filterValueParam);
  }, [filterValueParam, isFirstRender]);

  return [fieldValue, setFieldValue];
};

export default useTableFilterParam;
