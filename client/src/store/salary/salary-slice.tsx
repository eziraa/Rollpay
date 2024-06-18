/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { BillEmpState } from "../../typo/salary/states";
import { Employee, SalaryEmpResponse } from "../../typo/salary/response";

const InitialState: BillEmpState = {
  response: {
    employees: [],
    error: "",
    code: 0,
    success: "",
  },
  loading: false,
};

const SalarySlice = createSlice({
  name: "salary",
  initialState: InitialState,
  reducers: {
    getSalariesRequested: (state) => {
      state.loading = true;
    },
    getSalariesDone: (state, action: PayloadAction<SalaryEmpResponse>) => {
      state.loading = false;
      state.response = action.payload;
    },
    unfinishedList: (state) => {
      state.loading = false;
    },
  },
});
export const { unfinishedList, getSalariesRequested, getSalariesDone } =
  SalarySlice.actions;

export default SalarySlice.reducer;
