import { UserResponse } from "./response";

export type User = {
  adding: boolean;
  loading: boolean;
  user: UserResponse;
  task: string | undefined;
};
