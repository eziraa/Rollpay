import { takeEvery, put, delay } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import {
  FlashMessageState,
  hideFlashMessage,
  setFlashMessage,
} from "./flashMesssageSlice";

function* handleFlashMessage(action: PayloadAction<FlashMessageState>) {
  yield delay(action.payload.duration * 1000);
  yield put(hideFlashMessage());
}

export function* watchSetFlashMessage() {
  yield takeEvery(setFlashMessage.type, handleFlashMessage);
}
