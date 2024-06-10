import { UserResponse } from "./response";

export type UserState = {
  adding: boolean;
  loading: boolean;
  user: UserResponse | undefined;
  task: string | undefined;
  is_login: boolean;
  logining: boolean;
  logouting: boolean;
};
