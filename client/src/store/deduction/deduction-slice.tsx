/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { DeductionState } from "../../typo/deduction/states";
import {
  Deduction,
  PaginatedDeductionResponse,
} from "../../typo/deduction/response";
import {
  AddDeductionParams,
  EditDeductionParams,
} from "../../typo/deduction/params";

const InitialEmpState: DeductionState = {
  adding: false,
  deleting: false,
  editing: false,
  loading: false,
  deductions: [],
  curr_deduction: undefined,
  query_set: [],
  searching: false,
  pagination: undefined,
  task_error: undefined,
  task_finished: true,
};
const DeductionSlice = createSlice({
  name: "deduction",
  initialState: InitialEmpState,
  reducers: {
    addDeductionRequested: (state, _: PayloadAction<AddDeductionParams>) => {
      state.task_finished = false;
    },
    getDeductionRequested: (__, _: PayloadAction<string>) => {},
    getDeductionDone: (state, action: PayloadAction<Deduction>) => {
      state.curr_deduction = action.payload;
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

    addDeductionDone: (state, action: PayloadAction<Deduction>) => {
      state.task_finished = true;
      state.task_error = undefined;
      state.deductions.push(action.payload);
      state.curr_deduction = action.payload;
    },
    unfinishedAdd: (state, action: PayloadAction<string>) => {
      state.task_error = action.payload;
    },
    listDeductionsRequested: (state) => {
      state.task_finished = false;
    },
    tryingToDelete: (state) => {
      state.task_finished = false;
    },
    deleteDeductionRequested: (__, _: PayloadAction<string>) => {},
    addSearched: (state, action: PayloadAction<Deduction[]>) => {
      state.query_set = action.payload;
    },
    deleteDeductionDone: (state, action: PayloadAction<Deduction>) => {
      state.task_finished = true;
      state.deductions.splice(state.deductions.indexOf(action.payload), 1);
    },
    closeDeductionRequested: (__, _: PayloadAction<string>) => {},
    closeDeductionDone: (state, action: PayloadAction<Deduction>) => {
      state.task_finished = true;
      state.task_error = "";
      state.deductions = state.deductions.map((deduction) =>
        deduction.id === action.payload.id ? action.payload : deduction
      );
    },
    openDeductionRequested: (__, _: PayloadAction<string>) => {},
    openDeductionDone: (state, action: PayloadAction<Deduction>) => {
      state.task_finished = true;
      state.task_error = "";
      state.deductions = state.deductions.map((deduction) =>
        deduction.id === action.payload.id ? action.payload : deduction
      );
    },
    taskUnfinished: (state, action: PayloadAction<string>) => {
      state.task_error = action.payload;
    },
    listDeductionDone: (
      state,
      payload: PayloadAction<PaginatedDeductionResponse>
    ) => {
      state.deductions = payload.payload.results;
      state.task_finished = true;
      state.task_finished = true;
      state.pagination = {
        ...payload.payload.pagination,
        page_size: state.pagination?.page_size ?? 10,
      };
    },
    unfinishedList: (state) => {
      state.deductions = [];
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
    searching: (state, payload: PayloadAction<Deduction[]>) => {
      state.query_set = payload.payload;
      state.searching = true;
    },
    noSearchResult: (state) => {
      state.searching = false;
    },
    setCurrentDeduction: (
      state,
      payload: PayloadAction<Deduction | undefined>
    ) => {
      state.curr_deduction = payload.payload;
    },
    editDeductionRequested: (state, _: PayloadAction<EditDeductionParams>) => {
      state.task_finished = false;
    },
    editDeductionDone: (state, action: PayloadAction<Deduction>) => {
      state.task_finished = true;
      state.deductions = state.deductions.map((deduction) =>
        deduction.id === action.payload.id ? action.payload : deduction
      );
    },
    resetCurrEmployee: (state) => {
      state.curr_deduction = undefined;
      state.task_finished = true;
    },
    closeDeductionTask: (state) => {
      state.task_finished = true;
      state.task_error = undefined;
    },
    resetDeductionState: (state, action: PayloadAction<DeductionState>) => {
      state = { ...action.payload };
    },
  },
});
export const {
  listDeductionsRequested,
  unfinishedAdd,
  listDeductionDone,
  unfinishedList,
  tryingToDelete,
  deleteDeductionRequested,
  deleteDeductionDone,
  setCurrentDeduction,
  addDeductionRequested,
  addDeductionDone,
  editDeductionRequested,
  editDeductionDone,
  resetCurrEmployee,
  searching,
  noSearchResult,
  loadNextPageRequested,
  loadPrevPageRequested,
  setPagesize,
  closeDeductionTask,
  resetDeductionState,
  getDeductionDone,
  getDeductionRequested,
  closeDeductionDone,
  closeDeductionRequested,
  openDeductionDone,
  openDeductionRequested,
  taskUnfinished,
} = DeductionSlice.actions;

export default DeductionSlice.reducer;
