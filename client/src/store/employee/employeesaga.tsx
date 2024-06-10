/* eslint-disable react-refresh/only-export-components */
import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeEvery } from "redux-saga/effects";
import { setFlashMessage } from "../notification/flashMesssageSlice";
import { addEmpDone } from "./employeeSlice";
import EmployeeAPI from "../../services/employee-api";
import { AddEmpParams } from "../../typo/employee/params";
import { AddEmpResponse } from "../../typo/employee/response";

function* AddEmployee(action: PayloadAction<AddEmpParams>) {
  try {
    const response: AddEmpResponse = yield call(
      EmployeeAPI.addEmp,
      action.payload
    );
    if (response.code === 201) {
      yield put(addEmpDone());
      yield put(
        setFlashMessage({
          color: "green",
          status: true,
          title: "Add Employee",
          desc: response.success,
          duration: 3,
        })
      );
    } else {
      yield put(
        setFlashMessage({
          color: "green",
          status: true,
          title: "Add Employee",
          desc: response.error,
          duration: 3,
        })
      );
    }
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
