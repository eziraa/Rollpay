import { EmployeeResponse } from "./response";

export interface EmployeeState {
  adding: boolean;
  loading: boolean;
  employees: EmployeeResponse[];
  task: string | undefined;
}
