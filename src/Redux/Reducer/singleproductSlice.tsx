import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { addToCart, fetchProductDetails } from '../Action/singleProduct';

interface Review {
  id: number;
  name: string;
  date: string;
  rating: number;
  text: string;
}

interface ReviewState {
  reviews: Review[];
  loading: boolean;
  error: string | null;
}

interface CartItem {
  id: string;
  productId: string;
  quantity: number;
  price: number;
}

interface CartState {
  items: CartItem[];
  loading: boolean;
  error: string | null;
}

interface ProductState {
  similarProducts: any;
  product: any;
  status: string;
  error: string | null;
}

const initialReviewState: ReviewState = {
  reviews: [],
  loading: false,
  error: null,
};

const initialProductState: ProductState = {
  product: {},
  status: 'idle',
  error: null,
  similarProducts: undefined
};

const initialState: CartState = {
  items: [],
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: 'product',
  initialState: initialProductState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductDetails.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductDetails.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = 'succeeded';
        state.product = action.payload;
      })
      .addCase(fetchProductDetails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch product details';
      });
  },
});

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action: PayloadAction<CartItem>) => {
        state.loading = false;
        state.items.push(action.payload);
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to add to cart';
      });
  },
});

export const productReducer = productSlice.reducer;
export const cartReducer = cartSlice.reducer;
