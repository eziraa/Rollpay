/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { EmployeeState } from "../../typo/employee/states";
import {
  AddAllowanceToEmployeesParams,
  AddDeductionToEmployeesParams,
  AddEmpParams,
  AddSalaryParams,
  UpdateProfileParams,
} from "../../typo/employee/params";
import { EditEmployeeParams } from "../../services/employee-api";
import { Employee, PaginatedEmpResponse } from "../../typo/employee/response";

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
  task_finished: true,
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
        type: state.pagination?.type,
      };
    },
    addEmpDone: (state) => {
      state.adding = false;
      state.adding_emp_error = undefined;
    },
    unfinishedAdd: (state, action: PayloadAction<string | undefined>) => {
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
      state.loading = false;
      state.pagination = {
        ...payload.payload.pagination,
        page_size: state.pagination?.page_size ?? 10,
        type: "employee",
        number_of_pages: payload.payload.pagination.number_of_pages,
      };
    },
    unfinishedList: (state) => {
      state.loading = false;
      state.adding = false;
      state.employees = [];
    },
    loadNextEmployeeListPage: (state, _: PayloadAction<string>) => {
      state.loading = true;
      if (state.pagination?.current_page) state.pagination.current_page++;
      else if (state.pagination) state.pagination.current_page = 1;
    },
    loadPrevEmployeeListPage: (state, _: PayloadAction<string>) => {
      state.loading = true;
      if (state.pagination?.current_page) state.pagination.current_page--;
      else if (state.pagination) state.pagination.current_page = 1;
    },
    searching: (state, payload: PayloadAction<Employee[]>) => {
      state.query_set = payload.payload;
      state.searching = true;
    },
    noSearchResult: (state) => {
      state.searching = false;
    },
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
    unfinishedEdit: (state) => {
      state.editing = false;
    },
    resetCurrEmployee: (state) => {
      state.curr_emp = undefined;
      state.editing = false;
    },
    addEmpAllowanceRequested: (
      state,
      _: PayloadAction<AddAllowanceToEmployeesParams>
    ) => {
      state.task_finished = false;
      state.editing = true;
    },
    finishAddAllowanceDone: (state) => {
      state.task_finished = true;
      state.editing = false;
      state.adding_emp_error = undefined;
    },
    addEmpDeductionRequested: (
      state,
      _: PayloadAction<AddDeductionToEmployeesParams>
    ) => {
      state.task_finished = false;
      state.editing = true;
    },
    addingDone: (state) => {
      state.task_finished = true;
      state.editing = false;
      state.adding_emp_error = undefined;
    },
    updateProfileRequest: (state, _: PayloadAction<UpdateProfileParams>) => {
      state.editing = true;
    },
    updateProfileDone: (state, action: PayloadAction<string>) => {
      state.editing = false;
      if (state.curr_emp) state.curr_emp.profile_picture = action.payload;
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
  addEmpAllowanceRequested,
  finishAddAllowanceDone,
  addEmpDeductionRequested,
  addingDone,
  deleteEmpDone,
  unfinishedDelete,
  setCurrentEmployee,
  addSalaryRequested,
  addSalaryDone,
  editEmployeeRequested,
  editEmployeeDone,
  unfinishedEdit,
  resetCurrEmployee,
  searching,
  noSearchResult,
  loadNextEmployeeListPage,
  loadPrevEmployeeListPage,
  setPagesize,
  updateProfileDone,
  updateProfileRequest,
} = EmployeeSlice.actions;

export default EmployeeSlice.reducer;
