import { EmployeeResponse } from "./response";

export interface EmployeeState {
  adding: boolean;
  loading: boolean;
  employees: EmployeeResponse[];
  task: string | undefined;
  curr_emp: EmployeeResponse | undefined;
  editing: boolean;
}
