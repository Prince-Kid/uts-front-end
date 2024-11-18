import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="">
      <div className=" p-1 flex flex-row items-end justify-end space-x-2">
        <div className="bg-white p-2 px-4 rounded-[6px]">
          <button
            className="p-1"
            disabled={currentPage === 1}
            onClick={() => onPageChange(currentPage - 1)}
          >
            &lt;
          </button>
          {pageNumbers.map((number) => (
            <button
              key={number}
              className={`p-1 text-[14px] ${
                number === currentPage ? "bg-blue-100 text-blue-500" : ""
              }`}
              onClick={() => onPageChange(number)}
            >
              {number}
            </button>
          ))}
          <button
            className="p-1"
            disabled={currentPage === totalPages}
            onClick={() => onPageChange(currentPage + 1)}
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
