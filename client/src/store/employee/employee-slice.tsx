/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { EmployeeState } from "../../typo/employee/states";
import { AddEmpParams, AddSalaryParams } from "../../typo/employee/params";
import {
  EditEmployeeParams,
  PaginatedEmpResponse,
} from "../../services/employee-api";
import { Employee } from "../../typo/employee/response";

const InitialEmpState: EmployeeState = {
  adding: false,
  employees: [],
  loading: false,
  curr_emp: undefined,
  editing: false,
  deleting: false,
  query_set: [],
  searching: false,
  pagination: undefined,
  adding_emp_error: undefined,
};
const EmployeeSlice = createSlice({
  name: "employee",
  initialState: InitialEmpState,
  reducers: {
    addEmpRequested: (state, _: PayloadAction<AddEmpParams>) => {
      state.adding = true;
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

    addEmpDone: (state) => {
      state.adding = false;
      state.adding_emp_error = undefined;
    },
    unfinishedAdd: (state, action: PayloadAction<string>) => {
      state.adding = false;
      state.adding_emp_error = action.payload;
    },
    listEmpRequested: (state) => {
      state.loading = true;
    },
    tryingToDelete: (state) => {
      state.deleting = true;
    },
    deleteEmpRequested: (__, _: PayloadAction<string>) => {},
    // searchRequested: (state, action: PayloadAction<string>) => {
    //   state.mini_task = action.payload;
    // },
    addSearched: (state, action: PayloadAction<Employee[]>) => {
      state.query_set = action.payload;
    },
    deleteEmpDone: (state, action: PayloadAction<Employee>) => {
      state.deleting = false;
      state.employees.splice(state.employees.indexOf(action.payload), 1);
    },
    unfinishedDelete: (state) => {
      state.deleting = false;
    },
    listEmpDone: (state, payload: PayloadAction<PaginatedEmpResponse>) => {
      state.employees = payload.payload.results;
      state.adding = false;
      // state.task = undefined;
      state.loading = false;

      state.pagination = {
        ...payload.payload.pagination,
        page_size: state.pagination?.page_size ?? 10,
      };
    },
    unfinishedList: (state) => {
      state.loading = false;
      // state.task = undefined;
      state.adding = false;
      state.employees = [];
    },
    loadNextPageRequested: (state, _: PayloadAction<string>) => {
      state.loading = true;
      if (state.pagination?.current_page) state.pagination.current_page++;
      else if (state.pagination) state.pagination.current_page = 1;
      // _.payload =
      //   _.payload.substring(0, _.payload.indexOf("?")) +
      //   `${
      //     state.pagination
      //       ? "?page=" +
      //         (state.pagination.current_page
      //           ? state.pagination.current_page + 1
      //           : 1) +
      //         "&page_size=" +
      //         state.pagination.page_size
      //       : "page_size=10"
      //   }`;
      // state.pagination?.current_page ? state.pagination.current_page++ : 1;
    },
    loadPrevPageRequested: (state, _: PayloadAction<string>) => {
      state.loading = true;
      if (state.pagination?.current_page) state.pagination.current_page--;
      else if (state.pagination) state.pagination.current_page = 1;
      // _.payload =
      //   _.payload.substring(0, _.payload.indexOf("?")) +
      //   `?${
      //     state.pagination?.previous
      //       ? "page=" +
      //         (state.pagination.current_page
      //           ? state.pagination.current_page - 1
      //           : 1) +
      //         "&page_size=" +
      //         state.pagination.page_size
      //       : "page_size =10"
      //   }`;
      // console.log(_);
    },
    searching: (state, payload: PayloadAction<Employee[]>) => {
      state.query_set = payload.payload;
      state.searching = true;
    },
    noSearchResult: (state) => {
      state.searching = false;
    },
    // setTask: (state, task: PayloadAction<string | undefined>) => {
    //   // state.task = task.payload;
    // },
    // setMajorTask: (state, task: PayloadAction<string | undefined>) => {
    //   state.major_task = task.payload;
    // },
    // setMiniTask: (state, task: PayloadAction<string | undefined>) => {
    //   state.mini_task = task.payload;
    // },
    setCurrentEmployee: (
      state,
      payload: PayloadAction<Employee | undefined>
    ) => {
      state.curr_emp = payload.payload;
    },
    addSalaryRequested: (state, _: PayloadAction<AddSalaryParams>) => {
      state.adding = true;
    },
    addSalaryDone: (state, action: PayloadAction<Employee>) => {
      state.adding = false;
      state.curr_emp = action.payload;
    },
    editEmployeeRequested: (state, _: PayloadAction<EditEmployeeParams>) => {
      state.editing = true;
    },
    editEmployeeDone: (state, action: PayloadAction<Employee>) => {
      state.editing = false;
      state.curr_emp = action.payload;
    },
    resetCurrEmployee: (state) => {
      state.curr_emp = undefined;
      state.editing = false;
      // state.major_task = undefined;
      // state.mini_task = undefined;
      // state.task = undefined;
    },
    unfinishedEdit: (state) => {
      state.editing = false;
    },
  },
});
export const {
  addEmpRequested,
  addEmpDone,
  unfinishedAdd,
  listEmpRequested,
  listEmpDone,
  unfinishedList,
  tryingToDelete,
  deleteEmpRequested,
  deleteEmpDone,
  unfinishedDelete,
  // setTask,
  setCurrentEmployee,
  addSalaryRequested,
  addSalaryDone,
  editEmployeeRequested,
  editEmployeeDone,
  unfinishedEdit,
  // setMajorTask,
  // setMiniTask,
  resetCurrEmployee,
  searching,
  noSearchResult,
  loadNextPageRequested,
  loadPrevPageRequested,
  setPagesize,
} = EmployeeSlice.actions;

export default EmployeeSlice.reducer;