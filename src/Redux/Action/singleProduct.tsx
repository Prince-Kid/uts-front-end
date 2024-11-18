import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';
// import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



type ReviewData = {
  name: string;
  feedback: string;
  ratingScore: number;
};

export interface Product {
  productId: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

export interface ProductState {
  products: Product[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}
const API_URL:any = `${process.env.BACKEND_API_URL}`;
export const submitReview = createAsyncThunk(
  'reviews/submitReview',
  async ({ productId, data }: { productId: string; data: ReviewData }, { rejectWithValue }) => {
    try {
      const apiUrl = `${API_URL}/addfeedback/${productId}`;
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      

      const response = await axios.post(apiUrl, data, config);
      const SuccessMessage = response.data.message || 'Failed to add to cart';
      const existingToastId = toast.isActive("successful added review");
      if (!existingToastId) {
        toast.success(SuccessMessage, {
          toastId: "successful added review", 
          style: {
            width: "auto", 
            backgroundColor: "#FFFFFF",
            color: "green", 
          },
        })
      }
      return response.data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Failed to add to review';
      const existingToastId = toast.isActive("error to add review");
      if (!existingToastId) {
        toast.error(errorMessage, {
          toastId: "error to add review", 
          style: {
            width: "auto", 
            backgroundColor: "#FFFFFF",
            color: "#FF6347", 
          },
        });
      }
      return rejectWithValue(error.message);
    }
  }
);


export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async (cartItem: { userId: string; productId: string; quantity: number; price: number }) => {
    try {
      const apiUrl = `${API_URL}/addcart`;
      const response = await axios.post(apiUrl, cartItem);
      
      const existingToastId = toast.isActive("error to add cart");

      if (!existingToastId) {
        toast.success(response.data.message, {
          toastId: "added successfull", 
          style: {
            width: "auto", 
            backgroundColor: "#FFFFFF",
            color: "green", 
          },
        });
      }
      return response.data;
    } catch (error:any) {
      const errorMessage = error.response?.data?.message || 'Failed to add to cart';
      const existingToastId = toast.isActive("error to add cart");

      if (!existingToastId) {
        toast.error(errorMessage, {
          toastId: "error to add cart ", 
          style: {
            width: "auto", 
            backgroundColor: "#FFFFFF",
            color: "#FF6347", 
          },
        });
      }
   
  
  

      throw Error('Failed to add to cart');
    }
  }
);

export const fetchCart = createAsyncThunk(
  "cart/viewCart",
async(userId: string) => {
  try {
    const apiUrl =`${API_URL}/products/${userId}`;
    const response = await axios.get(apiUrl);
    return response.data
  }catch(error: any) {
    return rejectWithValue(error.message)
  }
})

export const fetchProductDetails = createAsyncThunk(
  'product/fetchProductDetails',
  async (productId:string, { rejectWithValue }) => {
    try {
      const apiUrl = `${API_URL}/readProduct/${productId}`;
      
      const response = await axios.get(apiUrl);
      console.log("response")
      return response.data;
    } catch (error:any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchReviews = createAsyncThunk(
  'product/fetchProductDetail',
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

export const fetchSimilarProducts = createAsyncThunk(
  'products/fetchSimilarProducts',
  async (productId: string, { rejectWithValue }) => {
    try {
      const apiUrl = `${API_URL}/similarproducts/${productId}`;
      const response = await axios.get<Product[]>(apiUrl);
      return response.data;
    } catch (error:any) {
      return rejectWithValue(error.message);
    }
  }
);

function rejectWithValue(message: any): any {
  throw new Error('Function not implemented.');
}
