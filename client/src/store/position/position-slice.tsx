/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { PositionState } from "../../typo/position/states";
import { AddPositionParams } from "../../typo/employee/params";
import { Position } from "../../typo/position/response";
import { PaginatedPositionResponse } from "../../services/position-api";
import { EditPositionParams } from "../../typo/position/params";

const InitialEmpState: PositionState = {
  positions: [],
  curr_position: undefined,
  query_set: [],
  searching: false,
  pagination: undefined,
  task_error: undefined,
  task_finished: true,
};
const EmployeeSlice = createSlice({
  name: "position",
  initialState: InitialEmpState,
  reducers: {
    addPositionRequested: (state, _: PayloadAction<AddPositionParams>) => {
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

    addPositionDone: (state, action: PayloadAction<Position>) => {
      state.task_finished = true;
      state.task_error = undefined;
      state.positions.push(action.payload);
      state.curr_position = action.payload;
    },
    unfinishedAdd: (state, action: PayloadAction<string>) => {
      state.task_finished = true;
      state.task_error = action.payload;
    },
    listPositionsRequested: (state) => {
      state.task_finished = false;
    },
    tryingToDelete: (state) => {
      state.task_finished = false;
    },
    deletePositionRequested: (__, _: PayloadAction<string>) => {},
    addSearched: (state, action: PayloadAction<Position[]>) => {
      state.query_set = action.payload;
    },
    deletePositionDone: (state, action: PayloadAction<Position>) => {
      state.task_finished = true;
      state.positions.splice(state.positions.indexOf(action.payload), 1);
    },
    unfinishedDelete: (_) => {
      // state.task_finished = true;
    },
    listPositionDone: (
      state,
      payload: PayloadAction<PaginatedPositionResponse>
    ) => {
      state.positions = payload.payload.results;
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
      state.positions = [];
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
    searching: (state, payload: PayloadAction<Position[]>) => {
      state.query_set = payload.payload;
      state.searching = true;
    },
    noSearchResult: (state) => {
      state.searching = false;
    },
    setCurrentPosition: (
      state,
      payload: PayloadAction<Position | undefined>
    ) => {
      state.curr_position = payload.payload;
    },
    editPositionRequested: (state, _: PayloadAction<EditPositionParams>) => {
      state.task_finished = false;
    },
    editPositionDone: (state, action: PayloadAction<Position>) => {
      state.task_finished = true;
      state.curr_position = action.payload;
    },
    resetCurrEmployee: (state) => {
      state.curr_position = undefined;
      state.task_finished = true;
    },
    unfinishedEdit: (_) => {
      // state.task_finished = true
    },
    closePositionTask: (state) => {
      state.task_finished = true;
      state.task_error = undefined;
    },
  },
});
export const {
  listPositionsRequested,
  unfinishedAdd,
  listPositionDone,
  unfinishedList,
  tryingToDelete,
  deletePositionRequested,
  deletePositionDone,
  unfinishedDelete,
  setCurrentPosition,
  addPositionRequested,
  addPositionDone,
  editPositionRequested,
  editPositionDone,
  unfinishedEdit,
  resetCurrEmployee,
  searching,
  noSearchResult,
  loadNextPageRequested,
  loadPrevPageRequested,
  setPagesize,
  closePositionTask,
} = EmployeeSlice.actions;

export default EmployeeSlice.reducer;
