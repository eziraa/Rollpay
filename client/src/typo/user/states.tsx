import { UserResponse } from "./response";

export type UserState = {
  creating: boolean;
  loading: boolean;
  user: UserResponse | undefined;
  is_login: boolean;
  logging_in: boolean;
  logging_out: boolean;
  short_task: string | undefined;
  long_task: string | undefined;
  login_error: string | undefined;
  signup_error: string | undefined;
  acc_created: boolean;
};
