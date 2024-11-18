import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface ContactState {
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ContactState = {
  status: 'idle',
  error: null,
};

export const sendMessage = createAsyncThunk(
  'contact/sendMessage',
  async (messageData: { name: string; email: string; content: string }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${process.env.BACKEND_API_URL}/addMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(messageData),
      });

      if (!response.ok) {
        const errorDetails = await response.text();
        console.error('Response error details:', errorDetails);
        throw new Error(`Failed to send message: ${response.statusText}`);
      }

      return await response.json();
    } catch (error: any) {
      console.error('Error sending message:', error);
      return rejectWithValue(error.message);
    }
  }
);

const contactSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(sendMessage.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(sendMessage.fulfilled, (state) => {
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export default contactSlice.reducer;
