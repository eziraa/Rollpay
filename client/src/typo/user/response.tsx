import { Employee } from "../employee/response";

export type UserResponse = {
  username: string;
  employeeId: string;
  user_id: string;
  employee: Employee;
  role: string;
  profile_picture: string;
};

export type ErrorUserResponse = {
  error: string;
};

export interface SignUpResponse {
  success: string;
  error: string;
  code: number;
  data: UserResponse;
}
