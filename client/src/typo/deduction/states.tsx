import { Pagination } from "../../services/employee-api";
import { BaseState } from "../utils/state";
import { Deduction } from "./response";

export interface DeductionState extends BaseState {
  curr_allowance: Deduction | undefined;
  allowances: Deduction[];
  adding_allowance_error: string | undefined;
  query_set: Deduction[];
  pagination: Pagination | undefined;
}
