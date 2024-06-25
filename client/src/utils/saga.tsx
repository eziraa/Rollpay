import { all } from "redux-saga/effects";
import { watchSetFlashMessage } from "../store/notification/flash-message-saga";
import {
  watchUserLogOut,
  watchUserLogin,
  watchUserSignUp,
} from "../store/user/user-saga";
import {
  watchAddEmployee,
  watchEditEmployee,
  watchLoadPage,
} from "../store/employee/employee-saga";
import { watchGetEmployeeSalary } from "../store/salary/salary-saga";
import { watchPositionRequest } from "../store/position/position-saga";
import { watchDeductionRequest } from "../store/deduction/deduction-saga";
import { watchAllowanceRequest } from "../store/allowance/allowance-saga";
import { watchOvertimeRequest } from "../store/overtime/overtime-saga";
export function* rootSaga() {
  yield all([
    watchSetFlashMessage(),
    watchUserSignUp(),
    watchUserLogin(),
    watchUserLogOut(),
    watchAddEmployee(),
    watchEditEmployee(),
    watchGetEmployeeSalary(),
    watchLoadPage(),
    watchPositionRequest(),
    watchDeductionRequest(),
    watchAllowanceRequest(),
    watchOvertimeRequest(),
  ]);
}
