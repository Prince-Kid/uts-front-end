import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { Key } from "react";

interface TokenPayload {
  role: string;
  email: string;
  vendor: string;
  id: string;
  password: string;
  iat: number;
  exp: number;
}

interface DeliveryAddress {
  city: string;
  street: string;
}

interface Product {
  productId: string;
  name: string;
  quantity: number;
  price: number;
}

interface Order {
  color: string | undefined;
  name: Key | null | undefined;
  createdAt: string;
  deliveryAddress: DeliveryAddress;
  expectedDeliveryDate: string | null;
  orderId: string;
  paymentMethod: string;
  products: Product[];
  status: string;
  totalAmount: number | null;
  updatedAt: string;
  userId: string;
}

interface OrderState {
  isLoading: boolean;
  data: Order[];
  error: boolean;
}

const initialState: OrderState = {
  isLoading: false,
  data: [],
  error: false,
};


export const fetchSellerOrderStatus = createAsyncThunk(
  "/seller/getOrderStatus",
  async () => {
    try {
      const token: any = Cookies.get("_auth");

      const decodedToken = jwtDecode<TokenPayload>(token);
      const vendorId = decodedToken.vendor;
      const response = await axios.get(
        `${process.env.BACKEND_API_URL}/order/getSellerOrder/${vendorId}`
      );
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch orderStatus");
    }
  }
);

const SellerOrderStatusSlice = createSlice({
  name: "SellerOrders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSellerOrderStatus.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(
        fetchSellerOrderStatus.fulfilled,
        (state, action: PayloadAction<Order[]>) => {
          state.isLoading = false;
          state.data = action.payload;
          state.error = false;
        }
      )
      .addCase(fetchSellerOrderStatus.rejected, (state) => {
        state.isLoading = false;
        state.error = true;
      });
  },
});

export default SellerOrderStatusSlice.reducer;
