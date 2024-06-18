import { EmployeeResponse } from "../employee/response";

export type UserResponse = {
  username: string;
  employeeId: string;
  employee: EmployeeResponse;
};

export type ErrorUserResponse = {
  error: string;
};

export interface SignUpResponse {
  success: string;
  error: string;
  code: number;
}
