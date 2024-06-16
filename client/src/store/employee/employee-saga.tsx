/* eslint-disable react-refresh/only-export-components */
import { PayloadAction } from "@reduxjs/toolkit";
import { call, delay, put, takeEvery } from "redux-saga/effects";
import { setFlashMessage } from "../notification/flash-messsage-slice";
import {
  addEmpDone,
  addSalaryDone,
  editEmployeeDone,
  listEmpDone,
  unfinishedAdd,
  unfinishedEdit,
} from "./employee-slice";
import EmployeeAPI, { EditEmployeeParams } from "../../services/employee-api";
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
          type: "success",
          status: true,
          title: "Add Employee",
          desc: response.success,
          duration: 3,
        })
      );
    } else if (response.code === 401) {
      yield put(unfinishedAdd());
      yield put(
        setFlashMessage({
          type: "error",
          status: true,
          title: "Permition Denied",
          desc: "You are not authorized to add employee",
          duration: 3,
        })
      );
    } else if (response.code === 403) {
      yield put(unfinishedAdd());
      yield put(
        setFlashMessage({
          type: "error",
          status: true,
          title: "Forbidden",
          desc: "You are not allowed to add employee",
          duration: 3,
        })
      );
    } else {
      yield put(unfinishedAdd());
      yield put(
        setFlashMessage({
          type: "error",
          status: true,
          title: "Add Employee",
          desc: response.error,
          duration: 3,
        })
      );
    }
  } catch (e) {
    yield put(unfinishedAdd());
    yield put(
      setFlashMessage({
        type: "error",
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
    yield delay(1000);
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
    yield put(
      setFlashMessage({
        type: "success",
        status: true,
        title: "Add salary",
        desc: "Salary added successfully",
        duration: 3,
      })
    );
  } catch (e) {
    yield put(
      setFlashMessage({
        type: "error",
        status: true,
        title: "Add salary",
        desc: "Could not add salary",
        duration: 3,
      })
    );
  }
}

export function* watchAddSalary() {
  yield takeEvery("employee/addSalaryRequested", addSalary);
}

function* editEmployee(action: PayloadAction<EditEmployeeParams>) {
  try {
    const response: AddEmpResponse = yield call(
      EmployeeAPI.editEmployee,
      action.payload.id || "",
      action.payload
    );
    if (response.code === 201) {
      yield put(editEmployeeDone(response.employee));
      yield put(
        setFlashMessage({
          type: "success",
          status: true,
          title: "Edit Employee",
          desc: response.success,
          duration: 3,
        })
      );
    } else if (response.code === 401) {
      yield put(unfinishedEdit());
      yield put(
        setFlashMessage({
          type: "error",
          status: true,
          title: "Permition Denied",
          desc: "You are not authorized to edit employee",
          duration: 3,
        })
      );
    } else if (response.code === 403) {
      yield put(unfinishedAdd());
      yield put(
        setFlashMessage({
          type: "error",
          status: true,
          title: "Forbidden",
          desc: "You are not allowed to edit employee",
          duration: 3,
        })
      );
    } else {
      yield put(unfinishedEdit());
      yield put(
        setFlashMessage({
          type: "error",
          status: true,
          title: "Edit Employee",
          desc:
            response.error.length < 3
              ? "Cannot edit employee please try again"
              : response.error,
          duration: 3,
        })
      );
    }
  } catch (e) {
    yield put(unfinishedEdit());
    yield put(
      setFlashMessage({
        type: "error",
        status: true,
        title: "Edit Employee",
        desc: "Cannot edit employee please try again",
        duration: 3,
      })
    );
  }
}

export function* watchEditEmployee() {
  yield takeEvery("employee/editEmployeeRequested", editEmployee);
}
