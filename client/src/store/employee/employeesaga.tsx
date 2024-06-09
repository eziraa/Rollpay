/* eslint-disable react-refresh/only-export-components */
import { PayloadAction } from "@reduxjs/toolkit";
import { SagaReturnType, call, put, takeEvery } from "redux-saga/effects";
import { setFlashMessage } from "../notification/flashMesssageSlice";
import { addEmpDone } from "./employeeSlice";
import EmployeeAPI from "../../services/employee-api";
import { AddEmpParams } from "../../typo/employee/params";

function* AddEmployee(action: PayloadAction<AddEmpParams>) {
  try {
    const employees: SagaReturnType<typeof EmployeeAPI.addEmp> = yield call(
      EmployeeAPI.addEmp,
      action.payload
    );
    yield put(addEmpDone(employees));
    yield put(
      setFlashMessage({
        color: "green",
        status: true,
        title: "Add Employee",
        desc: "Employee added successfully",
        duration: 3,
      })
    );
  } catch (e) {
    yield put(
      setFlashMessage({
        color: "red",
        status: true,
        title: "Add Employee",
        desc: "Cannot add employee",
        duration: 3,
      })
    );
  }
}

export function* watchAddEmployee() {
  yield takeEvery("employee/addEmpRequested", AddEmployee);
}
