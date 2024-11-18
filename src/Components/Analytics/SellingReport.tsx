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
import { AppDispatch, RootState } from "../../Redux/store";
import { fetchSellingReport } from "../../Redux/Analytic/SellingReportSlice";

const SellingReport = () => {
  const dispatch: AppDispatch = useDispatch();
  const { monthlySales, isLoading, error } = useSelector(
    (state: RootState) => state.sellingReport
  );

  useEffect(() => {
    dispatch(fetchSellingReport());
  }, [dispatch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const chartData = monthlySales.map((month) => ({
    name: month.month,
    TotalSales: month.totalSales,
    Income: month.income,
  }));

  return (
    <div
      style={{ width: "60%", height: "400px" }}
      className="flex flex-col m-auto mt-80 text-xs rounded-lg shadow-2xl border-gray-400"
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
          <Bar dataKey="TotalSales" fill="#013362" barSize={30} />
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
