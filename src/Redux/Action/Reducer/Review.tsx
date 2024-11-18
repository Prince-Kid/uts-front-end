import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { submitReview, fetchReviews } from "../singleProduct";

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

const initialReviewState: ReviewState = {
  reviews: [],
  loading: false,
  error: null,
};

const reviewSlice = createSlice({
  name: "reviews",
  initialState: initialReviewState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        submitReview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        submitReview.fulfilled,
        (state, action: PayloadAction<Review[]>) => {
          state.loading = false;
          state.reviews = action.payload;
          console.log("mmmmmmm", state.reviews);
        }
      )
      .addCase(
        submitReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to submit review";
      })
      .addCase(
        fetchReviews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchReviews.fulfilled,
        (state, action: PayloadAction<Review[]>) => {
          state.loading = false;
          state.reviews = action.payload;
          console.log("mmmm", state.reviews);
        }
      )
      .addCase(fetchReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch reviews";
      });
  },
});

export const reviewReducer = reviewSlice.reducer;