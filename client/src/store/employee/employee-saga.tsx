/* eslint-disable react-refresh/only-export-components */
import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeEvery } from "redux-saga/effects";
import { setFlashMessage } from "../notification/flash-messsage-slice";
import {
  addEmpDone,
  deleteEmpDone,
  editEmployeeDone,
  listEmpDone,
  unfinishedAdd,
  unfinishedDelete,
  unfinishedEdit,
} from "./employee-slice";
import EmployeeAPI, {
  EditEmployeeParams,
  PaginatedEmpResponse,
} from "../../services/employee-api";
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
          type: "success",
          status: true,
          title: "Add Employee",
          desc: response.success,
          duration: 3,
        })
      );
    } else if (response.code === 401) {
      yield put(unfinishedAdd(response.error));
    } else if (response.code === 403) {
      yield put(unfinishedAdd(response.error));
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
      yield put(unfinishedAdd(response.error));
    }
  } catch (e) {
    yield put(unfinishedAdd("Cann't add employee please try again later"));
    yield put(
      setFlashMessage({
        type: "error",
        status: true,
        title: "Add Employee",
        desc: "Cann't add employee please try again later",
        duration: 3,
      })
    );
  }
}

function* GetEmployee() {
  try {
    const response: PaginatedEmpResponse = yield call(EmployeeAPI.listEmployee);
    if (response.code === 200) {
      yield put(listEmpDone(response));
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
          desc: response.error,
          duration: 3,
        })
      );
    }
  } catch (e) {
    console.log(e);
  }
}

function* DeleteEmployee(action: PayloadAction<string>) {
  try {
    const response: AddEmpResponse = yield call(
      EmployeeAPI.deleteEmployee,
      action.payload
    );
    if (response.code === 204) {
      yield put(deleteEmpDone(response.employee));
      yield put(
        setFlashMessage({
          type: "success",
          status: true,
          title: "Delete Employee",
          desc: response.success,
          duration: 3,
        })
      );
    } else if (response.code === 401) {
      yield put(unfinishedDelete());
      // window.location.href = "/access-denied";
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
      yield put(unfinishedDelete());
      // window.location.href = "/access-denied";
      yield put(
        setFlashMessage({
          type: "error",
          status: true,
          title: "Access Denied",
          desc: "You are not allowed to delete employees",
          duration: 3,
        })
      );
    } else {
      yield put(
        setFlashMessage({
          type: "error",
          status: true,
          title: "Delete Employee",
          desc: response.error,
          duration: 3,
        })
      );
    }
  } catch (e) {
    console.log(e);
  }
}

export function* watchAddEmployee() {
  yield takeEvery("employee/addEmpRequested", AddEmployee);
  yield takeEvery("employee/listEmpRequested", GetEmployee);
  yield takeEvery("employee/deleteEmpRequested", DeleteEmployee);
}

function* loadNextPage(action: PayloadAction<string>) {
  try {
    const response: PaginatedEmpResponse = yield call(
      EmployeeAPI.listEmployee,
      action.payload
    );
    if (response.code === 200) {
      yield put(listEmpDone(response));
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
    const response: PaginatedEmpResponse = yield call(
      EmployeeAPI.listEmployee,
      action.payload
    );
    if (response.code === 200) {
      yield put(listEmpDone(response));
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

export function* watchLoadPage() {
  yield takeEvery("employee/loadNextPageRequested", loadNextPage);
  yield takeEvery("employee/loadPrevPageRequested", loadPrevPage);
}

// function* addSalary(action: PayloadAction<AddSalaryParams>) {
//   try {
//     const response: EmpResponse = yield call(
//       EmployeeAPI.addSalary,
//       action.payload
//     );
//     // yield put(addSalaryDone(response.employees[0]));
//     yield put(
//       setFlashMessage({
//         type: "success",
//         status: true,
//         title: "Add salary",
//         desc: "Salary added successfully",
//         duration: 3,
//       })
//     );
//   } catch (e) {
//     yield put(
//       setFlashMessage({
//         type: "error",
//         status: true,
//         title: "Add salary",
//         desc: "Could not add salary",
//         duration: 3,
//       })
//     );
//   }
// }

// export function* watchAddSalary() {
//   yield takeEvery("employee/addSalaryRequested", addSalary);
// }

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
      yield put(unfinishedAdd(response.error));
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
