import { get, isNaN, omit, set } from "lodash";

import { snakelikeNestedObjectKey } from "./commonHelper";
import { BaseListQueryType } from "../../../App/Types/Common";

const generateSearchQuery = (params: BaseListQueryType) => {
  const searchParams = new URLSearchParams();

  if (params.filterParams) {
    params.filterParams.forEach((filterParam) => {
      const { filterBy } = filterParam;
      const filterValue = filterParam.values.join(",");

      searchParams.append(`filter[${filterBy}]`, filterValue);
    });
    // eslint-disable-next-line no-param-reassign
    delete params.filterParams;
  }

  const snakedParams = snakelikeNestedObjectKey(params);

  Object.keys(snakedParams).forEach((keyParam) => {
    const key = keyParam;
    const value = snakedParams[keyParam];

    if (value === undefined) {
      return;
    }

    if (typeof value === "string" || typeof value === "number") {
      searchParams.append(key, String(value));
      return;
    }

    if (Array.isArray(value)) {
      value.forEach((item) => {
        searchParams.append(key, String(item));
      });
    }
  });

  return searchParams;
};

const normalizeQuery = (params: BaseListQueryType) => {
  const { filterParams = [], sortParams = [] } = params;

  const normalizedFilterParams = filterParams.reduce<Record<string, string | number>>(
    (acc, { filterBy, values }) => {
      let value: string | number = values.join(",");

      if (filterBy === "page_index" || filterBy === "page_size") {
        return acc;
      }

      if (!isNaN(Number(value))) {
        value = Number(value);
      }

      const [type, field, range] = filterBy.split(".");
      const [filterByType] = type.split("_");

      if (range) {
        acc[`${filterByType}[${field}.${range}]`] = value;
      } else {
        acc[`${filterByType}[${field}]`] = value;
      }

      return acc;
    },
    {},
  );

  const normalizedSortParams = sortParams.reduce<Record<string, string | number>>((acc, { id, desc }) => {
    acc.sort = desc ? `-${id}` : id;
    return acc;
  }, {});

  set(normalizedFilterParams, "page", get(params, "pageIndex", 0) + 1);
  set(normalizedFilterParams, "per_page", params.pageSize);

  return {
    ...normalizedFilterParams,
    ...omit(params, ["pageIndex", "pageSize", "filterParams", "sortParams"]),
    ...normalizedSortParams,
  };
};

export { generateSearchQuery, normalizeQuery };
