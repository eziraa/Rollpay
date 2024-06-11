import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { RouterConfig } from "../config/router/router";
import flashMessageSlice from "../store/notification/flashMesssageSlice";
import { rootSaga } from "./saga";
import employeeSlice from "../store/employee/employee-slice";
import userSLice from "../store/user/user-slice";

const sagaMiddleware = createSagaMiddleware();

sagaMiddleware.setContext({
  router: RouterConfig,
});
const store = configureStore({
  reducer: {
    employee: employeeSlice,
    flashMessage: flashMessageSlice,
    user: userSLice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {},
    }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export { store };

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
