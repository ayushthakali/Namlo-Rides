import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import rideReducer from "./rideSlice";
import { historyApi } from "./historyApi";
import { useDispatch, useSelector } from "react-redux";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    ride: rideReducer,
    [historyApi.reducerPath]: historyApi.reducer,
  },
  middleware: (gDM) => gDM().concat(historyApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector = <T>(fn: (s: RootState) => T) => useSelector(fn);
