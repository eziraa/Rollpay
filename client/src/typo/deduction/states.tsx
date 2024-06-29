import { Pagination } from "../../services/employee-api";
import { BaseState } from "../utils/state";
import { Deduction } from "./response";

export interface DeductionState extends BaseState {
  curr_deduction: Deduction | undefined;
  deductions: Deduction[];
  task_error: string | undefined;
  query_set: Deduction[];
  pagination: Pagination | undefined;
}
