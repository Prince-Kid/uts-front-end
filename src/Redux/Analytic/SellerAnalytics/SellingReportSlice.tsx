import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

interface MonthlySale {
  month: string;
  totalSales: number;
  income: number;
}

interface TopProduct {
  productId: string;
  name: string;
  totalRevenue: number;
}

interface SellingReportState {
  data: any[];
  monthlySales: MonthlySale[];
  topProducts: TopProduct[];
  isLoading: boolean;
  error: boolean;
}

const initialState: SellingReportState = {
  data: [],
  monthlySales: [],
  topProducts: [],
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

export const fetchSellerSellingReport = createAsyncThunk(
  "sellingReport/fetchSellingReport",
  async () => {
    const token: any = Cookies.get("_auth");

    const decodedToken = jwtDecode<TokenPayload>(token);
    const vendorId = decodedToken.vendor;
    console.log(vendorId)

    const response = await axios.get(
      `${process.env.BACKEND_API_URL}/annualSellingReport/${vendorId}`
    );
    return response.data;
  }
);

const sellingReportSlice = createSlice({
  name: "sellingReports",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSellerSellingReport.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(
        fetchSellerSellingReport.fulfilled,
        (
          state,
          action: PayloadAction<{
            topProducts: any;
            data: any[];
            monthlySales: MonthlySale[];
          }>
        ) => {
          state.isLoading = false;
          state.data = action.payload.data;
          state.monthlySales = action.payload.monthlySales;
          state.topProducts = action.payload.topProducts;
          state.error = false;
        }
      )
      .addCase(fetchSellerSellingReport.rejected, (state) => {
        state.isLoading = false;
        state.error = true;
      });
  },
});

export default sellingReportSlice.reducer;
