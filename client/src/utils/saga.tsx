import { all } from "redux-saga/effects";
import { watchSetFlashMessage } from "../store/notification/flashmessageSaga";
import { watchAddEmployee } from "../store/employee/employeesaga";
export function* rootSaga() {
  yield all([watchSetFlashMessage(),watchAddEmployee()]);
}
