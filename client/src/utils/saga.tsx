import { all } from "redux-saga/effects";
import { watchSetFlashMessage } from "../store/notification/flashmessageSaga";
export function* rootSaga() {
  yield all([watchSetFlashMessage()]);
}
