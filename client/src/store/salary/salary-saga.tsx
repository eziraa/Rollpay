/* eslint-disable react-refresh/only-export-components */
import { call, put, takeEvery } from "redux-saga/effects";
import { setFlashMessage } from "../notification/flash-messsage-slice";

import SalaryAPI from "../../services/salary-api";
import { currentEmpPaymentInfoDone, getSalariesDone } from "./salary-slice";
import {
  CurrentEmpPaymentsResponse,
  PaginatedPaymentResponse,
  SalaryEmpResponse,
} from "../../typo/salary/response";

import { PayloadAction } from "@reduxjs/toolkit";
import { SearchParams } from "../../typo/salary/params";

function* GetEmployeeSalary() {
  try {
    const response: PaginatedPaymentResponse = yield call(
      SalaryAPI.listEmployeeSalary
    );
    if (response.code === 200) {
      yield put(getSalariesDone(response));
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
      // yield put(setSearchResult(response.employees));
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

function* getEmpSalaryInfo(action: PayloadAction<string>) {
  try {
    const response: CurrentEmpPaymentsResponse = yield call(
      SalaryAPI.getEmployeeSalary,
      action.payload
    );
    if (response.code === 200) {
      yield put(currentEmpPaymentInfoDone(response));
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
    }
  } catch (e) {
    console.log(e);
  }
}

function* loadNextPage(action: PayloadAction<string>) {
  try {
    const response: PaginatedPaymentResponse = yield call(
      SalaryAPI.listEmployeeSalary,
      action.payload
    );
    if (response.code === 200) {
      yield put(getSalariesDone(response));
    } else {
      yield put(
        setFlashMessage({
          type: "error",
          status: true,
          title: "Load Next Page",
          desc: response.error,
          duration: 3,
        })
      );
    }
  } catch (e) {
    console.log(e);
  }
}

function* loadPrevPage(action: PayloadAction<string>) {
  try {
    const response: PaginatedPaymentResponse = yield call(
      SalaryAPI.listEmployeeSalary,
      action.payload
    );
    if (response.code === 200) {
      yield put(getSalariesDone(response));
    } else {
      yield put(
        setFlashMessage({
          type: "error",
          status: true,
          title: "Load Previous Page",
          desc: response.error,
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
  yield takeEvery("salary/getCurrEmpPaymentInfo", getEmpSalaryInfo);
  yield takeEvery("salary/loadNextPaymentListPage", loadNextPage);
  yield takeEvery("salary/loadNextPaymentListPage", loadPrevPage);
}
