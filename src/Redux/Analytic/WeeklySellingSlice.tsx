import { createAsyncThunk, createSlice,PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface WeeklySales {
  day: string;
  totalSales: number;
}

interface WeeklySellingReport {
  data: any[];
  weeklySales: WeeklySales[];
  isLoading: boolean;
  error: boolean;
}

const initialState: WeeklySellingReport = {
  data: [],
  weeklySales: [],
  isLoading: false,
  error: false,
};
export const fetchWeeklyReport = createAsyncThunk(
  "analytics/fetchWeeklyReport",
  async () => {
    const response = await axios.get(
      `${process.env.BACKEND_API_URL}/OverallWeeklySellingReport/`
    );

 
      return response.data;
      
  }
);

const weekSalesSlice = createSlice({
  name: "weekSalesReport",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchWeeklyReport.pending, (state) => {
        state.isLoading = true;
        state.error=false
    }).addCase(fetchWeeklyReport.fulfilled, (state, action: PayloadAction<{ data: any[]; weeklySales: WeeklySales[] }>) => {
        state.isLoading = false;
        state.data = action.payload.data;
        state.weeklySales = action.payload.weeklySales;
        state.error=false
    }).addCase(fetchWeeklyReport.rejected, (state, action) => {
        state.isLoading = false;
        state.error = true;
    })
  },
});


export default weekSalesSlice.reducer;
