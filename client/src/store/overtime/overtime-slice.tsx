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
};
const EmployeeSlice = createSlice({
  name: "overtime",
  initialState: InitialEmpState,
  reducers: {
    addOvertimeRequested: (state, _: PayloadAction<AddOvertimeParams>) => {
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

    addOvertimeDone: (state, action: PayloadAction<Overtime>) => {
      state.task_finished = true;
      state.task_error = undefined;
      state.overtimes.push(action.payload);
      state.curr_overtime = action.payload;
    },
    unfinishedAdd: (state, action: PayloadAction<string>) => {
      state.task_error = action.payload;
    },
    listOvertimesRequested: (state) => {
      state.task_finished = false;
    },
    tryingToDelete: (state) => {
      state.task_finished = false;
    },
    deleteOvertimeRequested: (__, _: PayloadAction<string>) => {},
    addSearched: (state, action: PayloadAction<Overtime[]>) => {
      state.query_set = action.payload;
    },
    deleteOvertimeDone: (state, action: PayloadAction<Overtime>) => {
      state.task_finished = true;
      state.overtimes.splice(state.overtimes.indexOf(action.payload), 1);
    },

    listOvertimeDone: (
      state,
      payload: PayloadAction<PaginatedOvertimeResponse>
    ) => {
      state.overtimes = payload.payload.results;
      state.task_finished = true;
      state.pagination = {
        ...payload.payload.pagination,
        page_size: state.pagination?.page_size ?? 10,
      };
    },
    unfinishedList: (state) => {
      state.task_finished = true;
      state.overtimes = [];
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
    searching: (state, payload: PayloadAction<Overtime[]>) => {
      state.query_set = payload.payload;
      state.searching = true;
    },
    noSearchResult: (state) => {
      state.searching = false;
    },
    setCurrentOvertime: (
      state,
      payload: PayloadAction<Overtime | undefined>
    ) => {
      state.curr_overtime = payload.payload;
    },
    editOvertimeRequested: (state, _: PayloadAction<EditOvertimeParams>) => {
      state.task_finished = false;
    },
    editOvertimeDone: (state, action: PayloadAction<Overtime>) => {
      state.task_finished = true;
      state.curr_overtime = action.payload;
    },
    resetCurrEmployee: (state) => {
      state.curr_overtime = undefined;
      state.task_finished = true;
    },

    closeOvertimeTask: (state) => {
      state.task_finished = true;
      state.task_error = undefined;
    },
    resetOvertimeState: (state, action: PayloadAction<OvertimeState>) => {
      state = {
        ...action.payload,
      };
    },
  },
});
export const {
  listOvertimesRequested,
  unfinishedAdd,
  listOvertimeDone,
  unfinishedList,
  tryingToDelete,
  deleteOvertimeRequested,
  deleteOvertimeDone,
  setCurrentOvertime,
  addOvertimeRequested,
  addOvertimeDone,
  editOvertimeRequested,
  editOvertimeDone,
  resetCurrEmployee,
  searching,
  noSearchResult,
  loadNextPageRequested,
  loadPrevPageRequested,
  setPagesize,
  closeOvertimeTask,
  resetOvertimeState,
} = EmployeeSlice.actions;

export default EmployeeSlice.reducer;
