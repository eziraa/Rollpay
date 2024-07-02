/* eslint-disable react-refresh/only-export-components */
import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeEvery } from "redux-saga/effects";
import { setFlashMessage } from "../notification/flash-messsage-slice";
import {
  addEmpDone,
  addingDone,
  deleteEmpDone,
  editEmployeeDone,
  finishAddAllowanceDone,
  listEmpDone,
  unfinishedAdd,
  unfinishedDelete,
  updateContractDone,
  updateProfileDone,
} from "./employee-slice";
import EmployeeAPI, { EditEmployeeParams } from "../../services/employee-api";
import {
  AddAllowanceToEmployeesParams,
  AddDeductionToEmployeesParams,
  AddEmpParams,
  UpdateEmployementContract,
  UpdateProfileParams,
} from "../../typo/employee/params";
import {
  AddEmpResponse,
  PaginatedEmpResponse,
} from "../../typo/employee/response";
import { CurrentEmpPaymentsResponse } from "../../typo/salary/response";
import { currentEmpPaymentInfoDone } from "../salary/salary-slice";
import { AddOvertimeToEmpParams } from "../../typo/overtime/params";
// import { closeModal } from "../../providers/actions";
// import { ADD_ALLOWANCE_TO_EMP } from "../../constants/tasks";

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

function* addAllowance(action: PayloadAction<AddAllowanceToEmployeesParams>) {
  try {
    const response: CurrentEmpPaymentsResponse = yield call(
      EmployeeAPI.addAllowance,
      action.payload
    );
    if (response.code === 201) {
      yield put(finishAddAllowanceDone());
      yield put(currentEmpPaymentInfoDone(response));
      // yield put(closeModal(ADD_ALLOWANCE_TO_EMP));
      yield put(
        setFlashMessage({
          type: "success",
          status: true,
          title: "Adding allowance to employee",
          desc: "Allowance successfully added to employee",
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
    yield put(unfinishedAdd("Cann't add allowance please try again later"));
    yield put(
      setFlashMessage({
        type: "error",
        status: true,
        title: "Add Employee",
        desc: "Cann't add allowance please try again later",
        duration: 3,
      })
    );
  }
}

function* addDeduction(action: PayloadAction<AddDeductionToEmployeesParams>) {
  try {
    const response: CurrentEmpPaymentsResponse = yield call(
      EmployeeAPI.addDeduction,
      action.payload
    );
    if (response.code === 201) {
      yield put(addingDone());
      yield put(currentEmpPaymentInfoDone(response));
      // yield put(closeModal(ADD_ALLOWANCE_TO_EMP));
      yield put(
        setFlashMessage({
          type: "success",
          status: true,
          title: "Adding allowance to employee",
          desc: "Deduction successfully added to employee",
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
    yield put(unfinishedAdd("Cann't add allowance please try again later"));
    yield put(
      setFlashMessage({
        type: "error",
        status: true,
        title: "Add Employee",
        desc: "Cann't add allowance please try again later",
        duration: 3,
      })
    );
  }
}

function* addOvertime(action: PayloadAction<AddOvertimeToEmpParams>) {
  alert("reached");
  try {
    const response: CurrentEmpPaymentsResponse = yield call(
      EmployeeAPI.addOvertime,
      action.payload
    );
    if (response.code === 201) {
      yield put(addingDone());
      yield put(currentEmpPaymentInfoDone(response));
      yield put(
        setFlashMessage({
          type: "success",
          status: true,
          title: "Adding overtime to employee",
          desc: "Deduction successfully added to employee",
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
    yield put(unfinishedAdd("Cann't add overtime please try again later"));
    yield put(
      setFlashMessage({
        type: "error",
        status: true,
        title: "Add Employee",
        desc: "Cann't add overtime please try again later",
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

function* updateProfile(action: PayloadAction<UpdateProfileParams>) {
  try {
    const response: string = yield call(
      EmployeeAPI.updatProfilePicture,
      action.payload
    );
    yield put(updateProfileDone(response));
  } catch (e) {
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

function* filterEmployees(action: PayloadAction<string>) {
  const response: PaginatedEmpResponse = yield call(
    EmployeeAPI.listEmployee,
    action.payload
  );
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
  }
}
function* updateContract(action: PayloadAction<UpdateEmployementContract>) {
  try {
    const response: string = yield call(
      EmployeeAPI.updatEmployementAgreement,
      action.payload
    );
    yield put(updateContractDone(response));
  } catch (e) {
    yield put(
      setFlashMessage({
        type: "error",
        status: true,
        title: "Update Employement Contract",
        desc: "Cannot upload employement conatract. Please try again",
        duration: 3,
      })
    );
  }
}

export function* watchEmployeeRequests() {
  yield takeEvery("employee/editEmployeeRequested", editEmployee);
  yield takeEvery("employee/updateProfileRequest", updateProfile);
  yield takeEvery("employee/addEmpRequested", AddEmployee);
  yield takeEvery("employee/listEmpRequested", GetEmployee);
  yield takeEvery("employee/deleteEmpRequested", DeleteEmployee);
  yield takeEvery("employee/addEmpAllowanceRequested", addAllowance);
  yield takeEvery("employee/addEmpDeductionRequested", addDeduction);
  yield takeEvery("employee/addEmpOvertimeRequested", addOvertime);
  yield takeEvery("employee/loadNextEmployeeListPage", loadNextPage);
  yield takeEvery("employee/loadPrevEmployeeListPage", loadPrevPage);
  yield takeEvery("employee/filterEmployeeRequest", filterEmployees);
}
export function* watchEditEmployee() {
  yield takeEvery("employee/editEmployeeRequested", editEmployee);
  yield takeEvery("employee/updateProfileRequest", updateProfile);
  yield takeEvery("employee/updateContractRequest", updateContract);

  // yield takeEvery("employee/addPositionRequested", addPosition);
}
