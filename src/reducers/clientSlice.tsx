import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Client } from "../types";
import { RootState as RS } from "../store/store";
import { editClientName as editName } from "../api/apiCalls";

interface ClientState {
  activeClient: Client | null;
  editClientNameStatus: "idle" | "loading" | "succeeded" | "failed";
  editClientNameError: string | null;
}

interface EditClient {
  id: number;
  user: number | null;
  firstName: string;
  middleName: string;
  lastName: string;
  caseCount?: string | number;
}

/**
 * THUNK FUNCTIONS
 */
export const editClientName = createAsyncThunk("client/updateClientName", async (client: EditClient, thunkAPI) => {
  const response = await editName(client);
  return response.data;
});

/**
 * INITIAL STATE
 */
const initialState: ClientState = {
  activeClient: null,
  editClientNameStatus: "idle",
  editClientNameError: null,
} as ClientState;

/**
 * SLICE
 */
export const clientSlice = createSlice({
  name: "client",
  initialState,
  reducers: {
    setActiveClient: (state, action) => {
      state.activeClient = action.payload;
    },
    resetClientNameEditStatus: (state) => {
      state.editClientNameStatus = "idle";
      state.editClientNameError = null;
    },
  },
  extraReducers: (builder) => {
    /**
     * EDIT CLIENT NAME
     */
    builder.addCase(editClientName.fulfilled, (state, action) => {
      state.activeClient = action.payload;
      state.editClientNameStatus = "succeeded";
      state.editClientNameError = null;
    });
    builder.addCase(editClientName.pending, (state, action) => {
      state.editClientNameStatus = "loading";
      state.editClientNameError = null;
    });
    builder.addCase(editClientName.rejected, (state, action) => {
      state.editClientNameStatus = "failed";
      state.editClientNameError = "Oops...there was an error editing that client.";
    });
  },
});

/**
 * HELPER SELECTORS
 */

// Get active client
export const getActiveClient = (state: RS) => state.clientSlice.activeClient;

// Edit client
export const getClientNameEditStatus = (state: RS) => state.clientSlice.editClientNameStatus;
export const getClientNameEditError = (state: RS) => state.clientSlice.editClientNameError;

export const { setActiveClient, resetClientNameEditStatus } = clientSlice.actions;
export default clientSlice.reducer;
