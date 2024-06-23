import { EmployeePayment } from "../payment/response";
import { CurrentEmpPaymentsResponse, SalaryEmpResponse } from "./response";

export interface BillEmpState {
  loading: boolean;
  response: SalaryEmpResponse | undefined;
  searching: boolean;
  search_response: EmployeePayment[];
  curr_emp: CurrentEmpPaymentsResponse | undefined;
}
