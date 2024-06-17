import { Employee } from "./response";

export interface EmployeeState {
  adding: boolean;
  loading: boolean;
  employees: Employee[];
  task: string | undefined;
  curr_emp: Employee | undefined;
  editing: boolean;
  major_task: string | undefined;
  mini_task: string | undefined;
  deleting: boolean;
}
