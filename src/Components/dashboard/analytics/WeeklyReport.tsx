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
import { fetchWeeklyReport } from "../../../Redux/Analytic/WeeklySellingSlice";
import { AppDispatch, RootState } from "../../../Redux/store";
import { useNavigate } from "react-router-dom";

const WeeklyReport = () => {
   const navigate = useNavigate();
   const dispatch: AppDispatch = useDispatch();
   const { weeklySales,data,isLoading, error } = useSelector(
     (state: RootState) => state.weeklyReport
   );
 

   useEffect(() => {
     dispatch(fetchWeeklyReport());
   }, [dispatch]);
  
  const handleBarClick = () => {
    console.log(data)
    navigate("/admin/annualSales", { state: { datas: data } });
  };

   const chartData = weeklySales.map((day) => ({
     name: day.day,
     TotalSales: day.totalSales,
   }));
  
  return (
    <div className="flex  flex-col h-full w-full m-auto text-xs  rounded-lg  bg-white pb-3">
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
          <Bar dataKey="TotalSales" fill="#013362" barSize={30} onClick={handleBarClick}/>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WeeklyReport;
