/* eslint-disable react-refresh/only-export-components */
import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeEvery } from "redux-saga/effects";
import { setFlashMessage } from "../notification/flash-messsage-slice";
import {
  AddAllowanceParams,
  EditAllowanceParams,
} from "../../typo/allowance/params";
import {
  AddAllowanceResponse,
  PaginatedAllowanceResponse,
} from "../../typo/allowance/response";
import AllowanceAPI from "../../services/allowance-api";
import {
  addAllowanceDone,
  closeAllowanceDone,
  deleteAllowanceDone,
  editAllowanceDone,
  getAllowanceDone,
  listAllowanceDone,
  taskUnfinished,
} from "./allowance-slice";
function* addAllowance(action: PayloadAction<AddAllowanceParams>) {
  try {
    const response: AddAllowanceResponse = yield call(
      AllowanceAPI.addAllowance,
      action.payload
    );

    if (response.code === 201) {
      yield put(addAllowanceDone(response.allowance));
      yield put(
        setFlashMessage({
          type: "success",
          status: true,
          title: "Add Allowance",
          desc: response.success,
          duration: 3,
        })
      );
    } else if (response.code === 401) {
      yield put(taskUnfinished(response.error));
    } else if (response.code === 403) {
      yield put(taskUnfinished(response.error));
      yield put(
        setFlashMessage({
          type: "error",
          status: true,
          title: "Forbidden",
          desc: "You are not allowed to add allowance",
          duration: 3,
        })
      );
    } else {
      yield put(taskUnfinished(response.error));
    }
  } catch (_) {
    yield put(taskUnfinished("Cann't add allowance please try again later"));
    yield put(
      setFlashMessage({
        type: "error",
        status: true,
        title: "Add Allowance",
        desc: "Cann't add allowance please try again later",
        duration: 3,
      })
    );
  }
}
function* CLoseAllowance(action: PayloadAction<string>) {
  try {
    const response: AddAllowanceResponse = yield call(
      AllowanceAPI.closeAllowance,
      action.payload
    );
    if (response.code === 201) {
      yield put(closeAllowanceDone(response.allowance));
      yield put(
        setFlashMessage({
          type: "success",
          status: true,
          title: "Closing Allowance",
          desc: response.success,
          duration: 3,
        })
      );
    } else if (response.code === 401) {
      yield put(taskUnfinished(response.error || "Can't close allowance"));
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
      yield put(taskUnfinished(response.error || "Can't close allowance"));
      // window.location.href = "/access-denied";
      yield put(
        setFlashMessage({
          type: "error",
          status: true,
          title: "Access Denied",
          desc: "You are not allowed to close allowances",
          duration: 3,
        })
      );
    } else {
      yield put(
        setFlashMessage({
          type: "error",
          status: true,
          title: "Closing Allowance",
          desc: response.error,
          duration: 3,
        })
      );
    }
  } catch (e) {
    // TODO:
  }
}

function* OpenAllowance(action: PayloadAction<string>) {
  try {
    const response: AddAllowanceResponse = yield call(
      AllowanceAPI.openAllowance,
      action.payload
    );
    if (response.code === 201) {
      yield put(closeAllowanceDone(response.allowance));
      yield put(
        setFlashMessage({
          type: "success",
          status: true,
          title: "Opening Allowance",
          desc: response.success,
          duration: 3,
        })
      );
    } else if (response.code === 401) {
      yield put(taskUnfinished(response.error || "Can't open allowance"));
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
      yield put(taskUnfinished(response.error || "Can't open allowance"));
      // window.location.href = "/access-denied";
      yield put(
        setFlashMessage({
          type: "error",
          status: true,
          title: "Access Denied",
          desc: "You are not allowed to open allowances",
          duration: 3,
        })
      );
    } else {
      yield put(
        setFlashMessage({
          type: "error",
          status: true,
          title: "Open Allowance",
          desc: response.error,
          duration: 3,
        })
      );
    }
  } catch (e) {
    // TODO:
  }
}

function* GetAllowances() {
  try {
    const response: PaginatedAllowanceResponse = yield call(
      AllowanceAPI.listAllowances
    );
    if (response.code === 200) {
      yield put(listAllowanceDone(response));
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
          desc: "You are not allowed to view allowances",
          duration: 3,
        })
      );
    } else {
      yield put(
        setFlashMessage({
          type: "error",
          status: true,
          title: "List Allowance",
          desc: response.error,
          duration: 3,
        })
      );
    }
  } catch (_) {
    // TODO: handle error
  }
}
function* GetAllowance(action: PayloadAction<string>) {
  try {
    const response: AddAllowanceResponse = yield call(
      AllowanceAPI.getAllowance,
      action.payload
    );
    if (response.code === 200) {
      yield put(getAllowanceDone(response.allowance));
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
          desc: "You are not allowed to view allowance",
          duration: 3,
        })
      );
    } else {
      yield put(
        setFlashMessage({
          type: "error",
          status: true,
          title: "Get allowance",
          desc: response.error,
          duration: 3,
        })
      );
    }
  } catch (_) {
    // TODO:
  }
}

function* DeleteAllowance(action: PayloadAction<string>) {
  try {
    const response: AddAllowanceResponse = yield call(
      AllowanceAPI.deleteAllowance,
      action.payload
    );
    if (response.code === 204) {
      yield put(deleteAllowanceDone(response.allowance));
      yield put(
        setFlashMessage({
          type: "success",
          status: true,
          title: "Delete Allowance",
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
          desc: "You are not allowed to delete allowances",
          duration: 3,
        })
      );
    } else {
      yield put(
        setFlashMessage({
          type: "error",
          status: true,
          title: "Delete Allowance",
          desc: response.error,
          duration: 3,
        })
      );
    }
  } catch (_) {
    // TODO:
  }
}

function* editAllowance(action: PayloadAction<EditAllowanceParams>) {
  try {
    const response: AddAllowanceResponse = yield call(
      AllowanceAPI.editAllowance,
      action.payload.id || "",
      action.payload
    );
    if (response.code === 201) {
      yield put(editAllowanceDone(response.allowance));
      yield put(
        setFlashMessage({
          type: "success",
          status: true,
          title: "Edit Allowance",
          desc: response.success,
          duration: 3,
        })
      );
    } else if (response.code === 401) {
      // yield put(unfinishedEdit());
      yield put(
        setFlashMessage({
          type: "error",
          status: true,
          title: "Permition Denied",
          desc: "You are not authorized to edit allowance",
          duration: 3,
        })
      );
    } else if (response.code === 403) {
      yield put(taskUnfinished(response.error));
      yield put(
        setFlashMessage({
          type: "error",
          status: true,
          title: "Forbidden",
          desc: "You are not allowed to edit allowances",
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
              ? "Cannot edit allowances please try again"
              : response.error,
          duration: 3,
        })
      );
    }
  } catch (_) {
    yield put(
      setFlashMessage({
        type: "error",
        status: true,
        title: "Edit Employee",
        desc: "Cannot edit allowances please try again",
        duration: 3,
      })
    );
  }
}

function* loadNextPage(action: PayloadAction<string>) {
  try {
    const response: PaginatedAllowanceResponse = yield call(
      AllowanceAPI.listAllowances,
      action.payload
    );
    if (response.code === 200) {
      yield put(listAllowanceDone(response));
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
  } catch (_) {
    // TODO:
  }
}

function* loadPrevPage(action: PayloadAction<string>) {
  try {
    const response: PaginatedAllowanceResponse = yield call(
      AllowanceAPI.listAllowances,
      action.payload
    );
    if (response.code === 200) {
      yield put(listAllowanceDone(response));
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
  } catch (_) {
    // TODO:
  }
}

export function* watchAllowanceRequest() {
  yield takeEvery("allowance/editAllowanceRequested", editAllowance);
  yield takeEvery("allowance/loadNextPageRequested", loadNextPage);
  yield takeEvery("allowance/loadPrevPageRequested", loadPrevPage);
  yield takeEvery("allowance/addAllowanceRequested", addAllowance);
  yield takeEvery("allowance/listAllowancesRequested", GetAllowances);
  yield takeEvery("allowance/deleteAllowanceRequested", DeleteAllowance);
  yield takeEvery("allowance/getAllowanceRequested", GetAllowance);
  yield takeEvery("allowance/openAllowanceRequested", OpenAllowance);
  yield takeEvery("allowance/closeAllowanceRequested", CLoseAllowance);
}
