import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getClients as getUserClients } from "../api/apiCalls";
import { Client } from "../types";
import { RootState as RS } from "../store/store";
import { addClient } from "../api/apiCalls";
import { NewClient } from "../types";

interface ClientsState {
  clients: Client[];
  getClientsStatus: "idle" | "loading" | "succeeded" | "failed";
  getClientsError: string | null | undefined;
  addClientStatus: "idle" | "loading" | "succeeded" | "failed";
  addClientError: string | null | undefined;
  newClientId: number | null;
}

/**
 * THUNK FUNCTIONS
 */
export const fetchClientsById = createAsyncThunk("clients/getClientsByUserId", async (userId: number, thunkAPI) => {
  const response = await getUserClients(userId);
  return response.data;
});

export const createNewClient = createAsyncThunk("clients/createNewClient", async (client: NewClient, thunkAPI) => {
  const response = await addClient(client);
  return response.data;
});

/**
 * INITIAL STATE
 */
const initialState: ClientsState = {
  clients: [],
  getClientsStatus: "idle",
  getClientsError: null,
  addClientStatus: "idle",
  addClientError: null,
  newClientId: null,
} as ClientsState;

/**
 * SLICE
 */
export const clientsSlice = createSlice({
  name: "clients",
  initialState,
  reducers: {
    resetAddClientStatus: (state) => {
      state.addClientStatus = "idle";
      state.addClientError = null;
    },
  },
  extraReducers: (builder) => {
    /**
     * GET CLIENTS
     */
    builder.addCase(fetchClientsById.fulfilled, (state, action) => {
      const sorted = action.payload.sort((a: Client, b: Client) => {
        return a.lastName.localeCompare(b.lastName);
      });
      state.clients = sorted;
      state.getClientsStatus = "succeeded";
      state.getClientsError = null;
    });
    builder.addCase(fetchClientsById.pending, (state, action) => {
      state.getClientsStatus = "loading";
      state.getClientsError = null;
    });
    builder.addCase(fetchClientsById.rejected, (state, action) => {
      state.getClientsStatus = "failed";
      state.getClientsError = "Oops...there was an error fetching the clients.";
    });

    /**
     * ADD NEW CLIENT
     */
    builder.addCase(createNewClient.fulfilled, (state, action) => {
      const newClient = { ...action.payload, caseCount: 0 };
      const unsorted = [...state.clients, newClient];
      const sorted = unsorted.sort((a: Client, b: Client) => {
        return a.lastName.localeCompare(b.lastName);
      });
      state.clients = sorted;
      state.addClientStatus = "succeeded";
      state.addClientError = null;
      state.newClientId = action.payload.id;
    });
    builder.addCase(createNewClient.pending, (state, action) => {
      state.addClientStatus = "loading";
      state.addClientError = null;
    });
    builder.addCase(createNewClient.rejected, (state, action) => {
      state.addClientStatus = "failed";
      state.addClientError = "Oops...there was an error creating that client.";
    });
  },
});

/**
 * HELPER SELECTORS
 */

// Get All Clients
export const getClients = (state: RS) => state.clientsSlice.clients;
export const getClientsStatus = (state: RS) => state.clientsSlice.getClientsStatus;
export const getClientsError = (state: RS) => state.clientsSlice.getClientsError;

// Add New Client
export const getCreateNewClientStatus = (state: RS) => state.clientsSlice.addClientStatus;
export const getCreateNewClientError = (state: RS) => state.clientsSlice.addClientError;
export const getNewClientId = (state: RS) => state.clientsSlice.newClientId;

export const { resetAddClientStatus } = clientsSlice.actions;
export default clientsSlice.reducer;
