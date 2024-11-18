import React, { useEffect } from "react";
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
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { fetchWeeklyReport } from "../../Redux/Analytic/WeeklySellingSlice";
import { useNavigate } from "react-router-dom";


const WeeklyReport = () => {

  const navigate = useNavigate()
  const dispatch: AppDispatch = useDispatch();
  const { weeklySales, isLoading, error,data } = useSelector(
    (state: RootState) => state.weeklyReport
  );


  useEffect(() => {
  dispatch(fetchWeeklyReport())
  }, [dispatch])
  
  const datas = weeklySales.map((day) => ({
    name: day.day,
      TotalSales:day.totalSales
  }))

  const handelRedirect = ()=>{
    navigate('/vendor/weekly-details', {state:{datas:data}})

  }

  return (
    <div
      style={{ width: "100%", height: "250px" }}
      className="flex  flex-col m-auto text-xs  rounded-lg shadow-2xl border-gray-400"
    >
      <div className="py-2 pl-10 relative">
        <h2 className="font-bold text-lg">Reports</h2>
        <span className="flex gap-2 mt-3">
          <div className=" bg-[#37C9EE] w-3 h-3 inline-block rounded-full " />
          <span>Weekly report</span>
          <img
            src="https://static.vecteezy.com/system/resources/previews/026/622/025/original/add-category-icon-symbol-design-illustration-vector.jpg" className="w-5 h-5 absolute top-3 right-2"
            alt="category-icon"
          />
        </span>
      </div>
      <ResponsiveContainer width="99%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={datas}
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
          <Bar dataKey="TotalSales" fill="#013362" barSize={30} onClick={handelRedirect} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WeeklyReport;
