import { CurrentUser } from "../user/states";

export interface Auth {
  curr_user: CurrentUser;
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
  setCurrUser: (user: CurrentUser) => void;
}
