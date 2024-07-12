/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-refresh/only-export-components */
import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeEvery } from "redux-saga/effects";
import { setFlashMessage } from "../notification/flash-messsage-slice";
import { LoginParams, SignUpParams } from "../../typo/user/params";
import UserAPI from "../../services/user-api";
import {
  getCurrentUserDone,
  loginFinished,
  logout,
  signUpFinished,
  wrongLogin,
  wrongSignup,
} from "./user-slice";
import { SignUpResponse, UserResponse } from "../../typo/user/response";

function* userSignUp(action: PayloadAction<SignUpParams>) {
  try {
    const response: SignUpResponse = yield call(UserAPI.signUp, action.payload);

    if (response.code === 201) {
      yield put(signUpFinished());
      window.location.href = "/login";
    } else {
      yield put(wrongSignup(response.error));
    }
  } catch (e) {
    yield put(wrongSignup("User sign up failed try again!!"));
  }
}

function* userLogin(action: PayloadAction<LoginParams>) {
  try {
    const response: SignUpResponse = yield call(UserAPI.login, action.payload);

    if (response.code === 200) {

      yield put(loginFinished(response.data));
    } else {
      yield put(wrongLogin(response.error));
    }
  } catch (e) {
    yield put(wrongLogin("Network error please check your connection"));
  }
}

function* userLogout() {
  const response: SignUpResponse = yield call(UserAPI.logout);

  if (response.code === 200) {
    yield put(logout());
    yield put(
      setFlashMessage({
        type: "success",
        status: true,
        title: "User log out",
        desc: response.success,
        duration: 3,
      })
    );
  } else {
    yield put(
      setFlashMessage({
        type: "error",
        status: true,
        title: "User log in",
        desc: response.error,
        duration: 3,
      })
    );
  }
}

interface CurrentUserResponse extends SignUpResponse {
  employee: UserResponse;
}

function* getCurrentUser(action: PayloadAction<string>) {
  try {
    const response: CurrentUserResponse = yield call(
      UserAPI.getCurrentUser,
      action.payload
    );
    if (response.code === 200) {
      yield put(getCurrentUserDone(response.employee));
    } else {
      yield put(wrongLogin(response.error));
    }
  } catch (e) {
    yield put(wrongLogin("Network error please check your connection"));
  }
}

export function* watchUserSignUp() {
  yield takeEvery("user/logoutRequested", userLogout);
  yield takeEvery("user/signUpRequested", userSignUp);
  yield takeEvery("user/loginRequested", userLogin);
  yield takeEvery("user/getCurrentUserRequest", getCurrentUser);
}
