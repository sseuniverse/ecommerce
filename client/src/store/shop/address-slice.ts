import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axios } from "@/lib/axios";
import { AddressProps } from "@/types";

interface InitialState {
  isLoading: boolean;
  addressList: AddressProps[];
}

const initialState: InitialState = {
  isLoading: false,
  addressList: [],
};

interface AddNewAddress {
  address: string;
  city: string;
  phone: string;
  pincode: string;
  notes: string;
  userId?: string
}

export const addNewAddress = createAsyncThunk(
  "/addresses/addNewAddress",
  async (formData: AddNewAddress) => {
    const response = await axios.post("/shop/address/add", formData);
    return response.data;
  }
);

export const fetchAllAddresses = createAsyncThunk(
  "/addresses/fetchAllAddresses",
  async (userId: string) => {
    const response = await axios.get(`/shop/address/get/${userId}`);

    return response.data;
  }
);

export const editaAddress = createAsyncThunk(
  "/addresses/editaAddress",
  async ({
    userId,
    addressId,
    formData,
  }: {
    userId: string;
    addressId: string;
    formData: AddNewAddress;
  }) => {
    const response = await axios.put(
      `/shop/address/update/${userId}/${addressId}`,
      formData
    );

    return response.data;
  }
);

export const deleteAddress = createAsyncThunk(
  "/addresses/deleteAddress",
  async ({ userId, addressId }: { userId: string; addressId: string }) => {
    const response = await axios.delete(
      `/shop/address/delete/${userId}/${addressId}`
    );

    return response.data;
  }
);

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addNewAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addNewAddress.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(addNewAddress.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchAllAddresses.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllAddresses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.addressList = action.payload.data;
      })
      .addCase(fetchAllAddresses.rejected, (state) => {
        state.isLoading = false;
        state.addressList = [];
      });
  },
});

export default addressSlice.reducer;
