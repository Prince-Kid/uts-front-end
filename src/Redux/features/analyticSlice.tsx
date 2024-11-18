import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

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

export const fetchOrders = createAsyncThunk("orders/fetchOrders", async () => {
  const response = await fetch(`${process.env.BACKEND_API_URL}/getAllOrder`);
  if (!response.ok) {
    throw new Error("Failed to fetch orders");
  }

  const data: Order[] = await response.json();
  return data;
});

const OrderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(
        fetchOrders.fulfilled,
        (state, action: PayloadAction<Order[]>) => {
          state.isLoading = false;
          state.data = action.payload;
          state.error = false;
        }
      )
      .addCase(fetchOrders.rejected, (state) => {
        state.isLoading = false;
        state.error = true;
      });
  },
});

export default OrderSlice.reducer;
