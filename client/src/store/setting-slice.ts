import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import { axios } from "@/lib/axios";
import { SettingsProps } from "@/types";

interface InitialState {
  isLoading: boolean;
  setting: SettingsProps | null;
}

const initialState: InitialState = {
  isLoading: false,
  setting: null,
};

export const fetchSettings = createAsyncThunk(
  "/settings/theme",
  async (userId: string) => {
    const response = await axios.get(`/settings/theme/get/${userId}`);
    return response.data;
  }
);

export const editSettings = createAsyncThunk(
  "/settings/editTheme",
  async ({ userId, formData }: { userId: string; formData: any }) => {
    const response = await axios.put(
      `/settings/theme/update/${userId}`,
      formData
    );
    return response.data;
  }
);

const settingSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSettings.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchSettings.fulfilled, (state, action) => {
        state.isLoading = false;
        state.setting = action.payload.data;
      })
      .addCase(fetchSettings.rejected, (state) => {
        state.isLoading = false;
        state.setting = null;
      });
  },
});

export default settingSlice.reducer