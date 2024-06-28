/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AllowanceState } from "../../typo/allowance/states";
import {
  Allowance,
  PaginatedAllowanceResponse,
} from "../../typo/allowance/response";
import {
  AddAllowanceParams,
  EditAllowanceParams,
} from "../../typo/allowance/params";

const InitialEmpState: AllowanceState = {
  allowances: [],
  curr_allowance: undefined,
  query_set: [],
  searching: false,
  pagination: undefined,
  adding_allowance_error: undefined,
  task_finished: true,
};
const EmployeeSlice = createSlice({
  name: "allowance",
  initialState: InitialEmpState,
  reducers: {
    addAllowanceRequested: (state, _: PayloadAction<AddAllowanceParams>) => {
      state.task_finished = false;
    },
    setPagesize: (state, size: PayloadAction<number>) => {
      let page = 1;
      let number_of_pages = 1;
      if (state.pagination) {
        page = state.pagination?.current_page / state.pagination?.page_size;
        page = page * size.payload;
        page = Math.ceil(page);
        number_of_pages = Math.ceil(
          state.pagination.count / state.pagination.page_size
        );
      }

      state.pagination = {
        page_size: size.payload,
        next: state.pagination?.next,
        previous: state.pagination?.previous,
        count: state.pagination?.count ?? 0,
        current_page: 1,
        number_of_pages,
      };
    },

    addAllowanceDone: (state, action: PayloadAction<Allowance>) => {
      state.task_finished = true;
      state.adding_allowance_error = undefined;
      state.allowances.push(action.payload);
      state.curr_allowance = action.payload;
    },
    unfinishedAdd: (state, action: PayloadAction<string>) => {
      state.task_finished = true;
      state.adding_allowance_error = action.payload;
    },
    listAllowancesRequested: (state) => {
      state.task_finished = false;
    },
    tryingToDelete: (state) => {
      state.task_finished = false;
    },
    deleteAllowanceRequested: (__, _: PayloadAction<string>) => {},
    addSearched: (state, action: PayloadAction<Allowance[]>) => {
      state.query_set = action.payload;
    },
    deleteAllowanceDone: (state, action: PayloadAction<Allowance>) => {
      state.task_finished = true;
      state.allowances.splice(state.allowances.indexOf(action.payload), 1);
    },
    unfinishedDelete: (_) => {
      // state.task_finished = true;
    },
    listAllowanceDone: (
      state,
      payload: PayloadAction<PaginatedAllowanceResponse>
    ) => {
      state.allowances = payload.payload.results;
      state.task_finished = true;
      state.task_finished = true;
      state.pagination = {
        ...payload.payload.pagination,
        page_size: state.pagination?.page_size ?? 10,
      };
    },
    unfinishedList: (state) => {
      state.task_finished = true;
      state.task_finished = true;
      state.allowances = [];
    },
    loadNextPageRequested: (state, _: PayloadAction<string>) => {
      state.task_finished = false;
      if (state.pagination?.current_page) state.pagination.current_page++;
      else if (state.pagination) state.pagination.current_page = 1;
    },
    loadPrevPageRequested: (state, _: PayloadAction<string>) => {
      state.task_finished = false;
      if (state.pagination?.current_page) state.pagination.current_page--;
      else if (state.pagination) state.pagination.current_page = 1;
    },
    searching: (state, payload: PayloadAction<Allowance[]>) => {
      state.query_set = payload.payload;
      state.searching = true;
    },
    noSearchResult: (state) => {
      state.searching = false;
    },
    setCurrentAllowance: (
      state,
      payload: PayloadAction<Allowance | undefined>
    ) => {
      state.curr_allowance = payload.payload;
    },
    editAllowanceRequested: (state, _: PayloadAction<EditAllowanceParams>) => {
      state.task_finished = false;
    },
    editAllowanceDone: (state, action: PayloadAction<Allowance>) => {
      state.task_finished = true;
      state.curr_allowance = action.payload;
    },
    resetCurrEmployee: (state) => {
      state.curr_allowance = undefined;
      state.task_finished = true;
    },
    unfinishedEdit: (_) => {
      // state.task_finished = true
    },
  },
});
export const {
  listAllowancesRequested,
  unfinishedAdd,
  listAllowanceDone,
  unfinishedList,
  tryingToDelete,
  deleteAllowanceRequested,
  deleteAllowanceDone,
  unfinishedDelete,
  setCurrentAllowance,
  addAllowanceRequested,
  addAllowanceDone,
  editAllowanceRequested,
  editAllowanceDone,
  unfinishedEdit,
  resetCurrEmployee,
  searching,
  noSearchResult,
  loadNextPageRequested,
  loadPrevPageRequested,
  setPagesize,
} = EmployeeSlice.actions;

export default EmployeeSlice.reducer;
