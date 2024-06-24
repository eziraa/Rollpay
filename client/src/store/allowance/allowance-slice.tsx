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
    unfinishedAdd: (state, action: PayloadAction<string>) => {
      state.adding = false;
      state.adding_allowance_error = action.payload;
    },

    tryingToDelete: (state) => {
      state.deleting = true;
    },
    deleteAllowanceRequested: (__, _: PayloadAction<string>) => {},
    addSearched: (state, action: PayloadAction<Allowance[]>) => {
      state.query_set = action.payload;
    },
    deleteAllowanceDone: (state, action: PayloadAction<Allowance>) => {
      state.deleting = false;
      state.allowances.splice(state.allowances.indexOf(action.payload), 1);
    },
    unfinishedDelete: (state) => {
      state.deleting = false;
    },
    editAllowanceDone: (state, action: PayloadAction<Allowance>) => {
      state.editing = false;
      state.curr_allowance = action.payload;
    },
    resetCurrAllowance: (state) => {
      state.curr_allowance = undefined;
      state.editing = false;
    },
    unfinishedEdit: (state) => {
      state.editing = false;
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
