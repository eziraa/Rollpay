/* eslint-disable react-refresh/only-export-components */
import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeEvery } from "redux-saga/effects";
import { setFlashMessage } from "../notification/flashMesssageSlice";
import { SignUpParams } from "../../typo/user/params";
import UserAPI from "../../services/user-api";
import { signUpFinished } from "./userSLice";
import { SignUpResponse } from "../../typo/user/response";

function* userSignUp(action: PayloadAction<SignUpParams>) {
  try {
    const response: SignUpResponse = yield call(UserAPI.signUp, action.payload);

    if (response.code === 201) {
      yield put(signUpFinished());
      yield put(
        setFlashMessage({
          color: "green",
          status: true,
          title: "User sign up",
          desc: response.success,
          duration: 3,
        })
      );
    } else {
      yield put(
        setFlashMessage({
          color: "red",
          status: true,
          title: "User sign up",
          desc: response.error,
          duration: 3,
        })
      );
    }
  } catch (e) {
    yield put(
      setFlashMessage({
        color: "red",
        status: true,
        title: "User sign up",
        desc: "User sign up failed try again!!",
        duration: 3,
      })
    );
  }
}

export function* watchUserSignUp() {
  yield takeEvery("user/signUpRequested", userSignUp);
}
