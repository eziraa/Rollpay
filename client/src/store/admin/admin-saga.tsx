import { call, put, takeEvery } from "redux-saga/effects";
import { AdminResponse } from "../../typo/admin/response";
import AdminAPI from "../../services/admin-api";
import {
  getGroupsDone,
  getGroupsRequest,
  getRolesDone,
  getRolesRequest,
  getUsersDone,
  getUsersRequest,
} from "./admin-slice";
import { setFlashMessage } from "../notification/flash-messsage-slice";

function* getUsers() {
  try {
    const response: AdminResponse = yield call(AdminAPI.getUsers);
    if (response.code === 200) {
      yield put(getUsersDone(response.users));
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
          desc: "Not allowed to view groupss",
          duration: 3,
        })
      );
    } else {
      yield put(
        setFlashMessage({
          type: "error",
          status: true,
          title: "List Allowance",
          desc: response.error,
          duration: 3,
        })
      );
    }
  } catch (error) {
    // TODO:
  }
}

function* getGroups() {
  try {
    const response: AdminResponse = yield call(AdminAPI.getGroups);
    if (response.code === 200) {
      yield put(getGroupsDone(response.groups));
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
          desc: "Not allowed to view groups",
          duration: 3,
        })
      );
    } else {
      yield put(
        setFlashMessage({
          type: "error",
          status: true,
          title: "List Allowance",
          desc: response.error,
          duration: 3,
        })
      );
    }
  } catch (error) {
    // TODO:
  }
}

function* getRoles() {
  try {
    const response: AdminResponse = yield call(AdminAPI.getRoles);
    if (response.code === 200) {
      yield put(getRolesDone(response.roles));
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
          desc: "Not allowed to view roles",
          duration: 3,
        })
      );
    } else {
      yield put(
        setFlashMessage({
          type: "error",
          status: true,
          title: "List Allowance",
          desc: response.error,
          duration: 3,
        })
      );
    }
  } catch (error) {
    // TODO:
  }
}

export function* watchAdminRequest() {
  yield takeEvery(getUsersRequest.type, getUsers);
  yield takeEvery(getGroupsRequest.type, getGroups);
  yield takeEvery(getRolesRequest.type, getRoles);
}
