import {
  PaymnentStatResponse,
  StatResponse,
} from "../../typo/statistics/response";
import { call, put, takeEvery } from "redux-saga/effects";
import StatisticsAPI from "../../services/statistics-api";
import { getPaymentStatDone, getStatDone } from "./statistics-slice";
import { setFlashMessage } from "../notification/flash-messsage-slice";

function* getStatistics() {
  try {
    const response: StatResponse = yield call(StatisticsAPI.getStatistics);
    if (response.code === 200) {
      yield put(getStatDone(response.stat));
    } else if (response.code === 401) {
      window.location.href = "/access-denied";
      yield put(
        setFlashMessage({
          type: "error",
          status: true,
          title: "Unauthorized",
          desc: "Please check your credentials",
          duration: 3,
        })
      );
    }
  } catch (e) {
    // TODO: Handle
  }
}

function* getPaymentStat() {
  try {
    const response: PaymnentStatResponse = yield call(
      StatisticsAPI.getPaymentStatistics
    );
    if (response.code === 200) {
      yield put(getPaymentStatDone(response.stat));
    } else if (response.code === 401) {
      window.location.href = "/access-denied";
      yield put(
        setFlashMessage({
          type: "error",
          status: true,
          title: "Unauthorized",
          desc: "Please check your credentials",
          duration: 3,
        })
      );
    }
  } catch (e) {
    // TODO: Handle
  }
}

export function* watchStatisticsRequest() {
  yield takeEvery("statistics/getStatRequest", getStatistics);
  yield takeEvery("statistics/getPaymentStatRequest", getPaymentStat);
}
