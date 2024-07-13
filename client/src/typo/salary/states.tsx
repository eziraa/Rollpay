import { PaymentEmployee } from "../payment/response";
import { Pagination } from "../utils/response";
import { BaseState } from "../utils/state";
import { CurrentEmpPaymentsResponse } from "./response";

export interface PaymentState extends BaseState {
  task_finished: boolean;
  search_response: PaymentEmployee[];
  curr_emp: CurrentEmpPaymentsResponse | undefined;
  employees: PaymentEmployee[];
  pagination: Pagination | undefined;
}
