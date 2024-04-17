import { memo, useCallback, useEffect, useState } from "react";
import { BiChevronRight } from "react-icons/bi";
import ReactPaginate from "react-paginate";

import { TablePaginationType } from "../interface";
import { getTwScreenWidth } from "../../../Utils/Helpers/commonHelper";

export interface TableFooterPaginationProps extends Partial<TablePaginationType> {
  onChangePageIndex: (page: number) => void;
}

interface PaginationProps {
  selected: number;
}

const TableFooterPagination = ({
  pageIndex,
  totalPages = 1,
  onChangePageIndex,
}: TableFooterPaginationProps) => {
  const [pageRangeDisplay, setPageRangeDisplay] = useState(1);

  const handlePageClick = useCallback(
    (selectedItem: PaginationProps) => {
      onChangePageIndex(selectedItem.selected);
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },
    [onChangePageIndex],
  );
  const calculateWidth = useCallback(() => {
    const windowWidth = window.innerWidth;

    if (windowWidth >= getTwScreenWidth("lg")) {
      setPageRangeDisplay(2);
    }
    if (windowWidth >= getTwScreenWidth("md")) {
      setPageRangeDisplay(2);
    } else {
      setPageRangeDisplay(1);
    }
  }, []);

  useEffect(() => {
    calculateWidth();

    window.addEventListener("resize", calculateWidth);

    return () => {
      window.removeEventListener("resize", calculateWidth);
    };
  }, [calculateWidth]);

  return (
    <nav className="relative z-10 inline-flex text-sm font-medium rounded-md shadow-sm cursor-pointer">
      <ReactPaginate
        breakLabel="..."
        breakLinkClassName="border border-gray-100 px-3 py-2 lg:px-4 lg:py-2.5 hover:bg-gray-50"
        nextLabel={
          <div className="rounded-r-md border border-gray-100 bg-white p-1.5 text-gray-500 hover:bg-gray-50 lg:p-2">
            <BiChevronRight size={21} />
          </div>
        }
        previousLabel={
          <div className="rounded-l-md border border-gray-100 bg-white p-1.5 text-gray-500 hover:bg-gray-50 lg:p-2">
            <BiChevronRight size={21} className="rotate-180" />
          </div>
        }
        containerClassName="inline-flex items-center"
        pageLinkClassName="border border-gray-100 px-3 py-2 lg:px-4 lg:py-2.5 hover:bg-gray-50 h-full"
        activeLinkClassName="border-primary-700 bg-primary-50 text-primary-700 hover:bg-primary-50"
        onPageChange={handlePageClick}
        {...(!pageIndex && { forcePage: pageIndex })}
        pageRangeDisplayed={pageRangeDisplay}
        marginPagesDisplayed={pageRangeDisplay}
        pageCount={totalPages}
        renderOnZeroPageCount={null}
      />
    </nav>
  );
};

export default memo(TableFooterPagination);
