/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { EmployeeState } from "../../typo/employee/states";
import { AddEmpParams, AddSalaryParams } from "../../typo/employee/params";
import { EmployeeResponse } from "../../typo/employee/response";
import { EditEmployeeParams } from "../../services/employee-api";

const InitialEmpState: EmployeeState = {
  adding: false,
  employees: [],
  task: undefined,
  loading: false,
  curr_emp: undefined,
  editing: false,
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
    listEmpRequested: (state) => {
      state.loading = true;
    },

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    listEmpDone: (state, payload: PayloadAction<EmployeeResponse[]>) => {
      state.employees = payload.payload;
      state.adding = false;
      state.task = undefined;
      state.loading = false;
    },
    setTask: (state, task: PayloadAction<string | undefined>) => {
      state.task = task.payload;
    },
    setCurrentEmployee: (
      state,
      payload: PayloadAction<EmployeeResponse | undefined>
    ) => {
      state.curr_emp = payload.payload;
    },
    addSalaryRequested: (state, _: PayloadAction<AddSalaryParams>) => {
      state.adding = true;
    },
    addSalaryDone: (state, action: PayloadAction<EmployeeResponse>) => {
      state.adding = false;
      state.curr_emp = action.payload;
    },
    editEmployeeRequested: (state, _: PayloadAction<EditEmployeeParams>) => {
      state.editing = true;
    },
    editEmployeeDone: (state, action: PayloadAction<EmployeeResponse>) => {
      state.editing = false;
      state.curr_emp = action.payload;
    },
    unfinishedEdit: (state) => {
      state.editing = false;
    },
  },
});
export const {
  addEmpRequested,
  addEmpDone,
  listEmpRequested,
  listEmpDone,
  setTask,
  setCurrentEmployee,
  addSalaryRequested,
  addSalaryDone,
  editEmployeeRequested,
  editEmployeeDone,
  unfinishedEdit,
} = EmployeeSlice.actions;

export default EmployeeSlice.reducer;
