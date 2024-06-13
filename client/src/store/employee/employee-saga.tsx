/* eslint-disable react-refresh/only-export-components */
import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeEvery } from "redux-saga/effects";
import { setFlashMessage } from "../notification/flash-messsage-slice";
import { addEmpDone, addSalaryDone, listEmpDone } from "./employee-slice";
import EmployeeAPI from "../../services/employee-api";
import { AddEmpParams, AddSalaryParams } from "../../typo/employee/params";
import { AddEmpResponse, EmployeeResponse } from "../../typo/employee/response";
import { setLongTask } from "../user/user-slice";
import { LIST_EMP_S } from "../../constants/tasks";

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

function* GetEmployee() {
  try {
    const employees: EmployeeResponse[] = yield call(EmployeeAPI.listEmployee);
    yield put(listEmpDone(employees));
    yield put(setLongTask(LIST_EMP_S));
  } catch (e) {
    console.log(e);
  }
}

export function* watchAddEmployee() {
  yield takeEvery("employee/addEmpRequested", AddEmployee);
  yield takeEvery("employee/listEmpRequested", GetEmployee);
}

function* addSalary(action: PayloadAction<AddSalaryParams>) {
  try {
    const employees: EmployeeResponse = yield call(
      EmployeeAPI.addSalary,
      action.payload
    );
    yield put(addSalaryDone(employees));
  } catch (e) {
    console.log(e);
  }
}

export function* watchAddSalary() {
  yield takeEvery("employee/addSalaryRequested", addSalary);
}
