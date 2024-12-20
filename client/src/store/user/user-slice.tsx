/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UserState } from "../../typo/user/states";
import { LoginParams, SignUpParams } from "../../typo/user/params";
import { UserResponse } from "../../typo/user/response";

const InitialEmpState: UserState = {
  creating: false,
  user: undefined,
  task_finished: false,
  task_error: undefined,
  searching: false,
  is_login: false,
  logging_in: false,
  logging_out: false,
  login_error: undefined,
  signup_error: undefined,
  acc_created: false,
  adding: false,
  deleting: false,
  editing: false,
  loading: false,
};
const UserSlice = createSlice({
  name: "user",
  initialState: InitialEmpState,
  reducers: {
    signUpRequested: (state, _: PayloadAction<SignUpParams>) => {
      state.creating = true;
      state.signup_error = undefined;
      state.acc_created = false;
    },
    signUpFinished: (state) => {
      state.creating = false;
      state.signup_error = undefined;
      state.acc_created = true;
    },
    wrongSignup: (state, action: PayloadAction<string>) => {
      state.signup_error = action.payload;
      state.acc_created = false;
      state.creating = false;
    },
    wrongLogin: (state, action: PayloadAction<string>) => {
      state.login_error = action.payload;
      state.logging_in = false;
    },
    loginRequested: (state, _: PayloadAction<LoginParams>) => {
      state.logging_in = true;
      state.login_error = undefined;
    },
    loginFinished: (state, action: PayloadAction<UserResponse>) => {
      state.logging_in = false;
      state.is_login = true;
      state.login_error = undefined;
      state.user = action.payload;
    },
    logoutRequested: (state) => {
      state.logging_out = true;
      state.is_login = true;
    },
    logout: (state) => {
      state.is_login = false;
      state.creating = false;
      state.user = undefined;
      state.logging_in = false;
    },

    getCurrentUserRequest: (state) => {
      state.task_finished = false;
    },
    getCurrentUserDone: (state, action: PayloadAction<UserResponse>) => {
      state.task_finished = true;
      state.user = action.payload;
    },
    changeProfileImage: (state, action: PayloadAction<string>) => {
      if (state.user) state.user.profile_picture = action.payload;
    },
    reset: (state) => {
      state.acc_created = false;
      state.creating = false;
    },
  },
});

export const {
  signUpRequested,
  signUpFinished,
  loginRequested,
  loginFinished,
  logoutRequested,
  logout,
  wrongLogin,
  wrongSignup,
  getCurrentUserRequest,
  getCurrentUserDone,
  changeProfileImage,
  reset,
} = UserSlice.actions;
export default UserSlice.reducer;
