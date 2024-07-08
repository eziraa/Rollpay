/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { EmployeeState } from "../../typo/employee/states";
import {
  AddAllowanceToEmployeesParams,
  AddDeductionToEmployeesParams,
  AddEmpParams,
  UpdateEmployementContract,
  UpdateProfileParams,
} from "../../typo/employee/params";
import { EditEmployeeParams } from "../../services/employee-api";
import {
  Employee,
  PaginatedEmpResponse,
} from "../../typo/employee/response";
import { AddOvertimeToEmpParams } from "../../typo/overtime/params";

const InitialEmpState: EmployeeState = {
  employees: [],
  curr_emp: undefined,
  query_set: [],
  searching: false,
  pagination: undefined,
  task_error: undefined,
  task_finished: true,
  total: 0,
};
const EmployeeSlice = createSlice({
  name: "employee",
  initialState: InitialEmpState,
  reducers: {
    addEmpRequested: (state, _: PayloadAction<AddEmpParams>) => {
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
        type: state.pagination?.type,
      };
    },
    addEmpDone: (state, action: PayloadAction<Employee>) => {
      state.task_finished = true;
      state.task_error = undefined;
      state.curr_emp = action.payload;
    },
    listEmpRequested: (state) => {
      state.task_finished = false;
    },
    tryingToDelete: (state) => {
      state.task_finished = false;
    },
    deleteEmpRequested: (__, _: PayloadAction<string>) => {},
    deleteEmpDone: (state, action: PayloadAction<Employee>) => {
      state.task_finished = true;
      state.employees.splice(state.employees.indexOf(action.payload), 1);
    },

    listEmpDone: (state, payload: PayloadAction<PaginatedEmpResponse>) => {
      state.employees = payload.payload.results;
      state.task_finished = true;
      state.pagination = {
        ...payload.payload.pagination,
        page_size: state.pagination?.page_size ?? 10,
        type: "employee",
        number_of_pages: payload.payload.pagination.number_of_pages,
      };
    },
    loadNextEmployeeListPage: (state, _: PayloadAction<string>) => {
      state.task_finished = false;
      if (state.pagination?.current_page) state.pagination.current_page++;
      else if (state.pagination) state.pagination.current_page = 1;
    },
    loadPrevEmployeeListPage: (state, _: PayloadAction<string>) => {
      state.task_finished = false;
      if (state.pagination?.current_page) state.pagination.current_page--;
      else if (state.pagination) state.pagination.current_page = 1;
    },
    setCurrentEmployee: (
      state,
      payload: PayloadAction<Employee | undefined>
    ) => {
      state.curr_emp = payload.payload;
    },
    editEmployeeRequested: (state, _: PayloadAction<EditEmployeeParams>) => {
      state.task_finished = false;
    },
    editEmployeeDone: (state, action: PayloadAction<Employee>) => {
      state.task_finished = true;
      state.curr_emp = action.payload;
    },
    addEmpAllowanceRequested: (
      state,
      _: PayloadAction<AddAllowanceToEmployeesParams>
    ) => {
      state.task_finished = false;
    },
    finishAddAllowanceDone: (state) => {
      state.task_finished = true;
      state.task_error = undefined;
    },
    addEmpDeductionRequested: (
      state,
      _: PayloadAction<AddDeductionToEmployeesParams>
    ) => {
      state.task_finished = false;
    },
    addEmpOvertimeRequested: (
      state,
      _: PayloadAction<AddOvertimeToEmpParams>
    ) => {
      state.task_finished = false;
    },
    updateProfileRequest: (state, _: PayloadAction<UpdateProfileParams>) => {
      state.task_finished = false;
    },
    updateProfileDone: (state, action: PayloadAction<string>) => {
      state.task_finished = true;
      if (state.curr_emp) state.curr_emp.profile_picture = action.payload;
    },
    updateContractRequest: (
      state,
      _: PayloadAction<UpdateEmployementContract>
    ) => {
      state.task_finished = false;
    },
    updateContractDone: (state, action: PayloadAction<string>) => {
      state.task_finished = true;
      if (state.curr_emp) state.curr_emp.employement_contract = action.payload;
    },
    closeEmployeeTask: (state) => {
      state.task_finished = true;
      state.task_error = undefined;
    },
    getEmpNumRequested: () => {},
    getEmpNumDone: (state, action: PayloadAction<number>) => {
      state.total = action.payload;
    },
    resetEmployeeState: (state, action: PayloadAction<EmployeeState>) => {
      state = {
        ...action.payload,
      };
    },
    filterEmployeeRequest: (state, _: PayloadAction<string>) => {
      state.task_finished = false;
      state.task_error = undefined;
    },
    filterEmployeeDone: (state, action: PayloadAction<Employee[]>) => {
      state.employees = action.payload;
      state.task_finished = true;
    },
    errorOccurred: (state, action: PayloadAction<string | undefined>) => {
      state.task_error = action.payload;
    },
    getCurrentEmployeeRequest: (state, _: PayloadAction<string>) => {
      state.task_finished = false;
    },
    getCurrentEmployeeDone: (state, action: PayloadAction<Employee>) => {
      state.task_finished = true;
      state.curr_emp = action.payload;
      state.task_error = undefined;
    },
  },
});
export const {
  addEmpRequested,
  addEmpDone,
  listEmpRequested,
  listEmpDone,
  tryingToDelete,
  deleteEmpRequested,
  addEmpAllowanceRequested,
  finishAddAllowanceDone,
  addEmpDeductionRequested,
  addEmpOvertimeRequested,
  deleteEmpDone,
  setCurrentEmployee,
  editEmployeeRequested,
  editEmployeeDone,
  loadNextEmployeeListPage,
  loadPrevEmployeeListPage,
  setPagesize,
  updateProfileDone,
  updateProfileRequest,
  closeEmployeeTask,
  resetEmployeeState,
  filterEmployeeRequest,
  filterEmployeeDone,
  updateContractRequest,
  updateContractDone,
  getEmpNumDone,
  getEmpNumRequested,
  errorOccurred,
  getCurrentEmployeeRequest,
  getCurrentEmployeeDone,
} = EmployeeSlice.actions;

export default EmployeeSlice.reducer;
