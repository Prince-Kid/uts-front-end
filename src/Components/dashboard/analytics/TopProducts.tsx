import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSellingReport } from "../../../Redux/Analytic/SellingReportSlice";
import { AppDispatch, RootState } from "../../../Redux/store";
import { Circles } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";

const TopProduct: React.FC = () => {
  const navigate=useNavigate()
  const dispatch = useDispatch<AppDispatch>();
  const { topProducts, isLoading, error } = useSelector(
    (state: RootState) => state.sellingReport
  );

  useEffect(() => {
    dispatch(fetchSellingReport());
  }, [dispatch]);

  const handleTopProducts = () => {
    navigate("/admin/topProduct",{state:{datas:topProducts}})
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-24">
        <Circles visible height="80" width="80" color="#C9974C" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center  h-[90%]">
        <div className="text-center">
          <p className="text-red-600 font-semibold">
            An error occurred. Please try again
          </p>
          <button
            className="mt-3 px-4 py-2 bg-primary text-white rounded-md hover:bg-secondary"
            onClick={() => window.location.reload()}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const data = topProducts.map((product) => ({
    productId: product.productId,
    name: product.name,
    TotalSales: product.totalRevenue,
  }));

  const totalRevenueSum = topProducts.reduce((acc, product) => {
    return acc + product.totalRevenue;
  }, 0);

  let num = 1;
  let progressColors = ["#FCB859", "#61A3BA", "#28AEF3", "#F2C8ED"];

  return (
    <div className="flex  flex-col border-2  w-full rounded-md">
      <h1 className="text-black font-semibold text-lg text-center">
        Top product
      </h1>
      <div className="w-full relative overflow-x-auto rounded-md">
        <table className="w-full text-sm  text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 dark:bg-gray-700 dark:text-gray-400  dark:border-gray-700">
            <tr>
              <th scope="col" className="px-6 py-3">
                #
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Popularity
              </th>
              <th scope="col" className="px-6 py-3">
                Sales
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.map((item, index) => (
              <tr
                key={item.productId}
                className="bg-white  dark:bg-gray-800 dark:border-gray-700"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {"0" + num++}
                </th>
                <td className="px-6 py-4 cursor-pointer hover:text-blue-950" onClick={handleTopProducts}> {item.name}</td>
                <td className="px-6 py-4 w-[50%]">
                  <div className="w-full h-1 bg-gray-700 rounded-md relative">
                    <div
                      className="h-full  rounded-md"
                      style={{
                        width: `${(item.TotalSales * 100) / totalRevenueSum}%`,
                        backgroundColor:
                          progressColors[index % progressColors.length],
                      }}
                    ></div>
                  </div>
                </td>
                <td
                  className="flex justify-center items-center w-full mt-2 rounded-md border-2"
                  style={{
                    borderColor: progressColors[index % progressColors.length],
                    color: progressColors[index % progressColors.length],
                    opacity: 0.8,
                  }}
                >
                  ${item.TotalSales}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TopProduct;
