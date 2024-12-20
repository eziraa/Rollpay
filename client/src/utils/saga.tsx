import { all } from "redux-saga/effects";
import { watchSetFlashMessage } from "../store/notification/flash-message-saga";
import { watchUserSignUp } from "../store/user/user-saga";
import { watchEmployeeRequests } from "../store/employee/employee-saga";
import { watchGetEmployeeSalary } from "../store/salary/salary-saga";
import { watchPositionRequest } from "../store/position/position-saga";
import { watchDeductionRequest } from "../store/deduction/deduction-saga";
import { watchAllowanceRequest } from "../store/allowance/allowance-saga";
import { watchOvertimeRequest } from "../store/overtime/overtime-saga";
import { watchStatisticsRequest } from "../store/statistics/statistics-saga";
import { watchAssetRequest } from "../store/asset/asset-saga";
import { watchAdminRequest } from "../store/admin/admin-saga";

export function* rootSaga() {
  yield all([
    watchSetFlashMessage(),
    watchUserSignUp(),
    watchEmployeeRequests(),
    watchGetEmployeeSalary(),
    watchPositionRequest(),
    watchDeductionRequest(),
    watchAllowanceRequest(),
    watchOvertimeRequest(),
    watchStatisticsRequest(),
    watchAssetRequest(),
    watchAdminRequest(),
  ]);
}
