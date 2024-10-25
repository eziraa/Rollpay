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
  is_active: boolean;
}


export interface AdminEmployee {
  id: string;
  first_name: string;
  last_name: string;
  gender: string;
  email: string;
  position: string;
  phone_number: string;
  date_of_hire: string;
  salary: number;
  role: string | undefined;
}

export interface EditableUser extends User {
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
  employees: AdminEmployee[];
}

export interface AddGroupResponse extends BaseResponse {
  group: Group;
}

export interface AddUserResponse extends BaseResponse {
  user: User;
}

export interface AddRoleResponse extends BaseResponse {
  role: Role;
}