/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { OvertimeState } from "../../typo/overtime/states";
import {
  Overtime,
  PaginatedOvertimeResponse,
} from "../../typo/overtime/response";
import {
  AddOvertimeParams,
  EditOvertimeParams,
} from "../../typo/overtime/params";

const InitialEmpState: OvertimeState = {
  overtimes: [],
  curr_overtime: undefined,
  query_set: [],
  searching: false,
  pagination: undefined,
  task_error: undefined,
  task_finished: true,
  adding: false,
  deleting: false,
  editing: false,
  loading: false,
};
const OvertimeSlice = createSlice({
  name: "overtime",
  initialState: InitialEmpState,
  reducers: {
    addOvertimeRequested: (state, _: PayloadAction<AddOvertimeParams>) => {
      state.task_finished = false;
      state.adding = true;
    },
    getOvertimeRequested: (state, _: PayloadAction<string>) => {
      state.loading = true;
    },
    getOvertimeDone: (state, action: PayloadAction<Overtime>) => {
      state.curr_overtime = action.payload;
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

    addOvertimeDone: (state, action: PayloadAction<Overtime>) => {
      state.task_finished = true;
      state.task_error = undefined;
      state.overtimes.push(action.payload);
      state.curr_overtime = action.payload;
      state.adding = false;
    },

    listOvertimesRequested: (state) => {
      state.task_finished = false;
      state.loading = true;
    },
    tryingToDelete: (state) => {
      state.task_finished = false;
    },
    deleteOvertimeRequested: (state, _: PayloadAction<string>) => {
      state.deleting = true;
    },
    deleteOvertimeDone: (state, action: PayloadAction<Overtime>) => {
      state.task_finished = true;
      state.overtimes = state.overtimes.filter(
        (overtime) => overtime.overtime_type !== action.payload.overtime_type
      );
      state.deleting = false;
    },

    listOvertimeDone: (
      state,
      payload: PayloadAction<PaginatedOvertimeResponse>
    ) => {
      state.overtimes = payload.payload.results;
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

    editOvertimeRequested: (state, _: PayloadAction<EditOvertimeParams>) => {
      state.task_finished = false;
      state.editing = true;
    },
    editOvertimeDone: (state, action: PayloadAction<Overtime>) => {
      state.task_finished = true;
      state.overtimes = state.overtimes.map((overtime) =>
        overtime.id === action.payload.id ? action.payload : overtime
      );
      state.editing = false;
    },
    closeOvertimeTask: (state) => {
      state.task_finished = true;
      state.task_error = undefined;
    },
    resetOvertimeState: (state, action: PayloadAction<OvertimeState>) => {
      state = {
        ...state,
        ...action.payload,
      };
    },
    taskUnfinished: (state, action: PayloadAction<string>) => {
      state.task_error = action.payload;
    },
  },
});
export const {
  listOvertimesRequested,
  listOvertimeDone,
  tryingToDelete,
  deleteOvertimeRequested,
  deleteOvertimeDone,
  addOvertimeRequested,
  addOvertimeDone,
  editOvertimeRequested,
  editOvertimeDone,
  loadNextPageRequested,
  loadPrevPageRequested,
  setPagesize,
  closeOvertimeTask,
  resetOvertimeState,
  getOvertimeDone,
  getOvertimeRequested,
  taskUnfinished,
} = OvertimeSlice.actions;

export default OvertimeSlice.reducer;
