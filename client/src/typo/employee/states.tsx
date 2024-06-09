import { EmployeeResponse } from "./response";

export type EmployeeState = {
  adding: boolean;
  loading: boolean;
  employees: EmployeeResponse[];
  task: string | undefined;
};
