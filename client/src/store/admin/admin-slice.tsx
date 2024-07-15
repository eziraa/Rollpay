/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AdminState } from "../../typo/admin/states";
import { Group, Role, User } from "../../typo/admin/response";

const InitialEmpState: AdminState = {
  users: [],
  roles: [],
  groups: [],
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
    raiseError: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.task_error = action.payload;
    },
  },
});

export const {
  getUsersRequest,
  getGroupsDone,
  getGroupsRequest,
  getRolesDone,
  getUsersDone,
  getRolesRequest,
  raiseError,
} = AdminSlice.actions;
export default AdminSlice.reducer;
