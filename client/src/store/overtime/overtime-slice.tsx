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
  adding: false,
  overtimes: [],
  loading: false,
  curr_overtime: undefined,
  editing: false,
  deleting: false,
  query_set: [],
  searching: false,
  pagination: undefined,
  adding_overtime_error: undefined,
};
const OvertimeSlice = createSlice({
  name: "overtime",
  initialState: InitialEmpState,
  reducers: {
    addOvertimeRequested: (state, _: PayloadAction<AddOvertimeParams>) => {
      state.adding = true;
    },
    addOvertimeDone: (state, action: PayloadAction<Overtime>) => {
      state.adding = false;
      state.adding_overtime_error = undefined;
      state.overtimes.push(action.payload);
      state.curr_overtime = action.payload;
    },
    unfinishedAdd: (state, action: PayloadAction<string>) => {
      state.adding = false;
      state.adding_overtime_error = action.payload;
    },
    listOvertimeDone: (
      state,
      payload: PayloadAction<PaginatedOvertimeResponse>
    ) => {
      state.overtimes = payload.payload.results;
      state.adding = false;
      state.loading = false;
      state.pagination = {
        ...payload.payload.pagination,
        page_size: state.pagination?.page_size ?? 10,
      };
    },

    listOvertimesRequested: (state) => {
      state.loading = true;
    },
    unfinishedList: (state) => {
      state.loading = false;
      state.adding = false;
      state.overtimes = [];
    },
