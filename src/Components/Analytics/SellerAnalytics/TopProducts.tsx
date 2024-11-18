import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../Redux/store";
import { fetchSellerSellingReport } from "../../../Redux/Analytic/SellerAnalytics/SellingReportSlice";
import SalesPreview from "./SalesPreview";
import { useNavigate } from "react-router-dom";

const SellerTopProduct: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>();
    const [showTopProduct, setShowTopProduct] = useState(false);
  const { topProducts, isLoading, error } = useSelector(
    (state: RootState) => state.sellingReport
  );

  useEffect(() => {
    dispatch(fetchSellerSellingReport());
  }, [dispatch]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  interface TopProduct {
    productId: string;
    name: string;
    TotalSales: number;
    image: string;
  }
  interface TopProductProps {
    data: TopProduct[];
  }

  const data = topProducts.map((product) => ({
    productId: product.productId,
    name: product.name,
    image:product.image,
    TotalSales: product.totalRevenue,
  }));
  console.log(data);

  const totalRevenueSum = topProducts.reduce((acc, product) => {
    return acc + product.totalRevenue;
  }, 0);

  let num = 1;
  let progressColors = ["#FCB859", "#61A3BA", "#28AEF3", "#F2C8ED"];
  console.log(data);
  
  const handelRedirect = ()=>{
    navigate("/vendor/top-product" , {state: {datas: topProducts}})
  }

  return (
    <div className="flex flex-col justify-center items-center w-full font-poppins">
      {/* <div className=" m-auto w-[50%]"  style={showTopProduct ? { visibility: "visible" } : { visibility: "hidden" }}>
        <SalesPreview datas={data} />
      </div> */}
      <div className="flex  flex-col items-start mt-10 font-poppins  border-2 shadow-xl w-full py-3 px-2 rounded-md">
        <div className="flex flex-row w-full justify-between items-center">

        <h1 className="text-black font-semibold text-lg pl-5 py-1">
          Top product
        </h1>
        <span className="text-[16px] text-secondary cursor-pointer" onClick={handelRedirect}>View All</span>
        </div>

        <div className="w-full relative overflow-x-auto ">
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
                    {num++}
                  </th>
                  <td className="px-6 py-4" onClick={()=>setShowTopProduct(!showTopProduct)}> {item.name}</td>
                  <td className="px-6 py-4 w-[50%]">
                    <div className="w-full h-1 bg-gray-700 rounded-md relative">
                      <div
                        className="h-full  rounded-md"
                        style={{
                          width: `${
                            (item.TotalSales * 100) / totalRevenueSum
                          }%`,
                          backgroundColor:
                            progressColors[index % progressColors.length],
                        }}
                      ></div>
                    </div>
                  </td>
                  <td
                    className="flex justify-center items-center w-full h-8 mt-2 rounded-md border-2 "
                    style={{
                      borderColor:
                        progressColors[index % progressColors.length],
                      // backgroundColor:
                      //   progressColors[index % progressColors.length],
                      // opacity: 0.4,
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
    </div>
  );
};

export default SellerTopProduct;
