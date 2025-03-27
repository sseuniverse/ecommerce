import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axios } from "@/lib/axios";
import { ReviewProps } from "@/types";

interface InitialState {
  isLoading: boolean;
  reviews: ReviewProps[];
}

const initialState: InitialState = {
  isLoading: false,
  reviews: [],
};

interface AddReviewData {
  productId: string | undefined;
  userId: string | undefined;
  userName: string | undefined;
  reviewMessage: string;
  reviewValue: number;
}

export const addReview = createAsyncThunk(
  "/order/addReview",
  async (formdata: AddReviewData) => {
    const response = await axios.post(`/shop/review/add`, formdata);
    return response.data;
  }
);

export const getReviews = createAsyncThunk(
  "/order/getReviews",
  async (id: string | undefined) => {
    const response = await axios.get(`/shop/review/${id}`);
    return response.data;
  }
);

const reviewSlice = createSlice({
  name: "reviewSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getReviews.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getReviews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.reviews = action.payload.data;
      })
      .addCase(getReviews.rejected, (state) => {
        state.isLoading = false;
        state.reviews = [];
      });
  },
});

export default reviewSlice.reducer;
