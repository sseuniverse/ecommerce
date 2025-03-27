import { axios } from "@/lib/axios";
import { CartProps } from "@/types";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface InitialState {
  cartItems: CartProps | null;
  isLoading: boolean;
}

const initialState: InitialState = {
  cartItems: null,
  isLoading: false,
};

interface AddToCart {
  userId: string;
  productId: string;
  quantity: number;
}

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ userId, productId, quantity }: AddToCart) => {
    const response = await axios.post("/shop/cart/add", {
      userId,
      productId,
      quantity,
    });

    return response.data;
  }
);

export const fetchCartItems = createAsyncThunk(
  "cart/fetchCartItems",
  async (userId: string) => {
    const response = await axios.get(`/shop/cart/get/${userId}`);
    // console.log(response.data);
    return response.data;
  }
);

export const deleteCartItem = createAsyncThunk(
  "cart/deleteCartItem",
  async ({ userId, productId }: { userId: string; productId: string }) => {
    const response = await axios.delete(`/shop/cart/${userId}/${productId}`);
    return response.data;
  }
);

export const updateCartQuantity = createAsyncThunk(
  "cart/updateCartQuantity",
  async ({ userId, productId, quantity }: any) => {
    const response = await axios.put("/shop/cart/update-cart", {
      userId,
      productId,
      quantity,
    });

    return response.data;
  }
);

const shoppingCartSlice = createSlice({
  name: "shoppingCart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.data;
      })
      .addCase(addToCart.rejected, (state) => {
        state.isLoading = false;
        state.cartItems = null;
      })
      .addCase(fetchCartItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.data;
      })
      .addCase(fetchCartItems.rejected, (state) => {
        state.isLoading = false;
        state.cartItems = null;
      })
      .addCase(updateCartQuantity.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCartQuantity.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.data;
      })
      .addCase(updateCartQuantity.rejected, (state) => {
        state.isLoading = false;
        state.cartItems = null;
      })
      .addCase(deleteCartItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCartItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.data;
      })
      .addCase(deleteCartItem.rejected, (state) => {
        state.isLoading = false;
        state.cartItems = null;
      });
  },
});

export default shoppingCartSlice.reducer;
