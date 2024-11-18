import React, { useState, useMemo } from "react";
import { useLocation } from "react-router-dom";

interface Sale {
  name: string;
  quantity: number;
  price: number;
  total: number;
  date: string;
}

const SalesTable: React.FC = () => {
  const location = useLocation();
  const { state } = location;

  if (!state || !state.datas) {
    return <div>No data available</div>;
  }

  const { datas } = state as { datas: Sale[] };

  const [productList] = useState(datas);
  const [rowsLimit] = useState(5);

  const [rowsToShow, setRowsToShow] = useState(productList.slice(0, rowsLimit));
  const [totalPage] = useState(Math.ceil(productList?.length / rowsLimit));
  const [currentPage, setCurrentPage] = useState(0);

  const [pageWindowSize] = useState(5); // Display 5 page numbers at a time

  const nextPage = () => {
    const startIndex = rowsLimit * (currentPage + 1);
    const endIndex = startIndex + rowsLimit;
    const newArray = datas.slice(startIndex, endIndex);
    setRowsToShow(newArray);
    setCurrentPage(currentPage + 1);
  };

  const changePage = (value: number) => {
    const startIndex = value * rowsLimit;
    const endIndex = startIndex + rowsLimit;
    const newArray = datas.slice(startIndex, endIndex);
    setRowsToShow(newArray);
    setCurrentPage(value);
  };

  const previousPage = () => {
    const startIndex = (currentPage - 1) * rowsLimit;
    const endIndex = startIndex + rowsLimit;
    const newArray = datas.slice(startIndex, endIndex);
    setRowsToShow(newArray);
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    } else {
      setCurrentPage(0);
    }
  };

  const getPageNumbers = () => {
    const maxVisiblePages = pageWindowSize;
    const startPage = Math.max(
      0,
      Math.min(
        currentPage - Math.floor(maxVisiblePages / 2),
        totalPage - maxVisiblePages
      )
    );
    return Array.from(
      { length: Math.min(maxVisiblePages, totalPage) },
      (_, i) => i + startPage
    );
  };

  const pageNumbers = getPageNumbers();

  let id = 1;

  return (
    <div className="w-full bg-white rounded-lg shadow-md overflow-hidden lg:mb-12 xl:ml-[5%] mt-3 ">
      <div className="w-full h-full p-2 mb-4">
        <div>
          <h1 className="text-2xl text-center font-semibold font-poppins text-secondary">
            Sales Table
          </h1>
        </div>
        <div className="w-full overflow-x-scroll md:overflow-auto  max-w-7xl 2xl:max-w-none mt-2">
          <table className="table-auto text-sm overflow-scroll md:overflow-auto w-full  text-left font-inter border">
            <thead className="rounded-lg  text-sm text-white font-semibold w-full ">
              <tr className="rounded-lg">
                <th className="py-3 px-1 text-center text-[#212B36]  sm:text-base font-bold whitespace-nowrap">
                  ID
                </th>
                <th className="py-3 px-1 text-center text-[#212B36] sm:text-base font-bold whitespace-nowrap">
                  Product
                </th>
                <th className="py-3 px-1  text-center gap-1 text-[#212B36] sm:text-base font-bold whitespace-nowrap">
                  Quantity
                </th>
                <th className="py-3 px-1 text-center text-[#212B36] sm:text-base font-bold whitespace-nowrap">
                  Price
                </th>
                <th className="text-center py-3 px-1 text-[#212B36] sm:text-base font-bold whitespace-nowrap gap-1">
                  Total Price
                </th>
                <th className="py-3 px-1 text-center text-[#212B36] sm:text-base font-bold whitespace-nowrap  ">
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
              {rowsToShow?.map((data, index) => (
                <tr
                  className={`${
                    index % 2 == 0 ? "bg-white" : "bg-[#222E3A]/[6%]"
                  }`}
                  key={index}
                >
                  <td
                    className={`py-2 px-1 font-normal text-xs text-center ${
                      index == 0
                        ? "border-t-[1px] border-x-gray-300"
                        : index == rowsToShow?.length
                        ? "border-y"
                        : "border-t"
                    } whitespace-nowrap`}
                  >
                    {id++}
                  </td>
                  <td
                    className={`py-2 px-1 font-normal text-xs text-center ${
                      index == 0
                        ? "border-t-[1px] border-x-gray-300"
                        : index == rowsToShow?.length
                        ? "border-y"
                        : "border-t"
                    } whitespace-nowrap`}
                  >
                    {data?.name}
                  </td>
                  <td
                    className={`py-2 px-1 text-center font-normal text-xs   ${
                      index == 0
                        ? "border-t-[1px] border-x-gray-300"
                        : index == rowsToShow?.length
                        ? "border-y"
                        : "border-t"
                    } whitespace-nowrap`}
                  >
                    {data?.quantity}
                  </td>
                  <td
                    className={`py-2 px-1 text-xs  font-normal text-center  ${
                      index == 0
                        ? "border-t-[1px] border-x-gray-300"
                        : index == rowsToShow?.length
                        ? "border-y"
                        : "border-t"
                    } whitespace-nowrap`}
                  >
                    {data?.price}
                  </td>

                  <td
                    className={`py-5 px-1 text-xs  font-normal text-center ${
                      index == 0
                        ? "border-t-[1px] border-x-gray-300"
                        : index == rowsToShow?.length
                        ? "border-y"
                        : "border-t"
                    }`}
                  >
                    {data?.price * data.quantity}
                  </td>
                  <td
                    className={`py-2 px-1 text-xs  font-normal text-center
                        ${
                          index == 0
                            ? "border-t-[1px] border-x-gray-300"
                            : index == rowsToShow?.length
                            ? "border-y"
                            : "border-t"
                        } 
                    min-w-[100px]`}
                  >
                    {data?.date.slice(0, 10)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="w-full  flex justify-center sm:justify-between flex-col sm:flex-row gap-5 mt-1.5 px-1 items-center">
          <div className="text-sm">
            Showing {currentPage == 0 ? 1 : currentPage * rowsLimit + 1} to{" "}
            {currentPage == totalPage - 1
              ? productList?.length
              : (currentPage + 1) * rowsLimit}{" "}
            of {productList?.length} entries
          </div>
          <div className="flex">
            <ul
              className="flex justify-center items-center gap-x-[10px] z-30"
              role="navigation"
              aria-label="Pagination"
            >
              <li
                className={` prev-btn flex items-center justify-center w-[36px] rounded-[6px] h-[36px] border-[1px] border-solid border-[#E4E4EB] ${
                  currentPage == 0
                    ? "bg-[#cccccc] pointer-events-none"
                    : " cursor-pointer"
                }`}
                onClick={previousPage}
              >
                <img src="https://www.tailwindtap.com/assets/travelagency-admin/leftarrow.svg" />
              </li>
              {pageNumbers.map((page, index) => (
                <li
                  className={`flex items-center justify-center w-[36px] rounded-[6px] h-[34px] border-[1px] border-solid bg-[#FFFFFF] cursor-pointer ${
                    currentPage === page
                      ? "text-blue-600  border-sky-500"
                      : "border-[#E4E4EB]"
                  }`}
                  key={index}
                  onClick={() => changePage(page)}
                >
                  {page + 1}
                </li>
              ))}
              <li
                className={`next-btn flex items-center justify-center w-[36px] h-[36px] rounded-[6px] border-[1px] border-solid border-[#E4E4EB] ${
                  currentPage >= totalPage - 1
                    ? "bg-[#cccccc] pointer-events-none"
                    : " cursor-pointer"
                }`}
                onClick={nextPage}
              >
                <img src="https://www.tailwindtap.com/assets/travelagency-admin/rightarrow.svg" />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesTable;
