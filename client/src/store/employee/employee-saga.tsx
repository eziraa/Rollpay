/* eslint-disable react-refresh/only-export-components */
import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeEvery } from "redux-saga/effects";
import { setFlashMessage } from "../notification/flash-messsage-slice";
import {
  addEmpDone,
  closeEmployeeTask,
  deleteEmpDone,
  editEmployeeDone,
  errorOccurred,
  finishAddAllowanceDone,
  getEmpNumDone,
  getCurrentEmployeeDone,
  listEmpDone,
  updateContractDone,
} from "./employee-slice";
import EmployeeAPI, { EditEmployeeParams } from "../../services/employee-api";
import {
  AddAllowanceToEmployeesParams,
  AddDeductionToEmployeesParams,
  AddEmpParams,
  RemoveSalaryAssetParams,
  UpdateEmployementContract,
} from "../../typo/employee/params";
import {
  EmployeeResponse,
  Employee,
  EmpRes,
  PaginatedEmpResponse,
} from "../../typo/employee/response";
import { CurrentEmpPaymentsResponse } from "../../typo/salary/response";
import { currentEmpPaymentInfoDone } from "../salary/salary-slice";
import { AddOvertimeToEmpParams } from "../../typo/overtime/params";

interface AddEmployeeResponse extends EmployeeResponse {
  employee: Employee;
}

function* AddEmployee(action: PayloadAction<AddEmpParams>) {
  try {
    const response: AddEmployeeResponse = yield call(
      EmployeeAPI.addEmp,
      action.payload
    );
    if (response.code === 201) {
      yield put(addEmpDone(response.employee));
    } else if (response.code === 401) {
      yield put(errorOccurred(response.error));
    } else if (response.code === 403) {
      yield put(errorOccurred(response.error));
      yield put(
        setFlashMessage({
          type: "error",
          status: true,
          title: "Forbidden",
          desc: "Not allowed to add employee",
          duration: 3,
        })
      );
    } else {
      yield put(errorOccurred(response.error));
    }
  } catch (e) {
    yield put(errorOccurred("Failed please try again later"));
    yield put(
      setFlashMessage({
        type: "error",
        status: true,
        title: "Add Employee",
        desc: " Failed please try again later",
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
          title: "Adding allowance ",
          desc: "Allowance added  successfully ",
          duration: 3,
        })
      );
    } else if (response.code === 401) {
      yield put(errorOccurred(response.error));
    } else if (response.code === 403) {
      yield put(errorOccurred(response.error));
      yield put(
        setFlashMessage({
          type: "error",
          status: true,
          title: "Forbidden",
          desc: "Not allowed to add employee",
          duration: 3,
        })
      );
    } else {
      yield put(errorOccurred(response.error));
    }
  } catch (e) {
    yield put(errorOccurred("Failed please try again later"));
    yield put(
      setFlashMessage({
        type: "error",
        status: true,
        title: "Add Employee",
        desc: "Failed please try again later",
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
      yield put(closeEmployeeTask());
      yield put(currentEmpPaymentInfoDone(response));
      // yield put(closeModal(ADD_ALLOWANCE_TO_EMP));
      yield put(
        setFlashMessage({
          type: "success",
          status: true,
          title: "Adding allowance",
          desc: "Deduction added successfully",
          duration: 3,
        })
      );
    } else if (response.code === 401) {
      yield put(errorOccurred(response.error));
    } else if (response.code === 403) {
      yield put(errorOccurred(response.error));
      yield put(
        setFlashMessage({
          type: "error",
          status: true,
          title: "Forbidden",
          desc: "Not allowed to add employee",
          duration: 3,
        })
      );
    } else {
      yield put(errorOccurred(response.error));
    }
  } catch (e) {
    yield put(errorOccurred("Failed please try again later"));
    yield put(
      setFlashMessage({
        type: "error",
        status: true,
        title: "Add Employee",
        desc: "Failed please try again later",
        duration: 3,
      })
    );
  }
}

function* addOvertime(action: PayloadAction<AddOvertimeToEmpParams>) {
  try {
    const response: CurrentEmpPaymentsResponse = yield call(
      EmployeeAPI.addOvertime,
      action.payload
    );
    if (response.code === 201) {
      yield put(closeEmployeeTask());
      yield put(currentEmpPaymentInfoDone(response));
      yield put(
        setFlashMessage({
          type: "success",
          status: true,
          title: "Adding overtime",
          desc: "Deduction added successfully ",
          duration: 3,
        })
      );
    } else if (response.code === 401) {
      yield put(errorOccurred(response.error));
    } else if (response.code === 403) {
      yield put(errorOccurred(response.error));
      yield put(
        setFlashMessage({
          type: "error",
          status: true,
          title: "Forbidden",
          desc: "Not allowed to add employee",
          duration: 3,
        })
      );
    } else {
      yield put(errorOccurred(response.error));
    }
  } catch (e) {
    yield put(errorOccurred("Cann't add overtime please try again later"));
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
function* removeSalaryAsset(action: PayloadAction<RemoveSalaryAssetParams>) {
  try {
    const response: CurrentEmpPaymentsResponse = yield call(
      EmployeeAPI.removeSalaryAsset,
      action.payload
    );
    if (response.code === 200) {
      yield put(closeEmployeeTask());
      yield put(currentEmpPaymentInfoDone(response));
      yield put(
        setFlashMessage({
          type: "success",
          status: true,
          title: `Removing ${action.payload.asset_type}`,
          desc: `${action.payload.asset_type} successfully removed`,
          duration: 3,
        })
      );
    } else if (response.code === 401) {
      yield put(errorOccurred(response.error));
    } else if (response.code === 403) {
      yield put(errorOccurred(response.error));
      yield put(
        setFlashMessage({
          type: "error",
          status: true,
          title: "Forbidden",
          desc: "Not allowed to add employee",
          duration: 3,
        })
      );
    } else {
      yield put(errorOccurred(response.error));
    }
  } catch (e) {
    yield put(errorOccurred("Cann't add overtime please try again later"));
    yield put(
      setFlashMessage({
        type: "error",
        status: true,
        title: "Adding overtime",
        desc: "Adding failed please try again later",
        duration: 3,
      })
    );
  }
}
function* GetEmployees() {
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
          desc: "Not allowed to view employees",
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
    // TODO:
  }
}

function* GetEmployee(action: PayloadAction<string>) {
  try {
    const response: EmployeeResponse = yield call(
      EmployeeAPI.getEmployee,
      action.payload
    );
    if (response.code === 200) {
      yield put(getCurrentEmployeeDone(response.employee));
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
          desc: "Not allowed to view employee",
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
    // TODO:
  }
}

function* DeleteEmployee(action: PayloadAction<string>) {
  try {
    const response: EmployeeResponse = yield call(
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
      yield put(errorOccurred(response.error));
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
      yield put(errorOccurred(response.error));
      // window.location.href = "/access-denied";
      yield put(
        setFlashMessage({
          type: "error",
          status: true,
          title: "Access Denied",
          desc: "Not allowed to delete employees",
          duration: 3,
        })
      );
    } else {
      yield put(
        setFlashMessage({
          type: "error",
          status: true,
          title: "Deleting Employee",
          desc: response.error,
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
    // TODO:
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
    // TODO:
  }
}

function* editEmployee(action: PayloadAction<EditEmployeeParams>) {
  try {
    const response: EmployeeResponse = yield call(
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
    } else {
      yield put(errorOccurred(response.error || "Some things went wrong"));
    }
    if (response.code === 401) {
      yield put(
        setFlashMessage({
          type: "error",
          status: true,
          title: "Permition Denied",
          desc: "Not authorized to edit employee",
          duration: 3,
        })
      );
    } else if (response.code === 403) {
      yield put(errorOccurred(response.error));
      yield put(
        setFlashMessage({
          type: "error",
          status: true,
          title: "Forbidden",
          desc: "Not allowed to edit employee",
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
              ? "Failed please try again"
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
        desc: "Failed please try again",
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
        desc: "Not allowed to view employees",
        duration: 3,
      })
    );
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
        desc: "Failed. Please try again",
        duration: 3,
      })
    );
  }
}

function* GetEmpNum() {
  try {
    const response: EmpRes = yield call(EmployeeAPI.getTotalEmployee);
    if (response.code === 200) {
      yield put(getEmpNumDone(response.total));
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
          desc: "Not allowed to view dashboard",
          duration: 3,
        })
      );
    } else {
      yield put(
        setFlashMessage({
          type: "error",
          status: true,
          title: "Get total employee",
          desc: response.error,
          duration: 3,
        })
      );
    }
  } catch (e) {
    // console.log(e);
  }
}

export function* watchEmployeeRequests() {
  yield takeEvery("employee/editEmployeeRequested", editEmployee);
  yield takeEvery("employee/addEmpRequested", AddEmployee);
  yield takeEvery("employee/listEmpRequested", GetEmployees);
  yield takeEvery("employee/getCurrentEmployeeRequest", GetEmployee);
  yield takeEvery("employee/deleteEmpRequested", DeleteEmployee);
  yield takeEvery("employee/addEmpAllowanceRequested", addAllowance);
  yield takeEvery("employee/addEmpDeductionRequested", addDeduction);
  yield takeEvery("employee/addEmpOvertimeRequested", addOvertime);
  yield takeEvery("employee/loadNextEmployeeListPage", loadNextPage);
  yield takeEvery("employee/loadPrevEmployeeListPage", loadPrevPage);
  yield takeEvery("employee/filterEmployeeRequest", filterEmployees);
  yield takeEvery("employee/getEmpNumRequested", GetEmpNum);
  yield takeEvery("employee/removeSalaryAssetRequested", removeSalaryAsset);
}
export function* watchEditEmployee() {
  yield takeEvery("employee/editEmployeeRequested", editEmployee);
  yield takeEvery("employee/updateContractRequest", updateContract);
}
