import { configureStore } from "@reduxjs/toolkit";
import locationReducer from "./features/location/locationSlice";

export const store = configureStore({
  reducer: {
    location: locationReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
