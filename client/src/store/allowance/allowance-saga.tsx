/* eslint-disable react-refresh/only-export-components */
import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeEvery } from "redux-saga/effects";
import { setFlashMessage } from "../notification/flash-messsage-slice";
import {
  AddAllowanceParams,
  EditAllowanceParams,
} from "../../typo/allowance/params";
import { AddAllowanceResponse } from "../../typo/allowance/response";
import AllowanceAPI, {
  PaginatedAllowanceResponse,
} from "../../services/allowance-api";
import {
  addAllowanceDone,
  deleteAllowanceDone,
  editAllowanceDone,
  listAllowanceDone,
  unfinishedAdd,
  unfinishedDelete,
  unfinishedEdit,
} from "./allowance-slice";
function* addAllowance(action: PayloadAction<AddAllowanceParams>) {
  try {
    const response: AddAllowanceResponse = yield call(
      AllowanceAPI.addAllowance,
      action.payload
    );

    if (response.code === 201) {
      yield put(addAllowanceDone(response.allowance));
      yield put(
        setFlashMessage({
          type: "success",
          status: true,
          title: "Add Allowance",
          desc: response.success,
          duration: 3,
        })
      );
    } else if (response.code === 401) {
      yield put(unfinishedAdd(response.error));
    } else if (response.code === 403) {
      yield put(unfinishedAdd(response.error));
      yield put(
        setFlashMessage({
          type: "error",
          status: true,
          title: "Forbidden",
          desc: "You are not allowed to add allowance",
          duration: 3,
        })
      );
    } else {
      yield put(unfinishedAdd(response.error));
    }
  } catch (e) {
    yield put(unfinishedAdd("Cann't add allowance please try again later"));
    yield put(
      setFlashMessage({
        type: "error",
        status: true,
        title: "Add Allowance",
        desc: "Cann't add allowance please try again later",
        duration: 3,
      })
    );
  }
}
