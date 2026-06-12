import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ActiveRide, DriverPresence } from "../types";

interface RideState {
  activeRide: ActiveRide | null;
  driverPresence: DriverPresence | null;
  loading: boolean;
  error: string | null;
}

const initialState: RideState = {
  activeRide: null,
  driverPresence: null,
  loading: false,
  error: null,
};

const rideSlice = createSlice({
  name: "ride",
  initialState,
  reducers: {
    setActiveRide(state, action: PayloadAction<ActiveRide | null>) {
      state.activeRide = action.payload;
      state.error = null;
    },

    setDriverPresence(state, action: PayloadAction<DriverPresence | null>) {
      state.driverPresence = action.payload;
    },

    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },

    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { setActiveRide, setDriverPresence, setLoading, setError } =
  rideSlice.actions;
export default rideSlice.reducer;
