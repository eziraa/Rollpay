/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AdminState } from "../../typo/admin/states";
import {
  AdminEmployee,
  Group,
  Permission,
  Role,
  User,
} from "../../typo/admin/response";
import {
  AddRoleParams,
  AddUserParams,
  EditGroupParams,
  EditRoleParams,
  EditUserParams,
} from "../../typo/admin/params";

const InitialEmpState: AdminState = {
  users: [],
  roles: [],
  groups: [],
  employees: [],
  employee: undefined,
  user: undefined,
  role: undefined,
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
    getEmployeesRequest: (state) => {
      state.loading = true;
    },
    getEmployeesDone: (state, action: PayloadAction<AdminEmployee[]>) => {
      state.loading = false;
      state.employees = action.payload;
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
    deleteGroupRequest: (state, _: PayloadAction<string[]>) => {
      state.task_finished = false;
      state.deleting = true;
    },
    deleteGroupDone: (state, action: PayloadAction<Group[]>) => {
      state.task_finished = false;
      state.deleting = true;
      state.groups = action.payload;
    },
    deleteEmployeesRequest: (state, _: PayloadAction<string[]>) => {
      state.task_finished = false;
      state.deleting = true;
    },
    deleteEmployeesDone: (state, action: PayloadAction<AdminEmployee[]>) => {
      state.task_finished = false;
      state.deleting = true;
      state.employees = action.payload;
    },
    editGroupRequest: (state, _: PayloadAction<EditGroupParams>) => {
      state.task_finished = false;
      state.editing = true;
    },
    editGroupDone: (state, action: PayloadAction<Group>) => {
      state.task_finished = false;
      state.editing = true;
      state.groups = state.groups.map((group) =>
        group.id === action.payload.id ? action.payload : group
      );
    },
    setCurrentGroup: (state, action: PayloadAction<Group>) => {
      state.group = action.payload;
      state.loading = false;
    },
    raiseError: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.adding = false;
      state.task_error = action.payload;
    },
    addUserRequest: (state, _: PayloadAction<AddUserParams>) => {
      state.task_finished = false;
      state.adding = true;
    },
    addUserDone: (state, action: PayloadAction<User>) => {
      state.task_finished = true;
      state.adding = false;
      state.user = action.payload;
      // Add new group to the list
    },
    deleteUserRequest: (state, _: PayloadAction<string[]>) => {
      state.task_finished = false;
      state.deleting = true;
    },
    deleteUserDone: (state, action: PayloadAction<User[]>) => {
      state.task_finished = false;
      state.deleting = true;
      state.users = action.payload;
    },
    editUserRequest: (state, _: PayloadAction<EditUserParams>) => {
      state.task_finished = false;
      state.editing = true;
    },
    editUserDone: (state, action: PayloadAction<User>) => {
      state.task_finished = false;
      state.editing = true;
      state.users = state.users.map((user) =>
        user.id === action.payload.id ? action.payload : user
      );
    },
    addRoleRequest: (state, _: PayloadAction<AddRoleParams>) => {
      state.task_finished = false;
      state.adding = true;
    },
    addRoleDone: (state, action: PayloadAction<Role>) => {
      state.task_finished = true;
      state.adding = false;
      state.role = action.payload;
    },
    editRoleRequest: (state, _: PayloadAction<EditRoleParams>) => {
      state.task_finished = false;
      state.editing = true;
    },
    editRoleDone: (state, action: PayloadAction<Role>) => {
      state.task_finished = false;
      state.editing = true;
      state.roles = state.roles.map((role) =>
        role.id === action.payload.id ? action.payload : role
      );
    },
    deleteRoleRequest: (state, _: PayloadAction<string[]>) => {
      state.task_finished = false;
      state.deleting = true;
    },
    deleteRoleDone: (state, action: PayloadAction<Role[]>) => {
      state.task_finished = false;
      state.deleting = true;
      state.roles = action.payload;
    },
    setCurrentUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.loading = false;
    },
    resetError: (state) => {
      state.task_error = "";
    },
  },
});

export const {
  getUsersRequest,
  getUsersDone,
  getEmployeesRequest,
  getEmployeesDone,
  getGroupsRequest,
  getGroupsDone,
  getRolesRequest,
  getRolesDone,
  getPermissionsRequest,
  getPermissionDone,
  addGroupRequest,
  addGroupDone,
  deleteGroupDone,
  deleteGroupRequest,
  editGroupDone,
  editGroupRequest,
  setCurrentGroup,
  setCurrentUser,
  addUserRequest,
  addUserDone,
  deleteUserDone,
  deleteUserRequest,
  editUserDone,
  editUserRequest,
  deleteEmployeesRequest,
  deleteEmployeesDone,
  addRoleRequest,
  addRoleDone,
  editRoleRequest,
  editRoleDone,
  deleteRoleRequest,
  deleteRoleDone,
  raiseError,
  resetError,
} = AdminSlice.actions;
export default AdminSlice.reducer;
