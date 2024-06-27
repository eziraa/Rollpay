import { PaymentEmployee } from "../payment/response";
import { Pagination } from "../utils/response";
import { CurrentEmpPaymentsResponse } from "./response";

export interface PaymentState {
  loading: boolean;
  searching: boolean;
  search_response: PaymentEmployee[];
  curr_emp: CurrentEmpPaymentsResponse | undefined;
  employees: PaymentEmployee[];
  pagination: Pagination | undefined;
}
