import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

type initialAuth = {
  email?: string;
  accessToken?: string;
};

const initialState: initialAuth = {
  email: "",
  accessToken: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth(state, action: PayloadAction<initialAuth>) {
      state.accessToken = action.payload.accessToken;
      state.email = action.payload.email;
    },
    logOut(state) {
      state.accessToken = "";
      state.email = "";
    },
  },
});

export default authSlice.reducer;
export const { setAuth, logOut } = authSlice.actions;
