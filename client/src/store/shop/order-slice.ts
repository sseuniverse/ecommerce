import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axios } from "@/lib/axios";
import { OrderProps } from "@/types";

interface InitialState {
  approvalURL: string | null;
  isLoading: boolean;
  orderId: OrderProps["_id"] | null;
  orderList: OrderProps[];
  orderDetails: OrderProps | null;
}

const initialState: InitialState = {
  approvalURL: null,
  isLoading: false,
  orderId: null,
  orderList: [],
  orderDetails: null,
};

interface OrderData {
  userId: string | undefined;
  cartId: string | undefined;
  cartItems:
    | {
        productId: string;
        title: string;
        image: string;
        price: number;
        quantity: number;
      }[]
    | undefined;

  addressInfo: {
    addressId: string;
    address: string;
    city: string;
    pincode: string;
    phone: string;
    notes: string;
  };
  orderStatus: "pending";
  paymentMethod: "paypal";
  paymentStatus: "pending";
  totalAmount: number;
  orderDate: Date;
  orderUpdateDate: Date;
  paymentId: string;
  payerId: string;
}

export const createNewOrder = createAsyncThunk(
  "/order/createNewOrder",
  async (orderData: OrderData) => {
    const response = await axios.post("/shop/order/create", orderData);
    return response.data;
  }
);

interface CapturePayments {
  paymentId: string;
  payerId: string;
  orderId: string;
}

export const capturePayment = createAsyncThunk(
  "/order/capturePayment",
  async ({ paymentId, payerId, orderId }: CapturePayments) => {
    const response = await axios.post("/shop/order/capture", {
      paymentId,
      payerId,
      orderId,
    });

    return response.data;
  }
);

export const getAllOrdersByUserId = createAsyncThunk(
  "/order/getAllOrdersByUserId",
  async (userId: string) => {
    const response = await axios.get(`/shop/order/list/${userId}`);
    return response.data;
  }
);

export const getOrderDetails = createAsyncThunk(
  "/order/getOrderDetails",
  async (id: string) => {
    const response = await axios.get(`/shop/order/details/${id}`);
    return response.data;
  }
);

const shoppingOrderSlice = createSlice({
  name: "shoppingOrderSlice",
  initialState,
  reducers: {
    resetOrderDetails: (state) => {
      state.orderDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createNewOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createNewOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.approvalURL = action.payload.approvalURL;
        state.orderId = action.payload.orderId;
        sessionStorage.setItem(
          "currentOrderId",
          JSON.stringify(action.payload.orderId)
        );
      })
      .addCase(createNewOrder.rejected, (state) => {
        state.isLoading = false;
        state.approvalURL = null;
        state.orderId = null;
      })
      .addCase(getAllOrdersByUserId.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllOrdersByUserId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderList = action.payload.data;
      })
      .addCase(getAllOrdersByUserId.rejected, (state) => {
        state.isLoading = false;
        state.orderList = [];
      })
      .addCase(getOrderDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrderDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderDetails = action.payload.data;
      })
      .addCase(getOrderDetails.rejected, (state) => {
        state.isLoading = false;
        state.orderDetails = null;
      });
  },
});

export const { resetOrderDetails } = shoppingOrderSlice.actions;
export default shoppingOrderSlice.reducer;
