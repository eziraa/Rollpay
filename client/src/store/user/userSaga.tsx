/* eslint-disable react-refresh/only-export-components */
import { PayloadAction } from "@reduxjs/toolkit";
import { SagaReturnType, call, put, takeEvery } from "redux-saga/effects";
import { setFlashMessage } from "../notification/flashMesssageSlice";
import { SignUpParams } from "../../typo/user/params";
import UserAPI from "../../services/user-api";
import { signUpFinished } from "./userSLice";

function* AddEmployee(action: PayloadAction<SignUpParams>) {
  try {
    const user: SagaReturnType<typeof UserAPI.signUp> = yield call(
      UserAPI.signUp,
      action.payload
    );
    yield put(signUpFinished(user));
    yield put(
      setFlashMessage({
        color: "green",
        status: true,
        title: "User sign up",
        desc: "You are successfully signed up",
        duration: 3,
      })
    );
  } catch (e) {
    yield put(
      setFlashMessage({
        color: "red",
        status: true,
        title: "User sign up",
        desc: "User sign up failed ",
        duration: 3,
      })
    );
  }
}

export function* watchAddEmployee() {
  yield takeEvery("user/signUpRequested", AddEmployee);
}
