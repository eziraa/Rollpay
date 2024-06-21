import { Pagination } from "../../services/employee-api";
import { Employee } from "./response";

export interface EmployeeState {
  adding: boolean;
  loading: boolean;
  employees: Employee[];
  adding_emp_error: string | undefined;
  task: string | undefined;
  curr_emp: Employee | undefined;
  editing: boolean;
  major_task: string | undefined;
  mini_task: string | undefined;
  deleting: boolean;
  query_set: Employee[];
  searching: boolean;
  pagination: Pagination | undefined;
}
