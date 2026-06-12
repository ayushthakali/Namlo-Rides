import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { AuthUser } from "../types";

const stored = sessionStorage.getItem("namlo_user");
const savedUser: AuthUser | null = stored ? JSON.parse(stored) : null;

interface AuthState {
  user: AuthUser | null;
}

const authSlice = createSlice({
  name: "auth",
  initialState: { user: savedUser } as AuthState,
  reducers: {
    login(state, action: PayloadAction<AuthUser>) {
      state.user = action.payload;
      sessionStorage.setItem("namlo_user", JSON.stringify(action.payload));
    },
    logout(state) {
      state.user = null;
      sessionStorage.removeItem("namlo_user");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
