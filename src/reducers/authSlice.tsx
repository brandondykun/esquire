import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import { login, whoAmI, logOut } from "../api/apiCalls";
import { RootState as RS } from "../store/store";

type User = {
  id: number | null;
  email: string | null;
};

type CurrentUser = {
  currentUser: User;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  logOutStatus: "idle" | "loading" | "succeeded" | "failed";
};

type LoginObject = {
  email: string;
  password: string;
};

/**
 * THUNK FUNCTIONS
 */
export const loginUser = createAsyncThunk("auth/login", async ({ email, password }: LoginObject) => {
  const response = await login({ email, password });
  return response.data;
});

export const confirmLogin = createAsyncThunk("auth/confirmLogin", async () => {
  const response = await whoAmI();
  return response.data;
});

export const logOutUser = createAsyncThunk("auth/logOut", async () => {
  const response = await logOut();
  return response.data;
});

/**
 * INITIAL STATE
 */
const initialState: CurrentUser = {
  currentUser: { id: null, email: null },
  status: "idle",
  error: null,
  logOutStatus: "idle",
} as CurrentUser;

/**
 * SLICE
 */
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetAuthState: (state) => {
      state.logOutStatus = "idle";
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    /**
     * LOG IN
     */
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.currentUser = action.payload;
      state.status = "succeeded";
    });
    builder.addCase(loginUser.pending, (state, action) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.status = "failed";
      state.error = "Login Error";
    });

    /**
     * CONFIRM LOGIN
     */
    builder.addCase(confirmLogin.fulfilled, (state, action) => {
      state.currentUser = action.payload;
      state.status = "succeeded";
    });
    builder.addCase(confirmLogin.pending, (state, action) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(confirmLogin.rejected, (state, action) => {
      state.status = "failed";
    });

    /**
     * LOG OUT
     */
    builder.addCase(logOutUser.fulfilled, (state, action) => {
      state.currentUser = { id: null, email: null };
      state.logOutStatus = "succeeded";
    });
    builder.addCase(logOutUser.pending, (state, action) => {
      state.logOutStatus = "loading";
      state.error = null;
    });
    builder.addCase(logOutUser.rejected, (state, action) => {
      state.logOutStatus = "failed";
    });
  },
});

/**
 * HELPER SELECTORS
 */

// Get logged in user
export const getCurrentUser = (state: RS) => state.authSlice.currentUser;

// Log in
export const getLoginStatus = (state: RS) => state.authSlice.status;
export const getLoginError = (state: RS) => state.authSlice.error;

// Log out
export const getLogOutStatus = (state: RS) => state.authSlice.logOutStatus;

// Action creators are generated for each case reducer function
export const { resetAuthState } = authSlice.actions;

export default authSlice.reducer;
