import { all } from "redux-saga/effects";
import { watchSetFlashMessage } from "../store/notification/flash-message-saga";
import {
  watchUserLogOut,
  watchUserLogin,
  watchUserSignUp,
} from "../store/user/user-saga";
import {
  watchAddEmployee,
  watchAddSalary,
  watchEditEmployee,
} from "../store/employee/employee-saga";
import { watchGetEmployeeSalary } from "../store/salary/salary-saga";
export function* rootSaga() {
  yield all([
    watchSetFlashMessage(),
    watchUserSignUp(),
    watchUserLogin(),
    watchUserLogOut(),
    watchAddEmployee(),
    watchAddSalary(),
    watchEditEmployee(),
    watchGetEmployeeSalary(),
  ]);
}
