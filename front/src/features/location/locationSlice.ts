import { createSlice } from "@reduxjs/toolkit";

export const locationSlice = createSlice({
  name: "location",
  initialState: {
    currentLocation: { lat: 0, lng: 0 },
    loading: false,
    error: null,
  },
  reducers: {
    startLoading: (state) => {
      state.loading = true;
      state.error = null;
    },
    setUserLocation: (state, action) => {
      state.currentLocation = action.payload;
      state.loading = false;
      state.error = null;
    },
    setLocationError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { startLoading, setUserLocation, setLocationError } =
  locationSlice.actions;
export default locationSlice.reducer;
