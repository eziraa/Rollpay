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
      state.adding = true;
    },
    getDeductionRequested: (state, _: PayloadAction<string>) => {
      state.loading = true;
    },
    getDeductionDone: (state, action: PayloadAction<Deduction>) => {
      state.curr_deduction = action.payload;
      state.loading = false;
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
      state.adding = false;
    },

    listDeductionsRequested: (state) => {
      state.task_finished = false;
      state.loading = true;
    },
    tryingToDelete: (state) => {
      state.task_finished = false;
    },
    deleteDeductionRequested: (state, _: PayloadAction<string>) => {
      state.deleting = true;
    },
    deleteDeductionDone: (state, action: PayloadAction<Deduction>) => {
      state.deleting = false;
      state.task_finished = true;
      state.deductions = state.deductions.filter(
        (deduction) =>
          deduction.deduction_type !== action.payload.deduction_type
      );
    },
    closeDeductionRequested: (state, _: PayloadAction<string>) => {
      state.editing = true;
    },
    closeDeductionDone: (state, action: PayloadAction<Deduction>) => {
      state.task_finished = true;
      state.editing = false;
      state.task_error = "";
      state.deductions = state.deductions.map((deduction) =>
        deduction.id === action.payload.id ? action.payload : deduction
      );
    },
    openDeductionRequested: (state, _: PayloadAction<string>) => {
      state.editing = true;
    },
    openDeductionDone: (state, action: PayloadAction<Deduction>) => {
      state.editing = false;
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
      state.loading = false;
      state.pagination = {
        ...payload.payload.pagination,
        page_size: state.pagination?.page_size ?? 10,
      };
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
    editDeductionRequested: (state, _: PayloadAction<EditDeductionParams>) => {
      state.task_finished = false;
      state.editing = true;
    },
    editDeductionDone: (state, action: PayloadAction<Deduction>) => {
      state.task_finished = true;
      state.editing = false;
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
  listDeductionDone,
  tryingToDelete,
  deleteDeductionRequested,
  deleteDeductionDone,
  addDeductionRequested,
  addDeductionDone,
  editDeductionRequested,
  editDeductionDone,
  resetCurrEmployee,
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
