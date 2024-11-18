import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
const API_URL:any = `${process.env.BACKEND_API_URL}`;
const API_URLs = `${API_URL}/toWishlist`;

export const addToWishlist = createAsyncThunk(
  'wishlist/addToWishlist',
  async (wishlistItem: { userId: string; productId: string; price: number }, { rejectWithValue }) => {
    try {
      const response = await axios.post(API_URLs, wishlistItem);
      return response.data; 
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);



export const fetchWishlist = createAsyncThunk(
  'wishlist/fetchWishlist',
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URLs}/${userId}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);