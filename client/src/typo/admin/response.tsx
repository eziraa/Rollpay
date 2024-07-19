import { BaseResponse } from "../utils/response";

export interface Permission {
  id: string;
  name: string;
  codename: string;
}

export interface Group {
  id: string;
  name: string;
  permissions: Permission[];
}

export interface Role {
  id: string;
  name: string;
  groups: Group[];
}

export interface User {
  id: string;
  username: string;
  email: string;
  role: Role;
  first_name: string;
  last_name: string;
  password: string;
  empID: string;
  is_staff: boolean;
  is_superuser: boolean;
}

export interface EdiTableUser extends User {
  password: string;
  empID: string;
  is_staff: boolean;
  is_superuser: boolean;
  permission: Permission[];
  groups: Group[];
}

export interface AdminResponse extends BaseResponse {
  users: User[];
  groups: Group[];
  roles: Role[];
  permissions: Permission[];
}

export interface AddGroupResponse extends BaseResponse {
  group: Group;
}

export interface AddUserResponse extends BaseResponse {
  user: User;
}