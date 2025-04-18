import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axios } from "@/lib/axios";
import { UserProps } from "@/types";

interface InitialState {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: UserProps | null;
}

const initialState: InitialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
};

interface RegisterFormData {
  userName: string;
  email: string;
  password: string;
}

export const registerUser = createAsyncThunk(
  "/auth/register",
  async (formData: RegisterFormData) => {
    const response = await axios.post("/auth/register", formData, {
      withCredentials: true,
    });

    return response.data;
  }
);

interface LoginFormData {
  email: string;
  password: string;
}

export const loginUser = createAsyncThunk(
  "/auth/login",
  async (formData: LoginFormData) => {
    const response = await axios.post("/auth/login", formData, {
      withCredentials: true,
    });

    return response.data;
  }
);

export const logoutUser = createAsyncThunk("/auth/logout", async () => {
  const response = await axios.post(
    "/auth/logout",
    {},
    {
      withCredentials: true,
    }
  );

  return response.data;
});

export const checkAuth = createAsyncThunk("/auth/checkauth", async () => {
  const response = await axios.get("/auth/check-auth", {
    withCredentials: true,
    headers: {
      "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
    },
  });

  return response.data;
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: () => {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(registerUser.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        console.log(action);

        state.isLoading = false;
        state.user = action.payload.success ? action.payload.user : null;
        state.isAuthenticated = action.payload.success;
      })
      .addCase(loginUser.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.success ? action.payload.user : null;
        state.isAuthenticated = action.payload.success;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      });
  },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
