import { UserResponse } from "../user/response";

export interface Auth {
  curr_user: UserResponse;
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
  setCurrUser: (user: UserResponse) => void;
}
