import React, { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState } from "../../../Redux/store";
import { fetchSellerWeeklyReport } from "../../../Redux/Analytic/SellerAnalytics/WeekSellingSlice";
import SalesTable from "./SalesTable";
import { Circles } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";

const SellerWeeklyReport = () => {
  const navigate = useNavigate()
  const dispatch: AppDispatch = useDispatch();
  const { SellerWeeklySales,isLoading,data,error } = useSelector(
    (state: RootState) => state.SellerWeeklySales
  );
  const [showSales, setShowSales] = useState(false);
  const handelRedirect = ()=>{
    navigate('/vendor/weekly-details', {state:{datas:data}})

  }
  


  useEffect(() => {
    dispatch(fetchSellerWeeklyReport());
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-24">
        <Circles
          visible
          height="80"
          width="80"
          color="#C9974C"
          ariaLabel="circles-loading"
          wrapperStyle={{}}
          wrapperClass="circles-wrapper"
        />
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

  const WeekSalesData = SellerWeeklySales.map((day) => ({
    name: day.day,
    TotalSales: day.totalSales,
  }));

  interface Sale {
    product: string;
    quantity: number;
    price: number;
    total: number;
    date: string;
  }

  const datas: Sale[] = data.map(
    (totalSale: {
      product: any;
      quantity: any;
      price: any;
      Total: any;
      date: any;
    }) => ({
      product: totalSale.product,
      quantity: totalSale.quantity,
      price: totalSale.price,
      total: totalSale.quantity * totalSale.price,
      date: totalSale.date,
    })
  );



  return (
    <div className="h-full">
      {/* <div
        style={showSales ? { visibility: "visible" } : { visibility: "hidden" }}
      >
        <SalesTable datas={datas} />
      </div> */}
      <div
        style={{ width: "100%", height: "250px" }}
        className="flex  flex-col m-auto mt-0 text-xs  rounded-lg shadow-2xl border-gray-400"
      >
        <div className="py-2 pl-10 relative">
          <h2 className="font-bold text-lg">Reports</h2>
          <span className="flex gap-2 mt-3">
            <div className=" bg-[#37C9EE] w-3 h-3 inline-block rounded-full " />
            <span>Weekly report</span>
            <img
              src="https://static.vecteezy.com/system/resources/previews/026/622/025/original/add-category-icon-symbol-design-illustration-vector.jpg"
              className="w-5 h-5 absolute top-3 right-2"
              alt="category-icon"
            />
          </span>
        </div>
        <ResponsiveContainer width="99%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={WeekSalesData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="TotalSales" fill="#013362" barSize={30}
              onClick={handelRedirect}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SellerWeeklyReport;
