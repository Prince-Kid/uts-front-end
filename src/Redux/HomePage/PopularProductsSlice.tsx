import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface PopularProductsState {
  products: Array<any>;
  loading: boolean;
  error: string;
}

export const fetchPopularProducts = createAsyncThunk(
  "popularProducts/fetchPopularProducts",
  async () => {
    const response = await fetch(`${process.env.BACKEND_API_URL}/popular-product`);
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    const data = await response.json();
    return data;
  }
);

const initialState: PopularProductsState = {
  products: [],
  loading: false,
  error: "",
};

const popularProductsSlice = createSlice({
  name: "popularProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchPopularProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchPopularProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchPopularProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "An error occurred";
      });
  },
});

export default popularProductsSlice.reducer;
