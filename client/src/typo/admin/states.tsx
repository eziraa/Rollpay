import { BaseState } from "../utils/state";
import { Group, Permission, Role, User } from "./response";

export interface AdminState extends BaseState {
  groups: Group[];
  roles: Role[];
  users: User[];
  permissions: Permission[];
  group: Group | undefined;
}
