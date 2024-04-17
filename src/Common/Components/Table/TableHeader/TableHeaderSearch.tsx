import { first } from "lodash";
import {
  ChangeEvent,
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
import { BiChevronDown, BiSearch } from "react-icons/bi";
import { twMerge } from "tailwind-merge";

import { Input } from "../../Form";
// eslint-disable-next-line import/no-cycle
import useTableFilterParam from "../../../Hooks/useTableFilter";

interface TableHeaderSearchProps {
  id?: string;
  field: Record<string, string>;
  groupKey: string;
  classNameInput?: string;
  classNameContainer?: string;
  onChangeFilter: (key: string, values: string[], groupKey?: string) => void;
}

const TableHeaderSearch = (
  { id, field, groupKey, classNameInput, classNameContainer, onChangeFilter }: TableHeaderSearchProps,
  ref: ForwardedRef<unknown>,
) => {
  const { t } = useTranslation();

  const [isShowSearchFieldDropdown, setIsShowSearchFieldDropdown] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [searchField, setSearchField] = useState<keyof typeof field>(Object.keys(field)[0]);
  const [searchValueParam] = useTableFilterParam(searchField);

  const buttonRef = useRef<HTMLButtonElement>(null);
  const fieldOptions = useMemo(() => Object.entries(field), [field]);
  const isFirstRenderRef = useRef(true);

  const formatSearchField = useCallback(
    (searchParam: string) => {
      if (!id) {
        return `search.${searchParam}`;
      }

      return `search_${id}.${searchParam}`;
    },
    [id],
  );

  const handleChangeFilter = useCallback(
    (value: string) => {
      if (!searchField) {
        return;
      }

      if (!value) {
        onChangeFilter(formatSearchField(`${searchField}`), [], groupKey);
        return;
      }

      onChangeFilter(formatSearchField(`${searchField}`), [value], groupKey);
    },
    [formatSearchField, groupKey, onChangeFilter, searchField],
  );

  const handleFocusSearchFieldButton = useCallback(() => {
    setIsShowSearchFieldDropdown(true);
  }, []);

  const handleBlurSearchFieldButton = useCallback(() => {
    setIsShowSearchFieldDropdown(false);
    buttonRef.current?.blur();
  }, []);

  const handleChangeSearchField = useCallback(
    (key: string) => {
      setSearchField(key as keyof typeof field);
      handleBlurSearchFieldButton();
    },
    [handleBlurSearchFieldButton],
  );

  const handleChangeSearchValue = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;

      setSearchValue(value);
      handleChangeFilter(value);
    },
    [setSearchValue, handleChangeFilter],
  );

  const handleClickClearAll = useCallback(() => {
    setSearchValue("");
  }, []);

  useImperativeHandle(
    ref,
    () => ({
      onClickClearAll: handleClickClearAll,
    }),
    [handleClickClearAll],
  );

  useEffect(() => {
    if (!searchValueParam.length || !isFirstRenderRef.current) {
      return;
    }

    setSearchValue(first(searchValueParam as string[]) as string);
    isFirstRenderRef.current = false;
  }, [searchValueParam]);

  return (
    <div
      className={twMerge(
        "group relative z-20 mb-4 mr-4 flex w-full items-center rounded-lg border-2 border-gray-100 bg-gray-50 focus-within:border-gray-200 focus-within:bg-gray-100 hover:border-gray-200 hover:bg-gray-100 md:flex-shrink-0 lg:w-fit",
        classNameContainer,
      )}
    >
      <Input
        name={`tableSearch.${searchField}`}
        className={twMerge(
          "z-0 block h-9 flex-1 border-0 bg-transparent duration-100 hover:bg-gray-100",
          classNameInput,
        )}
        size="sm"
        isShowLabelWhenFocusing={false}
        placeholder={t("search")}
        label={t("search")}
        labelPostfix={<BiSearch className="flex-shrink-0 pt-px text-gray-400" size={16} />}
        value={searchValue}
        onChange={handleChangeSearchValue}
      />
      {field && (
        <>
          <button
            className="relative flex w-fit cursor-pointer items-center space-x-2 border-l-2 border-gray-100 py-1.5 pl-4 pr-2.5 outline-none group-focus-within:border-gray-200 group-hover:border-gray-200"
            ref={buttonRef}
            type="button"
            onBlur={handleBlurSearchFieldButton}
            onFocus={handleFocusSearchFieldButton}
          >
            <div>{field[searchField]}</div>
            <BiChevronDown size={20} />
          </button>
          <div
            className={twMerge(
              "absolute right-0 top-12 z-10 flex w-full max-w-fit flex-col overflow-hidden rounded-lg border-2 border-gray-100 bg-white py-3 text-slate-700 shadow-lg shadow-gray-100",
              isShowSearchFieldDropdown ? "block" : "hidden",
            )}
          >
            {fieldOptions.map(([key, value]) => (
              <div
                key={key}
                className="flex min-w-full cursor-pointer whitespace-nowrap px-5 py-1.5 duration-100 hover:bg-gray-100"
                role="button"
                tabIndex={0}
                onMouseDown={() => handleChangeSearchField(key)}
              >
                {value}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default memo(forwardRef(TableHeaderSearch));
