/* eslint-disable react-refresh/only-export-components */
import { createSlice } from "@reduxjs/toolkit";
import { UserState } from "../../typo/user/states";

const InitialEmpState: UserState = {
  adding: false,
  user: undefined,
  task: undefined,
  loading: false,
};
const UserSlice = createSlice({
  name: "employee",
  initialState: InitialEmpState,
  reducers: {},
});

export default UserSlice.reducer;
