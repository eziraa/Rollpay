import { all } from "redux-saga/effects";
import { watchSetFlashMessage } from "../store/notification/flashmessageSaga";
import {
  watchUserLogOut,
  watchUserLogin,
  watchUserSignUp,
} from "../store/user/userSaga";
import { watchAddEmployee } from "../store/employee/employeesaga";
export function* rootSaga() {
  yield all([
    watchSetFlashMessage(),
    watchUserSignUp(),
    watchUserLogin(),
    watchUserLogOut(),
    watchAddEmployee()
  ]);
}
