import { call, put, takeEvery } from "redux-saga/effects";
import {
  AddGroupResponse,
  AddUserResponse,
  AdminResponse,
} from "../../typo/admin/response";
import AdminAPI from "../../services/admin-api";
import {
  addGroupDone,
  addGroupRequest,
  addUserDone,
  addUserRequest,
  deleteEmployeesRequest,
  deleteGroupRequest,
  deleteUserRequest,
  editGroupDone,
  editGroupRequest,
  editUserDone,
  editUserRequest,
  getEmployeesDone,
  getEmployeesRequest,
  getGroupsDone,
  getGroupsRequest,
  getPermissionDone,
  getPermissionsRequest,
  getRolesDone,
  getRolesRequest,
  getUsersDone,
  getUsersRequest,
  raiseError,
} from "./admin-slice";
import { setFlashMessage } from "../notification/flash-messsage-slice";
import {
  AddGroupParams,
  AddUserParams,
  EditGroupParams,
  EditUserParams,
} from "../../typo/admin/params";
import { PayloadAction } from "@reduxjs/toolkit";

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
          title: "List Group",
          desc: response.error,
          duration: 3,
        })
      );
    }
  } catch (error) {
    // TODO:
  }
}

function* getEmployees() {
  try {
    const response: AdminResponse = yield call(AdminAPI.getEmployees);
    if (response.code === 200) {
      yield put(getEmployeesDone(response.employees));
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
          title: "List Group",
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
          title: "List Group",
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
          title: "List Group",
          desc: response.error,
          duration: 3,
        })
      );
    }
  } catch (error) {
    // TODO:
  }
}

function* getPermissions() {
  try {
    const response: AdminResponse = yield call(AdminAPI.getPermissions);
    if (response.code === 200) {
      yield put(getPermissionDone(response.permissions));
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
          desc: "Not allowed to view permissions",
          duration: 3,
        })
      );
    } else {
      yield put(
        setFlashMessage({
          type: "error",
          status: true,
          title: "List Group",
          desc: response.error,
          duration: 3,
        })
      );
    }
  } catch (error) {
    // TODO:
  }
}
function* addGroup(action: PayloadAction<AddGroupParams>) {
  try {
    const response: AddGroupResponse = yield call(
      AdminAPI.addGroup,
      action.payload
    );

    if (response.code === 201) {
      yield put(addGroupDone(response.group));
      yield put(
        setFlashMessage({
          type: "success",
          status: true,
          title: "Adding Group",
          desc: response.success,
          duration: 3,
        })
      );
    } else if (response.code === 401) {
      yield put(raiseError(response.error));
    } else if (response.code === 403) {
      yield put(raiseError(response.error));
      yield put(
        setFlashMessage({
          type: "error",
          status: true,
          title: "Forbidden",
          desc: "Not allowed to add groups",
          duration: 3,
        })
      );
    } else {
      yield put(raiseError(response.error));
    }
  } catch (_) {
    yield put(raiseError("Failed please try again later"));
    yield put(
      setFlashMessage({
        type: "error",
        status: true,
        title: "Add Group",
        desc: "Failed please try again later",
        duration: 3,
      })
    );
  }
}

function* editGroup(action: PayloadAction<EditGroupParams>) {
  try {
    const response: AddGroupResponse = yield call(
      AdminAPI.editGroup,
      action.payload
    );

    if (response.code === 200) {
      yield put(editGroupDone(response.group));
      yield put(
        setFlashMessage({
          type: "success",
          status: true,
          title: "Editing Group",
          desc: response.success,
          duration: 3,
        })
      );
    } else if (response.code === 401) {
      yield put(raiseError(response.error));
    } else if (response.code === 403) {
      yield put(raiseError(response.error));
      yield put(
        setFlashMessage({
          type: "error",
          status: true,
          title: "Forbidden",
          desc: "Not allowed to add groups",
          duration: 3,
        })
      );
    } else {
      yield put(raiseError(response.error));
    }
  } catch (_) {
    yield put(raiseError("Failed please try again later"));
    yield put(
      setFlashMessage({
        type: "error",
        status: true,
        title: "Add Group",
        desc: "Failed please try again later",
        duration: 3,
      })
    );
  }
}

function* deleteGroup(action: PayloadAction<string[]>) {
  try {
    const response: AdminResponse = yield call(
      AdminAPI.deleteGroup,
      action.payload
    );
    if (response.code === 200) {
      yield put(getGroupsDone(response.groups));
      yield put(
        setFlashMessage({
          type: "success",
          status: true,
          title: "Deleting Group",
          desc: "Group deleted successfully",
          duration: 3,
        })
      );
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
          title: "List Group",
          desc: response.error,
          duration: 3,
        })
      );
    }
  } catch (error) {
    // TODO:
  }
}

function* deleteEmployee(action: PayloadAction<string[]>) {
  try {
    const response: AdminResponse = yield call(
      AdminAPI.deleteEmployee,
      action.payload
    );
    if (response.code === 200) {
      yield put(getEmployeesDone(response.employees));
      yield put(
        setFlashMessage({
          type: "success",
          status: true,
          title: "Deleting Employee",
          desc: "Employee deleted successfully",
          duration: 3,
        })
      );
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
          title: "List Employee",
          desc: response.error,
          duration: 3,
        })
      );
    }
  } catch (error) {
    // TODO:
  }
}

function* addUser(action: PayloadAction<AddUserParams>) {
  try {
    const response: AddUserResponse = yield call(
      AdminAPI.addUser,
      action.payload
    );

    if (response.code === 201) {
      yield put(addUserDone(response.user));
      yield put(
        setFlashMessage({
          type: "success",
          status: true,
          title: "Adding User",
          desc: response.success,
          duration: 3,
        })
      );
    } else if (response.code === 401) {
      yield put(raiseError(response.error));
    } else if (response.code === 403) {
      yield put(raiseError(response.error));
      yield put(
        setFlashMessage({
          type: "error",
          status: true,
          title: "Forbidden",
          desc: "Not allowed to add users",
          duration: 3,
        })
      );
    } else {
      yield put(raiseError(response.error));
    }
  } catch (_) {
    yield put(raiseError("Failed please try again later"));
    yield put(
      setFlashMessage({
        type: "error",
        status: true,
        title: "Add User",
        desc: "Failed please try again later",
        duration: 3,
      })
    );
  }
}

function* editUser(action: PayloadAction<EditUserParams>) {
  try {
    const response: AddUserResponse = yield call(
      AdminAPI.editUser,
      action.payload
    );

    if (response.code === 200) {
      yield put(editUserDone(response.user));
      yield put(
        setFlashMessage({
          type: "success",
          status: true,
          title: "Editing User",
          desc: response.success,
          duration: 3,
        })
      );
    } else if (response.code === 401) {
      yield put(raiseError(response.error));
    } else if (response.code === 403) {
      yield put(raiseError(response.error));
      yield put(
        setFlashMessage({
          type: "error",
          status: true,
          title: "Forbidden",
          desc: "Not allowed to add users",
          duration: 3,
        })
      );
    } else {
      yield put(raiseError(response.error));
    }
  } catch (_) {
    yield put(raiseError("Failed please try again later"));
    yield put(
      setFlashMessage({
        type: "error",
        status: true,
        title: "Add User",
        desc: "Failed please try again later",
        duration: 3,
      })
    );
  }
}

function* deleteUser(action: PayloadAction<string[]>) {
  try {
    const response: AdminResponse = yield call(
      AdminAPI.deleteUser,
      action.payload
    );
    if (response.code === 200) {
      yield put(getUsersDone(response.users));
      yield put(
        setFlashMessage({
          type: "success",
          status: true,
          title: "Deleting User",
          desc: "User deleted successfully",
          duration: 3,
        })
      );
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
          desc: "Not allowed to view users",
          duration: 3,
        })
      );
    } else {
      yield put(
        setFlashMessage({
          type: "error",
          status: true,
          title: "List User",
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
  yield takeEvery(getPermissionsRequest.type, getPermissions);
  yield takeEvery(addGroupRequest.type, addGroup);
  yield takeEvery(deleteGroupRequest.type, deleteGroup);
  yield takeEvery(editGroupRequest.type, editGroup);
  yield takeEvery(addUserRequest.type, addUser);
  yield takeEvery(deleteUserRequest.type, deleteUser);
  yield takeEvery(editUserRequest.type, editUser);
  yield takeEvery(getEmployeesRequest.type, getEmployees);
  yield takeEvery(deleteEmployeesRequest.type, deleteEmployee);
}
