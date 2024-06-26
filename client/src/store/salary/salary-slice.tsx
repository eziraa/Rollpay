/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { PaymentState } from "../../typo/salary/states";
import {
  CurrentEmpPaymentsResponse,
  PaginatedPaymentResponse,
} from "../../typo/salary/response";
import { SearchParams } from "../../typo/salary/params";
import { PaymentEmployee } from "../../typo/payment/response";

const InitialState: PaymentState = {
  employees: [],
  curr_emp: undefined,
  loading: false,
  searching: false,
  search_response: [],
  pagination: undefined,
};

const SalarySlice = createSlice({
  name: "salary",
  initialState: InitialState,
  reducers: {
    getSalariesRequested: (state) => {
      state.loading = true;
    },
    getSalariesDone: (
      state,
      action: PayloadAction<PaginatedPaymentResponse>
    ) => {
      state.loading = false;
      state.employees = action.payload.results;
      state.searching = false;
      state.pagination = {
        ...action.payload.pagination,
        page_size: state.pagination?.page_size ?? 10,
        type: "salary",
      };
    },
    getCurrEmpPaymentInfo: (state, _: PayloadAction<string>) => {
      state.loading = true;
    },
    currentEmpPaymentInfoDone: (
      state,
      action: PayloadAction<CurrentEmpPaymentsResponse>
    ) => {
      state.loading = false;
      state.curr_emp = action.payload;
    },
    searchPaymentRequested: (_, __: PayloadAction<SearchParams>) => {},
    setSearchResult: (state, action: PayloadAction<PaymentEmployee[]>) => {
      state.searching = true;
      state.search_response = action.payload;
    },
    loadNextPaymentListPage: (state, _: PayloadAction<string>) => {
      state.loading = true;
      if (state.pagination?.current_page) state.pagination.current_page++;
      else if (state.pagination) state.pagination.current_page = 1;
    },
    loadPrevPaymentListPage: (state, _: PayloadAction<string>) => {
      state.loading = true;
      if (state.pagination?.current_page) state.pagination.current_page--;
      else if (state.pagination) state.pagination.current_page = 1;
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
  getCurrEmpPaymentInfo,
  currentEmpPaymentInfoDone,
  getSalariesDone,
  setSearchResult,
  noSearchResult,
  searchPaymentRequested,
  loadNextPaymentListPage,
  loadPrevPaymentListPage,
} = SalarySlice.actions;

export default SalarySlice.reducer;
