import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../store";

interface ProductsImagesState {
  images: string[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductsImagesState = {
  images: [],
  loading: false,
  error: null,
};

const productsImagesSlice = createSlice({
  name: "productsImages",
  initialState,
  reducers: {
    fetchImagesRequest(state: ProductsImagesState) {
      state.loading = true;
      state.error = null;
    },
    fetchImagesSuccess(
      state: ProductsImagesState,
      action: PayloadAction<string[]>
    ) {
      state.loading = false;
      state.images = action.payload;
      state.error = null;
    },
    fetchImagesFailure(
      state: ProductsImagesState,
      action: PayloadAction<string>
    ) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchImagesRequest, fetchImagesSuccess, fetchImagesFailure } =
  productsImagesSlice.actions;

export const fetchImages = (): AppThunk => async (dispatch) => {
  dispatch(fetchImagesRequest());
  try {
    const response = await fetch(`${process.env.BACKEND_API_URL}/readAllProducts`);
    if (!response.ok) {
      throw new Error("Failed to fetch images");
    }
    const data = await response.json();
    console.log("Fetched data from API:", data);
    dispatch(fetchImagesSuccess(data.map((product: any) => product.image)));
  } catch (error: any) {
    dispatch(fetchImagesFailure(error.message));
  }
};

export default productsImagesSlice.reducer;