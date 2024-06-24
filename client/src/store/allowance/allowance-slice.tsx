/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AllowanceState } from "../../typo/allowance/states";
import { Allowance } from "../../typo/allowance/response";
import {
  AddAllowanceParams,
  EditAllowanceParams,
} from "../../typo/allowance/params";
import { PaginatedAllowanceResponse } from "../../services/allowance-api";

const InitialEmpState: AllowanceState = {
  adding: false,
  allowances: [],
  loading: false,
  curr_allowance: undefined,
  editing: false,
  deleting: false,
  query_set: [],
  searching: false,
  pagination: undefined,
  adding_allowance_error: undefined,
};
const AllowanceSlice = createSlice({
  name: "allowance",
  initialState: InitialEmpState,
  reducers: {
    addAllowanceRequested: (state, _: PayloadAction<AddAllowanceParams>) => {
      state.adding = true;
    },
    addAllowanceDone: (state, action: PayloadAction<Allowance>) => {
      state.adding = false;
      state.adding_allowance_error = undefined;
      state.allowances.push(action.payload);
      state.curr_allowance = action.payload;
    },
    listAllowanceDone: (
      state,
      payload: PayloadAction<PaginatedAllowanceResponse>
    ) => {
      state.allowances = payload.payload.results;
      state.adding = false;
      state.loading = false;
      state.pagination = {
        ...payload.payload.pagination,
        page_size: state.pagination?.page_size ?? 10,
      };
    },
    listAllowancesRequested: (state) => {
      state.loading = true;
    },
    unfinishedList: (state) => {
      state.loading = false;
      state.adding = false;
      state.allowances = [];
    },
    