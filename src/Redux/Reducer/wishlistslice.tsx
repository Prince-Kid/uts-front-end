import { createSlice } from '@reduxjs/toolkit';
import { addToWishlist, fetchWishlist } from '../Action/wishlist';

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addToWishlist.fulfilled, (state, action) => {

      })
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = 'succeeded';
      })
      .addCase(fetchWishlist.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchWishlist.rejected, (state, action) => {
        state.status = 'failed';
        //@ts-ignore
        state.error = action.error.message;
      });
  },
});

export default wishlistSlice.reducer;