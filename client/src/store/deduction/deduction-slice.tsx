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
  deductions: [],
  loading: false,
  curr_deduction: undefined,
  editing: false,
  deleting: false,
  query_set: [],
  searching: false,
  pagination: undefined,
  adding_deduction_error: undefined,
};
const DeductionSlice = createSlice({
  name: "deduction",
  initialState: InitialEmpState,
  reducers: {
    addDeductionRequested: (state, _: PayloadAction<AddDeductionParams>) => {
      state.adding = true;
    },
    addDeductionDone: (state, action: PayloadAction<Deduction>) => {
      state.adding = false;
      state.adding_deduction_error = undefined;
      state.deductions.push(action.payload);
      state.curr_deduction = action.payload;
    },
    listDeductionDone: (
      state,
      payload: PayloadAction<PaginatedDeductionResponse>
    ) => {
      state.deductions = payload.payload.results;
      state.adding = false;
      state.loading = false;
      state.pagination = {
        ...payload.payload.pagination,
        page_size: state.pagination?.page_size ?? 10,
      };
    },
    listDeductionsRequested: (state) => {
      state.loading = true;
    },
    unfinishedList: (state) => {
      state.loading = false;
      state.adding = false;
      state.deductions = [];
    },
    unfinishedAdd: (state, action: PayloadAction<string>) => {
      state.adding = false;
      state.adding_deduction_error = action.payload;
    },

    tryingToDelete: (state) => {
      state.deleting = true;
    },
    deleteDeductionRequested: (__, _: PayloadAction<string>) => {},
    addSearched: (state, action: PayloadAction<Deduction[]>) => {
      state.query_set = action.payload;
    },
    deleteDeductionDone: (state, action: PayloadAction<Deduction>) => {
      state.deleting = false;
      state.deductions.splice(state.deductions.indexOf(action.payload), 1);
    },
    unfinishedDelete: (state) => {
      state.deleting = false;
    },
    editDeductionDone: (state, action: PayloadAction<Deduction>) => {
      state.editing = false;
      state.curr_deduction = action.payload;
    },
    resetCurrDeduction: (state) => {
      state.curr_deduction = undefined;
      state.editing = false;
    },
    unfinishedEdit: (state) => {
      state.editing = false;
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
      state.editing = true;
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

    loadNextPageRequested: (state, _: PayloadAction<string>) => {
      state.loading = true;
      if (state.pagination?.current_page) state.pagination.current_page++;
      else if (state.pagination) state.pagination.current_page = 1;
    },
    loadPrevPageRequested: (state, _: PayloadAction<string>) => {
      state.loading = true;
      if (state.pagination?.current_page) state.pagination.current_page--;
      else if (state.pagination) state.pagination.current_page = 1;
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
  unfinishedDelete,
  setCurrentDeduction,
  addDeductionRequested,
  addDeductionDone,
  editDeductionRequested,
  editDeductionDone,
  unfinishedEdit,
  resetCurrDeduction,
  searching,
  noSearchResult,
  loadNextPageRequested,
  loadPrevPageRequested,
  setPagesize,
} = DeductionSlice.actions;

export default DeductionSlice.reducer;
