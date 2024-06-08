import createSagaMiddleware from "redux-saga";
import { RouterConfig } from "../config/router/router";

const sagaMiddleware = createSagaMiddleware();

sagaMiddleware.setContext({
  router: RouterConfig,
});
