import { useQuery } from "@tanstack/react-query";
import { Header, flexRender } from "@tanstack/react-table";
import dayjs from "dayjs";
import _, { isEmpty } from "lodash";
import {
  ForwardedRef,
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import { BiChevronDown } from "react-icons/bi";
import { twMerge } from "tailwind-merge";

import { TableDataGenericType, TableFilterOptionItemType, TableFilterTypeEnum } from "../interface";
import TableHeaderFilterDropdown from "./TableHeaderFilterDropdown";
import TableHeaderFilterLabel from "./TableHeaderFilterLabel";
import { DatePickerDropdown, DatePickerTypeEnum } from "../../DatePicker";
// eslint-disable-next-line import/no-cycle
import useTableFilterParam from "../../../Hooks/useTableFilter";

export interface TableHeaderFilterProps {
  id?: string;
  header: Header<TableDataGenericType, unknown>;
  className?: string;
  onChangeFilters?: (filterBy: string | string[], selectedItems: string[] | Date[]) => void;
}

const TableHeaderFilter = (
  { id, className, header, onChangeFilters }: TableHeaderFilterProps,
  ref: ForwardedRef<unknown>,
) => {
  const { t } = useTranslation();

  const headerColumnDef = header.column.columnDef;

  const filterBy = useMemo(() => {
    const originalFilterBy = headerColumnDef.meta?.filterBy ?? headerColumnDef.id;
    return (Array.isArray(originalFilterBy) ? _.first(originalFilterBy) : originalFilterBy) ?? "";
  }, [headerColumnDef]);

  const [searchValueParam] = useTableFilterParam(filterBy, headerColumnDef.meta?.filterType);

  const isFirstRenderRef = useRef(true);
  const filterOptionLabelFactory = useMemo(
    () => headerColumnDef.meta?.filterOptionLabelFactory ?? ((option: never) => `${option}`),
    [headerColumnDef.meta?.filterOptionLabelFactory],
  );

  const filterValueBy = useMemo(
    () => headerColumnDef.meta?.filterValueBy ?? filterBy,
    [filterBy, headerColumnDef.meta?.filterValueBy],
  );

  // const [filterOptions, setFilterOptions] = useState<TableFilterOptionItemType[]>([]);
  const [filterSearchValue, setFilterSearchValue] = useState("");
  const [selectedFilters, setSelectedFilters] = useState<Array<string | Date>>([]);
  // const [isLoading, setIsLoading] = useState(false);
  const [isShowDropdownMenu, setIsShowDropdownMenu] = useState(false);
  // const [queryParams, setQueryParams] = useState<TableHeaderFilterParamType>({
  //   filterBy,
  //   filterValue: "",
  // });

  const filterType = useMemo(() => headerColumnDef.meta?.filterType, [headerColumnDef]);
  const containerRef = useRef<HTMLDivElement>(null);

  const rawGetFilterOptions = useMemo(() => headerColumnDef.meta?.getFilterOptions, [headerColumnDef]);

  // const getFilterOptions = useCallback(
  //   async (query?: TableHeaderFilterParamType) => {
  //     if (headerColumnDef.meta?.filterType === TableFilterTypeEnum.RANGE_DATE) {
  //       return;
  //     }

  //     setIsLoading(true);

  //     try {
  //       const options = await rawGetFilterOptions?.(query);

  //       if (!options) {
  //         return;
  //       }

  //       if ("data" in options) {
  //         setFilterOptions(formatFilterOptions(options.data as Record<string, string>[]));
  //         return;
  //       }

  //       if (Array.isArray(options)) {
  //         setFilterOptions(formatFilterOptions(options as Record<string, string>[]));
  //       }
  //     } catch (error) {
  //       setFilterOptions([]);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   },
  //   [formatFilterOptions, headerColumnDef.meta?.filterType, rawGetFilterOptions],
  // );

  const formatFilterOptions = useCallback(
    (options: Record<string, string>[]): TableFilterOptionItemType[] => {
      return options
        .map((option) => {
          let filterValue = "";
          const result = {
            id: option.id || option.uuid || option.value || option.name || option.label || option,
            label: "",
            value: "",
          };

          filterValue = _.get(option, filterValueBy);

          if (filterValue === undefined || filterValue === null) {
            return null;
          }

          result.value = filterValue;
          result.label = filterOptionLabelFactory(option as never);

          return result;
        })
        .filter(Boolean) as TableFilterOptionItemType[];
    },
    [filterOptionLabelFactory, filterValueBy],
  );

  const { isLoading, data } = useQuery({
    queryKey: ["filterOptions", filterBy, filterSearchValue],
    queryFn: async () => {
      try {
        const options = await rawGetFilterOptions?.({
          filterBy,
          filterValue: filterSearchValue,
        });

        if (!options) {
          return [];
        }

        if ("data" in options) {
          return formatFilterOptions(options.data as Record<string, string>[]);
        }

        return formatFilterOptions(options as Record<string, string>[]);
      } catch (error) {
        return [];
      }
    },
    enabled:
      (headerColumnDef.meta?.filterType !== TableFilterTypeEnum.DATE_RANGE && isShowDropdownMenu) ||
      !!searchValueParam.length,
  });

  const filterOptions = useMemo(() => data ?? [], [data]);

  const label = useMemo(() => {
    const originalLabel =
      headerColumnDef.meta?.filterLabel ?? flexRender(headerColumnDef.header, header.getContext());

    return (
      <TableHeaderFilterLabel
        label={originalLabel}
        options={filterOptions}
        selected={selectedFilters}
        filterType={filterType}
      />
    );
  }, [
    filterOptions,
    filterType,
    header,
    headerColumnDef.header,
    headerColumnDef.meta?.filterLabel,
    selectedFilters,
  ]);

  const formatFilterBy = useCallback(
    (filterParam: string) => {
      if (!id) {
        return `filter.${filterParam}`;
      }

      return `filter_${id}.${filterParam}`;
    },
    [id],
  );

  const handleShowDropdownMenu = useCallback(() => {
    setIsShowDropdownMenu(true);
  }, []);

  const handleCloseDropdownMenu = useCallback(() => {
    setIsShowDropdownMenu(false);
  }, []);

  const handleChangeFilters = useCallback(
    (filters: string[] | Date[] | Date) => {
      if (filters instanceof Date) {
        return;
      }

      setSelectedFilters(filters);

      if (filterType === TableFilterTypeEnum.DATE_RANGE) {
        onChangeFilters?.(
          [formatFilterBy(`${filterBy}.from`), formatFilterBy(`${filterBy}.to`)],
          [dayjs(filters[0]).format(t("dateFormat")), dayjs(filters[1]).format(t("dateFormat"))],
        );
        setIsShowDropdownMenu(false);
        return;
      }

      onChangeFilters?.(formatFilterBy(`${filterBy}`), filters);
    },
    [filterBy, filterType, formatFilterBy, onChangeFilters, t],
  );

  const handleClearFilters = useCallback(() => {
    setSelectedFilters([]);
    handleCloseDropdownMenu();
    if (filterType === TableFilterTypeEnum.DATE_RANGE) {
      onChangeFilters?.([formatFilterBy(`${filterBy}.from`), formatFilterBy(`${filterBy}.to`)], []);
      return;
    }

    onChangeFilters?.(formatFilterBy(`${filterBy}`), []);
  }, [filterBy, filterType, formatFilterBy, handleCloseDropdownMenu, onChangeFilters]);

  const handleClickClearAll = useCallback(() => {
    setSelectedFilters([]);
  }, []);

  useImperativeHandle(
    ref,
    () => ({
      onClickClearAll: handleClickClearAll,
    }),
    [handleClickClearAll],
  );

  useEffect(() => {
    if ((!searchValueParam && !isFirstRenderRef.current) || id) {
      return;
    }

    isFirstRenderRef.current = false;
    setSelectedFilters(searchValueParam);
  }, [id, searchValueParam]);

  return (
    <div className={twMerge("relative mb-4 mr-4 h-10 rounded-lg last:mr-0", className)} ref={containerRef}>
      <div
        className={twMerge(
          "no-click-flicking z-20 flex h-full w-full cursor-pointer items-center justify-center space-x-2 rounded-lg border-2 border-gray-100 bg-gray-50 pl-4 pr-2.5 duration-100 hover:border-gray-200 hover:bg-gray-100",
          isShowDropdownMenu && "border-gray-200 bg-gray-100",
          !isEmpty(selectedFilters) && "border-blue-500 bg-blue-50 hover:border-blue-500 hover:bg-blue-50",
        )}
        role="button"
        tabIndex={0}
        onClick={handleShowDropdownMenu}
      >
        <div>{label}</div>
        <BiChevronDown size={20} />
      </div>
      {isShowDropdownMenu &&
        (filterType === TableFilterTypeEnum.DATE_RANGE ? (
          <DatePickerDropdown
            name="header-filter-date-range"
            containerRef={containerRef}
            type={DatePickerTypeEnum.RANGE}
            selectedRangeDate={selectedFilters as Date[]}
            isShowClearSelected
            onChangeRangeDate={handleChangeFilters}
            onClearSelectedRangeDate={handleClearFilters}
            onHide={handleCloseDropdownMenu}
          />
        ) : (
          <TableHeaderFilterDropdown
            isShowDropdownMenu={isShowDropdownMenu}
            filterBy={filterBy}
            filterType={filterType as TableFilterTypeEnum}
            filterOptions={filterOptions}
            maxSelection={headerColumnDef.meta?.isSingleSelection}
            isLoading={isLoading}
            selectedFilters={selectedFilters as string[]}
            onChangeFilters={handleChangeFilters}
            onChangeFilterSearchValue={setFilterSearchValue}
            onClearSelectedFilters={handleClearFilters}
            onHide={handleCloseDropdownMenu}
          />
        ))}
    </div>
  );
};

export default memo(forwardRef(TableHeaderFilter));
