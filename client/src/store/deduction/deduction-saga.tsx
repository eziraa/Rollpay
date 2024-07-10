/* eslint-disable react-refresh/only-export-components */
import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeEvery } from "redux-saga/effects";
import { setFlashMessage } from "../notification/flash-messsage-slice";
import {
  AddDeductionParams,
  EditDeductionParams,
} from "../../typo/deduction/params";
import {
  AddDeductionResponse,
  PaginatedDeductionResponse,
} from "../../typo/deduction/response";
import DeductionAPI from "../../services/deduction-api";
import {
  addDeductionDone,
  closeDeductionDone,
  deleteDeductionDone,
  editDeductionDone,
  getDeductionDone,
  listDeductionDone,
  taskUnfinished,
  unfinishedAdd,
} from "./deduction-slice";
function* addDeduction(action: PayloadAction<AddDeductionParams>) {
  try {
    const response: AddDeductionResponse = yield call(
      DeductionAPI.addDeduction,
      action.payload
    );
    if (response.code === 201) {
      yield put(addDeductionDone(response.deduction));
      yield put(
        setFlashMessage({
          type: "success",
          status: true,
          title: "Add Deduction",
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
          desc: "You are not allowed to add deduction",
          duration: 3,
        })
      );
    } else {
      yield put(unfinishedAdd(response.error));
    }
  } catch (e) {
    yield put(unfinishedAdd("Cann't add deduction please try again later"));
    yield put(
      setFlashMessage({
        type: "error",
        status: true,
        title: "Add Deduction",
        desc: "Cann't add deduction please try again later",
        duration: 3,
      })
    );
  }
}

function* GetDeductions() {
  try {
    const response: PaginatedDeductionResponse = yield call(
      DeductionAPI.listDeductions
    );
    if (response.code === 200) {
      yield put(listDeductionDone(response));
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
          desc: "You are not allowed to view deductions",
          duration: 3,
        })
      );
    } else {
      yield put(
        setFlashMessage({
          type: "error",
          status: true,
          title: "List Deduction",
          desc: response.error,
          duration: 3,
        })
      );
    }
  } catch (e) {
    // TODO:
  }
}

function* GetDeduction(action: PayloadAction<string>) {
  try {
    const response: AddDeductionResponse = yield call(
      DeductionAPI.getDeduction,
      action.payload
    );
    if (response.code === 200) {
      yield put(getDeductionDone(response.deduction));
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
          desc: "You are not allowed to view deduction",
          duration: 3,
        })
      );
    } else {
      yield put(
        setFlashMessage({
          type: "error",
          status: true,
          title: "Get deduction",
          desc: response.error,
          duration: 3,
        })
      );
    }
  } catch (e) {
    // TODO:
  }
}
function* CLoseDeduction(action: PayloadAction<string>) {
  try {
    const response: AddDeductionResponse = yield call(
      DeductionAPI.closeDeduction,
      action.payload
    );
    if (response.code === 201) {
      yield put(closeDeductionDone(response.deduction));
      yield put(
        setFlashMessage({
          type: "success",
          status: true,
          title: "Closing Deduction",
          desc: response.success,
          duration: 3,
        })
      );
    } else if (response.code === 401) {
      yield put(taskUnfinished(response.error || "Can't close deduction"));
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
      yield put(taskUnfinished(response.error || "Can't close deduction"));
      // window.location.href = "/access-denied";
      yield put(
        setFlashMessage({
          type: "error",
          status: true,
          title: "Access Denied",
          desc: "You are not allowed to close deductions",
          duration: 3,
        })
      );
    } else {
      yield put(
        setFlashMessage({
          type: "error",
          status: true,
          title: "Closing Deduction",
          desc: response.error,
          duration: 3,
        })
      );
    }
  } catch (e) {
    // TODO:
  }
}

function* DeleteDeduction(action: PayloadAction<string>) {
  try {
    const response: AddDeductionResponse = yield call(
      DeductionAPI.deleteDeduction,
      action.payload
    );
    if (response.code === 204) {
      yield put(deleteDeductionDone(response.deduction));
      yield put(
        setFlashMessage({
          type: "success",
          status: true,
          title: "Delete Deduction",
          desc: response.success,
          duration: 3,
        })
      );
    } else if (response.code === 401) {
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
      yield put(
        setFlashMessage({
          type: "error",
          status: true,
          title: "Access Denied",
          desc: "You are not allowed to delete deductions",
          duration: 3,
        })
      );
    } else {
      yield put(
        setFlashMessage({
          type: "error",
          status: true,
          title: "Delete Deduction",
          desc: response.error,
          duration: 3,
        })
      );
    }
  } catch (e) {
    // TODO:
  }
}

function* editDeduction(action: PayloadAction<EditDeductionParams>) {
  try {
    const response: AddDeductionResponse = yield call(
      DeductionAPI.editDeduction,
      action.payload.id || "",
      action.payload
    );
    if (response.code === 201) {
      yield put(editDeductionDone(response.deduction));
      yield put(
        setFlashMessage({
          type: "success",
          status: true,
          title: "Edit Deduction",
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
          desc: "You are not authorized to edit deduction",
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
          desc: "You are not allowed to edit deductions",
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
              ? "Cannot edit deductions please try again"
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
        desc: "Cannot edit deductions please try again",
        duration: 3,
      })
    );
  }
}

function* loadNextPage(action: PayloadAction<string>) {
  try {
    const response: PaginatedDeductionResponse = yield call(
      DeductionAPI.listDeductions,
      action.payload
    );
    if (response.code === 200) {
      yield put(listDeductionDone(response));
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
    const response: PaginatedDeductionResponse = yield call(
      DeductionAPI.listDeductions,
      action.payload
    );
    if (response.code === 200) {
      yield put(listDeductionDone(response));
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

export function* watchDeductionRequest() {
  yield takeEvery("deduction/editDeductionRequested", editDeduction);
  yield takeEvery("deduction/loadNextPageRequested", loadNextPage);
  yield takeEvery("deduction/loadPrevPageRequested", loadPrevPage);
  yield takeEvery("deduction/addDeductionRequested", addDeduction);
  yield takeEvery("deduction/listDeductionsRequested", GetDeductions);
  yield takeEvery("deduction/deleteDeductionRequested", DeleteDeduction);
  yield takeEvery("deduction/getDeductionRequested", GetDeduction);
  yield takeEvery("deduction/CLoseDeduction", GetDeduction);

}
