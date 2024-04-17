import _ from "lodash";
import { memo, useCallback, useLayoutEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useOnClickOutside } from "usehooks-ts";

import LoadingSkeleton from "../../Loading/LoadingSkeleton";
import { TableFilterOptionItemType, TableFilterTypeEnum } from "../interface";
import TableHeaderFilterDropdownOptionItem from "./TableHeaderFilterDropdownOptionItem";
import TableHeaderFilterDropdownSkeleton from "./TableHeaderFilterDropdownSkeleton";

export interface TableHeaderFilterDropdownProps {
  isShowDropdownMenu: boolean;
  filterBy: string;
  filterType: TableFilterTypeEnum;
  filterOptions: TableFilterOptionItemType[];
  maxSelection?: boolean;
  isLoading?: boolean;
  selectedFilters: string[];
  onChangeFilters: (selectedItems: string[]) => void;
  onChangeFilterSearchValue: (searchValue: string) => void;
  onClearSelectedFilters: () => void;
  onHide: () => void;
}

const TableHeaderFilterDropdown = ({
  isShowDropdownMenu,
  filterBy,
  filterType,
  maxSelection = true,
  isLoading,
  filterOptions,
  selectedFilters,
  onChangeFilters,
  onChangeFilterSearchValue,
  onClearSelectedFilters,
  onHide,
}: TableHeaderFilterDropdownProps) => {
  const { t } = useTranslation();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [filterSearchValue, setFilterSearchValue] = useState("");

  const handleGetNewSelectedFilter = useCallback(
    (value: string, checked: boolean, customValue?: string) => {
      if (maxSelection) {
        return [customValue || value];
      }
      const newSelectedFilters = [...selectedFilters];
      if (checked) {
        newSelectedFilters.push(customValue || value);
      } else {
        const index = newSelectedFilters.indexOf(value);
        if (index > -1) {
          newSelectedFilters.splice(index, 1);
        }
      }
      return _.uniq(newSelectedFilters);
    },
    [maxSelection, selectedFilters],
  );

  const handleChangeSelectedFilter = useCallback(
    (value: string, checked: boolean) => {
      const newSelectedFilters = handleGetNewSelectedFilter(value, checked);

      onChangeFilters?.(newSelectedFilters);
    },
    [handleGetNewSelectedFilter, onChangeFilters],
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onChangeFilterSearchValueDebounced = useCallback(_.debounce(onChangeFilterSearchValue, 500), [
    onChangeFilterSearchValue,
  ]);

  const handleChangeFilterSearchValue = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      onChangeFilterSearchValueDebounced(value);
      setFilterSearchValue(value);
    },
    [onChangeFilterSearchValueDebounced],
  );

  const setDropdownPosition = useCallback(() => {
    const dropdownElement = dropdownRef.current;
    if (!dropdownElement) {
      return;
    }
    const space = 8;

    const overflowHeight = window.innerHeight - dropdownElement.getBoundingClientRect().top - space;

    if (overflowHeight < dropdownElement.offsetHeight) {
      dropdownElement.style.height = `${overflowHeight}px`;
    }
  }, []);

  useLayoutEffect(() => {
    setDropdownPosition();
  }, [setDropdownPosition, isShowDropdownMenu, isLoading]);

  useOnClickOutside(dropdownRef, onHide);

  return (
    <div
      ref={dropdownRef}
      className="absolute top-12 z-30 flex flex-col overflow-hidden rounded-lg border-2 border-gray-100 bg-white px-4 text-slate-700 shadow-lg shadow-gray-100"
    >
      {filterType !== TableFilterTypeEnum.DATE_RANGE && (
        <div className="mb-2.5 h-10">
          <input
            id="filterValue"
            name="filterValue"
            placeholder={t("search")}
            className="h-10 border-b-2 border-gray-50 outline-none disabled:cursor-not-allowed disabled:bg-transparent"
            disabled={isLoading}
            value={filterSearchValue}
            onChange={handleChangeFilterSearchValue}
          />
        </div>
      )}
      <div className="relative overflow-y-scroll scrollbar-none">
        {!isLoading &&
          !!filterOptions.length &&
          filterOptions?.map((option) => (
            <TableHeaderFilterDropdownOptionItem
              key={option.id || option.code || option.uuid}
              filterBy={filterBy}
              maxSelection={maxSelection}
              option={option}
              selectedFilters={selectedFilters}
              onChange={handleChangeSelectedFilter}
            />
          ))}
        {!isLoading && !filterOptions.length && <div>{t("nothingHere")}</div>}
        {isLoading && <TableHeaderFilterDropdownSkeleton maxSelection={maxSelection} />}
      </div>
      <div className="mt-2.5 border-t-2 border-gray-100">
        {isLoading ? (
          <LoadingSkeleton className="my-3 h-4 w-full" />
        ) : (
          <button
            type="button"
            className="pb-2 pt-1.5 text-left font-semibold disabled:cursor-not-allowed disabled:opacity-50"
            disabled={isLoading}
            onClick={onClearSelectedFilters}
          >
            {t("clearSelection")}
          </button>
        )}
      </div>
    </div>
  );
};

export default memo(TableHeaderFilterDropdown);
