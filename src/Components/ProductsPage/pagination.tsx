import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentPage } from "../../Redux/productsPage/paginationSlice";
import { RootState } from "../../Redux/store";
import next from "../../asset/images/next.svg";
import prev from "../../asset/images/prev.svg";

interface PaginationProps {
  totalProducts: number;
  productsPerPage: number;
}

const Pagination: React.FC<PaginationProps> = ({
  totalProducts,
  productsPerPage,
}) => {
  const dispatch = useDispatch();
  const currentPage = useSelector(
    (state: RootState) => state.pagination.currentPage
  );
  const totalPages = Math.ceil(totalProducts / productsPerPage);

  const handleNext = () => {
    if (currentPage < totalPages) {
      dispatch(setCurrentPage(currentPage + 1));
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      dispatch(setCurrentPage(currentPage - 1));
    }
  };

  const buttonStyles =
    "py-1 px-2 min-w-[30px] h-[30px] rounded-md cursor-pointer font-outfit font-medium text-sm md:text-base";

  const arrowStyle = (isDisabled: boolean) => ({
    opacity: isDisabled ? 0.3 : 1,
    cursor: isDisabled ? "default" : "pointer",
  });

  const renderPageNumbers = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(renderPageButton(i));
      }
    } else {
      pages.push(renderPageButton(1));
      if (currentPage > 3) {
        pages.push(<span key="ellipsis-1">...</span>);
      }
      let startPage = Math.max(2, currentPage - 1);
      let endPage = Math.min(totalPages - 1, currentPage + 1);
      for (let i = startPage; i <= endPage; i++) {
        pages.push(renderPageButton(i));
      }
      if (currentPage < totalPages - 2) {
        pages.push(<span key="ellipsis-2">...</span>);
      }
      pages.push(renderPageButton(totalPages));
    }
    return pages;
  };

  const renderPageButton = (page: number) => (
    <button
      key={page}
      className={`${buttonStyles} ${
        currentPage === page
          ? "bg-[#EDFBFF] text-[#37C9EE]"
          : "bg-transparent text-black"
      }`}
      onClick={() => dispatch(setCurrentPage(page))}
    >
      {page}
    </button>
  );

  return (
    <div className="flex justify-center mt-4 mb-4 md:justify-end">
      <img
        src={prev}
        onClick={() => currentPage !== 1 && handlePrevious()}
        style={arrowStyle(currentPage === 1)}
        alt="previous"
      />
      {renderPageNumbers()}
      <img
        src={next}
        onClick={handleNext}
        style={arrowStyle(currentPage === totalPages)}
        alt="next"
      />
    </div>
  );
};

export default Pagination;
