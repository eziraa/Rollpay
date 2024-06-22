/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { BillEmpState } from "../../typo/salary/states";
import { Employee, SalaryEmpResponse } from "../../typo/salary/response";
import { SearchParams } from "../../typo/salary/params";

const InitialState: BillEmpState = {
  response: {
    employees: [],
    error: "",
    code: 0,
    success: "",
  },
  loading: false,
  searching: false,
  search_response: [],
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
      state.searching = false;
    },
    searchEmployeeRequested: (_, __: PayloadAction<SearchParams>) => {},
    setSearchResult: (state, action: PayloadAction<Employee[]>) => {
      state.searching = true;
      state.search_response = action.payload;
    },

    noSearchResult: (state) => {
      state.searching = false;
      state.loading = false;
    },
    unfinishedList: (state) => {
      state.loading = false;
    },
  },
});
export const {
  unfinishedList,
  getSalariesRequested,
  getSalariesDone,
  setSearchResult,
  noSearchResult,
  searchEmployeeRequested,
} = SalarySlice.actions;

export default SalarySlice.reducer;
