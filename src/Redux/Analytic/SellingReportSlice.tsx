import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface MonthlySale {
  month: string;
  totalSales: number;
  income: number;
}

interface TopProduct {
  image: any;
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

export const fetchSellingReport = createAsyncThunk(
  "sellingReport/fetchSellingReport",
  async () => {
    const response = await axios.get(
      `${process.env.BACKEND_API_URL}/overallAnnualSellingReport/`
    );
    return response.data;
  }
);

const sellingReportSlice = createSlice({
  name: "sellingReport",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSellingReport.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(
        fetchSellingReport.fulfilled,
        (
          state,
          action: PayloadAction<{
            topProducts: any; data: any[]; monthlySales: MonthlySale[] 
}>
        ) => {
          state.isLoading = false;
          state.data = action.payload.data;
          state.monthlySales = action.payload.monthlySales;
          state.topProducts = action.payload.topProducts;
          state.error = false;
        }
      )
      .addCase(fetchSellingReport.rejected, (state) => {
        state.isLoading = false;
        state.error = true;
      });
  },
});

export default sellingReportSlice.reducer;
