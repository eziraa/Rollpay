/* eslint-disable react-refresh/only-export-components */
import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeEvery } from "redux-saga/effects";
import { setFlashMessage } from "../notification/flash-messsage-slice";
import { AddPositionResponse } from "../../typo/position/response";
import PositionAPI, {
  PaginatedPositionResponse,
} from "../../services/position-api";
import {
  addPositionDone,
  deletePositionDone,
  editPositionDone,
  listPositionDone,
  unfinishedAdd,
  taskUnfinished,
  unfinishedEdit,
  closePositionDone,
} from "./position-slice";
import {
  AddPositionParams,
  EditPositionParams,
} from "../../typo/position/params";
function* addPosition(action: PayloadAction<AddPositionParams>) {
  try {
    const response: AddPositionResponse = yield call(
      PositionAPI.addPosition,
      action.payload
    );

    if (response.code === 201) {
      yield put(addPositionDone(response.position));
      yield put(
        setFlashMessage({
          type: "success",
          status: true,
          title: "Add Position",
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
          desc: "You are not allowed to add position",
          duration: 3,
        })
      );
    } else {
      yield put(unfinishedAdd(response.error));
    }
  } catch (e) {
    yield put(unfinishedAdd("Cann't add position please try again later"));
    yield put(
      setFlashMessage({
        type: "error",
        status: true,
        title: "Add Position",
        desc: "Cann't add position please try again later",
        duration: 3,
      })
    );
  }
}

function* GetPositions() {
  try {
    const response: PaginatedPositionResponse = yield call(
      PositionAPI.listPositions
    );
    if (response.code === 200) {
      yield put(listPositionDone(response));
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
          desc: "You are not allowed to view positions",
          duration: 3,
        })
      );
    } else {
      yield put(
        setFlashMessage({
          type: "error",
          status: true,
          title: "List Position",
          desc: response.error,
          duration: 3,
        })
      );
    }
  } catch (e) {
    console.log(e);
  }
}

function* DeletePosition(action: PayloadAction<string>) {
  try {
    const response: AddPositionResponse = yield call(
      PositionAPI.deletePosition,
      action.payload
    );
    if (response.code === 204) {
      yield put(deletePositionDone(response.position));
      yield put(
        setFlashMessage({
          type: "success",
          status: true,
          title: "Delete Position",
          desc: response.success,
          duration: 3,
        })
      );
    } else if (response.code === 401) {
      yield put(taskUnfinished(response.error || "Cann't delete position"));
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
      yield put(taskUnfinished(response.error || "Cann't delete position"));
      // window.location.href = "/access-denied";
      yield put(
        setFlashMessage({
          type: "error",
          status: true,
          title: "Access Denied",
          desc: "You are not allowed to delete positions",
          duration: 3,
        })
      );
    } else {
      yield put(
        setFlashMessage({
          type: "error",
          status: true,
          title: "Delete Position",
          desc: response.error,
          duration: 3,
        })
      );
    }
  } catch (e) {
    console.log(e);
  }
}

function* CLosePosition(action: PayloadAction<string>) {
  try {
    const response: AddPositionResponse = yield call(
      PositionAPI.closePosition,
      action.payload
    );
    if (response.code === 201) {
      yield put(closePositionDone(response.position));
      yield put(
        setFlashMessage({
          type: "success",
          status: true,
          title: "Closing Position",
          desc: response.success,
          duration: 3,
        })
      );
    } else if (response.code === 401) {
      yield put(taskUnfinished(response.error || "Cann't close position"));
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
      yield put(taskUnfinished(response.error || "Cann't close position"));
      // window.location.href = "/access-denied";
      yield put(
        setFlashMessage({
          type: "error",
          status: true,
          title: "Access Denied",
          desc: "You are not allowed to close positions",
          duration: 3,
        })
      );
    } else {
      yield put(
        setFlashMessage({
          type: "error",
          status: true,
          title: "Closing Position",
          desc: response.error,
          duration: 3,
        })
      );
    }
  } catch (e) {
    console.log(e);
  }
}

function* OpenPosition(action: PayloadAction<string>) {
  try {
    const response: AddPositionResponse = yield call(
      PositionAPI.openPosition,
      action.payload
    );
    if (response.code === 201) {
      yield put(closePositionDone(response.position));
      yield put(
        setFlashMessage({
          type: "success",
          status: true,
          title: "Opening Position",
          desc: response.success,
          duration: 3,
        })
      );
    } else if (response.code === 401) {
      yield put(taskUnfinished(response.error || "Cann't open position"));
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
      yield put(taskUnfinished(response.error || "Cann't open position"));
      // window.location.href = "/access-denied";
      yield put(
        setFlashMessage({
          type: "error",
          status: true,
          title: "Access Denied",
          desc: "You are not allowed to open positions",
          duration: 3,
        })
      );
    } else {
      yield put(
        setFlashMessage({
          type: "error",
          status: true,
          title: "Open Position",
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
    const response: PaginatedPositionResponse = yield call(
      PositionAPI.listPositions,
      action.payload
    );
    if (response.code === 200) {
      yield put(listPositionDone(response));
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
    const response: PaginatedPositionResponse = yield call(
      PositionAPI.listPositions,
      action.payload
    );
    if (response.code === 200) {
      yield put(listPositionDone(response));
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

function* editPosition(action: PayloadAction<EditPositionParams>) {
  try {
    const response: AddPositionResponse = yield call(
      PositionAPI.editPosition,
      action.payload.id || "",
      action.payload
    );
    if (response.code === 201) {
      yield put(editPositionDone(response.position));
      yield put(
        setFlashMessage({
          type: "success",
          status: true,
          title: "Edit Position",
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
          desc: "You are not authorized to edit position",
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
          desc: "You are not allowed to edit positions",
          duration: 3,
        })
      );
    } else {
      yield put(unfinishedEdit());
      yield put(
        setFlashMessage({
          type: "error",
          status: true,
          title: "Edit Position",
          desc:
            response.error.length < 3
              ? "Cannot edit positions please try again"
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
        title: "Edit Position",
        desc: "Cannot edit positions please try again",
        duration: 3,
      })
    );
  }
}

export function* watchPositionRequest() {
  yield takeEvery("position/editPositionRequested", editPosition);
  yield takeEvery("position/loadNextPageRequested", loadNextPage);
  yield takeEvery("position/loadPrevPageRequested", loadPrevPage);
  yield takeEvery("position/addPositionRequested", addPosition);
  yield takeEvery("position/listPositionsRequested", GetPositions);
  yield takeEvery("position/deletePositionRequested", DeletePosition);
  yield takeEvery("position/closePositionRequested", CLosePosition);
  yield takeEvery("position/openPositionRequested", OpenPosition);
}
