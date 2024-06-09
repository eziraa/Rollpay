import { all } from "redux-saga/effects";
import { watchSetFlashMessage } from "../store/notification/flashmessageSaga";
import { watchUserLogin, watchUserSignUp } from "../store/user/userSaga";
export function* rootSaga() {
  yield all([watchSetFlashMessage(), watchUserSignUp(), watchUserLogin()]);
}
