/* eslint-disable react-refresh/only-export-components */
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { EmployeeState } from "../../typo/employee/states";

const InitialEmpState: EmployeeState = {
  adding: false,
  employees: [],
  task: undefined,
  loading: false,
};
const EmployeeSlice = createSlice({
  name: "employee",
  initialState: InitialEmpState,
  reducers: {},
});

export default EmployeeSlice.reducer;
