import { UserResponse } from "./response";

export type UserState = {
  adding: boolean;
  loading: boolean;
  user: UserResponse | undefined;
  task: string | undefined;
};
