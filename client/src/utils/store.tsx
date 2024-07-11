import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { RouterConfig } from "../config/router/router";
import flashMessageSlice from "../store/notification/flash-messsage-slice";
import { rootSaga } from "./saga";
import employeeSlice from "../store/employee/employee-slice";
import userSLice from "../store/user/user-slice";
import salarySlice from "../store/salary/salary-slice";
import positionSlice from "../store/position/position-slice";
import allowanceSlice from "../store/allowance/allowance-slice";
import deductionSlice from "../store/deduction/deduction-slice";
import overtimeSlice from "../store/overtime/overtime-slice";
import statisticsSlice from "../store/statistics/statistics-slice";
import assetSlice from "../store/asset/asset-slice";
// import modalSlice from "../store/modal/modal-slice";

const sagaMiddleware = createSagaMiddleware();

sagaMiddleware.setContext({
  router: RouterConfig,
});
const store = configureStore({
  reducer: {
    employee: employeeSlice,
    flashMessage: flashMessageSlice,
    user: userSLice,
    salary: salarySlice,
    position: positionSlice,
    allowance: allowanceSlice,
    deduction: deductionSlice,
    overtime: overtimeSlice,
    statistics: statisticsSlice,
    asset: assetSlice,
    // modal: modalSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["employee/updateProfileRequest"],
        ignoredActionPaths: ["payload.profile_picture"],
        ignoredPaths: ["employee.curr_emp.profile_picture"],
      },
    }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export { store };

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
