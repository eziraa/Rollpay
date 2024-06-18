import { takeEvery, put, delay } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import {
  FlashMessageItem,
  hideFlashMessage,
  setFlashMessage,
} from "./flash-messsage-slice";

function* handleFlashMessage(action: PayloadAction<FlashMessageItem>) {
  yield delay(action.payload.duration * 1000);
  yield put(hideFlashMessage(action.payload));
}

export function* watchSetFlashMessage() {
  yield takeEvery(setFlashMessage.type, handleFlashMessage);
}
