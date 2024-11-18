import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const API_URL:any = `${process.env.BACKEND_API_URL}`;
export const fetchReviews = createAsyncThunk(
  'reviews/fetchReviews',
  async (productId, { rejectWithValue }) => {
    try {
      const apiUrl = `${API_URL}/getfeedback/${productId}`; 
      const response = await axios.get(apiUrl);
      return response.data; 
    } catch (error:any) {
      return rejectWithValue(error.message); 
    }
  }
);