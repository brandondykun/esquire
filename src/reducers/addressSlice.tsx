import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAddress,
  addAddress,
  editAddress as editClientAddress,
  deleteAddress as deleteClientAddress,
} from "../api/apiCalls";
import { Address, NewAddress } from "../types";
import { RootState as RS } from "../store/store";

type AddressObject = {
  id: number | null;
  clientId: number | null;
  street: string | null;
  city: string | null;
  state: string | null;
  zip: string | null;
};

type AddressType = {
  address: AddressObject;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  addAddressStatus: "idle" | "succeeded" | "failed" | "loading";
  addAddressError: string | null;
  editAddressStatus: "idle" | "succeeded" | "failed" | "loading";
  editAddressError: string | null;
  deleteAddressStatus: "idle" | "succeeded" | "failed" | "loading";
  deleteAddressError: string | null;
};

/**
 * THUNK FUNCTIONS
 */
export const getAddressByClientId = createAsyncThunk("address/getAddress", async (userId: number, thunkAPI) => {
  const response = await getAddress(userId);
  return response.data;
});

export const addNewAddress = createAsyncThunk("address/addAddress", async (address: NewAddress, thunkAPI) => {
  const response = await addAddress(address);
  return response.data;
});

export const editAddress = createAsyncThunk("address/editAddress", async (address: Address, thunkAPI) => {
  const response = await editClientAddress(address.id, address);
  return response.data;
});

export const deleteAddress = createAsyncThunk("address/deleteAddress", async (id: number, thunkAPI) => {
  const response = await deleteClientAddress(id);
  return response.data;
});

/**
 * INITIAL STATE
 */
const initialState: AddressType = {
  address: {
    id: null,
    clientId: null,
    street: null,
    city: null,
    state: null,
    zip: null,
  },
  status: "idle",
  error: null,
  addAddressStatus: "idle",
  addAddressError: null,
  editAddressStatus: "idle",
  editAddressError: null,
  deleteAddressStatus: "idle",
  deleteAddressError: null,
} as AddressType;

/**
 * SLICE
 */
export const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    resetAddAddress: (state) => {
      state.addAddressStatus = "idle";
      state.addAddressError = null;
    },
    resetEditAddress: (state) => {
      state.editAddressStatus = "idle";
      state.editAddressError = null;
    },
    resetDeleteAddress: (state) => {
      state.deleteAddressStatus = "idle";
      state.deleteAddressError = null;
    },
  },
  extraReducers: (builder) => {
    /**
     * GET ADDRESS
     */
    builder.addCase(getAddressByClientId.fulfilled, (state, action) => {
      state.address = action.payload;
      state.status = "succeeded";
      state.error = null;
    });
    builder.addCase(getAddressByClientId.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(getAddressByClientId.rejected, (state) => {
      state.status = "failed";
      state.error = "Oops...there was an error fetching the address.";
    });

    /**
     * ADD NEW ADDRESS
     */
    builder.addCase(addNewAddress.fulfilled, (state, action) => {
      state.address = action.payload;
      state.addAddressStatus = "succeeded";
      state.addAddressError = null;
    });
    builder.addCase(addNewAddress.pending, (state) => {
      state.addAddressStatus = "loading";
      state.addAddressError = null;
    });
    builder.addCase(addNewAddress.rejected, (state) => {
      state.addAddressStatus = "failed";
      state.addAddressError = "Oops...there was an error adding the address.";
    });

    /**
     * EDIT ADDRESS
     */
    builder.addCase(editAddress.fulfilled, (state, action) => {
      state.address = action.payload;
      state.editAddressStatus = "succeeded";
      state.addAddressError = null;
    });
    builder.addCase(editAddress.pending, (state) => {
      state.editAddressStatus = "loading";
      state.addAddressError = null;
    });
    builder.addCase(editAddress.rejected, (state) => {
      state.editAddressStatus = "failed";
      state.addAddressError = "Oops...there was an error adding the address.";
    });

    /**
     * DELETE ADDRESS
     */
    builder.addCase(deleteAddress.fulfilled, (state, action) => {
      state.deleteAddressStatus = "succeeded";
      state.deleteAddressError = null;
    });
    builder.addCase(deleteAddress.pending, (state) => {
      state.deleteAddressStatus = "loading";
      state.deleteAddressError = null;
    });
    builder.addCase(deleteAddress.rejected, (state) => {
      state.deleteAddressStatus = "failed";
      state.deleteAddressError = "Oops...there was an error deleting the address.";
    });
  },
});

/**
 * HELPER SELECTORS
 */

// Get Address
export const selectAddress = (state: RS) => state.addressSlice.address;
export const getAddressStatus = (state: RS) => state.addressSlice.status;
export const getAddressError = (state: RS) => state.addressSlice.error;

// Add Address
export const getAddAddressStatus = (state: RS) => state.addressSlice.addAddressStatus;
export const getAddAddressError = (state: RS) => state.addressSlice.addAddressError;

// Edit Address
export const getEditAddressStatus = (state: RS) => state.addressSlice.editAddressStatus;
export const getEditAddressError = (state: RS) => state.addressSlice.editAddressError;

// Delete Address
export const getDeleteAddressStatus = (state: RS) => state.addressSlice.deleteAddressStatus;
export const getDeleteAddressError = (state: RS) => state.addressSlice.deleteAddressError;

// Action creators are generated for each case reducer function
export const { resetAddAddress, resetEditAddress, resetDeleteAddress } = addressSlice.actions;

export default addressSlice.reducer;
