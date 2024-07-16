/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { PaymentState } from "../../typo/salary/states";
import {
  CurrentEmpPaymentsResponse,
  PaginatedPaymentResponse,
} from "../../typo/salary/response";
import { GetAssetParams, SearchParams } from "../../typo/salary/params";
import { PaymentEmployee } from "../../typo/payment/response";

const InitialState: PaymentState = {
  adding: false,
  deleting: false,
  loading: false,
  editing: false,
  employees: [],
  curr_emp: undefined,
  task_finished: true,
  task_error: undefined,
  searching: false,
  search_response: [],
  pagination: undefined,
};

const SalarySlice = createSlice({
  name: "salary",
  initialState: InitialState,
  reducers: {
    getSalariesRequested: (state) => {
      state.task_finished = false;
      state.loading = true;
    },
    getSalariesDone: (
      state,
      action: PayloadAction<PaginatedPaymentResponse>
    ) => {
      state.task_finished = true;
      state.loading = false;
      state.employees = action.payload.results;
      state.searching = false;
      state.pagination = {
        ...action.payload.pagination,
        page_size: state.pagination?.page_size ?? 10,
        type: "salary",
      };
    },
    getSalaryAssetsRequest: (state, _: PayloadAction<GetAssetParams>) => {
      state.loading = true;
    },
    getCurrEmpPaymentInfo: (state, _: PayloadAction<string>) => {
      state.task_finished = false;
    },
    currentEmpPaymentInfoDone: (
      state,
      action: PayloadAction<CurrentEmpPaymentsResponse>
    ) => {
      state.task_finished = true;
      state.curr_emp = action.payload;
    },
    searchPaymentRequested: (_, __: PayloadAction<SearchParams>) => {},
    setSearchResult: (state, action: PayloadAction<PaymentEmployee[]>) => {
      state.searching = true;
      state.search_response = action.payload;
    },
    loadNextPaymentListPage: (state, _: PayloadAction<string>) => {
      state.task_finished = false;
      if (state.pagination?.current_page) state.pagination.current_page++;
      else if (state.pagination) state.pagination.current_page = 1;
    },
    loadPrevPaymentListPage: (state, _: PayloadAction<string>) => {
      state.task_finished = false;
      if (state.pagination?.current_page) state.pagination.current_page--;
      else if (state.pagination) state.pagination.current_page = 1;
    },

    noSearchResult: (state) => {
      state.searching = false;
      state.task_finished = true;
    },
    unfinishedList: (state) => {
      state.task_finished = true;
    },
    setProfilePicture: (state, action: PayloadAction<string>) => {
      if (state.curr_emp)
        state.curr_emp.employee.profile_picture = action.payload;
    },
    raiseError: (state, action: PayloadAction<string>) => {
      state.task_error = action.payload;
    },
    raiseSalaryRequest: (state, _: PayloadAction<number>) => {
      state.adding = true;
    },
    raiseSalaryDone: (state, action: PayloadAction<PaymentEmployee[]>) => {
      state.task_finished = true;
      state.loading = false;
      state.adding = false;
      state.employees = action.payload;
    },
    resetSalaryState: (state, action: PayloadAction<PaymentState>) => {
      state = {
        ...action.payload,
      }

    }
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
  setProfilePicture,
  raiseSalaryRequest,
  raiseSalaryDone,
  raiseError,
  resetSalaryState,
} = SalarySlice.actions;

export default SalarySlice.reducer;
