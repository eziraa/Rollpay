import { BaseState } from "../utils/state";
import { UserResponse } from "./response";

export interface UserState extends BaseState {
  creating: boolean;
  task_finished: boolean;
  user: UserResponse | undefined;
  is_login: boolean;
  logging_in: boolean;
  logging_out: boolean;
  login_error: string | undefined;
  signup_error: string | undefined;
  acc_created: boolean;
}

export interface CurrentUser {
  id: string;
  first_name: string;
  last_name: string;
  gender: string;
  email: string;
  position: string;
  phone_number: string;
  date_of_birth: string;
  date_of_hire: string;
  salary: number;
  role: string;
}
