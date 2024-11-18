import { createSlice } from '@reduxjs/toolkit';
import { fetchSimilarProducts } from '../../Redux/Action/singleProduct';

interface Product {
  productId: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

interface ProductsState {
  similarProducts: Product[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ProductsState = {
  similarProducts: [],
  status: 'idle',
  error: null,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSimilarProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSimilarProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.similarProducts = action.payload;
      })
      .addCase(fetchSimilarProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export default productsSlice.reducer;