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
  adding: false,
  deleting: false,
  editing: false,
  loading: false,
  allowances: [],
  curr_allowance: undefined,
  query_set: [],
  searching: false,
  pagination: undefined,
  task_error: undefined,
  task_finished: true,
};
const AllowanceSlice = createSlice({
  name: "allowance",
  initialState: InitialEmpState,
  reducers: {
    getAllowanceRequested: (state, _: PayloadAction<string>) => {
      state.loading = true;
    },
    getAllowanceDone: (state, action: PayloadAction<Allowance>) => {
      state.curr_allowance = action.payload;
      state.loading = false;
    },
    addAllowanceRequested: (state, _: PayloadAction<AddAllowanceParams>) => {
      state.task_finished = false;
      state.adding = true;
    },
    closeAllowanceTask: (state) => {
      state.task_finished = true;
      state.task_error = undefined;
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
      state.task_error = undefined;
      state.allowances.push(action.payload);
      state.curr_allowance = action.payload;
      state.adding = false;
    },

    listAllowancesRequested: (state) => {
      state.task_finished = false;
      state.task_error = undefined;
      state.loading = true;
    },
    tryingToDelete: (state) => {
      state.task_finished = false;
    },
    closeAllowanceRequested: (state, _: PayloadAction<string>) => {
      state.editing = true;
    },
    closeAllowanceDone: (state, action: PayloadAction<Allowance>) => {
      state.task_finished = true;
      state.editing = false;
      state.task_error = "";
      state.allowances = state.allowances.map((allowance) =>
        allowance.id === action.payload.id ? action.payload : allowance
      );
    },
    openAllowanceRequested: (state, _: PayloadAction<string>) => {
      state.editing = true;
    },
    openAllowanceDone: (state, action: PayloadAction<Allowance>) => {
      state.task_finished = true;
      state.task_error = "";
      state.editing = false;
      state.allowances = state.allowances.map((allowance) =>
        allowance.id === action.payload.id ? action.payload : allowance
      );
    },
    taskUnfinished: (state, action: PayloadAction<string>) => {
      state.task_error = action.payload;
    },
    deleteAllowanceRequested: (state, _: PayloadAction<string>) => {
      state.deleting = true;
    },
    deleteAllowanceDone: (state, action: PayloadAction<Allowance>) => {
      state.task_finished = true;
      state.deleting = false;
      state.allowances = state.allowances.filter(
        (allowance) =>
          allowance.allowance_type !== action.payload.allowance_type
      );
    },
    listAllowanceDone: (
      state,
      payload: PayloadAction<PaginatedAllowanceResponse>
    ) => {
      state.allowances = payload.payload.results;
      state.task_finished = true;
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
    editAllowanceRequested: (state, _: PayloadAction<EditAllowanceParams>) => {
      state.task_finished = false;
      state.editing = true;
    },
    editAllowanceDone: (state, action: PayloadAction<Allowance>) => {
      state.task_finished = true;
      state.editing = false;
      state.allowances = state.allowances.map((allowance) =>
        allowance.id === action.payload.id ? action.payload : allowance
      );
    },
    resetAllowanceState: (state, action: PayloadAction<AllowanceState>) => {
      state = { ...state, ...action.payload };
    },
  },
});
export const {
  listAllowancesRequested,
  listAllowanceDone,
  tryingToDelete,
  deleteAllowanceRequested,
  deleteAllowanceDone,
  addAllowanceRequested,
  addAllowanceDone,
  editAllowanceRequested,
  editAllowanceDone,
  loadNextPageRequested,
  loadPrevPageRequested,
  setPagesize,
  closeAllowanceTask,
  resetAllowanceState,
  getAllowanceRequested,
  getAllowanceDone,
  closeAllowanceRequested,
  closeAllowanceDone,
  openAllowanceDone,
  openAllowanceRequested,
  taskUnfinished,
} = AllowanceSlice.actions;

export default AllowanceSlice.reducer;
