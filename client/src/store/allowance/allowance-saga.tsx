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

function* GetAllowances() {
  try {
    const response: PaginatedAllowanceResponse = yield call(
      AllowanceAPI.listAllowances
    );
    if (response.code === 200) {
      yield put(listAllowanceDone(response));
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

function* DeleteAllowance(action: PayloadAction<string>) {
  try {
    const response: AddAllowanceResponse = yield call(
      AllowanceAPI.deleteAllowance,
      action.payload
    );
    if (response.code === 204) {
      yield put(deleteAllowanceDone(response.allowance));
      yield put(
        setFlashMessage({
          type: "success",
          status: true,
          title: "Delete Allowance",
          desc: response.success,
          duration: 3,
        })
      );
    } else if (response.code === 401) {
      yield put(unfinishedDelete());
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
      yield put(unfinishedDelete());
      // window.location.href = "/access-denied";
      yield put(
        setFlashMessage({
          type: "error",
          status: true,
          title: "Access Denied",
          desc: "You are not allowed to delete allowances",
          duration: 3,
        })
      );
    } else {
      yield put(
        setFlashMessage({
          type: "error",
          status: true,
          title: "Delete Allowance",
          desc: response.error,
          duration: 3,
        })
      );
    }
  } catch (e) {
    console.log(e);
  }
}

function* editAllowance(action: PayloadAction<EditAllowanceParams>) {
  try {
    const response: AddAllowanceResponse = yield call(
      AllowanceAPI.editAllowance,
      action.payload.id || "",
      action.payload
    );
    if (response.code === 201) {
      yield put(editAllowanceDone(response.allowance));
      yield put(
        setFlashMessage({
          type: "success",
          status: true,
          title: "Edit Allowance",
          desc: response.success,
          duration: 3,
        })
      );
    } else if (response.code === 401) {
      yield put(unfinishedEdit());
      yield put(
        setFlashMessage({
          type: "error",
          status: true,
          title: "Permition Denied",
          desc: "You are not authorized to edit allowance",
          duration: 3,
        })
      );
    } else if (response.code === 403) {
      yield put(unfinishedAdd(response.error));
      yield put(
        setFlashMessage({
          type: "error",
          status: true,
          title: "Forbidden",
          desc: "You are not allowed to edit allowances",
          duration: 3,
        })
      );
    } else {
      yield put(unfinishedEdit());
      yield put(
        setFlashMessage({
          type: "error",
          status: true,
          title: "Edit Employee",
          desc:
            response.error.length < 3
              ? "Cannot edit allowances please try again"
              : response.error,
          duration: 3,
        })
      );
    }
  } catch (e) {
    yield put(unfinishedEdit());
    yield put(
      setFlashMessage({
        type: "error",
        status: true,
        title: "Edit Employee",
        desc: "Cannot edit allowances please try again",
        duration: 3,
      })
    );
  }
}
