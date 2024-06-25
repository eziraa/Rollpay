import { Pagination } from "../../services/employee-api";
import { BaseState } from "../utils/state";
import { Allowance } from "./response";

export interface AllowanceState extends BaseState {
  curr_allowance: Allowance | undefined;
  allowances: Allowance[];
  adding_allowance_error: string | undefined;
  query_set: Allowance[];
  pagination: Pagination | undefined;
}
