/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AdminState } from "../../typo/admin/states";
import {
  AddGroupResponse,
  Group,
  Permission,
  Role,
  User,
} from "../../typo/admin/response";

const InitialEmpState: AdminState = {
  users: [],
  roles: [],
  groups: [],
  group: undefined,
  permissions: [],
  task_error: undefined,
  task_finished: true,
  searching: false,
  adding: false,
  deleting: false,
  editing: false,
  loading: false,
};
const AdminSlice = createSlice({
  name: "admin",
  initialState: InitialEmpState,
  reducers: {
    getUsersRequest: (state) => {
      state.loading = true;
    },
    getUsersDone: (state, action: PayloadAction<User[]>) => {
      state.loading = false;
      state.users = action.payload;
    },
    getGroupsRequest: (state) => {
      state.loading = false;
    },
    getGroupsDone: (state, action: PayloadAction<Group[]>) => {
      state.loading = false;
      state.groups = action.payload;
    },
    getRolesRequest: (state) => {
      state.loading = false;
    },
    getRolesDone: (state, action: PayloadAction<Role[]>) => {
      state.loading = false;
      state.roles = action.payload;
    },
    getPermissionsRequest: (state) => {
      state.loading = false;
    },
    getPermissionDone: (state, action: PayloadAction<Permission[]>) => {
      state.loading = false;
      state.permissions = action.payload;
    },
    addGroupRequest: (state, _) => {
      state.task_finished = false;
      state.adding = true;
    },
    addGroupDone: (state, action: PayloadAction<Group>) => {
      state.task_finished = true;
      state.adding = false;
      state.group = action.payload;
      // Add new group to the list
    },
    raiseError: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.task_error = action.payload;
    },
  },
});

export const {
  getUsersRequest,
  getUsersDone,
  getGroupsRequest,
  getGroupsDone,
  getRolesRequest,
  getRolesDone,
  getPermissionsRequest,
  getPermissionDone,
  addGroupRequest,
  addGroupDone,
  raiseError,
} = AdminSlice.actions;
export default AdminSlice.reducer;
