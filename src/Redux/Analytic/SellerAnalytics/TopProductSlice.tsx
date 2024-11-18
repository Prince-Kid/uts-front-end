import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchingSellerPopularProduct = createAsyncThunk(
  "/product/popularity",
  async () => {
    const response = await axios.get(`${process.env.BACKEND_API_URL}/popular-product`);
    return response.data;
  }
);

interface CartItem {
  cartitemsid: string;
  cartId: string;
  productId: string;
  quantity: number;
  price: number;
  createAt: string;
  updatedAt: string;
}

interface Product {
  productId: string;
  vendorId: string;
  name: string;
  description: string;
  image: string;
  discount: string;
  price: number;
  quantity: number;
  category: string;
  expiringDate: string | null;
  expired: boolean;
  available: boolean;
  createAt: string;
  updatedAt: string;
  CartItem: CartItem[];
}

interface TopProduct {
  data: Product[];
  isLoading: boolean;
  error: boolean;
}

const initialState: TopProduct = {
  data: [],
  isLoading: false,
  error: false,
};

const SellerTopProductSlice = createSlice({
  name: "TopProduct",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchingSellerPopularProduct.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(
        fetchingSellerPopularProduct.fulfilled,
        (state, action: PayloadAction<{ data: any[] }>) => {
          state.isLoading = false;
          state.data = action.payload.data;
          state.error = false;
        }
      )
      .addCase(fetchingSellerPopularProduct.rejected, (state) => {
        (state.isLoading = false), (state.error = true);
      });
  },
});

export default SellerTopProductSlice.reducer;
