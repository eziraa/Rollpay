/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { EmployeeState } from "../../typo/employee/states";
import { AddEmpParams, AddSalaryParams } from "../../typo/employee/params";
import { EditEmployeeParams } from "../../services/employee-api";
import { Employee } from "../../typo/employee/response";

const InitialEmpState: EmployeeState = {
  adding: false,
  employees: [],
  task: undefined,
  loading: false,
  curr_emp: undefined,
  editing: false,
  major_task: undefined,
  mini_task: undefined,
  deleting: false,
  query_set: [],
};
const EmployeeSlice = createSlice({
  name: "employee",
  initialState: InitialEmpState,
  reducers: {
    addEmpRequested: (state, _: PayloadAction<AddEmpParams>) => {
      state.adding = true;
    },
    addEmpDone: (state) => {
      state.adding = false;
      state.task = undefined;
    },
    unfinishedAdd: (state) => {
      state.adding = false;
    },
    listEmpRequested: (state) => {
      state.loading = true;
    },
    tryingToDelete: (state) => {
      state.deleting = true;
    },
    deleteEmpRequested: (__, _: PayloadAction<string>) => {},
    searchRequested: (state, action: PayloadAction<string>) => {
      state.mini_task = action.payload;
    },
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
    listEmpDone: (state, payload: PayloadAction<Employee[]>) => {
      state.employees = payload.payload;
      state.adding = false;
      state.task = undefined;
      state.loading = false;
    },
    unfinishedList: (state) => {
      state.loading = false;
      state.task = undefined;
      state.adding = false;
      state.employees = [];
    },
    searching: (state, payload: PayloadAction<Employee[]>) => {
      state.query_set = payload.payload;
    },
    setTask: (state, task: PayloadAction<string | undefined>) => {
      state.task = task.payload;
    },
    setMajorTask: (state, task: PayloadAction<string | undefined>) => {
      state.major_task = task.payload;
    },
    setMiniTask: (state, task: PayloadAction<string | undefined>) => {
      state.mini_task = task.payload;
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
    resetCurrEmployee: (state) => {
      state.curr_emp = undefined;
      state.editing = false;
      state.major_task = undefined;
      state.mini_task = undefined;
      state.task = undefined;
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
  setTask,
  setCurrentEmployee,
  addSalaryRequested,
  addSalaryDone,
  editEmployeeRequested,
  editEmployeeDone,
  unfinishedEdit,
  setMajorTask,
  setMiniTask,
  resetCurrEmployee,
  searching
} = EmployeeSlice.actions;

export default EmployeeSlice.reducer;
