import { BaseState } from "../utils/state";
import { Group, Role, User } from "./response";

export interface AdminState extends BaseState {
  groups: Group[];
  roles: Role[];
  users: User[];
}
