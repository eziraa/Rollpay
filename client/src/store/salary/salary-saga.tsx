/* eslint-disable react-refresh/only-export-components */
import { call, put, takeEvery } from "redux-saga/effects";
import { setFlashMessage } from "../notification/flash-messsage-slice";

import SalaryAPI from "../../services/salary-api";
import {
  currentEmpPaymentInfoDone,
  getSalariesDone,
  raiseError,
  raiseSalaryDone,
  raiseSalaryRequest,
} from "./salary-slice";
import {
  CurrentEmpPaymentsResponse,
  PaginatedPaymentResponse,
  RaiseSalaryResponse,
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
    // TODO:
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
    // TODO:
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
    // TODO:
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
    // TODO:
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
    // TODO:
  }
}

function* raiseSalary(
  action: PayloadAction<{ rate: number; reason: string; employees: number[] }>
) {
  try {
    const response: RaiseSalaryResponse = yield call(
      SalaryAPI.raiseSalary,
      action.payload
    );

    if (response.code === 200) {
      yield put(raiseSalaryDone(response.employees));
      yield put(
        setFlashMessage({
          type: "success",
          status: true,
          title: "Adding Group",
          desc: response.success,
          duration: 3,
        })
      );
    } else if (response.code === 401) {
      yield put(raiseError(response.error));
    } else if (response.code === 403) {
      yield put(raiseError(response.error));
      yield put(
        setFlashMessage({
          type: "error",
          status: true,
          title: "Forbidden",
          desc: "Not allowed to add allowance",
          duration: 3,
        })
      );
    } else {
      yield put(raiseError(response.error));
    }
  } catch (_) {
    yield put(raiseError("Failed please try again later"));
    yield put(
      setFlashMessage({
        type: "error",
        status: true,
        title: "Add Group",
        desc: "Failed please try again later",
        duration: 3,
      })
    );
  }
}
export function* watchGetEmployeeSalary() {
  yield takeEvery("salary/getSalariesRequested", GetEmployeeSalary);
  yield takeEvery("salary/searchEmployeeRequested", searchEmployee);
  yield takeEvery("salary/getCurrEmpPaymentInfo", getEmpSalaryInfo);
  yield takeEvery("salary/loadNextPaymentListPage", loadNextPage);
  yield takeEvery("salary/loadNextPaymentListPage", loadPrevPage);
  yield takeEvery(raiseSalaryRequest.type, raiseSalary);
}
