import { UserResponse } from "./response";

export type UserState = {
  adding: boolean;
  loading: boolean;
  user: UserResponse;
  task: string | undefined;
};
