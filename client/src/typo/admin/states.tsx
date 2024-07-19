import { BaseState } from "../utils/state";
import { AdminEmployee, Group, Permission, Role, User } from "./response";

export interface AdminState extends BaseState {
  groups: Group[];
  roles: Role[];
  users: User[];
  employees: AdminEmployee[];
  employee: AdminEmployee | undefined;
  permissions: Permission[];
  group: Group | undefined;
  user: User | undefined;
  role: Role | undefined;
}
