/* eslint-disable react-refresh/only-export-components */
import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeEvery } from "redux-saga/effects";
import { setFlashMessage } from "../notification/flash-messsage-slice";
import {
  AddOvertimeParams,
  EditOvertimeParams,
} from "../../typo/overtime/params";
import {
  AddOvertimeResponse,
  PaginatedOvertimeResponse,
} from "../../typo/overtime/response";
import OvertimeAPI from "../../services/overtime-api";
import {
  addOvertimeDone,
  deleteOvertimeDone,
  editOvertimeDone,
  listOvertimeDone,
  unfinishedAdd,
  unfinishedDelete,
  unfinishedEdit,
} from "./overtime-slice";
function* addOvertime(action: PayloadAction<AddOvertimeParams>) {
  try {
    const response: AddOvertimeResponse = yield call(
      OvertimeAPI.addOvertime,
      action.payload
    );

    if (response.code === 201) {
      yield put(addOvertimeDone(response.overtime));
      yield put(
        setFlashMessage({
          type: "success",
          status: true,
          title: "Add Overtime",
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
          desc: "You are not allowed to add overtime",
          duration: 3,
        })
      );
    } else {
      yield put(unfinishedAdd(response.error));
    }
  } catch (e) {
    yield put(unfinishedAdd("Cann't add overtime please try again later"));
    yield put(
      setFlashMessage({
        type: "error",
        status: true,
        title: "Add Overtime",
        desc: "Cann't add overtime please try again later",
        duration: 3,
      })
    );
  }
}

function* GetOvertimes() {
  try {
    const response: PaginatedOvertimeResponse = yield call(
      OvertimeAPI.listOvertimes
    );
    if (response.code === 200) {
      yield put(listOvertimeDone(response));
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
    } else if (response.code === 403) {
      window.location.href = "/access-denied";
      yield put(
        setFlashMessage({
          type: "error",
          status: true,
          title: "Access Denied",
          desc: "You are not allowed to view employees",
          duration: 3,
        })
      );
    } else {
      yield put(
        setFlashMessage({
          type: "error",
          status: true,
          title: "List Employee",
          desc: response.error,
          duration: 3,
        })
      );
    }
  } catch (e) {
    console.log(e);
  }
}
