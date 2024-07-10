import { Pagination } from "../utils/response";
import { Employee } from "./response";

export interface EmployeeState {
  employees: Employee[];
  pagination: Pagination | undefined;
  task_error: string | undefined;
  curr_emp: Employee | undefined;
  query_set: Employee[];
  searching: boolean;
  task_finished: boolean;
  total: number;
}
