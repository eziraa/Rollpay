import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeEvery } from "redux-saga/effects";
import { setFlashMessage } from "../notification/flash-messsage-slice";
import { AddAssetParams, EditAssetParams } from "../../typo/asset/params";
import { AddAssetResponse, AssetResponse } from "../../typo/asset/response";
import AssetAPI from "../../services/asset-api";
import {
  addAssetDone,
  deleteAssetDone,
  editAssetDone,
  getAssetDone,
  listAssetDone,
  taskUnfinished,
} from "./asset-slice";
function* addAsset(action: PayloadAction<AddAssetParams>) {
  try {
    const response: AddAssetResponse = yield call(
      AssetAPI.addEmpAsset,
      action.payload
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
          desc: "You are not allowed to add asset",
          duration: 3,
        })
      );
    } else {
      yield put(taskUnfinished(response.error));
    }
  } catch (_) {
    yield put(taskUnfinished("Can't add asset please try again later"));
    yield put(
      setFlashMessage({
        type: "error",
        status: true,
        title: "Add Asset",
        desc: "Can't add asset please try again later",
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
      console.log(response);
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
          desc: "You are not allowed to view assets",
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
          desc: "You are not allowed to view asset",
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
      yield put(deleteAssetDone(response.asset));
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
          desc: "You are not allowed to delete asset",
          duration: 3,
        })
      );
    } else {
      yield put(
        setFlashMessage({
          type: "error",
          status: true,
          title: "Delete Asset",
          desc: response.error,
          duration: 3,
        })
      );
    }
  } catch (_) {
    // TODO:
  }
}

function* editAsset(action: PayloadAction<EditAssetParams>) {
  try {
    const response: AddAssetResponse = yield call(
      AssetAPI.editAsset,
      action.payload.id || "",
      action.payload
    );
    if (response.code === 201) {
      yield put(editAssetDone(response.asset));
      yield put(
        setFlashMessage({
          type: "success",
          status: true,
          title: "Edit Asset",
          desc: response.success,
          duration: 3,
        })
      );
    } else if (response.code === 401) {
      // yield put(unfinishedEdit());
      yield put(
        setFlashMessage({
          type: "error",
          status: true,
          title: "Permition Denied",
          desc: "You are not authorized to edit asset",
          duration: 3,
        })
      );
    } else if (response.code === 403) {
      yield put(taskUnfinished(response.error));
      yield put(
        setFlashMessage({
          type: "error",
          status: true,
          title: "Forbidden",
          desc: "You are not allowed to edit asset",
          duration: 3,
        })
      );
    } else {
      yield put(
        setFlashMessage({
          type: "error",
          status: true,
          title: "Edit asset",
          desc:
            response.error.length < 3
              ? "Cannot edit asset please try again"
              : response.error,
          duration: 3,
        })
      );
    }
  } catch (_) {
    yield put(
      setFlashMessage({
        type: "error",
        status: true,
        title: "Edit asset",
        desc: "Cannot edit asset please try again",
        duration: 3,
      })
    );
  }
}

export function* watchAssetRequest() {
  yield takeEvery("asset/editAssetRequested", editAsset);
  yield takeEvery("asset/addAssetRequested", addAsset);
  yield takeEvery("asset/listAssetsRequested", GetAssets);
  yield takeEvery("asset/deleteAssetRequested", DeleteAsset);
  yield takeEvery("asset/getAssetRequested", GetAsset);
}
