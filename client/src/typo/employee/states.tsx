import { EmployeeResponse } from "./response";

export interface EmployeeState {
  adding: boolean;
  loading: boolean;
  employees: EmployeeResponse[];
  task: string | undefined;
  curr_emp: EmployeeResponse | undefined;
  editing: boolean;
  major_task: string | undefined;
  mini_task: string | undefined;
}
