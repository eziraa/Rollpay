/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UserState } from "../../typo/user/states";
import { SignUpParams } from "../../typo/user/params";
import { UserResponse } from "../../typo/user/response";

const InitialEmpState: UserState = {
  adding: false,
  user: undefined,
  task: undefined,
  loading: false,
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
  },
});

export const { signUpRequested, signUpFinished } = UserSlice.actions;
export default UserSlice.reducer;
