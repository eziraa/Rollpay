import { all } from "redux-saga/effects";
import { watchSetFlashMessage } from "../store/notification/flashmessageSaga";
import {
  watchUserLogOut,
  watchUserLogin,
  watchUserSignUp,
} from "../store/user/userSaga";
export function* rootSaga() {
  yield all([
    watchSetFlashMessage(),
    watchUserSignUp(),
    watchUserLogin(),
    watchUserLogOut(),
  ]);
}
