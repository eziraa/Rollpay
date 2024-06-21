/* eslint-disable react-refresh/only-export-components */
import { call, put, takeEvery } from "redux-saga/effects";
import { setFlashMessage } from "../notification/flash-messsage-slice";

import SalaryAPI from "../../services/salary-api";
import { getSalariesDone, setSearchResult } from "./salary-slice";
import { SalaryEmpResponse } from "../../typo/salary/response";
import { setLongTask } from "../user/user-slice";
import { SEE_EMP_SALARY } from "../../constants/tasks";
import { PayloadAction } from "@reduxjs/toolkit";
import { SearchParams } from "../../typo/salary/params";

function* GetEmployeeSalary() {
  try {
    const response: SalaryEmpResponse = yield call(
      SalaryAPI.listEmployeeSalary
    );
    if (response.code === 200) {
      yield put(getSalariesDone(response));
      yield put(setLongTask(SEE_EMP_SALARY));
    } else if (response.code === 401) {
      window.location.href = "/access-denied";
      yield put(
        setFlashMessage({
          type: "error",
          status: true,
          title: "Unauthorized",
          desc: "Please check your credentials",
          duration: 3,
        })
      );
    } else if (response.code === 403) {
      window.location.href = "/access-denied";
      yield put(
        setFlashMessage({
          type: "error",
          status: true,
          title: "Access Denied",
          desc: "You are not allowed to view employees",
          duration: 3,
        })
      );
    } else {
      yield put(
        setFlashMessage({
          type: "error",
          status: true,
          title: "List Employee",
          desc: response.error ?? "You are not allowed to view employees",
          duration: 3,
        })
      );
    }
  } catch (e) {
    console.log(e);
  }
}

function* searchEmployee(action: PayloadAction<SearchParams>) {
  try {
    const response: SalaryEmpResponse = yield call(
      SalaryAPI.searchEmployeeSalary,
      action.payload
    );
    if (response.code === 200) {
      yield put(setSearchResult(response.employees));
      // yield put(setLongTask(SEE_EMP_SALARY));
    } else if (response.code === 401) {
      window.location.href = "/access-denied";
      yield put(
        setFlashMessage({
          type: "error",
          status: true,
          title: "Unauthorized",
          desc: "Please check your credentials",
          duration: 3,
        })
      );
    } else if (response.code === 403) {
      window.location.href = "/access-denied";
      yield put(
        setFlashMessage({
          type: "error",
          status: true,
          title: "Access Denied",
          desc: "You are not allowed to view employees",
          duration: 3,
        })
      );
    } else {
      yield put(
        setFlashMessage({
          type: "error",
          status: true,
          title: "List Employee",
          desc: response.error ?? "You are not allowed to view employees",
          duration: 3,
        })
      );
    }
  } catch (e) {
    console.log(e);
  }
}
export function* watchGetEmployeeSalary() {
  yield takeEvery("salary/getSalariesRequested", GetEmployeeSalary);
  yield takeEvery("salary/searchEmployeeRequested", searchEmployee);
}
