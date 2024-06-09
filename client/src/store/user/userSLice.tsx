/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UserState } from "../../typo/user/states";
import { LoginParams, SignUpParams } from "../../typo/user/params";

const InitialEmpState: UserState = {
  adding: false,
  user: undefined,
  task: undefined,
  loading: false,
  is_login: false,
};
const UserSlice = createSlice({
  name: "user",
  initialState: InitialEmpState,
  reducers: {
    signUpRequested: (state, _: PayloadAction<SignUpParams>) => {
      state.adding = true;
    },
    signUpFinished: (state) => {
      state.adding = false;
      state.task = undefined;
    },
    loginRequested: (state, _: PayloadAction<LoginParams>) => {
      state.adding = true;
    },
    loginFinished: (state) => {
      state.adding = false;
      state.task = undefined;
      state.is_login = true;
    },
  },
});

export const {
  signUpRequested,
  signUpFinished,
  loginRequested,
  loginFinished,
} = UserSlice.actions;
export default UserSlice.reducer;
