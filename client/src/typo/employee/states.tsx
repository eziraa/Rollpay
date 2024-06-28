import { Pagination } from "../utils/response";
import { Employee } from "./response";

export interface EmployeeState {
  // adding: boolean;
  // loading: boolean;
  employees: Employee[];
  pagination: Pagination | undefined;
  adding_emp_error: string | undefined;
  curr_emp: Employee | undefined;
  // editing: boolean;
  query_set: Employee[];
  searching: boolean;
  task_finished: boolean;
}
