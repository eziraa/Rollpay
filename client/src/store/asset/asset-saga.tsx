import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeEvery } from "redux-saga/effects";
import { setFlashMessage } from "../notification/flash-messsage-slice";
import { AddAssetParams } from "../../typo/asset/params";
import { AddAssetResponse, AssetResponse } from "../../typo/asset/response";
import AssetAPI from "../../services/asset-api";
import {
  addAssetDone,
  deleteAssetDone,
  getAssetDone,
  listAssetDone,
  taskUnfinished,
} from "./asset-slice";
function* addAsset(action: PayloadAction<AddAssetParams>) {
  try {
    const response: AddAssetResponse = yield call(
      AssetAPI.addEmpAsset,
      action.payload.employee_id,
      action.payload.formData
    );

    if (response.code === 201) {
      yield put(addAssetDone(response.asset));
      yield put(
        setFlashMessage({
          type: "success",
          status: true,
          title: "Add Asset",
          desc: response.success,
          duration: 3,
        })
      );
    } else if (response.code === 401) {
      yield put(taskUnfinished(response.error));
    } else if (response.code === 403) {
      yield put(taskUnfinished(response.error));
      yield put(
        setFlashMessage({
          type: "error",
          status: true,
          title: "Forbidden",
          desc: "Not allowed to add asset",
          duration: 3,
        })
      );
    } else {
      yield put(taskUnfinished(response.error));
    }
  } catch (_) {
    yield put(taskUnfinished("Failed please try again later"));
    yield put(
      setFlashMessage({
        type: "error",
        status: true,
        title: "Add Asset",
        desc: "Failed please try again later",
        duration: 3,
      })
    );
  }
}

function* GetAssets(action: PayloadAction<string>) {
  try {
    const response: AssetResponse = yield call(
      AssetAPI.listAssets,
      action.payload
    );
    if (response.code === 200) {
      yield put(listAssetDone(response));
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
          desc: "Not allowed to view assets",
          duration: 3,
        })
      );
    } else {
      yield put(
        setFlashMessage({
          type: "error",
          status: true,
          title: "List Asset",
          desc: response.error,
          duration: 3,
        })
      );
    }
  } catch (_) {
    // TODO: handle error
  }
}

function* GetAsset(action: PayloadAction<string>) {
  try {
    const response: AddAssetResponse = yield call(
      AssetAPI.getAsset,
      action.payload
    );
    if (response.code === 200) {
      yield put(getAssetDone(response.asset));
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
          desc: "Not allowed to view asset",
          duration: 3,
        })
      );
    } else {
      yield put(
        setFlashMessage({
          type: "error",
          status: true,
          title: "Get asset",
          desc: response.error,
          duration: 3,
        })
      );
    }
  } catch (_) {
    // TODO:
  }
}

function* DeleteAsset(action: PayloadAction<string>) {
  try {
    const response: AddAssetResponse = yield call(
      AssetAPI.deleteAsset,
      action.payload
    );
    if (response.code === 204) {
      yield put(deleteAssetDone(action.payload));
      yield put(
        setFlashMessage({
          type: "success",
          status: true,
          title: "Delete Asset",
          desc: response.success,
          duration: 3,
        })
      );
    } else if (response.code === 401) {
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
      yield put(
        setFlashMessage({
          type: "error",
          status: true,
          title: "Access Denied",
          desc: "Not allowed to delete asset",
          duration: 3,
        })
      );
    } else {
      yield put(
        setFlashMessage({
          type: "error",
          status: true,
          title: "Deleting Asset",
          desc: response.error,
          duration: 3,
        })
      );
    }
  } catch (_) {
    // TODO:
  }
}

export function* watchAssetRequest() {
  yield takeEvery("asset/addAssetRequested", addAsset);
  yield takeEvery("asset/listAssetsRequested", GetAssets);
  yield takeEvery("asset/deleteAssetRequested", DeleteAsset);
  yield takeEvery("asset/getAssetRequested", GetAsset);
}
