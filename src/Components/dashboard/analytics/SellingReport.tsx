import { RootState } from "../../../Redux/store";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import { fetchSellingReport } from "../../../Redux/Analytic/SellingReportSlice";
import { AppDispatch } from "../../../Redux/store";
import { Circles } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";

const SellingReport = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const { monthlySales, data, isLoading, error } = useSelector(
    (state: RootState) => state.sellingReport
  );

  useEffect(() => {
    dispatch(fetchSellingReport());
  }, [dispatch]);

  const handleBarClick = () => {
    navigate("/admin/annualSales", { state: { datas: data } });
  };

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

  const chartData = monthlySales.map((month) => ({
    name: month.month,
    TotalSales: month.totalSales,
    Income: month.income,
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
      name: any;
      quantity: any;
      price: any;
      Total: any;
      date: any;
    }) => ({
      product: totalSale.name,
      quantity: totalSale.quantity,
      price: totalSale.price,
      total: totalSale.quantity * totalSale.price,
      date: totalSale.date,
    })
  );

  return (
    <div
      style={{ height: "400px" }}
      className="flex flex-col m-auto text-xs bg-white rounded-lg shadow-2xl border-gray-400"
    >
      <div className="py-2 pl-10 relative">
        <h2 className="font-bold text-lg">Reports</h2>
        <div className="flex gap-2 mt-3">
          <div className=" bg-[#37C9EE] w-3 h-3 inline-block rounded-full " />

          <p>Year selling Analytics</p>
          <img
            src="https://static.vecteezy.com/system/resources/previews/026/622/025/original/add-category-icon-symbol-design-illustration-vector.jpg"
            className="w-5 h-5 absolute top-3 right-2"
            alt=""
          />
        </div>
      </div>
      <ResponsiveContainer width="99%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={chartData}
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
          <Bar
            dataKey="TotalSales"
            fill="#013362"
            barSize={30}
            onClick={handleBarClick}
          />
          <Bar
            dataKey="Income"
            fill="#C9974C"
            background={{ fill: "#eee" }}
            barSize={30}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SellingReport;
