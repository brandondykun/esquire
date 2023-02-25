import { configureStore } from "@reduxjs/toolkit";
import clientsSlice from "../reducers/clientsSlice";
import authSlice from "../reducers/authSlice";
import addressSlice from "../reducers/addressSlice";
import clientSlice from "../reducers/clientSlice";

export const store = configureStore({
  reducer: {
    clientsSlice: clientsSlice,
    authSlice: authSlice,
    addressSlice: addressSlice,
    clientSlice: clientSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
