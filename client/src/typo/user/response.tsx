import { EmployeeResponse } from "../employee/response";

export type UserResponse = {
  username: string;
  employeeId: string;
  employee: EmployeeResponse;
};
