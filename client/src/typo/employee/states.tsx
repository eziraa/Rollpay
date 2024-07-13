import { Pagination } from "../utils/response";
import { BaseState } from "../utils/state";
import { Employee } from "./response";

export interface EmployeeState extends BaseState {
  employees: Employee[];
  pagination: Pagination | undefined;
  task_error: string | undefined;
  curr_emp: Employee | undefined;
  query_set: Employee[];
  task_finished: boolean;
  total: number;
}
