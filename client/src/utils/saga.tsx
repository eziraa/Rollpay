import { all } from "redux-saga/effects";
import { watchSetFlashMessage } from "../store/notification/flash-message-saga";
import {
  watchUserLogOut,
  watchUserLogin,
  watchUserSignUp,
} from "../store/user/user-saga";
import { watchAddEmployee } from "../store/employee/employee-saga";
export function* rootSaga() {
  yield all([
    watchSetFlashMessage(),
    watchUserSignUp(),
    watchUserLogin(),
    watchUserLogOut(),
    watchAddEmployee(),
  ]);
}
