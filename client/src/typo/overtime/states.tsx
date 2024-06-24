import { Pagination } from "../../services/employee-api";
import { BaseState } from "../utils/state";
import { Overtime } from "./response";

export interface OvertimeState extends BaseState {
  curr_overtime: Overtime | undefined;
  overtimes: Overtime[];
  adding_overtime_error: string | undefined;
  query_set: Overtime[];
  pagination: Pagination | undefined;
}
