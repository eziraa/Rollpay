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
  logining: false,
  logouting: false,
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
    wrongSignUp: (state) => {
      state.adding = false;
      state.is_login = false;
    },
    loginRequested: (state, _: PayloadAction<LoginParams>) => {
      state.logining = true;
    },
    loginFinished: (state) => {
      state.logining = false;
      state.task = undefined;
      state.is_login = true;
    },
    wrongLogin: (state) => {
      state.logining = false;
      state.is_login = false;
    },
    logoutRequested: (state) => {
      state.logouting = true;
      state.is_login = true;
    },
    logout: (state) => {
      state.is_login = false;
      state.adding = false;
      state.user = undefined;
      state.task = undefined;
      state.logining = false;
    },
  },
});

export const {
  signUpRequested,
  signUpFinished,
  loginRequested,
  loginFinished,
  wrongSignUp,
  wrongLogin,
  logoutRequested,
  logout,
} = UserSlice.actions;
export default UserSlice.reducer;
