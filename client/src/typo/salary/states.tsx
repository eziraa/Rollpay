import { PaymentEmployee } from "../payment/response";
import { Pagination } from "../utils/response";
import { CurrentEmpPaymentsResponse } from "./response";

export interface PaymentState {
  task_finished: boolean;
  task_error: string | undefined;
  searching: boolean;
  search_response: PaymentEmployee[];
  curr_emp: CurrentEmpPaymentsResponse | undefined;
  employees: PaymentEmployee[];
  pagination: Pagination | undefined;
}
