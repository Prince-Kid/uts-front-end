import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

interface SellerWeeklySales {
  day: string;
  totalSales: number;
}

interface WeeklySellingReport {
  data: any[];
  SellerWeeklySales: SellerWeeklySales[];
  isLoading: boolean;
  error: boolean;
}

const initialState: WeeklySellingReport = {
  data: [],
  SellerWeeklySales: [],
  isLoading: false,
  error: false,
};

interface TokenPayload {
  role: string;
  email: string;
  vendor: string;
  id: string;
  password: string;
  iat: number;
  exp: number;
}

export const fetchSellerWeeklyReport = createAsyncThunk(
  "analytics/fetchWeeklyReport",
  async () => {
    const token: any = Cookies.get("_auth");

    const decodedToken = jwtDecode<TokenPayload>(token);
    const vendorId = decodedToken.vendor;
    console.log(vendorId);
    const response = await axios.get(
      `${process.env.BACKEND_API_URL}/WeeklySellingReport/${vendorId}`
    );

    return response.data;
  }
);

const SellerWeekSalesSlice = createSlice({
  name: "weekSales",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSellerWeeklyReport.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(
        fetchSellerWeeklyReport.fulfilled,
        (
          state,
          action: PayloadAction<{
            data: any[];
            weeklySales: SellerWeeklySales[];
          }>
        ) => {
          state.isLoading = false;
          state.data = action.payload.data;
          state.SellerWeeklySales = action.payload.weeklySales;
          state.error = false;
        }
      )
      .addCase(fetchSellerWeeklyReport.rejected, (state, action) => {
        state.isLoading = false;
        state.error = true;
      });
  },
});

export default SellerWeekSalesSlice.reducer;
